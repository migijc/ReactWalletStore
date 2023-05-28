import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { stripePromise } from './StripePaymentForm';

export default function ConfirmedOrder(props) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const clientSecret = searchParams.get('payment_intent_client_secret')
    const [orderData, setOrderData] = useState(null);


    useEffect(()=> {
        isOrder()
    }, [])

    async function isOrder(){
        let stripe = await stripePromise;
        let paymentIntentObj = await stripe.retrievePaymentIntent(clientSecret);
        const paymentIntent = paymentIntentObj.paymentIntent;
        const shipping = paymentIntent.shipping

        const orderData = {
            totalAmountBilled: paymentIntent.amount,
            confirmationNumber: paymentIntent.created,
            shippingInformation: shipping,
            contactEmail: paymentIntent.receipt_email,

        };

        setOrderData(orderData);
    }

    function getAddressString(){
        return (
            `${orderData.shippingInformation.address.line1}, ${orderData.shippingInformation.address.line2}, ${orderData.shippingInformation.address.city}, ${orderData.shippingInformation.address.state} ${orderData.shippingInformation.address.postal_code}`
       
        )
    }


    if(orderData){
        return (
            <div className='confirmation-page-container'>
                {props.Menu}
                <div className='confirmation-main-content'>
                    <div className='order-info-container'>
                        <p style={{fontWeight: 600, color:'#1377cd', fontSize:'1.5rem'}}>Thank you, your order has been placed.</p>
                        <p style={{marginTop:'-.5rem', fontWeight: 500, fontSize: '1.1rem', color:'rgb(90,90,90)'}}>Order Number: SH-{orderData.confirmationNumber}</p>
                        <p>An email confirmation will be sent to <span style={{fontWeight: 600, textDecoration:'underline',fontStyle:'italic' }}>{orderData.contactEmail}</span>. <br/> We will send you an email with tracking information as soon as it is available.</p>
                        <p>Your package will be delivered to:<br/> {getAddressString()} </p>
                        <p style={{fontSize: '.80rem', padding:'1rem'}}>*Please contact our support team immediately if the address above is incorrect</p>
                    </div>
                </div>
            </div>
        )
    }
}