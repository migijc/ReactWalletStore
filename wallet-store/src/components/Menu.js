import React, { useState } from "react";
import {IoIosMenu, IoMdClose} from 'react-icons/io'
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";


export default function Menu(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [systeMessage, setSystemMessage] = useState("LIFETIME WARRANTY & 75 DAY RISK-FREE TRIAL");

    function handleMenuClick(){
        setIsMenuOpen(!isMenuOpen)
    }

    const handleAddItem = props.addItemToBag;

    return (
        <div className="menu-container">
            <div className="menu-content-wrapper">
                <div className="menu-buttons-container">
                {isMenuOpen===false && <div> <IoIosMenu onClick={handleMenuClick} style={{color: "white", fontSize: '2.3rem'}}/> </div>}
                <Link><button style={{background: 'none', border: 'none', color: 'white',fontWeight: 600, fontSize: '.9rem'}}>Wallets</button></Link>         
                </div>

                <div className="logo-wrapper">
                  <div className="logo">
                    <p>DREI</p>
                  </div>            
                </div>


                <div className="shopping-cart-wrapper">
                    {<ShoppingCart addItemToBag={handleAddItem} itemsInBag={props.itemsInCart} removeItemFromCart={props.removeItemFromCart}/>}
                </div>
            </div>


            <div className="main-system-message-container">
                <p>{systeMessage}</p>
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
                    <Link to={'/about'}><li className="menu-item">About us</li></Link>
                    <Link><li className="menu-item">Support</li></Link>
                    <Link><li className="menu-item">Blog</li></Link>
                </ul>
            </nav>
        </div>
    )
}