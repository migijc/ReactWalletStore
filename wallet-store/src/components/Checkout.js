import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { addCheckoutSessionToDB, updateCheckoutSession } from './firebaseConfig';
import StripePaymentForm from './StripePaymentForm';


export default function Checkout(props) {
    const [salesTax, setSalesTex] = useState(null);
    const [updatedAmounts, setUpdatedAmounts] = useState(null);
    let location = useLocation();
    let state = location.state;
    const itemsList = state.itemsInCart;
    const subtotal = state.cartSubtotal;

    return (
        <div style={styles.mainContainer}>

            <div className='checkout-header-container' style={styles.headerContainer}>
                <Logo />
                <div className='checkout-progress-container' style={styles.progressContainer}>
                </div>
            </div>

            <div className='checkout-main-content' style={styles.mainContent}>
                <div style={styles.mainContentLeft}>
                    <h1 style={styles.containerTitle}>STANDARD CHECKOUT</h1>
                    <StripePaymentForm itemsInCart={itemsList} setUpdatedAmounts={setUpdatedAmounts}/>
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
                                <p>SHIPPING</p>
                                <p style={{ fontSize: '.85rem', fontWeight: '500', color: 'rgb(145,145,145)' }}>FREE</p>
                            </div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem' }}>
                                <p >TAX</p>
                                {updatedAmounts && <p className='checkout-amount-value'>${(updatedAmounts.taxAmount / 100).toFixed(2)}</p>}
                               {!updatedAmounts && <p style={{ fontSize: '.85rem', fontWeight: '500', color: 'rgb(145,145,145)' }}className='in-cart-price'>{'$' + (0).toFixed(2)|| 'N/a'}</p>}
                            </div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 300, fontSize: '.90rem' }}>
                                <p>SUBTOTAL</p>
                                <p style={{fontWeight: 500, color: 'rgb(145,145,145)'}} className='in-cart-price'>{"$" + subtotal.toFixed(2)}</p>
                            </div>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1.5rem 2rem 0' }}>
                                <p style={{ fontWeight: 400 }}>TOTAL</p>
                                {updatedAmounts && <p className='checkout-total-value'>${(updatedAmounts.totalWithTax / 100).toFixed(2)}</p>}
                                {!updatedAmounts && <p style={{ fontWeight: 600, fontSize: '1rem' }}>{('$' + (subtotal).toFixed(2))}</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export function Logo() {
    const navigate = useNavigate();
    return (
        <div className='logo-container' onClick={() => navigate('/')} style={styles.logoWrapper}>
            <div className='logo-border'>
                <p className='logo-text'>Drei</p>
            </div>
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
        // gridTemplateRows: '1fr 5fr',
        justifyContent: 'center',
        gap: '2rem',
    },

    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        maxHeight:'24.5vh',
        marginTop:'.5rem',
        padding:'1rem',
        gap:'1rem'
    },

    logo: {
        border: '.3rem solid var(--main-black)',
        padding: '1rem',
        // paddingBottom:'.5rem',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '900rem',
        fontSize: '1.8rem',
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
        // minHeight: '100%',
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
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap:'.5rem',
    },
}
