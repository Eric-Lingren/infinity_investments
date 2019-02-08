import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import './performance.css';
import PairsTradeQuantityChart from '../pairsTradeQuantityChart/pairsTradeQuantityChart';
import TotalTradeQuantityChart from '../totalTradeQuantityChart/totalTradeQuantityChart';
import RightArrow from './right-arrow-blue.svg';
import LeftArrow from './left-arrow-blue.svg';
import TweenLite from 'gsap';

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
        let arrowMenu = document.getElementById('arrowMenu')

        if(this.state.menuIsClosed){
            this.setState({menuIsClosed: false})
            TweenLite.to( sideMenu, .6, {x: 145})
            TweenLite.to( arrowMenu, .6, {x: 145})
            
            
        } else {
            this.setState({menuIsClosed: true})
            TweenLite.to( sideMenu, .6, {x: 0})
            TweenLite.to( arrowMenu, .6, {x: 0})
        }
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
                    <div className='menu-with-arrow' id='arrowMenu'>
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