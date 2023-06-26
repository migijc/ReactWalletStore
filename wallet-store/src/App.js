import { useEffect, useState } from "react";
import Router from "./components/Router";
function App() {
  const [itemsInCart, setItemsInCart] = useState([]);

  // function addItemsToCart(items) {setItemsInCart(items)}

  const addItemToCart = (item) => {
    setItemsInCart([...itemsInCart, item ])
  }

  const removeItemFromCart = (item) => {
    let arrCopy = [...itemsInCart];
    let i = arrCopy.indexOf(item);
    if(i !== -1){
      if(i === arrCopy.length - 1) {
        arrCopy.pop()
      } else {
        arrCopy.splice(i, 1)
      }
    }
    setItemsInCart(arrCopy)
    // console.log(arrCopy)
  }

  return (
    <div className="App">
      <Router addItemsToCart={(items) => addItemToCart(items)} itemsInCart={itemsInCart} removeItemFromCart={removeItemFromCart}/>
    </div>
  );
}

export default App;
