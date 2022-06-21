import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);


  useEffect(() => {
    router.events.on("routerChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      let myCart = localStorage.getItem('cart');
      if (myCart) {
        setCart(JSON.parse(myCart));
        saveCart(JSON.parse(myCart));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query])

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    toast.success('Logout Successful', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push("/");
  }

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
      newCart[itemCode] = { qty, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    console.log(itemCode);
    let newCart = {};
    newCart[itemCode] = { qty, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
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
    <LoadingBar
      color='rgb(219, 39, 119)'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Navbar key={key} user={user} logout={logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} buyNow={buyNow} {...pageProps} />
    <Footer />
  </>
}

export default MyApp
