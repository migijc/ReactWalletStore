import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ThreeEnv from "./ThreeEnv";
import { Link } from "react-router-dom";
import tester from '../walletImages/testerrr1.png'
import {CgArrowLongRight} from 'react-icons/cg'
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function handleClick(){
        navigate('/shop')
    }
    
    return (
        <div className="home-container">
            <Menu/>
            <div onClick={handleClick} style={{display:'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                <div className="shop-now-button-wrapper" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                    <button style={{border: 'none', backgroundColor: 'transparent', fontWeight: '900',color:'white', fontSize: '1.6rem'}}>Shop Now</button>
                    <CgArrowLongRight style={{color: 'white',fontSize: '3rem'}}/>
                </div>
                <StarsAnnouncment/>
            </div>
            <div className="main-image-container" style={{color: 'white' ,position: 'relative', height: '100vh', }}>
                <div className="overlay"/>
                <img src={tester} className='image'/>
            </div>
            {/* <Link to='./shop'><button  className="shop-now-button">Shop Now</button></Link> */}
            {/* <p>Home Screen</p> */}
            {/* <ThreeEnv/> */}
            {/* <Footer/> */}
        </div>
    )
}

function StarsAnnouncment(){

    return (
        <div style={{ position: 'absolute', bottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.4rem'}}>
          <div>
            <p style={{color: 'gray', fontWeight: 600,}}>More than 200 five star reviews</p>
          </div>  
          <div style={{display: 'flex', gap: '.7rem', fontSize: '1.6rem'}}>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
          </div>          
        </div>

    )
}