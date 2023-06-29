import React from 'react';
import Footer from './Footer';
import blenderShot2 from '../walletImages/blenderShot2.png'

// import {TrendingDesignIcon} from './customIcons';
import TrendingDesignIcon from '../customIcons/TrendingDesignIcon';
import CustomerServiceIcon from '../customIcons/CustomerServiceIcon';
import RfidProtectionIcon from '../customIcons/RfidProtectionIcon';
import HighQualityIcon from '../customIcons/HightQualityIcon';
import SaveSpaceIcon from '../customIcons/SaveSpaceIcon';
import LowWeightIcon from '../customIcons/LowWeightIcon';
const blenderShot1 = require('../walletImages/blenderShot2.png');


export default function AboutUs(props){
    return (
        <div className='about-page-container'>
                <div className='menu-wrapper'>
                    {props.Menu}
                </div>


                <div className='about-page-main-content'>

                <div className='about-main-info'>
                    <div className='main-info-left'>
                    <div className='about-header-container'>
                        <h1 style={{fontSize: '2rem', paddingBottom:'1rem', whiteSpace:'nowrap',}}>A <span className='selected-word-blue'>Modern</span> Philosophy</h1>
                    </div>

                        <p> At Drei Wallets, we redefine wallets as style statements,
                                blending modern aesthetics with enduring quality. Our curated collection showcases artisanal designs,
                                reflecting our passion for detail. Elevate your everyday carry with us for sleek, elegant options that last.<br/>
                                <br/>Trust is the foundation of our reputation, and we consistently deliver on our promises.
                                Customer satisfaction drives everything we do. With our hassle-free return policy,
                                    we ensure that if you're not completely satisfied, we'll make it right.
                                    Our secure payment options provide a worry-free shopping experience.
                                    Don't just take our word for it—read the glowing testimonials from our delighted customers who appreciate our exceptional quality and service.<br/>
                                    <br/>Our dedicated team is here to assist you, answer questions, and offer expert advice.
                                    We understand the overwhelming task of finding the perfect wallet, so we provide personalized product recommendations based on your preferences.
                                        Stay updated with exclusive offers and the latest arrivals tailored just for you. We strive to exceed your expectations,
                                        creating a seamless shopping journey where you not only find the perfect wallet but also enjoy an exceptional and personalized experience at every step.
                        </p>                        
                    </div>
            

                    <div className='about-image-wrapper'>
                        <img src={blenderShot2}/>
                    </div>
                </div>

                <div className='why-buy-container'>
                    <h2>6 Reasons, Why <span className='company-name-blue selected-word-blue'>Drei</span></h2>
                    <div className='reasons-why-container'>
                        <div >
                            <TrendingDesignIcon/>
                            <h3>Trending Design</h3>
                            <p>In tune with current times because changes are unstoppable.</p>
                        </div>
                        <div>
                            <CustomerServiceIcon/>
                            <h3>Customer Service</h3>
                            <p>Your opinion is important to us. Thats why we talk with you and take care of your needs.</p>
                        </div>
                        <div>
                            <SaveSpaceIcon />
                            <h3>Space Saver</h3>
                            <p>You didn't forget your wallet, its just that small. Virtually the size of credit card.</p>
                        </div>
                        <div>
                            <RfidProtectionIcon/>
                            <h3>RFID Protected</h3>
                            <p>Confidence that your information will always be secure with a Drei.</p>
                        </div>
                        <div>
                            <HighQualityIcon/>
                            <h3>Highest Quality Guaranteed</h3>
                            <p>We care about quality, thats why we choose Airline grade aluminum.</p>
                        </div>
                        <div>
                            <LowWeightIcon/>
                            <h3>Zero Gravity</h3>
                            <p>Our wallets are virtually weightless. At just over two ounces each wallet</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

