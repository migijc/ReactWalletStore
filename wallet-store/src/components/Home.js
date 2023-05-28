import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ThreeEnv from "../threeComponents/ThreeEnv";
import { Link, useLocation } from "react-router-dom";
import tester from '../walletImages/testerrr1.png'
import {CgArrowLongRight} from 'react-icons/cg'
import { useNavigate } from "react-router-dom";
import FiveStarsDisplay from "./FiveStarsDisplay";
import { db } from "./firebaseConfig";
import { collection, doc } from "firebase/firestore";
import { stripePromise } from "./StripePaymentForm";

export default function Home(props) {
    const navigate = useNavigate();
    const location = useLocation()

    let mobileDisplayMessage = <div className="mobile-message-wrapper">
        <p className="mobile-home-text">GET SOMETHING SPECIAL THIS FATHER'S DAY</p>
        <p>A SIMPLE "THANK YOU"</p>
    </div>

    function handleClick(){
        navigate('/shop')
    }



    //get client_secret if redirected to paramURL
    // useEffect(()=>{
    //     let searchParams = new URLSearchParams(location.search);
    //     let clientSecret = searchParams.get('payment_intent_client_secret');
    //     if(clientSecret) {
    //         navigate(`order_confirmation/${searchParams.search}`, {state: {clientSecret}})
    //     }
    // }, [])


    
    return (
        <div className="home-container">
            <div className="home-menu-wrapper">
                {props.Menu}
            </div>
            <div className="content-container">
                <div className="content-container-left">
                    
                                    {mobileDisplayMessage}
             
                    <div className="shop-now-button-wrapper" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                        <button className="home-shop-now-btn" onClick={handleClick} style={{border: '.05rem solid white',padding: '.85rem 2.5rem' , backgroundColor: 'transparent', fontWeight: '700',color:'white', fontSize: '1.6rem'}}>Shop Now</button>
                        {/* <CgArrowLongRight style={{color: 'white',fontSize: '3rem'}}/> */}
                    </div>

                    <FiveStarsDisplay fontSize={'1.6rem'} starsContainerMessage="Over 200 Five Star Reviews!" class={'stars-container-home'} />
                </div>
                <div className="content-container-right">
                    <div className="overlay"/>
                    
                    <div className="home-main-image-wrapper">
                        <img src={tester} className='image'/>
                    </div>
                </div>             
            </div>
        </div>
    )
}
