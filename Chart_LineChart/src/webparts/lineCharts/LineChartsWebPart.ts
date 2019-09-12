import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';

import * as strings from 'LineChartsWebPartStrings';
import LineCharts from './components/LineCharts';
import { ILineChartsProps } from './ILineChartsProps';
import { sp, List, Fields } from "@pnp/sp";

export default class LineChartsWebPart extends BaseClientSideWebPart<ILineChartsProps> {
  private  receivedLists :boolean = false;
  private  ddlLists :   IPropertyPaneDropdownOption [] =  [];
  private  ddlListColumns :   IPropertyPaneDropdownOption [] =  [];
  private ddlOperationTypes : IPropertyPaneDropdownOption [] = [
    {
      key: 'Count',
      text: 'Count'
    },
    {
      key: 'Sum',
      text: 'Sum'
    },
    {
      key: 'Min',
      text: 'Min'
    },
    {
      key:'Max',
      text:'Max'
    }
  ];
  // private ddlChartDataTypes : IPropertyPaneDropdownOption [] = [
  //   {
  //     key: 'Single-Dataset',
  //     text: 'Single-Dataset'
  //   },
  //   {
  //     key: 'Multiple-Dataset',
  //     text: 'Multiple-Dataset'
  //   }
  // ];
  public render(): void {
    const element: React.ReactElement<ILineChartsProps > = React.createElement(
      LineCharts,
      {
        selectedList:this.properties.selectedList,
        SiteURL: this.properties.SiteURL,
        FieldX: this.properties.FieldX,
        FieldY:this.properties.FieldY,
        FieldOp:this.properties.FieldOp,
        FieldXArr:this.properties.FieldXArr,
        FieldYArr:this.properties.FieldYArr,
        FieldOpArr:this.properties.FieldOpArr,
        OperationType:this.properties.OperationType,
        ChartDataTypes:this.properties.ChartDataTypes,
        FillChart:this.properties.FillChart
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private get getAllLists () :   Promise < IPropertyPaneDropdownOption []> {
    debugger;
    let  Lists : IPropertyPaneDropdownOption [] =  [];
    return sp.web.lists.get().then(resp=>{
      if  (resp) {
        // Iterate over each response and get the title to fill in as ddl options
        resp.forEach ( item   =>  {
          Lists.push ({ key:item.Title,text: item.Title });
        });
        // return the fetched records
        return Promise.resolve (Lists);
      }
    });
  }

  public onPropertyPaneFieldChanged ( propertyPath : string,oldValue : any,newValue : any ) : void  {
    if  (propertyPath == `listName` ) {
      this.getAllFields (newValue).then( fields   =>  {
        this.ddlListColumns =  fields;
        this.context.propertyPane.refresh();

     });
    }
  }

  public getAllFields ( listName :string ) : Promise <IPropertyPaneDropdownOption []> {
    let ddlListColumns : IPropertyPaneDropdownOption [] =  [];
    this.properties.selectedList = listName;
    return sp.web.lists.getByTitle(listName).fields.get().then(result=>{
      if(result) {
        result.forEach (views =>  {
          ddlListColumns.push ({
            key: views.InternalName,
            text: views.Title
          });
        });
      }
      return Promise.resolve (ddlListColumns);
    });
  }

  public btnSubmit_Clicked(oldVal: any): any{
    //this.getData();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if  ( ! this.receivedLists) {
      // Call the method to get all the lists Titles
      this.getAllLists.then ( resp => {
        // Fill the values in the variable assigned
        this.ddlLists =  resp;
        // update the flag so it is not called again
        this.receivedLists = true ;
        // Refresh the property pane, to reflect the changes
        this.context.propertyPane.refresh();
     });
   }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown ( `listName`, {
                  label: `Select List`,
                  options: this.ddlLists
                }),
                 
                PropertyPaneDropdown ( 'FieldX',{
                  label: `Select First Display Field`,
                  options: this.ddlListColumns,
                  disabled: this.ddlLists.length == 0 
                }),
                PropertyPaneDropdown ( 'OperationType',{
                  label: `Select Operation Type`,
                  options: this.ddlOperationTypes
                  //disabled: this.properties.FieldYType.length == 0 
                }),
                PropertyPaneDropdown ( 'FieldY',{
                  label: `Select Second Display Field`,
                  options: this.ddlListColumns,
                  disabled: this.ddlLists.length == 0 
                }),
                PropertyPaneDropdown ( 'FieldOp',{
                  label: `Select Operation Data Field`,
                  options: this.ddlListColumns,
                  disabled: this.ddlLists.length == 0 
                }),

                // PropertyPaneDropdown ( 'ChartDataTypes',{
                //   label: `Select Chart Data Type`,
                //   options: this.ddlChartDataTypes,
                //   disabled: this.ddlLists.length == 0 
                // }),

                PropertyPaneButton('',{
                  text: "Submit Form",
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.btnSubmit_Clicked(this)
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
