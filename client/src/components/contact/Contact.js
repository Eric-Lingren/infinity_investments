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
            if (response.data.msg === 'success'){
                console.log(response)
                alert("Message Sent."); 
                this.resetForm()
            } else if (response.data.msg === 'fail'){
                console.log(response)
                alert("Message failed to send.")
            }
        })
        .catch(err => console.log(err.response.data.errMsg))

        
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