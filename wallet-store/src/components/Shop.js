import React, { useEffect } from "react";
import { db } from "./Firebase";
import { collection, setDoc, addDoc } from "firebase/firestore";
import black from '../walletImages/black.png'
import red from '../walletImages/red.png'
import gray from '../walletImages/gray.png'
import green from '../walletImages/green.png'
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";




export default function Shop(){
    let itemsColRef = collection(db, 'items');
    let allProductImages = [black, red, gray, green,]
    const navigate = useNavigate();
    
    const handleClick = (id, product) => navigate(`${id}`, {state: {currentProduct: product}})

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
    {name: 'Matte Black', mainImage: black, productID: 'dr00matblk', price: 30, productType: 'Drei Wallet',},
    {name: 'Gray', mainImage: gray, productID: 'dr0000gray', price: 30, productType: 'Drei Wallet',},
    {name: 'Matte Green', mainImage: green, productID: 'dr00matgrn', price: 30, productType: 'Drei Wallet',},
    {name: 'Red', mainImage: red, productID: 'dr00000red', price: 30, productType: 'Drei Wallet',},
]

