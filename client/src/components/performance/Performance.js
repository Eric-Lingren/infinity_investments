import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import './performance.css';
import PairsTradeQuantityChart from '../pairsTradeQuantityChart/pairsTradeQuantityChart'
import TotalTradeQuantityChart from '../totalTradeQuantityChart/totalTradeQuantityChart'
import RightArrow from './right-arrow-blue.svg'
import LeftArrow from './left-arrow-blue.svg'

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuIsClosed: true,
        }
    }
    
    componentDidMount(){
        
    }

    componentWillUnmount(){
        this.props.resetChartToDefault()
    }

    toggleMenu = () => {
        let sideMenu = document.getElementById('sideMenu')
        let chartWrapper = document.getElementById('chartWrapper')

        if(this.state.menuIsClosed){
            this.setState({menuIsClosed: false})
            sideMenu.style.marginLeft = '0px'
            
            
        } else {
            this.setState({menuIsClosed: true})
            sideMenu.style.marginLeft = '-145px'
            //chartWrapper.style.marginLeft = '-150px'
        }
        //document.getElementById('sideMenu')
    }

    resetBubbleChartstoStart = () => {
        this.props.resetChartToDefault()
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className='page-wrapper'>
                    <div className='filter-options-container' id='sideMenu'>
                        <button className='reset-data-button' onClick={this.resetBubbleChartstoStart}>Totals</button>
                        <button className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2017</button>
                        <button className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2018</button>
                        <button className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2019</button>
                    </div>
                    <div className='menu-with-open-button'>
                        {
                            this.state.menuIsClosed 
                            ?
                            <img src={RightArrow} className='arrow' alt='arrow-icon' onClick={this.toggleMenu}></img>
                            :
                            <img src={LeftArrow} className='arrow' alt='arrow-icon' onClick={this.toggleMenu}></img>
                        } 
                    </div>
                    <div className='chart-wrapper' id='chartWrapper'>
                        { this.props.showBubbleChartCurrencyQuantity 
                        ? 
                            <PairsTradeQuantityChart /> 
                        :
                            <TotalTradeQuantityChart /> 
                        } 
                    </div>
                </div>
            </div>
        )
    }
}

export default withTradeHistory(Performance)