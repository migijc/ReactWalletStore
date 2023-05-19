import React, { useEffect } from "react";
import black from '../walletImages/black.png'
import red from '../walletImages/red.png'
import gray from '../walletImages/gray.png'
import green from '../walletImages/green.png'
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";




export default function Shop(){
    const navigate = useNavigate();
    const handleClick = (id, product) => navigate(`${id}`, {state: {currentProduct: product, allProducts: aluminumWallets, walletInfo: aluminumWalletsInfo,}})

    return (
        <div className="shop-page-wrapper">
            <div>
                <Menu/>
            </div>
            <div className="shop-main-content">
                <div className="shop-side-bar" style={{padding: '10rem 2rem',}}>
                    <h2 style={{fontSize:'1.1rem', color: 'rgb(30,30,30)'}}>Wallets</h2>
                    <div style={{fontSize:'.9rem'}}>
                        <p style={{color:'rgb(80,80,80)'}}>Aluminum</p>
                    </div>
                </div>
                <div className="basic-colors-display">
                    {
                        aluminumWallets.map((product) => {
                            return (
                                <div onClick={()=> handleClick(product.productID, product)} className="product-container">
                                    <div className="product-image-container">
                                        <img className="product-main-image" src={product.mainImage} alt="product"/>
                                    </div>
                                    <div className="product-card-info">
                                        <p className="product-type">{product.productType}</p>
                                        <p className="product-name">{product.name}</p>
                                        <p className="product-price">{'$'+product.price}</p>                
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const aluminumWallets = [
    {name: 'Matte Black', mainImage: black, productID: 'dr00matblk', price: 30, productType: 'Drei Wallet', walletColorCode: '#303133'},
    {name: 'Gray', mainImage: gray, productID: 'dr0000gray', price: 30, productType: 'Drei Wallet', walletColorCode: '#6a7678'},
    {name: 'Matte Green', mainImage: green, productID: 'dr00matgrn', price: 30, productType: 'Drei Wallet', walletColorCode: '#494f42'},
    {name: 'Red', mainImage: red, productID: 'dr00000red', price: 30, productType: 'Drei Wallet', walletColorCode: '#d32639'},
]

const aluminumWalletsInfo={
    description: ("Introducing the Cool Drei Aluminum Wallets – a perfect fusion of style and durability. Expertly crafted with panel aviation aluminum, these wallets offer a sleek and modern solution for organizing your essentials. Designed with both fashion and functionality in mind, the wallets exude sophistication while providing maximum protection for your cards, cash, and documents. At an affordable price, experience the convenience and elegance of the Cool Drei Aluminum Wallets, fitting seamlessly into your pocket or bag, and elevating your everyday essentials."),
    features:[
        "Holds up to 12 cards and 15 bills",
        "Blocks RFID to prevent wireless theft",
        "75-day risk free trial",
        "Crafted from exquisite, premium-grade aluminum",
        "3.4 Stainless steel screws",
        "Slick design with dimensions of 86mm x 54mm",
    ]
}


