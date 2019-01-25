import React, { Component } from 'react';
import Navbar from '../navbar/Navbar'
import './home.css'

class Home extends Component {


    render(){
        return(
            <div className='home-page-wrapper'>
                <Navbar />
                <div className='homepage-background'></div>
            </div>
        )
    }

}

export default Home