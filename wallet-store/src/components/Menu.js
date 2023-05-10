import React, { useState } from "react";
import {RiShoppingCartLine} from 'react-icons/ri'
import {IoIosMenu} from 'react-icons/io'


export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="menu-container">
            {/* <nav className="navigation-wrapper">
                <ul className="nav-list">
                    <li>Home</li>
                    <li>Shop</li>
                    <li>Contact</li>
                </ul>
            </nav> */}
            <div style={{flex:1}}> <IoIosMenu style={{color: "white", fontSize: '2.3rem'}}/> </div>

            <div className="logo">
                <p>DREI</p>
            </div>

            <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end', gap:'.2rem'}}>
                <RiShoppingCartLine style={{color: 'white', fontSize: '1.3rem'}}/>
                <span style={{color:"white"}}><p>0</p></span>
            </div>
            <div style={
                {
                    backgroundColor: 'rgba(235,235,235, .7)',
                    position:'absolute',
                    bottom:0,
                    transform: 'translateY(100%)',
                    padding: '.4rem', fontSize: '.8rem',
                    width: '100vw',
                    left: 0,
                    justifyContent: 'center',
                    display: 'flex',
                    fontWeight: 500,
                }}>
                <p>LIFETIME WARRANTY & 75 DAY RISK-FREE TRIAL</p>
            </div>
        </div>
    )
}