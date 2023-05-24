import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';


const testKey = "pk_test_51NBAumEDoiHdZBdPSZDZyRWpHfgZoobdqDma0u9VDPtqFqqgoZ0hB6H51nqjxz4No7PpA7yKugNShyRpSlQz7RDN00rD25fBZo";
const secretKey = "sk_test_51NBAumEDoiHdZBdPflzwCuJg6AWHzbZaBPOQBL6JWSQUmGGwtHcGkCRX6M4gL6gh4uGcp8IilFWSopB21PmPZYjT00JokvXULF";
const stripePromise = loadStripe(testKey);
// const stripe = require('stripe')(testKey)


export default function StripePaymentForm(props) {
    

    const options = {
        clientSecret: props.clientSecret,
    }


    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm setStripeRef={props.setStripeRef} setElementsRef={props.setElementsRef}/>
        </Elements>
    )
}

function PaymentForm(props) {
    const elements = useElements()
    const stripe = useStripe()

    useEffect(() =>{
        if(elements && stripe){
            props.setElementsRef(elements)
            props.setStripeRef(stripe)
        }
    }, [elements])
    return <PaymentElement />
}
