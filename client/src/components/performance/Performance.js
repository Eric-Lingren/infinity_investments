import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import './performance.css';
import PairsTradeQuantityChart from '../pairsTradeQuantityChart/pairsTradeQuantityChart'
import TotalTradeQuantityChart from '../totalTradeQuantityChart/totalTradeQuantityChart'

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    
    componentDidMount(){
        
    }

    resetBubbleChartstoStart = () => {
        this.props.resetChartToDefault()
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className='reset-data-button-container'>
                    <button className='reset-data-button' onClick={this.resetBubbleChartstoStart}>Reset Data</button>
                </div>
                { this.props.showBubbleChartCurrencyQuantity 
                ? 
                    <PairsTradeQuantityChart /> 
                :
                    <TotalTradeQuantityChart /> 
                } 
            </div>
        )
    }
}

export default withTradeHistory(Performance)