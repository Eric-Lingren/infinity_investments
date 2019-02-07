import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './contact.css';

class Contact extends Component {

    render(){
        return(
            <div>
                <Navbar />
                <div className='form-container'>
                    <form name='contactForm' className='contact-form'>
                        <input  type='text' 
                                name='nameInput' 
                                className='single-line-input-field'
                                placeholder='Name' 
                                required>
                        </input>
                        <input  type='email' 
                            name='emailInput' 
                            className='single-line-input-field'
                            placeholder='Email' 
                            required>
                        </input>
                        <input  type='text' 
                            name='subjectInput' 
                            className='single-line-input-field'
                            placeholder='Subject' 
                            required>
                        </input>
                        <textarea 
                            name='messageInput' 
                            className='multi-line-input-field'
                            placeholder='Enter your comment or message here' 
                            required>
                        </textarea>
                        <div className='button-container'>
                            <button 
                                name='submitFormButton'
                                className='submit-form-button'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default Contact