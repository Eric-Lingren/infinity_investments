import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './contact.css';
import axios from 'axios';

class Contact extends Component {
    constructor(){
        super()
        this.state = {
            test: true
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        let data = {
            name: name,   
            email: email,  
            subject: subject,
            messsage: message
        }
        
        axios.post(`/sendEmail`, data).then(response => {
            if (response.status === 200){
                alert("Message Sent."); 
                document.getElementById('name').value = ''
                document.getElementById('email').value = ''
                document.getElementById('subject').value = ''
                document.getElementById('message').value = ''
            } else {
                alert("Message failed to send. \n Please try again.")
            }
        })
        .catch(err => console.log(err))
    }


    render(){
        return(
            <div>
                <Navbar />
                <div className='form-container'>
                    <form   name='contactForm' 
                            className='contact-form'
                            onSubmit={this.handleSubmit}>
                        <input  type='text' 
                                id='name'
                                name='nameInput' 
                                className='single-line-input-field'
                                placeholder='Name' 
                                required>
                        </input>
                        <input  type='email' 
                                id='email'
                                name='emailInput' 
                                className='single-line-input-field'
                                placeholder='Email' 
                                required>
                        </input>
                        <input  type='text' 
                                name='subjectInput' 
                                id='subject'
                                className='single-line-input-field'
                                placeholder='Subject' 
                                required>
                        </input>
                        <textarea 
                            name='messageInput' 
                            id='message'
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