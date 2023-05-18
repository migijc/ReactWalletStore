import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import OpenedProduct from "./OpenedProduct";
import Shop from "./Shop";
import {scrape} from 'aliexpress-product-scraper';


export default function Router(){
    // const scrape = require('aliexpress-product-scraper');
    // const product = scrape(3256804842971685).then(result => {
    //     console.log(result)
    // })

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

