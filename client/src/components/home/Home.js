import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './home.css';
import {withTradeHistory} from '../../context/tradeHistoryProvider';

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div className='home-page-wrapper'>
                <Navbar />
                <div className='homepage-background'>
                    <div className='title-container'>
                        <h1 className='title-header'>Infinity Investements</h1>
                        <h2 className='subtitle-header'>Taking Your Forex Potential Further</h2>
                    </div>
                </div>
                <div className='home-content-container'>
                    <h3 className='home-content-text'>Infinity Investments provides portfolio diversity and aggressive growth through automated robotic trading algorithms.</h3>
                    <h3 className='home-content-text'>We have nearly 2 years of verifiable data with over 1200 trades being executed. </h3>
                    <h3 className='home-content-text'>Take a look at our <Link className='home-content-link' to="/performance"> performance results</Link> to see what automated trading can do for you!</h3>
                </div>
            </div>
        )
    }
}

export default withTradeHistory(Home)