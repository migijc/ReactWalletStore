import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';


const testKey = "pk_test_51NBAumEDoiHdZBdPSZDZyRWpHfgZoobdqDma0u9VDPtqFqqgoZ0hB6H51nqjxz4No7PpA7yKugNShyRpSlQz7RDN00rD25fBZo";
const secretKey = "sk_test_51NBAumEDoiHdZBdPflzwCuJg6AWHzbZaBPOQBL6JWSQUmGGwtHcGkCRX6M4gL6gh4uGcp8IilFWSopB21PmPZYjT00JokvXULF";
export const stripePromise = loadStripe(testKey);


export default function StripePaymentForm(props) {
    
    const options = {
        clientSecret: props.clientSecret,
        appearance: {
            theme: 'none',
            rules: {
                '.Input': {
                    color:'rgb(45,45,45)',
                    fontSize: '.85rem',
                    appearance: 'none',
                    borderBottom: '.2rem solid rgb(246, 246, 246)',
                    outline: '0px solid white !important'
                },
                '.Input:focus': {appearance: 'none', outline: 'none', border: 'none', borderBottom: '.2rem solid #1d1d1d',},
                '.Select': {
                    color: 'green'
                },
                '.Label': {
                    display: 'none',
                    fontSize: '.75rem',
                }
            }
        },
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            {props.paymentForm && <PaymentForm isPaymentValid={props.setIsPaymentValid} />}
            {props.shippingForm && <AddressForm
                setElementsRef={props.setElementsRef}
                setShipping={props.setShipping}
                setIsShippingValid={props.setIsShippingValid}
                setStripeRef={props.setStripeRef}
                />}
        </Elements>
    )
}



function PaymentForm(props) {


    return <PaymentElement onChange={(e)=> props.isPaymentValid(e.complete)}/>
}


function AddressForm(props){
    const elements = useElements();
    const stripe = useStripe();
    
    useEffect(() =>{
        if(elements && stripePromise){
            props.setElementsRef(elements)
            stripePromise.then(res => {
                return props.setStripeRef(res);
            })
        }
    })
    
    
    function handleChange(e){
        // if(props.mode === 'shipping'){
            if(props.setShipping){
                props.setShipping(e.value)
            }
            props.setIsShippingValid(e.complete)
        // } else {
        //     return 
        // }

    }

    return <AddressElement  onChange={(e)=> handleChange(e)} options={{mode: 'billing'}}/>
}
