import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './home.css';

class Home extends Component {
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
                    <h3 className='home-content-text'>Infinity Investements provides portfolio diversity and agressive growth through automated robotic trading algorithms.</h3>
                    <h3 className='home-content-text'>Take a look at our <Link className='home-content-link' to="/performance"> performance results </Link> to see what automated trading can do for you!</h3>
                </div>
            </div>
        )
    }
}

export default Home