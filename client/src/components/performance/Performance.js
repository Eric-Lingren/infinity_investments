import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import * as d3 from "d3"
import './performance.css'

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [{'one' : 30}, {'one' : 86}, 168, 281, 303, 365 ]
        }
    }
    
    componentDidMount(){
        this.props.getTrades()
        
    }



    draw = () => {
        d3.select('.chart')
        .selectAll("div")
        .data(this.state.data)
            .enter()
            .append("div")
            .style("width", function(d) { return d.one + "px"; })
            .text(function(d) { return d.one; });
    }

    render(){
        //console.log(this.props.trades)
        this.draw()

        return(
            <div>
                <Navbar />
                this is the Performance Page
                <div className='chart'></div>
            </div>
        )
    }

}

export default withTradeHistory(Performance)