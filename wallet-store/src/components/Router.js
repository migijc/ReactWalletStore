import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import ConfirmedOrder from "./ConfirmedOrder";
import Home from "./Home";
import Menu from "./Menu";
import OpenedProduct from "./OpenedProduct";
import Shop from "./Shop";
// import ShoppingCart from "./ShoppingCart";


export default function Router(props){
    const removeItemFromCart = props.removeItemFromCart;
    const menu = <Menu addItemToBag={props.addItemsToCart} itemsInCart={props.itemsInCart} removeItemFromCart={removeItemFromCart}/>;

    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home Menu={menu} />}/>
                <Route path="/shop" element={<Shop Menu={menu} />} />
                <Route path="/shop/:productID" element={<OpenedProduct Menu={menu} addItemToBag={props.addItemsToCart}/>} />
                <Route path='/checkout/:checkoutID' element={<Checkout />} />
                <Route path="/confirmation" element={<ConfirmedOrder Menu={menu} /> } />
            </Routes>
            </BrowserRouter>
        </div>

    )
}

