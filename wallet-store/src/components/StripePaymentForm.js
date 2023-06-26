import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import UserInfoForm from './UserInfoForm';

const testKey = "pk_test_51NBAumEDoiHdZBdPSZDZyRWpHfgZoobdqDma0u9VDPtqFqqgoZ0hB6H51nqjxz4No7PpA7yKugNShyRpSlQz7RDN00rD25fBZo";
export const stripePromise = loadStripe(testKey);


export default function StripePaymentForm(props) {
    const [clientSecret, setClientSecret] = useState(null);
    const [checkoutId, setCheckoutId] = useState(null);
    const itemsInCart = props.itemsInCart;
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmedShipping, setConfirmedShipping] = useState(false);
    const [userId, setUserId] = useState(null)
    const [userFullName, setUserFullName] = useState('');
    const setUpdatedAmounts = props.setUpdatedAmounts;

    useEffect(() => {
        if (userId && !clientSecret) {
            createNewPaymentIntent(itemsInCart, userId, setCheckoutId, setClientSecret, setErrorMessage)
        }
    }, [userId, clientSecret])

    const options = {
        clientSecret: clientSecret,
        appearance: appearance
    };

    if (clientSecret) {
        return (
            <div>
                <Elements stripe={stripePromise} options={options}>
                    {confirmedShipping === false  ? (
                        <StripeAddressForm setConfirmedShipping={setConfirmedShipping} userId={userId} setUpdatedAmounts={setUpdatedAmounts}/>
                    ) : (
                        <StripePayForm setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>
                    )}
                </Elements>
            </div>
        );
    }

    else {
        return (
            <UserInfoForm setUserId={setUserId} setUserFullName={setUserFullName} />
        );
    };
};

function StripeAddressForm(props) {
    const [shippingElementValue, setShippingElementValue] = useState(null);
    const [shippingElementValid, setShippingElementValid] = useState(false);

    async function handleShippingSubmit(e) {
        e.preventDefault();
        if (shippingElementValid) {
            const payload = JSON.stringify(shippingElementValue )
            let result = await fetch(`https://dreiserver.com/user/${props.userId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                // mode:'no-cors',
                body: payload,
            })

            if(result){
                result = await result.json()
                console.log(result)
                props.setUpdatedAmounts(result)
                props.setConfirmedShipping(true)
            }
        }
    }

    return (
        <form className='payment-form' onSubmit={handleShippingSubmit}>
            <h2>SHIPPING INFORMATION</h2>
            <AddressElement
                onChange={(e) => {
                    setShippingElementValid(e.complete)
                    setShippingElementValue(e.value)
                }} 
                options={{mode:'shipping'}}
            /> 
            <button disabled={shippingElementValid ? false : true}> Confirm Shipping </button>
        </form>
    )
}

function StripeBillingForm() {
    return <AddressElement options={{mode:'billing'}} />
}

function StripePaymentElement(props) {
    return (
        <PaymentElement />
    );
};

const appearance = {
    theme: 'none',
    rules: {
        '.Input': {
            color: 'rgb(45,45,45)',
            fontSize: '.85rem',
            appearance: 'none',
            borderBottom: '.2rem solid rgb(246, 246, 246)',
            outline: '0px solid white !important'
        },
        '.Input:focus': { appearance: 'none', outline: 'none', border: 'none', borderBottom: '.2rem solid #1d1d1d', },
        '.Select': {
            color: 'green'
        },
        '.Label': {
            display: 'none',
            fontSize: '.75rem',
        },
    },
};


function StripePayForm(props) {
    const elements = useElements();
    const stripe = useStripe();
    const [isDisabled, setIsDisabled] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setIsDisabled(true)
        const res = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://dreiserver.com/order`,
            }
        })
        if(res.error){
            console.log(res)
            props.setErrorMessage(res.error.message)
            setIsDisabled(false)
        }
    }

    return (
        <form className='payment-form'>
            <h2>BILLING INFORMATION</h2>
            <StripeBillingForm/>
            <h2>Payment Information</h2>
            <StripePaymentElement />
            {props.errorMessage && <p style={{color:'red', fontWeight: 400, textAlign: 'center', fontSize: '.9rem'}}>{props.errorMessage}</p>}
            <button disabled={isDisabled} onClick={(e) => handleSubmit(e)} >Pay Now</button>         
        </form>
    )
}

//function to create new paymentIntent in server and stores info in DB, response includes checkout
//objectId and newly created paymentintent client secret
async function createNewPaymentIntent(cartItems, userId, setCheckoutId, setClientSecret, setErrorMessage) {
    let payload = JSON.stringify({ cartItems, userId });
    console.log(payload)
    let result = await fetch('https://dreiserver.com/checkout-session', {
        method: 'POST',
        headers: {
                    "Content-Type": "application/json",
        },
        body: payload,
    })
    console.log('was an error')
    if (result.status !== 200) {
        return setErrorMessage(result.statusText)
    }
    else {
        result = await result.json()
        console.log(result)
        setCheckoutId(result.id)
        setClientSecret(result.clientSecret)
    }
};

