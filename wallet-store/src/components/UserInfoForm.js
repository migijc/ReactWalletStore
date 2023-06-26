import React, { useState } from 'react';

export default function UserInfoForm(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);

    const getFormData = () => {
        return {firstName, lastName, email, phoneNumber}
    };

    async function getUserId(e){
        e.preventDefault()
        try{
            const formData = getFormData();
            const payload =  JSON.stringify(formData)
            console.log(payload)

            let result = await fetch('https://dreiserver.com/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: payload,
            })
            console.log(result)
            result = await result.json();
            console.log(result)
            props.setUserId(result.userId);
            return props.setUserFullName(result.userFullName);
        }
        
        catch(err){
            //
            console.log(err)
            setError(err)
        }

}

    return (
        <form className='user-info-form payment-form' onSubmit={getUserId}>
            <h2>BASIC INFORMATION</h2>
            <input required onChange={(e)=> {setFirstName(e.target.value)}} name="firstName" placeholder='First Name'/>
            <input required onChange={(e)=> {setLastName(e.target.value)}} name='lastName' placeholder='Last Name'/>
            <input required onChange={(e)=> {setEmail(e.target.value)}} type="email" name="email" placeholder='Email'/>
            <input required onChange={(e)=> {setPhoneNumber(e.target.value)}} type="number" name="phoneNumber" placeholder='Phone Number'/>
            <button>Next</button>
        </form>
    )
}

