import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { stripePromise } from './StripePaymentForm';

export default function ConfirmedOrder(props) {
    const params = useParams();
    const payment_intent_client_secret = params.payment_intent_client_secret;
    const confirmationNumber = params.confirmation_number;

    const [orderData, setOrderData] = useState(null);

    //on first render get paymentIntent and store needed info
    useEffect(()=> {
        isOrder()
    }, [])

    
    async function isOrder(){
        let stripe = await stripePromise;
        let paymentIntentObj = await stripe.retrievePaymentIntent(payment_intent_client_secret);
        const paymentIntent = paymentIntentObj.paymentIntent;
        console.log(paymentIntent)
        const orderData = {
            totalAmountBilled: paymentIntent.amount,
            confirmationNumber: confirmationNumber,
            contactEmail: paymentIntent.receipt_email,
            timeOfOrder: paymentIntent.created,
        };
        setOrderData(orderData);
    }


    if(orderData){
        return (
            <div className='confirmation-page-container'>
                {props.Menu}
                <div className='confirmation-main-content'>
                    <div className='order-info-container'>
                        <p style={{fontWeight: 600, color:'#1377cd', fontSize:'1.5rem'}}>Thank you, your order has been placed.</p>
                        <p style={{marginTop:'-.5rem', fontWeight: 500, fontSize: '1.1rem', color:'rgb(90,90,90)'}}>Order Number: {orderData.confirmationNumber}</p>
                        <p>An email confirmation will be sent to <span style={{fontWeight: 600, textDecoration:'underline',fontStyle:'italic' }}>{orderData.contactEmail}</span>. <br/> We will send you an email with tracking information as soon as it is available.</p>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <h1>SOMETING WONG!</h1>
    )
}