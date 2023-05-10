import React, { useEffect } from "react";
import { db } from "./Firebase";
import { collection, setDoc, addDoc } from "firebase/firestore";
import black from '../walletImages/black.png'
import red from '../walletImages/red.png'
import gray from '../walletImages/gray.png'
import green from '../walletImages/green.png'




export default function Shop(){
    let itemsColRef = collection(db, 'items');

    let allProductImages = [black, red, gray, green,]

    return (
        <div>
            <p>Shop</p>
            <div className="basic-colors-display">
                {allProductImages.map((item, i) => {
                    return (
                        <div key={i} className='product-main-image-container'>
                            <img style={{width: '100%'}} src={item}/>
                        </div>
                    )
                })}               
            </div>

        </div>
    )
}