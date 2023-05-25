import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StripePaymentForm from './StripePaymentForm';
const secretKey = "sk_test_51NBAumEDoiHdZBdPflzwCuJg6AWHzbZaBPOQBL6JWSQUmGGwtHcGkCRX6M4gL6gh4uGcp8IilFWSopB21PmPZYjT00JokvXULF";
const stripe = require('stripe')(secretKey)



export default function Checkout(props) {
    const [checkoutStage, setCheckoutStage] = useState(1);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [elementsRef, setElementsRef] = useState(null);
    const [isShippingValid, setIsShippingValid] = useState(null);
    const [isPaymentValid, setIsPaymentValid] = useState(null);
    const [stripeRef, setStripeRef] = useState(null);
    let location = useLocation();
    let state = location.state;
    const itemsList = state.itemsInCart;
    const subtotal = state.cartSubtotal
    const stages = {
        1: 'information',
        2: 'shipping',
        3: 'payment',
    };




    async function handleNextClick(email, shipping) {
        if (checkoutStage === 1) {
            console.log(stripe)
            let paymentRef = await stripe.paymentIntents.create({ amount: subtotal * 100, currency: 'usd', receipt_email: email, shipping, })
            setPaymentIntent(paymentRef)
            setCheckoutStage(checkoutStage + 1)
            return
        }
        else if (checkoutStage === 3) {

            if (elementsRef) {
                elementsRef.submit();
                confirmPayment()
                return
            } else {return}
        } else {
            setCheckoutStage(checkoutStage + 1)
        }
    }

    async function confirmPayment() {
        let result = await stripeRef.confirmPayment({
            elements: elementsRef,
            clientSecret: paymentIntent.client_secret,
            confirmParams: {
                return_url: 'https://dreiwallets.com',
            },
            redirect: 'if_required'
        })
        console.log(result)
    }

    return (
        <div style={styles.mainContainer}>

            <div style={styles.headerContainer}>
                <Logo />
                <div style={styles.progressContainer}>
                    <ProgressContainer stage={stages[checkoutStage]} />
                </div>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.mainContentLeft}>
                    {checkoutStage === 1 && 
                        <MainInfoForm 
                            setElementsRef={setElementsRef}
                            setStripeRef={setStripeRef}
                            shippingInfo={paymentIntent}
                            setIsPaymentValid={setIsPaymentValid}
                            isPaymentValid={isPaymentValid}
                            handleNextClick={handleNextClick}
                            setIsShippingValid={setIsShippingValid}
                            isShippingValid={isShippingValid}
                             />}

                    {checkoutStage === 2 && 
                        <ConfirmShipping
                            email={paymentIntent.receipt_email}
                            currentShipping={paymentIntent.shipping}
                            handleNextClick={handleNextClick}
                             />}

                    {checkoutStage === 3 && 
                        <Payment paymentIntent={paymentIntent}
                            setElementsRef={setElementsRef}
                            setStripeRef={setStripeRef}
                            setIsPaymentValid={setIsPaymentValid}
                            isPaymentValid={isPaymentValid}
                            setIsShippingValid={setIsShippingValid}
                            isShippingValid={isShippingValid}
                            handleNextClick={handleNextClick}
                            clientSecret={paymentIntent.client_secret}/>}
                </div>

                <div style={styles.mainContentRight}>
                    <div style={styles.shoppingCartContainer}>
                        <div> <h3 style={styles.cartTitle}>Shopping Cart</h3> </div>

                        <div style={styles.cartContent}>
                            {itemsList.length > 0 ? itemsList.map((item, i) => {
                                return (
                                    <div style={styles.itemInCart}>
                                        <div style={styles.imageContainer}>
                                            <img style={styles.cartImage} src={item.mainImage} />
                                            <div className='quantity-cart-item ' style={{ fontSize: '.8rem', width: '.9rem !important', height: '.9rem !important' }}>
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
                            }) : <p style={{ textAlign: 'center', fontWeight: 300, color: 'rgb(170, 170, 170)', padding: '1rem', }}>(No items in cart)</p>}
                        </div>

                        <div style={styles.cartPricing}>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem' }}>
                                <p>SUBTOTAL</p>
                                <p className='in-cart-price'>{'$' + subtotal.toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem' }}>
                                <p>SHIPPING</p>
                                <p style={{ fontSize: '.7rem', fontWeight: '500', color: 'rgb(145,145,145)' }}>Calculated in next step</p>
                            </div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1.5rem 2rem 0' }}>
                                <p style={{ fontWeight: 400 }}>TOTAL</p>
                                <p style={{ fontWeight: 600, fontSize: '1rem' }}>{"$" + subtotal.toFixed(2)}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function Logo() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/')} style={styles.logoWrapper}>
            <div style={styles.logo}>
                <p>Drei</p>
            </div>
        </div>
    )
}

function ProgressContainer(props) {
    const currentStageDivRef = useRef(null)

    function getRef(stageName) {
        if (stageName === props.stage) {
            return currentStageDivRef;
        }
        return;
    }

    useEffect(() => {
        currentStageDivRef.current.style.backgroundColor = 'rgb(45,45,45)'
    })


    return (
        <div className='progress-container' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
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


function MainInfoForm(props) {
    const [userEmail, setUserEmail] = useState('Email');
    const [shipping, setShipping] = useState(null);

    function handleNextClick(userEmail, shipping) {
        props.handleNextClick(userEmail, shipping)
    }

    return (
        <div style={styles.mainInfoForm}>
            <h1 style={styles.containerTitle}>STANDARD CHECKOUT</h1>

            <div style={styles.contactInfoContainer}>
                <h2 style={styles.inputSectionTitle}>CONTACT INFORMATION</h2>
                <input type="email" className='checkout-input' onChange={(e) => { setUserEmail(e.target.value) }} placeholder={userEmail} value={userEmail !== 'Email' ? userEmail : ''} />
            </div>

            <div style={styles.shippingAddressContainer}>
                <h2 className='form-shipping-info-title' style={styles.inputSectionTitle}>SHIPPING INFORMATION</h2>
                <StripePaymentForm setElementsRef={props.setElementsRef} setStripeRef={props.setStripeRef} secret_client={shipping} setShipping={setShipping} setIsShippingValid={props.setIsShippingValid} shippingForm={true} />
            </div>

            <div style={styles.submitInfoBtnContainer}>
                <button className={props.isShippingValid ? null : 'disabled'} disabled={props.isShippingValid ? false : true} onClick={() => handleNextClick(userEmail, shipping)} style={styles.submitInfoBtn}>Next</button>
            </div>
        </div>

    )
}

function ConfirmShipping(props) {
    let address = props.currentShipping.address
    const AddressString = <p style={{ fontSize: '.85rem', fontWeight: 500 }}>{`${address.line1}, ${address.line2}, ${address.city} ${address.state}, ${address.postal_code}`}</p>

    return (
        <div style={{ height: 'fit-content', width: '100%', backgroundColor: 'rgb(242,242,242)',border: '0.11rem solid rgb(210, 210, 210)', padding: '2rem', display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '.2rem', background: 'rgb(242,242,242)' }}>
                <h2 style={styles.inputSectionTitle}>CONFIRM INFO</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr', background: 'white', padding: '.95rem 0', marginTop: '.6rem' }}>
                    <p style={{ padding: '0 1rem', fontSize: '.9rem' }}>Contact</p>
                    <p style={{ fontSize: '.85rem', fontWeight: 500 }}>{props.email}</p>
                    <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700 }}>Edit</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr', background: 'white', padding: '.8rem 0' }}>
                    <p style={{ padding: '0 1rem', fontSize: '.9rem' }}>Shipping to</p>
                    {AddressString}
                    <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700 }}>Edit</button>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <h2 style={styles.inputSectionTitle}>SHIPPING METHOD</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr', background: 'white', padding: '.8rem 0' }}>

                    <p style={{ fontSize: '.95rem', paddingLeft: '.95rem', fontWeight: 600 }}>Standard (7-14 days)</p>
                    <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 600 }}>Free</button>
                </div>
            </div>

            <button onClick={() => props.handleNextClick()} style={styles.submitInfoBtn}>Next</button>
        </div>
    )
}

function Payment(props) {
    const [shipping, setShipping] = useState(null);
    const address = props.paymentIntent.shipping.address;
    const AddressString = <p style={{ fontSize: '.85rem', fontWeight: 500 }}>{`${address.line1}, ${address.line2}, ${address.city} ${address.state}, ${address.postal_code}`}</p>


    return (
        <div style={{ width: '100%', padding: '2rem', background: 'rgb(242,242,242)', height: 'fit-content', border: '0.11rem solid rgb(210, 210, 210)' }}>
            <div style={styles.summary}>
                <div style={{ display: 'grid', background: 'rgb(242,242,242)', gap: '.2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr', background: 'white', padding: '.8rem 0' }}>
                        <p style={{ padding: '0 1rem', fontSize: '.9rem' }}>Contact</p>
                        <p style={{ fontSize: '.85rem', fontWeight: 500 }}>{props.paymentIntent.receipt_email}</p>
                        <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700 }}>Edit</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 1fr', background: 'white', padding: '.8rem 0' }}>
                        <p style={{ padding: '0 1rem', fontSize: '.9rem' }}>Ship to</p>
                        {/* <p style={{ fontSize: '.9rem', fontWeight: 500 }}>fix</p> */}
                        {AddressString}
                        <button style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1rem', fontWeight: 700 }}>Edit</button>
                    </div>
                </div>
            </div>
            <form style={{ padding: '1.5rem 0' }}>
                <div style={styles.formTitle}>
                    <h2 style={styles.inputSectionTitle}>PAYMENT</h2>
                </div>
                <StripePaymentForm clientSecret={props.clientSecret} setStripeRef={props.setStripeRef} setElementsRef={props.setElementsRef} setIsShippingValid={props.setIsShippingValid} setShipping={setShipping} setIsPaymentValid={props.setIsPaymentValid} paymentIntent={props.paymentIntent} paymentForm={true} shippingForm={true}/>
            </form>

            <button disabled={props.isPaymentValid ? false : true} className={props.isPaymentValid ? 'null' : 'disabled'} onClick={() => props.handleNextClick()} style={styles.submitInfoBtn}>Pay Now</button>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        padding: '1rem 0',
    },

    progressContainer: {
        alignItems: 'center',
        justifyContent: 'start',
        display: 'flex',
        width: '50%',
    },

    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '60vw',
        justifySelf: 'center',
    },

    logo: {
        border: '.3rem solid rgb(45, 45, 45)',
        padding: '1rem',
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
        width: '60vw',
        justifyContent: 'center',
        justifySelf: 'center',
        gap: '2rem'

    },

    mainContentLeft: {
        width: '100%',
        justifyItems: 'right',
        minHeight: '100%',
    },

    mainContentRight: {
        width: '100%',
        height: '100%',
    },

    shoppingCartContainer: {
        border: '.12rem solid rgb(210,210,210)',
        padding: '1rem',
        maxHeight: '100%',
        display: 'grid',
        gridTemplateRows: '.5fr 3.25fr 2.25fr'
    },

    mainInfoForm: {
        border: '.11rem solid rgb(210,210,210)',
        width: '100%',
        gridTemplateColumns: '1fr',
        background: 'rgb(242,242,242)',
    },

    containerTitle: {
        fontSize: '1.3rem',
        color: 'rgb(30,30,30)',
        textAlign: 'center',
        padding: '1rem',
    },

    inputSectionTitle: {
        fontSize: '1rem',
    },

    contactInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '2rem',
    },

    shippingAddressContainer: {
        display: 'grid',
        padding: '2rem',
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
        padding: '2rem',
    },

    submitInfoBtn: {
        width: 'inherit',
        padding: '1rem',
        background: '#39d38c',
        color: 'white',
        fontWeight: 600,
        fontSize: '1.2rem',
        letterSpacing: '.12rem',
        border: 'none',
        borderRadius: '.2rem'
    },

    cartTitle: {
        fontWeight: '1rem',
    },

    cartPricing: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '.5rem',
        padding: '.5rem'
    },

    cartContent: {
        display: 'grid',
        alignItems: 'start',
        gap: '.25rem',
        padding: '0.5rem 0'
    },

    itemInCart: {
        alignSelf: 'start',
        maxHeight: '15rem',
        display: 'grid',
        alignItems: 'center',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        padding: '1.5rem',
    },

    pricePerIdContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formTitle: {
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center'
    },
}
