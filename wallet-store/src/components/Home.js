import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ThreeEnv from "../threeComponents/ThreeEnv";
import { Link } from "react-router-dom";
import tester from '../walletImages/testerrr1.png'
import {CgArrowLongRight} from 'react-icons/cg'
import { useNavigate } from "react-router-dom";
import FiveStarsDisplay from "./FiveStarsDisplay";

export default function Home(props) {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/shop')
    }

    let Cart = props.cart;
    
    return (
        <div className="home-container">
            <div className="home-menu-wrapper">
                {props.Menu}
            </div>
            <div className="content-container">
                <div className="content-container-left">
                        <div className="shop-now-button-wrapper" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                        <button onClick={handleClick} style={{border: '.05rem solid white',padding: '.85rem 2.5rem' , backgroundColor: 'transparent', fontWeight: '700',color:'white', fontSize: '1.6rem'}}>Shop Now</button>
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
