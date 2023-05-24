import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripePaymentForm from './StripePaymentForm';
const testKey="pk_test_51NBAumEDoiHdZBdPSZDZyRWpHfgZoobdqDma0u9VDPtqFqqgoZ0hB6H51nqjxz4No7PpA7yKugNShyRpSlQz7RDN00rD25fBZo";
const secretKey="sk_test_51NBAumEDoiHdZBdPflzwCuJg6AWHzbZaBPOQBL6JWSQUmGGwtHcGkCRX6M4gL6gh4uGcp8IilFWSopB21PmPZYjT00JokvXULF";
const stripe = require('stripe')(secretKey)



export default function Checkout(props){
    const [checkoutStage, setCheckoutStage] = useState(1);
    const [infoInputData, setInfoInputData] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [elementsRef, setElementsRef] = useState(null);
    const [stripeRef, setStripeRef] = useState(null)
    let location = useLocation();
    let state = location.state;
    const itemsList = state.itemsInCart;
    const subtotal = state.cartSubtotal
    const stages={
        1: 'information',
        2: 'shipping',
        3: 'payment',
    };
    console.log(stripeRef)

    const wholeAddressString = () =>  infoInputData.address + ', ' +infoInputData.city+ ' ' + infoInputData.state + ', ' +  infoInputData.zipCode 


    async function handleNextClick(inputData, email){
        if(checkoutStage === 1){
            let paymentRef = await stripe.paymentIntents.create({amount:subtotal*100, currency: 'usd'})
            setUserEmail(email)
            setInfoInputData(inputData)
            setPaymentIntent(paymentRef)
            setCheckoutStage(checkoutStage + 1)
        }
        else if (checkoutStage === 3){
             if(elementsRef){
                confirmPayment()
                return 
             } else {console.log("error")}
        } else {
            setCheckoutStage(checkoutStage + 1)
        }
    }

    async function confirmPayment(){
        let result = await stripeRef.confirmPayment({
            elements: elementsRef,
            confirmParams: {
                return_url: 'https://google.com',
            },
        })
        console.log(result)
    }

    return (
        <div style={styles.mainContainer}>
            <div style={styles.headerContainer}>
                <Logo />
                <div style={styles.progressContainer}>
                    <ProgressContainer stage={stages[checkoutStage]}/>
                </div>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.mainContentLeft}>
                    {checkoutStage === 1 && <MainInfoForm handleNextClick={handleNextClick} />}
                    {checkoutStage === 2 && <ConfirmShipping infoInputData={infoInputData} handleNextClick={handleNextClick} userEmail={userEmail}/>}
                    {checkoutStage === 3 && <Payment setStripeRef={setStripeRef} setElementsRef={setElementsRef} clientSecret={paymentIntent.client_secret} userEmail={userEmail} address={wholeAddressString()} handleNextClick={handleNextClick}/>}
                </div>
                <div style={styles.mainContentRight}>
                    <div style={styles.shoppingCartContainer}>
                        <div>
                            <h3 style={styles.cartTitle}>Shopping Cart</h3>
                        </div>

                        <div style={styles.cartContent}>
                            {itemsList.length > 0 ? itemsList.map(item => {
                                return (
                                    <div style={styles.itemInCart}>
                                        <div style={styles.imageContainer}>
                                            <img style={styles.cartImage} src={item.mainImage}/>
                                            <div className='quantity-cart-item ' style={{fontSize: '.8rem', width:'.9rem !important', height: '.9rem !important'}}>
                                                <p>{item.quantity}</p>
                                            </div>
                                        </div>
                                        <div style={styles.itemInfo}>
                                            <p className='in-cart-name'>{item.name}</p>
                                            <p className='in-cart-type'>{item.productType}</p>
                                        </div>

                                        <div style={styles.pricePerIdContainer}>
                                            <p className='in-cart-price'>{"$" + item.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                )
                            }) : <p style={{textAlign: 'center', fontWeight: 300, color: 'rgb(170, 170, 170)', padding: '1rem',}}>(No items in cart)</p>}
                        </div>

                        <div style={styles.cartPricing}>
                            <div  style={{display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem'}}>
                                <p>SUBTOTAL</p>
                                <p className='in-cart-price'>{'$' + subtotal.toFixed(2)}</p>
                            </div>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem'}}>
                                <p>SHIPPING</p>
                                <p style={{fontSize: '.7rem', fontWeight: '500', color: 'rgb(145,145,145)'}}>Calculated in next step</p>
                            </div>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1.5rem 2rem 0'}}>
                                <p style={{fontWeight: 400}}>TOTAL</p>
                                <p style={{fontWeight: 600, fontSize: '1rem'}}>{"$" + subtotal.toFixed(2)}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function Logo(){
    return (
        <div style={styles.logoWrapper}>
            <div style={styles.logo}>
                <p>Drei</p>
            </div>
        </div>
    )
}

function ProgressContainer(props){
    const currentStageDivRef = useRef(null)

    function getRef(stageName){
        if(stageName === props.stage){
            return currentStageDivRef;
        }
        return;
    }

    useEffect(()=>{
        currentStageDivRef.current.style.backgroundColor = 'rgb(45,45,45)'
    })


    return (
        <div className='progress-container' style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <div ref={getRef('information')} className='information'>
                <p>Information</p>
            </div>
            <div ref={getRef('shipping')} className='shipping'>
                <p>Shipping</p>
            </div>
            <div ref={getRef('payment')} className='payment'>
                <p>Payment</p>
            </div>
        </div>
    )
}

function ConfirmShipping(props){

    const address= props.infoInputData.address;
    const city = props.infoInputData.city;
    const state= props.infoInputData.state;
    const zipCode= props.infoInputData.zipCode;

    const wholeAddressString = address + ', ' + city+ ' ' +  state + ', ' + zipCode 

    return (
        <div style={{height: 'fit-content', width: '100%',backgroundColor:'rgb(231,231,231)', padding: '2rem 1rem', display: 'grid', gap: '2rem'}}>
            <div style={{display:'grid', gap: '1rem', background: 'rgb(231,231,231)'}}>
                <h2 style={styles.inputSectionTitle}>CONTACT INFO</h2>
                <div style={{display:'grid',gridTemplateColumns: '1fr 4fr 1fr', background:'white', padding:'.8rem 0'}}>
                    <p style={{padding: '0 1rem', fontSize: '.9rem'}}>Contact</p>
                    <p style={{fontSize: '.9rem', fontWeight: 500}}>{props.userEmail}</p>
                    <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700}}>Edit</button>
                </div>

                <div style={{display:'grid', gridTemplateColumns: '1fr 4fr 1fr', background:'white', padding:'.8rem 0'}}>
                    <p style={{padding: '0 1rem', fontSize: '.9rem'}}>Shipping to</p>
                    <p style={{fontSize: '.9rem', fontWeight: 500}}>{wholeAddressString}</p>
                    <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700}}>Edit</button>
                </div>
            </div>

            <div style={{display:'grid', gap: '1rem'}}>
                <h2 style={styles.inputSectionTitle}>SHIPPING METHOD</h2>
                <div style={{display:'grid',gridTemplateColumns: '5fr 1fr' , background:'white', padding:'.8rem 0'}}>

                    <p style={{fontSize: '.95rem', paddingLeft: '1rem', fontWeight: 600}}>Standard (7-14days)</p>
                    <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 600}}>Free</button>
                </div>
            </div>
            <div style={styles.submitInfoBtnContainer}>
                <button onClick={()=>props.handleNextClick()} style={styles.submitInfoBtn}>Next</button>
            </div>
        </div>
    )
}

function Payment(props){

    return (
        <div style={{width: '100%', padding: '2rem', background: 'rgb(231,231,231)', height: 'fit-content'}}>
            <div style={styles.summary}>
                <div style={{display:'grid', background: 'rgb(231,231,231)'}}>
                    <div style={{display:'grid',gridTemplateColumns: '1fr 4fr 1fr', background:'white', padding:'.8rem 0'}}>
                        <p style={{padding: '0 1rem', fontSize: '.9rem'}}>Contact</p>
                        <p style={{fontSize: '.9rem', fontWeight: 500}}>{props.userEmail}</p>
                        <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700}}>Edit</button>
                    </div>

                    <div style={{display:'grid', gridTemplateColumns: '1fr 4fr 1fr', background:'white', padding:'.8rem 0'}}>
                        <p style={{padding: '0 1rem', fontSize: '.9rem'}}>Ship to</p>
                        <p style={{fontSize: '.9rem', fontWeight: 500}}>{props.address}</p>
                        <button style={{backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700}}>Edit</button>
                    </div>
                </div>
            </div>
            <form style={{padding:'1.5rem 0'}}>
                <div style={styles.formTitle}>
                    <h2 style={styles.inputSectionTitle}>PAYMENT</h2>
                </div>
            <StripePaymentForm setStripeRef={props.setStripeRef} setElementsRef={props.setElementsRef} clientSecret={props.clientSecret}/>
            </form>
            {/* <div style={styles.submitInfoBtnContainer}> */}
                <button onClick={()=>props.handleNextClick()} style={styles.submitInfoBtn}>Pay Now</button>
            {/* </div> */}
        </div>
    )
}

const styles = {
    mainContainer: {
        maxWidth: '100vw',
        minHeight: '100vh',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 5fr',
        justifyContent: 'center',
        gap: '2rem',
    },

    logoWrapper: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'end',
        padding: '1rem 0',
    },

    progressContainer:{
        alignItems: 'center',
        justifyContent: 'start',
        display: 'flex',
        width: '50%',
    },

    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '64vw',
        justifySelf:'center',
    },

    logo: {
        border: '.3rem solid rgb(45, 45, 45)',
        padding:'1rem',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '900rem',
        fontSize: '2.4rem',
        fontWeight: 800,
    },

    mainContent: {
        display: 'grid',
        gridTemplateColumns: '1.3fr .7fr',
        paddingBottom: '1.5rem',
        width: '64vw',
        justifyContent:'center',
        justifySelf: 'center',
        gap: '2rem'

    },

    mainContentLeft: {
        width: '100%',
        height: '100%',
        display: 'grid',
        justifyItems: 'right',
    },

    mainContentRight: {
        width: '100%',
        height: '100%',
    },

    shoppingCartContainer: {
        border: '.17rem solid rgb(210,210,210)',
        padding: '1rem',
        maxHeight: '100%',
        display: 'grid',
        gridTemplateRows: '.5fr 3.25fr 2.25fr'
    },

    mainInfoForm: {
        border: '.17rem solid rgb(210,210,210)',
        minHeight: '100%',
        width: '100%',
        display:'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '.5fr 1fr 3.5fr 1fr ',
        background: 'rgb(231, 231, 231)',
    },

    containerTitle: {
        fontSize: '1.3rem',
        color: 'rgb(30,30,30)',
        textAlign: 'center',
        padding:'1rem',
    },

    inputSectionTitle: {
        fontSize: '1rem',
    },

    contactInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding:'1.5rem',
    },

    shippingAddressContainer: {
        display: 'grid',
        padding:'1rem',
    },

    inputWrapper: {
        width: '100%',
        padding: '.5rem'
    },

    submitInfoBtnContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    },

    submitInfoBtn: {
        width: 'inherit',
        padding: '1rem',
        background: '#39d38c',
        color: 'white',
        fontWeight: 600,
        fontSize:'1.2rem',
        letterSpacing: '.12rem',
        border: 'none',
    },

    cartTitle: {
        fontWeight: '1rem',
    },

    cartPricing: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '.5rem',
        padding:'.5rem'
    },

    cartContent: {
        display:'grid',
        alignItems: 'start',
        gap: '.07rem',
        padding: '0.5rem 0'
    },

    itemInCart: {
        alignSelf: 'start',
        maxHeight: '15rem',
        display: 'grid',
        alignItems:'center',
        gridTemplateColumns: '1.5fr 3.5fr 1fr',
        padding: '.3rem',
        borderTop: '.12rem solid rgb(210,210,210)',
        borderBottom: '.12rem solid rgb(210,210,210)',
    },

    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },

    cartImage: {
        maxWidth: '100%',
        height: 'auto',
    },

    itemInfo: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'start',
        justifyContent:'center',
        padding: '1.5rem',
    },

    pricePerIdContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
    },

    formTitle: {
        padding:'2rem',
        display:'flex',
        justifyContent:'center'
    },
}

function MainInfoForm(props){
    const [userEmail, setUserEmail] = useState('Email');
    const [shippingAddress, setShippingAddress] = useState({
        countryRegion: 'Country/Region',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company (Optional)',
        address: 'Address',
        apartmentSuite: 'Apartment, Suite, Etc. (Optional)',
        city: 'City',
        state: 'State',
        zipCode: 'ZIP code',
        phoneNumber: 'Phone Number',
    });

    let addressInfo = shippingAddress;

    function handleInputChange(propKey, e){
        let value = e.target.value;
        setShippingAddress(prev => ({
            ...prev,
            [propKey]: value,
        }))
    }

    return (
        <div style={styles.mainInfoForm}>
            <h1 style={styles.containerTitle}>STANDARD CHECKOUT</h1>

            <div style={styles.contactInfoContainer}>
                <h2 style={styles.inputSectionTitle}>CONTACT INFORMATION</h2>
                <input className='checkout-input' onChange={(e)=>{setUserEmail(e.target.value)}} placeholder={userEmail} value={userEmail !== 'Email' ? userEmail : ''}/>
            </div>

            <div style={styles.shippingAddressContainer}>
                <h2 className='form-shipping-info-title' style={styles.inputSectionTitle}>SHIPPING INFORMATION</h2>
                <div style={styles.inputWrapper}>
                    <input onChange={(e)=> handleInputChange('countryRegion', e)} className='checkout-input' placeholder={addressInfo.countryRegion}/>
                </div>

                <div className='input-group-container'>
                    <div style={styles.inputWrapper}>
                        <input onChange={(e)=> handleInputChange('firstName', e)} className='checkout-input' placeholder={addressInfo.firstName}/>
                    </div>

                    <div style={styles.inputWrapper}>
                        <input onChange={(e)=> handleInputChange('lastName', e)} className='checkout-input' placeholder={addressInfo.lastName}/>
                    </div>
                </div>
               
                <div style={styles.inputWrapper}>
                    <input onChange={(e)=> handleInputChange('company', e)} className='checkout-input' placeholder={addressInfo.company}/>
                </div>

                <div style={styles.inputWrapper}>
                    <input onChange={(e)=> handleInputChange('address', e)} className='checkout-input' placeholder={addressInfo.address}/>
                </div>

                <div style={styles.inputWrapper}>
                    <input onChange={(e)=> handleInputChange('apartmentSuite', e)} className='checkout-input' placeholder={addressInfo.apartmentSuite}/>
                </div>

                <div className='input-group-container'>
                    <div style={styles.inputWrapper}>
                        <input onChange={(e)=> handleInputChange('city', e)} className='checkout-input' placeholder={addressInfo.city}/>
                    </div>

                    <div style={styles.inputWrapper}>
                        <input onChange={(e)=> handleInputChange('state', e)} className='checkout-input' placeholder={addressInfo.state}/>
                    </div>

                    <div style={styles.inputWrapper}>
                        <input onChange={(e)=> handleInputChange('zipCode', e)} className='checkout-input' placeholder={addressInfo.zipCode}/>
                    </div>
                </div>
               
                <div style={styles.inputWrapper}>
                    <input className='checkout-input' placeholder={addressInfo.phoneNumber}/>
                </div>                
            </div>

            <div style={styles.submitInfoBtnContainer}>
                <button onClick={()=>props.handleNextClick(shippingAddress, userEmail)} style={styles.submitInfoBtn}>Next</button>
            </div>
        </div>
        
    )
}