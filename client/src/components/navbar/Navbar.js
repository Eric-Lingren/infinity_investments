import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {


    render(){
        return(
            <div className='navbar-wrapper'>
                <Link className='navbarTextLink' to="/"> Home </Link>
                <Link className='navbarTextLink' to="/about"> About </Link>
                <Link className='navbarTextLink' to="/performance"> Performance </Link>
                <Link className='navbarTextLink' to="/contact"> Contact </Link>
            </div>
        )
    }

}

export default Navbar