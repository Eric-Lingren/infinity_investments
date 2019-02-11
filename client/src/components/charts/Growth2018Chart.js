import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";
import './Growth2017ChartStyles.css'

class Growth2018Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            daily2018Growth: []
        }
    }
    
    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
        let total2018Growth = nextProps.daily2018Gains 
        if (total2018Growth.length > 0){
            //console.log(nextProps.daily2018Gains)
            this.setState({daily2018Growth: total2018Growth} , () => this.draw2018GrowthChart())
        }
    }

    draw2018GrowthChart = () => {
        let my2018GrowthData = this.state.daily2018Growth
        const node = this.node

        // Use the margin convention practice 
        var margin =    {top: 20, right: 0, bottom: 50, left: 200}
                        , width = ((window.innerWidth - 120) - margin.left) 
                        , height = ((window.innerHeight  / 2) - 50);    

        // The number of datapoints
        let n = my2018GrowthData.length

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .domain([0, n-1])                           // input
            .range([0, width]);                         // output

        // Y scale  
        var yScale = d3.scaleLinear()
            .domain([0, 50])                            // input 
            .range([height, 0]);                        // output

        // d3's line generator
        var line = d3.line()
            .x(function(d, i) { return xScale(i); })    // set the x values for the line generator
            .y(function(d) { return yScale(d.y); })     // set the y values for the line generator 
            .curve(d3.curveMonotoneX)                   // apply smoothing to the line

        var dataset = my2018GrowthData

        // Add the chart to the page via the SVG node
        let chart = d3.select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Call the x axis in a group tag
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));                       // Create an axis component with d3.axisBottom

        // Call the y axis in a group tag
        chart.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));                         // Create an axis component with d3.axisLeft

        // Append the path, bind the data, and call the line generator 
        chart.append("path")
            .datum(dataset)                                     // Binds data to the line 
            .attr("class", "line")                              // Assign a class for styling 
            .attr("d", line);                                   // Calls the line generator 

        // text label for the x axis
        chart.append("text")
            .attr("x", (window.innerWidth / 2 - 150 ) )
            .attr("y", (window.innerHeight / 2 - 10 ) )
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .style("text-anchor", "middle")
            .text("Quantity of Trades Taken");

        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 150)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .style("text-anchor", "middle")
            .text("Account Percent Growth");

        var focus = chart.append("g")
            .style("display", "none");   

        // Append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "blue")
            .style("stroke", "blue")
            .attr("r", 5);   

        // Append the rectangle to capture mouse
        chart.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {   
            focus.select("text").remove()
            var mouse = d3.mouse(this);
            var mouseDate = xScale.invert(mouse[0]);
            let mouseTrade = Math.floor(mouseDate);

            var x0 = x.invert(d3.mouse(this)[0]),  
            i = findIndexValue(dataset, mouseTrade )            
            let yScalePoint;

            function findIndexValue(d, m){
                yScalePoint = d[m].y
                
                let moveDecimal = yScalePoint/50
                return moveDecimal
            }

            yScalePoint = Math.round(yScalePoint * 100) / 100
            focus.select("circle.y")                           
                .attr("transform",                             
                    "translate(" + x(x0) + "," + y(i) + ")");  
                    
            focus.append("text")
                .attr("transform",                             
                "translate(" + x(x0 - .08) + "," + y(i+.1) + ")")
                    .attr("dy", "1em")
                    .attr("font-size", "14px")
                    .attr('class', 'chart-text')
                    .text(`Trade #: ${mouseTrade} - Growth: ${yScalePoint}%`);
        }
    }

    render(){
        return(
            <div className='chart-wrapper'>
                <svg className='chart-con' ref={node => this.node = node} style={{width: window.innerWidth -55}}></svg>
            </div> 
        )
    }
}

export default withTradeHistory(Growth2018Chart)