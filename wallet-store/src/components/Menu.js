import React, { useState } from "react";
import {RiShoppingCartLine} from 'react-icons/ri'
import {IoIosMenu, IoMdClose} from 'react-icons/io'
import { Link } from "react-router-dom";


export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleMenuClick(){
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="menu-container">
            <div className="menu-buttons-container">
               {isMenuOpen===false && <div> <IoIosMenu onClick={handleMenuClick} style={{color: "white", fontSize: '2.3rem'}}/> </div>}
               <Link><button style={{background: 'none', border: 'none', color: 'white',fontWeight: 600, fontSize: '.9rem'}}>Wallets</button></Link>         
            </div>

            <div className="logo">
                <p>DREI</p>
            </div>

            <div className="shopping-cart-wrapper">
                <RiShoppingCartLine className="shopping-cart-icon"/>
                <span style={{color:"white"}}><p>0</p></span>
            </div>
            <div className="main-system-message-container">
                <p>LIFETIME WARRANTY & 75 DAY RISK-FREE TRIAL</p>
            </div>
            {isMenuOpen && <OpenMenu handleMenuClick={handleMenuClick}/>}
        </div>
    )
}

function OpenMenu(props){
    return (
        <div className="open-menu-container">
            <IoMdClose className="close-menu-icon" onClick={props.handleMenuClick}/>
            <h1 className="menu-title">Menu</h1>
            <nav className="nav-wrapper">
                <ul className="nav-item-list">
                    <Link to={'/'}><li className="menu-item">Home</li></Link>
                    <Link to={'/shop'}><li className="menu-item">Shop</li></Link>
                    <Link><li className="menu-item">About us</li></Link>
                    <Link><li className="menu-item">Support</li></Link>
                    <Link><li className="menu-item">Blog</li></Link>
                </ul>
            </nav>
        </div>
    )
}