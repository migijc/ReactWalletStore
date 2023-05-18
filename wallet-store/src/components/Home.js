import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ThreeEnv from "./ThreeEnv";
import { Link } from "react-router-dom";
import tester from '../walletImages/testerrr1.png'
import {CgArrowLongRight} from 'react-icons/cg'
import { useNavigate } from "react-router-dom";
import FiveStarsDisplay from "./FiveStarsDisplay";

export default function Home() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/shop')
    }
    
    return (
        <div className="home-container">
            <Menu/>
            <div className="content-container">
                <div onClick={handleClick} style={{display:'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', position: 'relative', height: '100%'}}>
                        <div className="shop-now-button-wrapper" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                        <button style={{border: 'none', backgroundColor: 'transparent', fontWeight: '900',color:'white', fontSize: '1.6rem'}}>Shop Now</button>
                        <CgArrowLongRight style={{color: 'white',fontSize: '3rem'}}/>
                    </div>
                    <FiveStarsDisplay starsContainerMessage="Over 200 Five Star Reviews!" class={'stars-container-home'} />
                </div>
                <div className="main-image-container">
                    <div className="overlay"/>
                    <img src={tester} className='image'/>
                </div>             
            </div>
        </div>
    )
}
