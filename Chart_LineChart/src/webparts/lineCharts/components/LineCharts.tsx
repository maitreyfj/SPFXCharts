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
    56, 45, 8, 18, 25, 55, 4, 35, 78, 32, 52
  ];
  private filterArr;
  public constructor(props: ILineChartsProps, state:ILineChartsState){
    super(props);
    this.state = {
      selectedList:this.props.selectedList,
      SiteURL:this.props.SiteURL,
      FieldX:this.props.FieldX,
      FieldY:this.props.FieldY,
      FieldOp:this.props.FieldOp,
      FieldXArr:this.props.FieldXArr,
      FieldYArr:this.props.FieldYArr,
      FieldOpArr:this.props.FieldOpArr,
      OperationType:this.props.OperationType,
      resultData:[],
      ChartDataTypes:this.props.ChartDataTypes,
      FillChart:true,  //Set property for Filling chart with color or not
      Label:'Chart Data'
    };
  }

  public componentDidMount(){
    var reactHandler = this;
    var FieldX = this.state.FieldX;
    var FieldY = this.state.FieldY;
    var FieldOp = this.state.FieldOp;
    var FieldXArr = this.state.FieldXArr;
    var FieldYArr = this.state.FieldYArr;
    var FieldOpArr = this.state.FieldOpArr;
    var OperationType = this.state.OperationType;
    var ChartDataTypes = this.state.ChartDataTypes;
    
    this.getData(FieldX,FieldY,FieldOp,ChartDataTypes);
  }
  
  public async getData(FieldX,FieldY,FieldOp,ChartDataTypes){
    let TitleArr = [];
    let ValueArr = [];
    let OpArr = [];
    await sp.web.lists.getByTitle(this.state.selectedList).items.select(FieldX,FieldY,FieldOp).get().then((resultData)=>{
      resultData.forEach((item)=>{
        $.each(item, (key, value) => {
          if(key == FieldX){
            TitleArr.push(value);
          }
          if(key == FieldY){
            ValueArr.push(value);
          }
          if(key == FieldOp){
            OpArr.push(value);
          }
        });
      });
      this.setState({
        // FieldXArr:TitleArr,
        // FieldYArr:ValueArr,
        // FieldOpArr:OpArr
        FieldXArr:[
          'January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February','February', 'March'
        ],
        FieldYArr:[
          //65, 59, 80, 81, 56, 55, 40
          56, 45, 8, 18, 30, 55, 4, 35, 78, 32, 52
        ],
        FieldOpArr:[
          65, 59, 80, 81, 56, 55, 40, 35, 78, 32, 52
        ]
      });
      this.performOperation(this.state.OperationType,this.state.FieldXArr,this.state.FieldYArr,this.state.FieldOpArr,ChartDataTypes);
    });
  }

  /*
    * Perform Operation
  */
  public performOperation(Operation,FieldXArr,FieldYArr,FieldOpArr,DataType) {
    switch(Operation) {
      case "Count":
            if(typeof(FieldXArr[0]) == 'string')
            {
            this.filterArr = [];
            for (let i = 0; i < FieldXArr.length; i++) 
            { 
              let j; 
              for (j = 0; j < i; j++) 
              if (FieldXArr[i] == FieldXArr[j]) 
              {
                break; 
              }   
              if (i == j){ 
                this.filterArr.push(FieldXArr[i]); 
              }
            }
            let countArr = [];
            this.filterArr.forEach(element => {
              let count = FieldXArr.filter((ele)=>{
                return ele == element;
              });
              let x = this.filterArr.filter((ele)=>{return ele == count[0];}).map( (value) => {
                return count.length;
              });
              countArr.push(x[0]);
            });
            this.setState({
              FieldXArr:this.filterArr,
              FieldYArr:countArr
            });
          }

        // code block
        break;
      case "Sum":
        if(typeof(FieldXArr[0]) == 'string')
          {
            this.filterArr = [];
            debugger;
            for (let i = 0; i < FieldXArr.length; i++) 
            { 
              let j; 
              for (j = 0; j < i; j++) 
              if (FieldXArr[i] == FieldXArr[j]) 
              {
                break; 
              }   
              if (i == j){ 
                this.filterArr.push(FieldXArr[i]); 
              }
            }
            debugger;
            let countArr = [];
            this.filterArr.forEach(element => {
              let count = FieldXArr.filter((ele)=>{
                return ele == element;
              });
              let x = this.filterArr.filter((ele)=>{return ele == count[0];}).map( (value) => {
                let temp = 0;
                count.forEach((cntelement) => {
                  temp = temp + cntelement.length;
                });
                return temp;
              });
              countArr.push(x[0]);
            });
            this.setState({
              FieldXArr:this.filterArr,
              FieldOpArr:countArr
            });
          }
        // code block
        break;
      case "Min":
        if(typeof(FieldXArr[0]) == 'string')
        {
          this.filterArr = [];
          for (let i = 0; i < FieldOpArr.length; i++) 
          { 
            let j; 
            for (j = 0; j < i; j++) 
            if (FieldOpArr[i] == FieldOpArr[j]) 
            {
              break; 
            }   
            if (i == j){ 
              this.filterArr.push(FieldOpArr[i]); 
            }
          }
          let countArr = [];
          this.filterArr.forEach(element => {
            let count = FieldOpArr.filter((ele)=>{
              return ele == element;
            });
            let x = this.filterArr.filter((ele)=>{return ele == count[0];}).map( (value) => {
              return Math.min(...FieldOpArr);
            });
            countArr.push(x[0]);
          });
          this.setState({
            FieldXArr:this.filterArr,
            FieldOpArr:countArr
          });
        }  
        break;
      case "Max":
        // if(typeof(FieldYArr[0]) == 'string')
        // {
        //   alert("Please choose the column for Y-Axis that contains numeric value.");
        //   break;
        // }
        // else 
        if(typeof(FieldXArr[0]) == 'string')
        {
          this.filterArr = [];
          for (let i = 0; i < FieldOpArr.length; i++) 
          { 
            let j; 
            for (j = 0; j < i; j++) 
            if (FieldOpArr[i] == FieldOpArr[j]) 
            {
              break; 
            }   
            if (i == j){ 
              this.filterArr.push(FieldOpArr[i]); 
            }
          }
          let countArr = [];
          this.filterArr.forEach(element => {
            let count = FieldOpArr.filter((ele)=>{
              return ele == element;
            });
            let x = this.filterArr.filter((ele)=>{return ele == count[0];}).map( (value) => {
              return Math.max(...FieldOpArr);
            });
            countArr.push(x[0]);
          });
          this.setState({
            FieldXArr:this.filterArr,
            FieldOpArr:countArr
          });
        }
        break;
      default:
          // this.setState({
          //   FieldXArr:this.state.FieldXArr,
          //   FieldYArr:this.state.FieldYArr
          // });
        // code block
    }
  }

  public render(): React.ReactElement<ILineChartsProps> {
    let yaxisdata;
    if(this.state.OperationType == "Count")
    {
      yaxisdata = this.state.FieldYArr;
    }
    else
    {
      yaxisdata = this.state.FieldOpArr;
    }
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
            yaxisdata
        }//,
        // {
        //   label: this.state.Label,
        //   fill: this.state.FillChart,
        //   backgroundColor: "rgba(100, 99, 100, 0.2)",
        //   borderColor: "rgb(100, 99, 100)",
        //   //lineTension: 0,
        //   data:
        //     this.state.FieldYArr
        // }  
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