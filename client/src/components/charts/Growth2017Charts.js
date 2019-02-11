import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";
import './Growth2017ChartStyles.css'

class Growth2017Chart extends Component {
    constructor(props){
        super(props)
        this.state = {
            daily2017Growth: []
        }
    }
    
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        let total2017Growth = nextProps.daily2017Gains 
        if (total2017Growth.length > 0){
            this.setState({daily2017Growth: total2017Growth} , () => this.draw2017GrowthChart())
        }
    }

    draw2017GrowthChart = () => {
        let my2017GrowthData = this.state.daily2017Growth
        
        // console.log('chart rendered')
        const node = this.node
        // let width = window.innerWidth;
        // let height = window.innerHeight - 50;


        // 2. Use the margin convention practice 
        var margin = {top: 20, right: 50, bottom: 50, left: 200}
        , width = ((window.innerWidth - 50) - margin.left - margin.right) // Use the window's width 
        , height = ((window.innerHeight  / 2) - 50); // Use the window's height

        // The number of datapoints
        let n = my2017GrowthData.length

        let bisectDate = d3.bisector(function(d) { return d; }).left;

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .domain([0, n-1]) // input
            .range([0, width]); // output

        // 6. Y scale  
        var yScale = d3.scaleLinear()
            .domain([0, 10]) // input 
            .range([height, 0]); // output

        // 7. d3's line generator
        var line = d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        var dataset = my2017GrowthData

        // 1. Add the chart to the page via the SVG node and employ #2
        //var svg = d3.select("body").append("svg")
        let chart = d3.select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        


        // 3. Call the x axis in a group tag
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        chart.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        chart.append("path")
            .datum(dataset) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 
        
        chart.append("text")      // text label for the x axis
            .attr("x", (window.innerWidth / 2 - 150 ) )
            .attr("y", (window.innerHeight / 2 - 10 ) )
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .style("text-anchor", "middle")
            .text("Trades Taken");

        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 150)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .attr("font-size", "18px")
            .attr("font-weight", "bold")
            .style("text-anchor", "middle")
            .text("Growth in %");

            ////////////////////////////////////////////////////
        var focus = chart.append("g")                                // **********
            .style("display", "none");   

            // append the circle at the intersection               // **********
        focus.append("circle")                                 // **********
            .attr("class", "y")                                // **********
            .style("fill", "blue")                             // **********
            .style("stroke", "blue")                           // **********
            .attr("r", 4);   
            
        

            // append the rectangle to capture mouse               // **********
        chart.append("rect")                                     // **********
            .attr("width", width)                              // **********
            .attr("height", height)                            // **********
            .style("fill", "none")                             // **********
            .style("pointer-events", "all")                    // **********
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);                       // **********

        function mousemove() {   
            var mouse = d3.mouse(this);
            var mouseDate = xScale.invert(mouse[0]);
            var mouseY = yScale.invert(mouse[1]);
            let mouseTrade = Math.floor(mouseDate);

            // var y0 = y.invert(d3.mouse(this)[1]);

            var x0 = x.invert(d3.mouse(this)[0]),  
            
            i = findIndexValue(dataset, mouseTrade )            
            
            function findIndexValue(d, m){
                let yScalePoint = d[m].y
                let moveDecimal = yScalePoint/10
                return moveDecimal
            }

            focus.select("circle.y")                           
                .attr("transform",                             
                    "translate(" + x(x0) + "," + y(i) + ")");  
                    
            focus.append("text")
                .attr("transform",                             
                "translate(" + x(x0) + "," + y(i+.1) + ")")
                    .attr("dy", "1em")
                    //.attr('id',  mouseTrade)
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .text("Growth in %");
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

export default withTradeHistory(Growth2017Chart)