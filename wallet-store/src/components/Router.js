import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import ConfirmedOrder from "./ConfirmedOrder";
import Home from "./Home";
import Menu from "./Menu";
import OpenedProduct from "./OpenedProduct";
import Shop from "./Shop";
import AboutUs from "./AboutUs"
import AdminLogin from "./AdminLogin";
import AdminHome from "./AdminHome";
import Blogs from './Blogs'
import OpenBlogPost from "./OpenBlogPost";


export default function Router(props){
    const removeItemFromCart = props.removeItemFromCart;
    const menu = <Menu addItemToBag={props.addItemsToCart} itemsInCart={props.itemsInCart} removeItemFromCart={removeItemFromCart}/>;

    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home Menu={menu} />}/>
                <Route path="/shop" element={<Shop Menu={menu} />} />
                <Route path="/about" element={ <AboutUs Menu={menu}/> }/>
                <Route path="/shop/:productID" element={<OpenedProduct Menu={menu} addItemToBag={props.addItemsToCart}/>} />
                <Route path='/checkout' element={<Checkout itemsInCart={props.itemsInCart} />} />
                <Route path='/admin/home' element={<AdminHome/>} />
                <Route path="/confirmation/:payment_intent_client_secret/:confirmation_number" element={<ConfirmedOrder Menu={menu} /> } />
                <Route path='/admin' element={<AdminLogin/>} />
                <Route path='/blog' element={<Blogs Menu={menu}/>} />
                <Route path='/blog/:title/:category' element={<OpenBlogPost Menu={menu}/>} />
            </Routes>
            </BrowserRouter>
        </div>

    )
}

