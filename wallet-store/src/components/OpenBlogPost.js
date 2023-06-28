import React from 'react';
import { useLocation, useParams } from 'react-router-dom';



export default function OpenBlogPost(props){
    const location = useLocation();
    const state = location.state;
    const {imageSrc, content, author, datePublished, summary} = state;
    const params = useParams();
    const {title, category} = params;
    return (
        <div style={{display:'grid'}} className='open-blog-container'>
          <div>
            {props.Menu}
          </div>
          <div className='open-blog-main-content' >
            <div className='blog-post-left' >
                <h1 style={{textAlign: 'left', color:'var(--main-blue)', fontSize:'2.6rem'}}>{title}</h1>
                <div className='open-post-image-wrapper'>
                    <img src={imageSrc} style={{width:'100%',height:'70%', objectFit:'cover', border:'var(--border-gray)', padding:'.2rem'}}/>
                </div>
                <p style={{whiteSpace:'pre-line', color:'rgb(140,140,140)'}}>{content}</p>
            </div>
            <div className='blog-post-right'>
                <div className='post-info-wrapper'>
                    <h3>About this post</h3>
                    <div style={{fontSize: '.9rem', color:'rgb(140,140,140)', fontWeight: 400, display:'flex', flexDirection:'column', gap:'.3rem'}}>
                        <p><span className='about-label'>Author: </span> {author}</p>
                        <p><span className='about-label'>Last Updated: </span>{datePublished}</p>
                        <div className='post-summary-wrapper'>
                            <p style={{fontWeight:600, fontSize:'.8rem', color:'var(--main-black)'}}>TLDR</p>
                            <p style={{fontSize:'.85rem', color:'rgb(140,140,140)', padding:'.5rem'}}>{summary}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}