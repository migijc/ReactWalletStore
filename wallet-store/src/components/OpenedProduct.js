import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';


export default function OpenedProduct(props) {
    console.log(props)
    const location = useLocation();
    let state = location.state;

    console.log(state.currentProduct)

    return (
        <div className='opened-product-page'>
            <Menu />
            <div className='opened-product-main-content'>
                <div className='main-content-left'>
                    <div className='displayed-image-container'>
                        <img alt='Opened Product' src={state.currentProduct.mainImage}/>
                    </div>
                </div>
                <div className='main-content-right'>
                    <h1>{state.currentProduct.name}</h1>
                    <h2>{state.currentProduct.productType}</h2>
                    <p>{'$' + state.currentProduct.price}</p>
                </div>

            </div>
        </div>
    )
}