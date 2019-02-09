import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import {withTradeData} from '../../context/tradeDataProvider';
import * as d3 from "d3";
import './totalTradeQuantityChart.css'

class TotalTradeQuantityChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            //totalTradesTaken: [1368]
        }
    }
    
    componentDidMount(){
        console.log(this.props.totalTradesTaken)
        // Promise.resolve(this.props.getTrades()).then(res =>{
        //     this.drawTotalTradeQuantityChart()
        // })
        this.setState({})
        this.drawTotalTradeQuantityChart(this.props, this.props.totalTradesTaken)

    }

    drawTotalTradeQuantityChart = (props, props2) => {
        console.log(props2)
        //let myProps =  this.props
        const node = this.node
        let width = window.innerWidth;
        let height = window.innerHeight - 50;

        let chart = d3.select(node)
            .attr('height', height)
            .attr('width', width)
            .attr('transform', 'translate(0,0)')

        var radiusScale = d3.scaleSqrt().domain([1, 250]).range([20, 70])
        var radiusScale2 = d3.scaleSqrt().domain([1, 200]).range([20, 70]) 

        let simulation = d3.forceSimulation()
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .force('collide', d3.forceCollide(function(d){
                return radiusScale(d.total)
            }))


        let circles = chart.selectAll('circle')
            .data(props2)
            .enter().append('circle')
            .attr('r', function(d){
                return radiusScale(d)
            })
            .style("fill",function() {
                return "hsl(" + Math.random() * 360 + ",60%,50%)";
                })
            .on('click', function(d){
                //myProps.toggleChartFromTotalTradesToCurrencyTotals()
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
            .data(props2)
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
            <div className='chart-wrapper' 
            // style={{width: '500px'}} 
            >
                <svg className='chart-container' ref={node => this.node = node} style={{width: window.innerWidth -55}}></svg>
                
            </div>
        )
    }

}

export default withTradeHistory(withTradeData(TotalTradeQuantityChart))