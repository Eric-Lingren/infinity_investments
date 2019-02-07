import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";
import './BubbleChartCurrencyQuantity.css'

class pairsTradeQuantityChart extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    
    componentDidMount(){
        Promise.resolve(this.props.getTrades()).then(res =>{
            //this.drawPairsTradeQuantityChart()
        })
    }

    componentWillUnmount(){
        this.props.resetChartToDefault()
    }
    // shouldComponentUpdate(nextProps){
    //     if(nextProps.symbolsTradesCount >= 100){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    drawPairsTradeQuantityChart = () => {
        const node = this.node
        let width = window.innerWidth;
        let height = window.innerHeight -50;

        let chart = d3.select(node)
            .attr('height', height)
            .attr('width', width)
            .attr('transform', 'translate(0,0)')

        var radiusScale = d3.scaleSqrt().domain([1, 100]).range([20, 160])

        let simulation = d3.forceSimulation()
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .force('collide', d3.forceCollide(function(d){
                return radiusScale((d.total / 2) -1 )
            }))

        let circles = chart.selectAll('circle')
            .data(this.props.symbolsTradesCount)
            .enter().append('circle')
            .attr('class', '.tradePairs')
            .attr('r', function(d){
                return radiusScale(d.total)
            })
            .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",50%,60%)";
                })
            .on('click', function(d){
                console.log(d)
            })
            .on('mouseover', function(d){
                d3.select(this)
                .transition()
                .attr('r', function(d){
                    return radiusScale(d.total *.4)
                })
                d3.select(this).style("cursor", "pointer"); 

            })
            .on('mouseout', function(d){
                d3.select(this)
                .transition()
                .attr('r', function(d){
                    return radiusScale(d.total *.32)
                })
            })

        var text = chart.selectAll("text")
            .data(this.props.symbolsTradesCount)
            .enter()
            .append("text");


        var textLabels = text
            .text( function (d) { return `${d.symbol}: ${d.total}`; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("font-weight", "bold")
            .attr('font-size', 15)

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
            textLabels
                .attr('x', function(d){
                    return d.x - 40
                })
                .attr('y', function(d){
                    return d.y + 5
                })
        }
    }

    render(){
        console.log("WTF - How Many Renders????")
        this.drawPairsTradeQuantityChart()
        return(
            <div>
                <div >
                    <svg className='chart-container' ref={node => this.node = node} width={this.state.width} height={this.state.height}></svg>
                </div>
            </div>
        )
    }

}

export default withTradeHistory(pairsTradeQuantityChart)