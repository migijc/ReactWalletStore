import React from "react";
import { Logo } from "./Checkout";

export default function AdminLogin(){

    return (
        <div className="login-page-container">
            <div className="login-header-wrapper">
                <Logo/>
                <h1 style={{fontSize:'1.4rem'}}>Admin Portal</h1>   
            </div>

            <form method="GET" action="https://dreiserver.com/admin" className="admin-form">
                <div className="input-wrapper">
                    <input className="login-input" name="username" placeholder="Username"/>
                </div>
                <div className="input-wrapper">
                    <input type="password" className="login-input" name="password" placeholder="Password"/>
                </div>
                <button className="admin-page-login-button">Login</button>
            </form>
        </div>
    )
}