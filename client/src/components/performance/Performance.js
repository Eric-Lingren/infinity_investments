import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import {withTradeHistory} from '../../context/tradeHistoryProvider';
import './performance.css';
import PairsTradeQuantityChart from '../pairsTradeQuantityChart/pairsTradeQuantityChart';
import TotalTradeQuantityChart from '../totalTradeQuantityChart/totalTradeQuantityChart';
import All2019TradesCountChart from '../charts/All2019TradesCountChart';
import All2018TradesCountChart from '../charts/All2018TradesCountChart';
import All2017TradesCountChart from '../charts/All2017TradesCountChart';
import RightArrow from './right-arrow-blue.svg';
import LeftArrow from './left-arrow-blue.svg';
import TweenLite from 'gsap';
import Growth2017Charts from '../charts/Growth2017Charts';
import Growth2018Chart from '../charts/Growth2018Chart';
import Growth2019Chart from '../charts/Growth2019Chart';
import GrowthAllTradesChart from '../charts/GrowthAllTradesChart';

class Performance extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuIsClosed: true,
            whichChartToShow: 'TotalTradeQuantityChart',
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

    resetBubbleChartstoStart = (e) => {
        //this.props.resetChartToDefault()

        switch (e.target.id){
            case '2019Totals':
                this.setState({whichChartToShow: 'All2019TradesCountChart'})
            break;
            case '2018Totals':
                this.setState({whichChartToShow: 'All2018TradesCountChart'})
            break;
            case '2017Totals':
                this.setState({whichChartToShow: 'All2017TradesCountChart'})
            break;
            default: 
                this.setState({whichChartToShow: 'TotalTradeQuantityChart'})
        }
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className='page-wrapper'>
                    <div className='filter-options-container' id='sideMenu'>
                        <button id='allTotals' className='reset-data-button' onClick={this.resetBubbleChartstoStart}>Totals</button>
                        <button id='2019Totals' className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2019</button>
                        <button id='2018Totals' className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2018</button>
                        <button id='2017Totals' className='reset-data-button' onClick={this.resetBubbleChartstoStart}>2017</button>
                    </div>
                    <div className='menu-with-arrow' id='arrowMenu'>
                        {
                            this.state.menuIsClosed 
                            ?
                            <img src={RightArrow} id='rightArrow' className='arrow' alt='arrow-icon' onClick={this.toggleMenu}></img>
                            :
                            <img src={LeftArrow} className='arrow' alt='arrow-icon' onClick={this.toggleMenu}></img>
                        } 
                    </div>
                    <div className='chart-wrapper' id='chartWrapper'>
                    { this.state.whichChartToShow === 'TotalTradeQuantityChart' ?   <div className='someWrapper'>             
                                                                                        <GrowthAllTradesChart /> 
                                                                                        <TotalTradeQuantityChart />
                                                                                    </div> : null }
                    {/* { !this.props.showBubbleChartCurrencyQuantity ? <PairsTradeQuantityChart />   : null } */}
                    { this.state.whichChartToShow === 'All2019TradesCountChart' ?   <div className='someWrapper'>
                                                                                        <Growth2019Chart />          
                                                                                        <All2019TradesCountChart /> 
                                                                                    </div> : null }    
                    { this.state.whichChartToShow === 'All2018TradesCountChart' ?   <div className='someWrapper'>
                                                                                        <Growth2018Chart />          
                                                                                        <All2018TradesCountChart /> 
                                                                                    </div> : null }    
                    { this.state.whichChartToShow === 'All2017TradesCountChart' ?   <div className='someWrapper'>
                                                                                        <Growth2017Charts /> 
                                                                                        <All2017TradesCountChart /> 
                                                                                        
                                                                                    </div> : null }    
                                                                                    
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default withTradeHistory(Performance)