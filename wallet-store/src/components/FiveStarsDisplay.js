import React from 'react';
import {AiFillStar} from 'react-icons/ai'

export default function FiveStarsDisplay(props){
    return (
        <div className={props.class}>
          <div>
            <p style={{color: 'gray', fontWeight: 400,}}>{props.starsContainerMessage}</p>
          </div>  
          <div style={{display: 'flex', fontSize: props.fontSize}}>
            <AiFillStar style={{color: props.color || "#ffc906"}}/>
            <AiFillStar style={{color: props.color || "#ffc906"}}/>
            <AiFillStar style={{color: props.color || "#ffc906"}}/>
            <AiFillStar style={{color: props.color || "#ffc906"}}/>
            <AiFillStar style={{color: props.color || "#ffc906"}}/>
          </div>          
        </div>
    )
}