import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBleedingEye } from 'react-icons/gi';
import { BsSuitHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom'; 
import '../Css/home.css';
import axios from 'axios';

function Home_product() {
const [prodeucts, setprodeucts] = useState([]);

useEffect(() => {
    // استدعاء الـ API وجلب البيانات
    axios.get('http://127.0.0.1:8000/api/get_products')
    .then(response => {
        //جلب اول اربع منتجات 
        setprodeucts(response.data.slice(0, 4));
    })
    .catch(error => {
        console.error('Error in Get Top Product :', error);
    });
}, []);

return (
    <div className='product'>
        <h2>Top Products</h2>
    <div className='container'>
        {prodeucts.map((prodeuct, index) => (
        <div className='box' key={index}>
            <div className='img_box'>
            <img src={prodeuct.Image} alt={prodeuct.ProductName}/>
                <div className='icon'>
                    <li><AiOutlineShoppingCart/></li>
                    <Link to={`/products_show/${prodeuct.id}`}><li><GiBleedingEye/></li></Link>
                    <li><BsSuitHeart/></li>     
                </div>
            </div>
            <div className='detail'>
                <h3>{prodeuct.ProductName}</h3>
                <p>{prodeuct.Description}</p>
                <h4 className='price'>Price :{prodeuct.Price}$</h4>
                <h4>Quantity :{prodeuct.Quantity}</h4>
            </div>
        </div>
        ))}
    </div>
    </div>
);
}
export default Home_product