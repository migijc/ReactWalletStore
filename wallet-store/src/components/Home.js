import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";
import ThreeEnv from "./ThreeEnv";

export default function Home() {
    return (
        <div className="home-container">
            <Menu/>
            <button className="shop-now-button">Shop Now</button>
            {/* <p>Home Screen</p> */}
            <ThreeEnv/>
            <Footer/>
        </div>
    )
}