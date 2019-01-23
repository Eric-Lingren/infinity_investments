import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return(
            <div>
                <Navbar />
                this is the Performance Page
            </div>
        )
    }

}

export default withTradeHistory(Performance)