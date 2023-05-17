import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import OpenedProduct from "./OpenedProduct";
import Shop from "./Shop";
export default function Router(){
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:productID" element={<OpenedProduct />} />
          </Routes>
        </BrowserRouter>
    )
}