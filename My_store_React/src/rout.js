import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Product from './comp/product';
import Home from './pages/home';
import Auth1 from './Auth/Auth1';
import Product_pc_category from './comp/product_py_category';
import Productdetail from './comp/productdetail';
import CartPage from './comp/cart';
import UserProfile from './Auth/UserProfile';
import Get_order from './comp/get_order';
function Rout() {

    const [cartItems, setCartItems] = useState([])
    
    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
    return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/product" element={<Product/>}/>
        <Route path='/auth' element={<Auth1/>} />
        <Route path='/get_products_by_category/:categoryId' element={<Product_pc_category />} />
        <Route path='/products_show/:id' element={<Productdetail />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/get_order' element={<Get_order />} />
    </Routes>
    </>
    )
}

export default Rout
