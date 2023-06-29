import React from 'react';
import Footer from './Footer';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai'

export default function ContactUsPage(props){
    return (
        <div className='contact-page'>
            {props.Menu}
            <div className='contact-content'>
                <div className='contact-section'>
                    <h1>Contact Us</h1>
                    <p>Looking for help with a Drei product, Recent order or any other assistance?<br/><br/> Our dedicated team will get back you as soon as possible.</p>                    
                </div>
                
                <div className='contact-section contact-middle'>
                    <h2>Our Information</h2>
                    <p><AiOutlinePhone className='contact-icon' color='var(--main-blue)'/> 954.440.5840</p>
                    <p><AiOutlineMail className='contact-icon' color='var(--main-blue)'/> example.email@drei.com</p>
                </div>

                <div className='contact-section'>
                    <h2>Need Help?</h2>
                    <p>You're in the right place. Fill out the form with as much information so that we can better assist you.</p>
                    <ContactForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function ContactForm(){
    return (
        <form className='contact-form' style={{display: 'grid'}}>
            <input placeholder='First Name'/>
            <input placeholder='Last Name'/>
            <input placeholder='Email'/>
            <input placeholder='Phone'/>
            <textarea placeholder='Message'/>
            <button>Send Message</button>
        </form>
    )
}