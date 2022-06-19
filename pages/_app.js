import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    try {
      let myCart = localStorage.getItem('cart');
      if (myCart) setCart(JSON.parse(myCart));
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let index = 0; index < keys.length; index++) {
      subt += myCart[keys[index]].price * myCart[keys[index]].qty;
    }
    setSubtotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;

    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const removeFromCart = (itemCode, qty) => {
    let oldCart = cart;
    if (itemCode in oldCart) {
      oldCart[itemCode].qty = oldCart[itemCode].qty - qty;
    }
    if (oldCart[itemCode]["qty"] <= 0) {
      delete oldCart[itemCode];
    }
    setCart(oldCart);
    saveCart(oldCart);
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  return <>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
