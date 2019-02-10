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
        // const node = this.node
        // let width = window.innerWidth;
        // let height = window.innerHeight - 50;


        // 2. Use the margin convention practice 
        var margin = {top: 50, right: 50, bottom: 50, left: 50}
        , width = ((window.innerWidth -200) - margin.left - margin.right) // Use the window's width 
        , height = ((window.innerHeight  / 3) - 50); // Use the window's height

        // The number of datapoints
        let n = my2017GrowthData.length

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .domain([0, n-1]) // input
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
            .domain([0, 10]) // input 
            .range([height, 0]); // output

        // 7. d3's line generator
        var line = d3.line()
            .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
            .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        var dataset = my2017GrowthData

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
            .datum(dataset) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        // svg.selectAll(".dot")
        //     .data(dataset)
        // .enter().append("circle") // Uses the enter().append() method
        //     .attr("class", "dot") // Assign a class for styling
        //     .attr("cx", function(d, i) { return xScale(i) })
        //     .attr("cy", function(d) { return yScale(d.y) })
        //     .attr("r", 5)
        //     .on("mouseover", function(a, b, c) { 
        //             console.log(a) 
        //         this.attr('class', 'focus')
        //         })
        //     .on("mouseout", function() {  })
        //       .on("mousemove", mousemove);

        //   var focus = svg.append("g")
        //       .attr("class", "focus")
        //       .style("display", "none");

        //   focus.append("circle")
        //       .attr("r", 4.5);

        //   focus.append("text")
        //       .attr("x", 9)
        //       .attr("dy", ".35em");

        //   svg.append("rect")
        //       .attr("class", "overlay")
        //       .attr("width", width)
        //       .attr("height", height)
        //       .on("mouseover", function() { focus.style("display", null); })
        //       .on("mouseout", function() { focus.style("display", "none"); })
        //       .on("mousemove", mousemove);
        
        //   function mousemove() {
        //     var x0 = x.invert(d3.mouse(this)[0]),
        //         i = bisectDate(data, x0, 1),
        //         d0 = data[i - 1],
        //         d1 = data[i],
        //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
        //     focus.select("text").text(d);
        //   }
    }

    render(){
        return(
            <div className='chart-wrapper'>
                {/* <svg className='chart-con' ref={node => this.node = node} style={{width: window.innerWidth -55}}></svg> */}
            </div> 
        )
    }
}

export default withTradeHistory(Growth2017Chart)