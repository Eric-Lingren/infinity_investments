import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";
import './bubbleChart.css'

class BubbleChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [1,2,3]
        }
    }
    
    componentDidMount(){
        this.props.getTrades()
    }


    draw = () => {
        const node = this.node
        let width = 1200;
        let height = 500;

        let chart = d3.select(node)
            //.append('svg')
            .attr('height', height)
            .attr('width', width)
            //.append('g')
            .attr('transform', 'translate(0,0)')

        var radiusScale = d3.scaleSqrt().domain([1, 50]).range([10, 80])

        let simulation = d3.forceSimulation()
            .force('x', d3.forceX(width / 2).strength(0.05))
            .force('y', d3.forceY(height / 2).strength(0.05))
            .force('collide', d3.forceCollide(45))

        //function ready (error, datapoints) {

        let circles = chart.selectAll('circle')
            .data(this.props.symbolsTradesCount)
            .enter().append('circle')
            .attr('class', '.tradePairs')
            .attr('r', function(d){
                return radiusScale(d.total)
            })
            .attr('fill', 'lightblue')

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
        }
        // }
        // ready()
    }

    render(){
        this.draw()

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