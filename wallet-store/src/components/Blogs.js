import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import BlogPostButtons from "./BlogPostButtons";
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader";


export default function Blogs(props){
    const [blogs, setBlogs] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('https://dreiserver.com/blog', {method: 'GET'})
            .then(async (res) => {
               return res.json()
            })
            .then(res => {
                setBlogs(res)
            })
    }, [])

    


    if(blogs){
        return (
            <div className="blogs-page-container">
                <div>
                    {props.Menu}
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <h1>Blog</h1>
                </div>
                <div className="blogs-wrapper">
                    {blogs.map(blog => {
                        return (
                            <div className="blog-post"  
                                  onClick={
                                    ()=> navigate(
                                        `/blog/${blog.title}/${blog.category}`,
                                         {
                                            state: {
                                                imageSrc: blog.featuredImage,
                                                content:blog.content,
                                                author: blog.authorName,
                                                datePublished: blog.publishOn,
                                                summary: blog.summary,
                                            }
                                        }
                                    )}>
                                <div className="post-data-wrapper">
                                    <h2>{blog.title}</h2>
                                    <h3>{blog.category}</h3>
                                    {/* <p>{blog.authorName}</p> */}
                                </div>
                                <div className="blog-image-wrapper">
                                    <img src={blog.featuredImage}/>
                                </div>

                                <div className="post-content">
                                    <p>{blog.summary}</p>
                                    <button className="see-post-button" >Read Article</button>
                                </div>
                                <BlogPostButtons />
                            </div>
                        )
                    })}
                </div>
                <Footer/>
            </div>
        )
    } 
    else {
        return (
            <Loader Menu={props.Menu}/>
        )
    }

}