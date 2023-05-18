import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';
import FiveStarsDisplay from "./FiveStarsDisplay";
import {IoIosAdd} from 'react-icons/io'
import {HiOutlineMinus} from 'react-icons/hi'



export default function OpenedProduct(props) {
    const [isFeaturesExtended, setIsFeaturesExtended] = useState(false)
    const [currentFeaturesIcon, setCurrentFeaturesIcon] = useState(<IoIosAdd />)
    const location = useLocation();
    let state = location.state;

    useEffect(() => {
        console.log('noooon')
        console.log(currentFeaturesIcon)
        if(isFeaturesExtended){
            setCurrentFeaturesIcon(<HiOutlineMinus style={{fontSize: '.73rem'}} />)
        } else {
            setCurrentFeaturesIcon(<IoIosAdd />)
        }
    }, [isFeaturesExtended])

    function handleFeaturesIconClick(){
        setIsFeaturesExtended(!isFeaturesExtended);
    }

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
                    <FiveStarsDisplay
                         class='stars-container-opened-product'
                         starsContainerMessage='270 reviews'
                        />

                    <div className='product-basic-info'>
                        <h1 className='product-title'>{state.currentProduct.name}</h1>
                        <p className='opened-product-price'>{'$' + state.currentProduct.price}</p>
                        <h2 className='product-sub-title'>{state.currentProduct.productType}</h2>
                    </div>

                    <div className='all-colors-container'>
                        {state.allProducts.map(product => {
                            return (
                                <div className='available-color-container'>
                                    <div style={{backgroundColor:product.walletColorCode}} className='available-color'/>
                                </div>
                            )
                        })}
                    </div>

                    <button className='add-opened-product-button'>Add to cart</button>

                    <div className='extra-info-container'>
                        <div>
                            {state.walletInfo.description}
                        </div>
                        <div className='features-container'>
                            <h3 className='extra-info-title'>Features</h3>
                            <button className='extend-features-button' onClick={handleFeaturesIconClick}>{currentFeaturesIcon} </button>
                            {isFeaturesExtended && <div className='opened-features-container'>
                                {state.walletInfo.features.map((feature, index) => {
                                    return (
                                        <p className='feature-text' key={index}>{feature}</p>
                                    )
                                })}
                            </div> }
                        </div>

                    </div>
                </div>
                <h1>Heyo</h1>
            </div>
        </div>
    )
}