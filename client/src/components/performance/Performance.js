import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
//import * as d3 from "d3";
import './performance.css';
import BubbleChartCurrencyQuantity from '../BubbleChartCurrencyQuantity/BubbleChartCurrencyQuantity'
import BubbleChartTotalTrades from '../BubbleChartTotalTrades/BubbleChartTotalTrades'

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {
            //data: [{'one' : 30}, {'one' : 86}, 168, 281, 303, 365 ]
        }
    }
    
    componentDidMount(){
        //this.props.getTrades()
        
    }



    //draw = () => {
        

        // var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
        // // var dataset = this.props.symbolsTradesCount;

        // var svgWidth = 500, svgHeight = 300, barPadding = 5;
        // var barWidth = (svgWidth / dataset.length);

        // var svg = d3.select('svg')
        //     .attr("width", svgWidth)
        //     .attr("height", svgHeight);

        // var xScale = d3.scaleLinear()
        //     .domain([0, d3.max(dataset)])
        //     .range([0, svgWidth]);

        // var yScale = d3.scaleLinear()
        //     .domain([0, d3.max(dataset)])
        //     .range([0, svgHeight - 20]);

        // var x_axis = d3.axisBottom().scale(xScale);
        // var y_axis = d3.axisLeft().scale(yScale);

        // svg.append("g")
        //     .attr("transform", "translate(50, 10)")
        //     .call(y_axis);

        // var xAxisTranslate = svgHeight - 20;

        // svg.append("g")
        //     .attr("transform", "translate(50, " + xAxisTranslate  +")")
        //     .call(x_axis);

        // var barChart = svg.selectAll("rect")
        //     .data(dataset)
        //     .enter()
        //     .append("rect")
        //     .attr("y", function(d) {
        //         return svgHeight - yScale(d) 
        //     })
        //     .attr("height", function(d) { 
        //         return yScale(d); 
        //     })
        //     .attr("color", "blue")
        //     .attr("width", barWidth - barPadding)
        //     .attr("transform", function (d, i) {
        //         var translate = [barWidth * i, 0]; 
        //         return "translate("+ translate +")";
        //     })
        
        // var text = svg.selectAll("text")
        //     .data(dataset)
        //     .enter()
        //     .append("text")
        //     .text(function(d) {
        //         return d;
        //     })
        //     .attr("y", function(d, i) {
        //         return svgHeight - yScale(d) - 5;
        //     })
        //     .attr("x", function(d, i) {
        //         return barWidth * i;
        //     })
        //     .attr("fill", "#A64C38");


    //     var data = this.props.symbolsTradesCount

    //     var svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;
    //     var svg = d3.select('svg')
    //         .attr("width", svgWidth)
    //         .attr("height", svgHeight);

    //     //Create group element to hold pie chart    
    //     var g = svg.append("g")
    //         .attr("transform", "translate(" + radius + "," + radius + ")") ;

    //     var color = d3.scaleOrdinal(d3.schemeCategory10);

    //     var pie = d3.pie().value(function(d) { 
    //         return d.total; 
    //     });

    //     var path = d3.arc()
    //         .outerRadius(radius)
    //         .innerRadius(0);
        
    //     var arc = g.selectAll("arc")
    //         .data(pie(data))
    //         .enter()
    //         .append("g");

    //     arc.append("path")
    //         .attr("d", path)
    //         .attr("fill", function(d) { return color(d.data.total); });
                
    //     var label = d3.arc()
    //         .outerRadius(radius)
    //         .innerRadius(0);
                    
    //     arc.append("text")
    //         .attr("transform", function(d) { 
    //             return "translate(" + label.centroid(d) + ")"; 
    //         })
    //         .attr("text-anchor", "middle")
    //         .text(function(d) { return d.data.symbol+":"+d.data.total; });

    // }

    render(){
        //console.log(this.props.trades)
        //this.draw()

        return(
            <div>
                <Navbar />
                {/* <h1>Lets put a chart here</h1> */}
                {/* <div className='chart'></div> */}
                {/* <svg className='svg-container' width='800' height='300'></svg> */}
                {/* <BubbleChartCurrencyQuantity /> */}
                <BubbleChartTotalTrades />
            </div>
        )
    }

}

export default withTradeHistory(Performance)