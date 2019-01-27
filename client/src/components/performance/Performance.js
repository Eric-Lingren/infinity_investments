import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
// import axios from 'axios'

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    componentDidMount(){
        this.props.getTrades()
    }


    render(){
        console.log(this.props.trades)
        return(
            <div>
                <Navbar />
                this is the Performance Page
            </div>
        )
    }

}

export default withTradeHistory(Performance)