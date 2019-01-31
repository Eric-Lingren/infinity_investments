import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";

class BubbleChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            testData: [100]
        }
    }
    
    componentDidMount(){
        this.props.getTrades()
    }


    draw = () => {
        console.log(this.props.totalTrades)
        const node = this.node
        let width = 1200;
        let height = 500;

        let chart = d3.select(node)
            .attr('height', height)
            .attr('width', width)
            .attr('transform', 'translate(0,0)')

        var radiusScale = d3.scaleSqrt().domain([1, 100]).range([20, 160])

        let simulation = d3.forceSimulation()
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .force('collide', d3.forceCollide(function(d){
                return radiusScale(d.total + 1)
            }))

        //function ready (error, datapoints) {

        

        let circles = chart.selectAll('circle')
            .data(this.state.testData)
            .enter().append('circle')
            //.attr('class', '.tradePairs')
            .attr('r', function(d){
                return radiusScale(d)
            })
            .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",60%,50%)";
                })
            .on('click', function(d){
                console.log(d)
            })
            .on('mouseover', function(d){
                //console.log(this)
            })

        // var text = chart.selectAll("text")
        //     .data(this.props.totalTrades)
        //     .enter()
        //     .append("text");


        // var textLabels = text
        //     .text( function (d) { return `hi`; })
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "20px")
        //     .attr("font-weight", "bold")
        //     .attr('font-size', 15)

        simulation.nodes(this.props.symbolsTradesCount)
            .on('tick', ticked)

        function ticked(){
            circles
                .attr('cx', function(d){
                    return d.x
                })
                .attr('cy', function(d){
                    return d.y
                })
            // textLabels
            //     .attr('x', function(d){
            //         return d.x - 30
            //     })
            //     .attr('y', function(d){
            //         return d.y + 5
            //     })
        }
    }

    render(){
        this.draw()
        console.log(this.props.totalTrades)
        return(
            <div>
                <div >
                    <svg className='chart-container' ref={node => this.node = node} width={this.state.width} height={this.state.height}></svg>
                </div>
            </div>
        )
    }

}

export default withTradeHistory(BubbleChart)