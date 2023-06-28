import React, { useState } from "react";

export default function AdminHome(){
    const [formContainer, setFormContainer] = useState(false)
    

    return (
        <div className="admin-home-container">
            <div className="admin-portal-header">
                <h1>Drei Admin Portal</h1>
            </div>

            <div className="admin-main-content">
                <div>
                    <h2>Blogs</h2>
                    <div className="blog-actions-container">
                        <div>
                            <button>New Blog Post</button>
                        </div>
                        <div>
                            <button>New Author</button>
                        </div>
                        <div>
                            <button>New Blog Category</button>
                        </div>
                        {/* <div>
                            <button>Create New Blog</button>
                        </div> */}
                    </div>
                </div>

                <div>
                    <h2>Orders</h2>
                </div>

                <div className="admin-form-container">
                    <h1>New</h1>
                    <NewBlogForm/>
                </div>
            </div>
        </div>
    )
}

function NewBlogForm(){
    return (
        <form method="POST" action="https://dreiserver.com/blog" className="blog-form" style={{display: 'grid', gap: '.5rem'}} encType="multipart/form-data">

            <div className="form-left">
                <div className="blog-input-container">
                    <input name="author" placeholder="Author"/>
                    <input name="category" placeholder="Category"/>
                </div>

                <input name="blogTitle" placeholder="Title"/>
                <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', }}>
                    <div className="image-select-container">
                        <input name="featuredImage" type="file"/>
                    </div>
                    <div>
                        <input name="publishOn" type="date"/>
                    </div>
                </div>
                <textarea name="content" placeholder="Blog content..."/>
            </div>
            
            <div className="form-right">
                    <textarea name="tags" placeholder="Tags(Relevant keywords to be used for SEO)"/>
                    <textarea name="blogSummary" placeholder="Summary"/>
            </div>
           
            <button>Post Blog</button>
        </form>
    )
}