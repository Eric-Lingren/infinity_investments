import React, { Component } from 'react';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3";

class BubbleChart extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    
    componentDidMount(){
        this.props.getTrades()
    }


    draw = () => {
        let width = 500;
        let height = 500;

        let svg = d3.select('#chart')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .append('g')
            .attr('transform', 'translate(0,0)')

        // function ready ( error, datapoints) {
            let circles = svg.selectAll('.tradePairs')
                .data(this.props.symbolsTradesCount)
                .enter().append('circle')
                .attr('class', '.tradePairs')
                .attr('r', 10)
                .attr('fill', 'lightblue')
        //}
    }

    render(){
        this.draw()

        return(
            <div>
                <h1>Bubble Chart Here</h1>
                <div id='chart'></div>
            </div>
        )
    }

}

export default withTradeHistory(BubbleChart)