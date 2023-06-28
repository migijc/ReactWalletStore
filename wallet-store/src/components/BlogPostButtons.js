import React, { useState } from "react";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {TbMessageCircle2} from 'react-icons/tb'

export default function BlogPostButtons(){
    const [postLiked, setPostLiked] = useState(false)

    return(
        <div className="blog-buttons-wrapper">
            {!postLiked && <AiOutlineHeart onClick={()=> setPostLiked(true)}/>}
            {postLiked && <AiFillHeart opacity={.5} color="var(--main-blue)"/>}
            <TbMessageCircle2 />
        </div>
    )
}