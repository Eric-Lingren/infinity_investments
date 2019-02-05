import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";

class TotalTradeQuantityChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            testData: [154]
        }
    }
    
    componentDidMount(){
        Promise.resolve(this.props.getTrades()).then(res =>{
            this.drawTotalTradeQuantityChart()
        })
    }

    drawTotalTradeQuantityChart = (props) => {
        const myProps =  this.props
        const node = this.node
        let width = window.innerWidth;
        let height = window.innerHeight - 50;

        let chart = d3.select(node)
            .attr('height', height)
            .attr('width', width)
            .attr('transform', 'translate(0,0)')

        var radiusScale = d3.scaleSqrt().domain([1, 100]).range([20, 100])
        var radiusScale2 = d3.scaleSqrt().domain([1, 100]).range([20, 110]) 

        let simulation = d3.forceSimulation()
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .force('collide', d3.forceCollide(function(d){
                return radiusScale(d.total)
            }))


        let circles = chart.selectAll('circle')
            .data(this.state.testData)
            .enter().append('circle')
            .attr('r', function(d){
                return radiusScale(d)
            })
            .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",60%,50%)";
                })
            .on('click', function(d){
                myProps.toggleChartFromTotalTradesToCurrencyTotals()
            })
            .on('mouseover', function(d){
                d3.select(this)
                .transition()
                .attr('r', radiusScale2);
                d3.select(this).style("cursor", "pointer"); 
            })
            .on('mouseout', function(d){
                d3.select(this)
                .transition()
                .attr('r', radiusScale);
            })

        var text = chart.selectAll("text")
            .data(this.state.testData)
            .enter()
            .append("text");

        var textLabels = text
            .text( function (d) {return `Total Trades: ${d}`})
            .attr("font-family", "sans-serif")
            .attr("font-size", "25px")
            .attr("font-weight", "bold")

        simulation.nodes(this.props.symbolsTradesCount)
            .on('tick', ticked)

        function ticked(){
            circles
                .attr('cx', function(d){
                    return width / 2
                })
                .attr('cy', function(d){
                    return height / 2
                })
            textLabels
                .attr('x', function(d){
                    return ((width / 2) - 100)
                })
                .attr('y', function(d){
                    return  ((height / 2) + 12)
                })
        }
    }

    render(){
        //this.draw()
        return(
            <div>
                <div >
                    <svg className='chart-container' ref={node => this.node = node} width={this.state.width} height={this.state.height}></svg>
                </div>
            </div>
        )
    }

}

export default withTradeHistory(TotalTradeQuantityChart)