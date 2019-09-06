import * as React from 'react';
import styles from './LineCharts.module.scss';
import { ILineChartsProps } from './ILineChartsProps';
import { ILineChartsState } from './ILineChartsState';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import {sp} from '@pnp/sp';
import $ from 'jquery';
export default class LineCharts extends React.Component<ILineChartsProps,ILineChartsState, {}> {
  private testArr = [
    56, 45, 8, 18, 25, 55, 4
  ];
  public constructor(props: ILineChartsProps, state:ILineChartsState){
    super(props);
    this.state = {
      selectedList:this.props.selectedList,
      SiteURL:this.props.SiteURL,
      FieldX:this.props.FieldX,
      FieldY:this.props.FieldY,
      FieldXArr:this.props.FieldXArr,
      FieldYArr:this.props.FieldYArr,
      OperationType:this.props.OperationType,
      resultData:[],
      ChartDataTypes:this.props.ChartDataTypes,
      FillChart:true,  //Set property for Filling chart with color or not
      Label:'Chart Data',
      DataSet:[
        {
          label: this.state.Label,
          fill: this.state.FillChart,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          lineTension: 0,
          data:
            this.state.FieldYArr
         },
         {
           label: this.state.Label,
           fill: this.state.FillChart,
           backgroundColor: "rgba(100, 99, 100, 0.2)",
           borderColor: "rgb(100, 99, 100)",
           //lineTension: 0,
           data:
             this.testArr
         }
      ]
    };
  }

  public componentWillMount(){
    var reactHandler = this;
    var FieldX = this.state.FieldX;
    var FieldY = this.state.FieldY;
    var FieldXArr = this.state.FieldXArr;
    var FieldYArr = this.state.FieldYArr;
    var OperationType = this.state.OperationType;
    var ChartDataTypes = this.state.ChartDataTypes;
    debugger;
    
    this.getData(FieldX,FieldY,ChartDataTypes);
  }
  
  public async getData(FieldX,FieldY,ChartDataTypes){
    let TitleArr = [];
    let ValueArr = [];
    await sp.web.lists.getByTitle(this.state.selectedList).items.select(FieldX,FieldY).get().then((resultData)=>{
      resultData.forEach((item)=>{
        $.each(item, (key, value) => {
          if(key == FieldX){
            debugger;
            TitleArr.push(value);
          }
          if(key == FieldY){
            ValueArr.push(value);
          }
        });
      });
      this.setState({
        // FieldXArr:TitleArr,
        // FieldYArr:ValueArr
        FieldXArr:[
          'January', 'February', 'March', 'April', 'May', 'June', 'July'
        ],
        FieldYArr:[
          65, 59, 80, 81, 56, 55, 40
        ]
      });
      this.performOperation(this.state.OperationType,this.state.FieldXArr,this.state.FieldYArr,ChartDataTypes);
    });
    debugger;
  }

  /*
    * Perform Operation
  */
  public performOperation(Operation,FieldXArr,FieldYArr,DataType) {

    if(DataType == 'Multiple-Dataset')
    {
      debugger;
    }

    switch(Operation) {
      case "Count":
          // if(typeof(FieldXArr[0]) == 'string')
          // {
          //   let filterArr = [];
          //   for (let i = 0; i < FieldXArr.length; i++) 
          //   { 
          //     let j; 
          //     for (j = 0; j < i; j++) 
          //     if (FieldXArr[i] == FieldXArr[j]) 
          //     {
          //       break; 
          //     }   
          //     if (i == j){ 
          //       filterArr.push(FieldXArr[i]); 
          //     }
          //   }
          //     let countArr = [];
          //     filterArr.forEach(element => {
          //       let count = FieldXArr.filter((ele)=>{
          //         return ele == element;
          //       });
          //       let x = filterArr.filter((ele)=>{return ele == count[0]}).map(function (value) {
          //         return count.length;
          //       });
          //       countArr.push(x[0]);
          //     });

          //     this.setState({
          //       FieldXArr:filterArr,
          //       FieldYArr:countArr
          //     });
          // }

        // code block
        break;
      case "Sum":
          // if(typeof(FieldYArr[0]) == 'string')
          // {
          //   alert("Please choose the column for Y-Axis that contains numeric value.");
          //   break;
          // }
          // else if(typeof(FieldXArr[0]) == 'string')
          // {
          //   let filterArr = [];
          //   for (let i = 0; i < FieldXArr.length; i++) 
          //   { 
          //     let j; 
          //     for (j = 0; j < i; j++) 
          //     if (FieldXArr[i] == FieldXArr[j]) 
          //     {
          //       break; 
          //     }   
          //     if (i == j){ 
          //       filterArr.push(FieldXArr[i]); 
          //     }
          //   }
          //     let countArr = [];
          //     filterArr.forEach(element => {
          //       let count = FieldXArr.filter((ele)=>{
          //         return ele == element;
          //       });
          //       let x = filterArr.filter((ele)=>{return ele == count[0]}).map(function (value) {
          //         return count.length;
          //       });
          //       countArr.push(x[0]);
          //     });

          //     this.setState({
          //       FieldXArr:filterArr,
          //       FieldYArr:countArr
          //     });
          // }
        // code block
        break;
      case "Min":
          // if(typeof(FieldYArr[0]) == 'string')
          // {
          //   alert("Please choose the column for Y-Axis that contains numeric value.");
          //   break;
          // }
          // else if(typeof(FieldXArr[0]) == 'string')
          // {
          //   let filterArr = [];
          //   for (let i = 0; i < FieldXArr.length; i++) 
          //   { 
          //     let j; 
          //     for (j = 0; j < i; j++) 
          //     if (FieldXArr[i] == FieldXArr[j]) 
          //     {
          //       break; 
          //     }   
          //     if (i == j){ 
          //       filterArr.push(FieldXArr[i]); 
          //     }
          //   }
          //     let countArr = [];
          //     filterArr.forEach(element => {
          //       let count = FieldXArr.filter((ele)=>{
          //         return ele == element;
          //       });
          //       let x = filterArr.filter((ele)=>{return ele == count[0]}).map(function (value) {
          //         return count.length;
          //       });
          //       countArr.push(x[0]);
          //     });

          //     this.setState({
          //       FieldXArr:filterArr,
          //       FieldYArr:countArr
          //     });
          // }  
        break;
      case "Max":
          // if(typeof(FieldYArr[0]) == 'string')
          // {
          //   alert("Please choose the column for Y-Axis that contains numeric value.");
          //   break;
          // }
          // else if(typeof(FieldXArr[0]) == 'string')
          // {
          //   let filterArr = [];
          //   for (let i = 0; i < FieldXArr.length; i++) 
          //   { 
          //     let j; 
          //     for (j = 0; j < i; j++) 
          //     if (FieldXArr[i] == FieldXArr[j]) 
          //     {
          //       break; 
          //     }   
          //     if (i == j){ 
          //       filterArr.push(FieldXArr[i]); 
          //     }
          //   }
          //     let countArr = [];
          //     filterArr.forEach(element => {
          //       let count = FieldXArr.filter((ele)=>{
          //         return ele == element;
          //       });
          //       let x = filterArr.filter((ele)=>{return ele == count[0]}).map(function (value) {
          //         return count.length;
          //       });
          //       countArr.push(x[0]);
          //     });

          //     this.setState({
          //       FieldXArr:filterArr,
          //       FieldYArr:countArr
          //     });
          // }
        break;
      default:
          this.setState({
            FieldXArr:this.state.FieldXArr,
            FieldYArr:this.state.FieldYArr
          });
        // code block
    }
  }

  public render(): React.ReactElement<ILineChartsProps> {
    const data: Chart.ChartData = {
      labels:
        this.state.FieldXArr,
      datasets: [
        {
          label: this.state.Label,
          fill: this.state.FillChart,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          lineTension: 0,
          data:
            this.state.FieldYArr
         },
         {
           label: this.state.Label,
           fill: this.state.FillChart,
           backgroundColor: "rgba(100, 99, 100, 0.2)",
           borderColor: "rgb(100, 99, 100)",
           //lineTension: 0,
           data:
             this.testArr
         }
      ]
    };
    
    // set the options
    const options: Chart.ChartOptions = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart Data"
      },
      scales: {
        yAxes: [{
          stacked: true
        }]
      }
    };
    
  return (
    <div>
      <ChartControl
        type={ChartType.Line}
        data={data}
        options={options}
      />
    </div>
    );
  }
}