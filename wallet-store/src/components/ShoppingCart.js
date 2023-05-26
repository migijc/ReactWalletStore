import React, { useEffect, useState } from 'react';
import {RiShoppingCartLine} from 'react-icons/ri';
import {IoMdClose} from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom';
import { createNewCheckoutSessionID } from './firebaseConfig';



export default function ShoppingCart(props){
    const [totalItems, setTotalItems] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [isCartOpened, setIsCartOpened] = useState(false);
    const [cartList, setCartList] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const params = useParams();
    const navigate = useNavigate();
    const testAdd = props.addItemToBag;
    const itemsInBag = props.itemsInBag;

    function removeItemFromCart(item) {
        props.removeItemFromCart(item)
    }

    function handleCheckoutClick(){
        const session = createNewCheckoutSessionID();
        const sessionID = session.id;
        navigate(
            `/checkout/${sessionID}`,
            {state: {itemsInCart: cartList, cartSubtotal: totalCartPrice}}
            )
    }

    useEffect(()=>{
        let newCart = {}
        let cartArry = []
        let totalPrice = 0;
        itemsInBag.forEach(item =>{
            if(newCart[item.productID]){
                newCart[item.productID].quantity += 1;
                newCart[item.productID].totalPrice += item.price
                totalPrice += item.price;
  
            }
            else{
                newCart[item.productID] = item;
                newCart[item.productID].quantity = 1;
                newCart[item.productID].totalPrice = item.price
                totalPrice += item.price;
            }
        })
        for(let keys in newCart){
            cartArry.push(newCart[keys])
        }
        setCartList(cartArry)
        setTotalCartPrice(totalPrice);
    },[props.itemsInBag])


     return (
        <div className='shopping-cart-container'>
            {isCartOpened === false && <ShoppingCartIcon stateSetter={setIsCartOpened} isCartOpened={isCartOpened} testAdd={testAdd} totalItems={props.itemsInBag.length} cartList={cartList}/>}
            {isCartOpened && (
            <div className='open-shopping-cart-container'>
                <div className='opened-cart'>
                    <div className='cart-title-wrapper'>
                        <h1 >Shopping cart</h1>
                        <div className='close-menu-container' onClick={()=>setIsCartOpened(!isCartOpened)}>
                            <IoMdClose/>
                        </div>
                    </div>

                    <div className='added-items-container'>
                        {itemsInBag.length === 0 && <p style={{textAlign: 'center', fontWeight: 300, color:'rgb(170,170,170)' }}>(No items in cart)</p>}
                        {itemsInBag.length > 0 && 
                            <div className='all-items-cart-container'>
                                {cartList.map(item => {
                                    return <ItemInCart item={item} removeItem={removeItemFromCart} incrementItemQuantity={testAdd}/>
                                })}
                            </div>}
                    </div>

                    <div className='checkout-button-container'>
                        <div className='cart-total-price-container'>
                                <span style={{display: 'flex', gap: '.7rem'}}>
                                    <p className='cart-total-price'>Total</p>
                                    <p style={{color: 'rgb(140,140,140)', fontSize:'.85rem'}}>Not including sales tax</p>
                                </span>
                                <p className='cart-total-price'>{"$" + totalCartPrice.toFixed(2)}</p>
                        </div>
                        <button onClick={handleCheckoutClick} className='checkout-button'>Checkout</button>
                    </div>
                </div>
            </div>
            )}
        </div>


        )       
};

function ShoppingCartIcon(props){
    const [chageInCart, setChangeInCart] =useState(false);

    useEffect(()=>{
        console.log('11')
    }, [chageInCart])

    useEffect(()=>{
        setChangeInCart(!chageInCart)
    }, [props.totalItems])

    useEffect(() => {
        if(chageInCart){
            setTimeout(()=>{
                setChangeInCart(!chageInCart)
            }, 1300)
        }
    }, [chageInCart])
    
    return (
        <div onClick={() => props.stateSetter(!props.isCartOpened)} className='shopping-cart-icon-wrapper'>
            <RiShoppingCartLine style={{color:'white', fontSize: '1.4rem'}}/>
            <div className={chageInCart ? 'cart-icon-quantity-wrapper change-in-cart' : 'cart-icon-quantity-wrapper'} style={
                {
                    color:"white", 
                    fontWeight: 500, 
                    fontSize: '.8rem', 
                    borderRadius: '900rem',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    padding: '.2rem',
                    }
                    }>
                      <p style={
                        {    
                    textAlign:'center',
                    height: '100%',
                    border:'.125rem solid white',
                    width: '1.2rem', 
                    height: '1.2rem',
                    // padding:'.2rem',
                    borderRadius: '900rem',
                    }
                    }> {props.totalItems}</p>
            </div>  
        </div>
    )
}

function ItemInCart(props){
    let item = props.item

    return (
        <div className='item-in-cart-container'>
            <div style={{height: '100%', display: 'flex', alignItems:'center', position: 'relative',}}>
                <img src={item.mainImage} style={{width: '100%', height: 'auto',}}/>
                <div className='quantity-cart-item'>
                    <p>{item.quantity}</p>
                </div>
            </div>

            <div className='in-cart-main-data'>
                <p className='in-cart-name'>{item.name}</p>
                <p className='in-cart-type'>{item.productType}</p>
                <p className='in-cart-price'>{'$' + item.totalPrice.toFixed(2)}</p>
            </div>

            <div className='in-cart-quantity-wrapper'>
                <div className='in-cart-quantity-selector'>
                    <div><button onClick={()=>{props.removeItem(item)}}>-</button></div>
                    <div className='in-cart-quantity-text'>
                        <p style={{textAlign:'center'}}>{item.quantity}</p> 
                    </div>
                    <div><button onClick={()=>props.incrementItemQuantity(item)}>+</button></div>   
                </div>
            </div>

        </div>
    )
}