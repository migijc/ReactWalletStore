import React, { useEffect } from "react";
import marketingBeach from '../walletImages/marketingBeach.png'
import { useNavigate } from "react-router-dom";
import FiveStarsDisplay from "./FiveStarsDisplay";
import { getDesignsWallets } from "./firebaseConfig";

export default function Home(props) {
    const navigate = useNavigate();


    let mobileDisplayMessage = <div className="mobile-message-wrapper">
        <p className="mobile-home-text">GET SOMETHING SPECIAL THIS FATHER'S DAY</p>
        <p>A SIMPLE "THANK YOU"</p>
    </div>

    function handleClick(){
        navigate('/shop')
    }


    async function getWallets(){
        let wallets = await getDesignsWallets()
        return
    }

    useEffect(()=>{
        getWallets()
    }, [])

    
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
                    </div>
                    
                    <FiveStarsDisplay fontSize={'1.6rem'} starsContainerMessage="Over 200 Five Star Reviews!" class={'stars-container-home'} />
                </div>
                <div className="content-container-right">
                    <div className="overlay"/>
                    
                    <div className="home-main-image-wrapper">
                        <img src={marketingBeach} className='image'/>
                    </div>
                </div>             
            </div>
        </div>
    )
}
