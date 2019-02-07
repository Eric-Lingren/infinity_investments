import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {


    render(){
        return(
            <div className='navbar-wrapper'>
                <NavLink className='navbarTextLink' exact to="/"> Home </NavLink>
                <NavLink className='navbarTextLink' to="/about"> About </NavLink>
                <NavLink className='navbarTextLink' to="/performance"> Performance </NavLink>
                <NavLink className='navbarTextLink' to="/contact"> Contact </NavLink>
            </div>
        )
    }

}

export default Navbar