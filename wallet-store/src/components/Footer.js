import React from 'react';

export default function Footer() {
    
    return (
        <div className='footer-container'>
            <div className='footer-section'>
                <p>pages</p>
            </div>

            <div className='footer-section'>
                <p>Get in touch</p>
            </div>
            
            <div className='footer-section'>
                <p>Join our newsletter</p>
                <p>Learn about new products, deals and more.</p>
                <input placeholder='Email'/>
            </div>

        </div>
    )
}