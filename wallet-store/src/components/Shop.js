import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWalletInformation, getWalletsFromSolidCol } from "./firebaseConfig";

export default function Shop(props){
    const navigate = useNavigate();
    const [aluminumWalletsInfo, setAluminumWalletsInfo] = useState(null)
    const handleClick = (id, product) => navigate(`${id}`, {state: {currentProduct: product, allProducts: solids.concat(designs), walletInfo: aluminumWalletsInfo,}})
    const [solids, setSolids] = useState(null);
    const [designs, setDesigns] = useState(null);

    async function getWallets(collectionString, stateChanger){
        let walletsSolid = []
        let result = await getWalletsFromSolidCol(collectionString);
        console.log(result)
        result = result.withClip.values;
        let walletsInfo = await getWalletInformation()
        result.forEach(item=>{
            let product = {
                productID: item.id,
                name: item.displayName,
                mainImage: item.image,
                price: +walletsInfo.price,
                productType: walletsInfo.productType,
            }
            walletsSolid.push(product)
        })
        
        stateChanger(walletsSolid)
        setAluminumWalletsInfo(walletsInfo)
    }

    useEffect(()=>{
        getWallets('solids', setSolids)
        getWallets('designs', setDesigns)
    }, [])

    if(aluminumWalletsInfo && solids && designs){
            return (
        <div className="shop-page-wrapper">
                {props.Menu}
            <div className="shop-main-content">
                <div className="shop-side-bar" style={{padding: '10rem 2rem'}}>
                    <h2 style={{fontSize:'1.1rem', color: 'rgb(30,30,30)'}}>Wallets</h2>
                    <div style={{fontSize:'.9rem'}}>
                        <p style={{color:'rgb(80,80,80)'}}>Aluminum</p>
                    </div>
                </div>
                <div className="displayed-products-container">
                    {
                        (solids.concat(designs)).map((product) => {
                            return (
                                <div onClick={()=> handleClick(product.productID, product)} className="product-container">
                                    <div className="product-image-container">
                                        <img className="product-main-image" src={product.mainImage} alt="product"/>
                                    </div>
                                    <div className="product-card-info">
                                        <p className="product-type">{product.productType}</p>
                                        <p className="product-name">{product.name}</p>
                                        <p className="product-price">{'$'+product.price}</p>                
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
    }
}
