import React from 'react';

export default function Loader(props){

    return (
        <div className='loader-container'>
            <div  style={{width: '100%'}}>
                {props.Menu}
            </div>

            <div className='loader-content'>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}