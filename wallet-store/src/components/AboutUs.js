import React from 'react';
import Footer from './Footer';

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
                <div>
                    <h1>A <span className='selected-word-blue'>Modern</span> Philosophy</h1>
                </div>

                    <p>Welcome to our dropshipping store, where convenience meets style! At [Store Name],
                         we are passionate about bringing you the trendiest and most sought-after products right to your doorstep.
                          Our carefully curated collection features a wide range of products, from fashion-forward clothing to cutting-edge electronics and everything in between.<br/>
                           <br/>We believe that shopping should be an enjoyable experience, which is why we handpick each item with utmost care,
                            ensuring that it meets our high standards of quality and affordability. With our seamless ordering process and lightning-fast shipping,
                             you can sit back, relax, and let us handle the logistics while you indulge in the joy of discovering new and exciting products.<br/>
                              <br/>Whether you're looking to revamp your wardrobe, upgrade your gadgets, or find the perfect gift for a loved one,
                               [Store Name] has got you covered. Join our growing community of satisfied customers and experience the thrill of hassle-free shopping with us today!
                    </p>

                    <div className='why-buy-container'>
                        <h2>6 Reasons, Why <span className='company-name-blue selected-word-blue'>Drei</span></h2>
                        <div className='reasons-why-container'>
                            <div >
                                <TrendingDesignIcon/>
                                <h3>Trending Design</h3>
                                <p>In tune with current times because changes are unstoppable.</p>
                            </div>
                            <div className='odd'>
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
                            <div className='odd'>
                                <HighQualityIcon/>
                                <h3>Highest Quality Guaranteed</h3>
                                <p>We care about quality, thats why we choose Airline grade aluminum.</p>
                            </div>
                            <div className='odd'>
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

