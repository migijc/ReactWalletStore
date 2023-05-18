import React from 'react';
import {AiFillStar} from 'react-icons/ai'

export default function FiveStarsDisplay(props){
    return (
        <div className={props.class}>
          <div>
            <p style={{color: 'gray', fontWeight: 600,}}>{props.starsContainerMessage}</p>
          </div>  
          <div style={{display: 'flex', gap: '.7rem', fontSize: '1.6rem'}}>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
            <AiFillStar style={{color: "#ffc906"}}/>
          </div>          
        </div>
    )
}