import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBleedingEye } from 'react-icons/gi';
import { BsSuitHeart } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import '../Css/home.css'

function Product_pc_category({  }) {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get_products_by_category/${categoryId}`)
        .then(response => {
        setProducts(response.data);
        //console.log(response.data);
        //console.log(categoryId);
        })
        .catch(error => {
        console.error('Error in Get Data  :', error);
        });
        
    }, [categoryId]);

return (
<div className='product'>
            <h2>Products</h2>
            <div className='container'>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div className='box' key={index}>
                            <div className='img_box'>
                                <img src={product.Image} alt={product.ProductName} />
                                <div className='icon'>
                                    <li><AiOutlineShoppingCart /></li>
                                    <Link to={`/products_show/${product.id}`}><li><GiBleedingEye /></li></Link>
                                    <li><BsSuitHeart /></li>
                                </div>
                            </div>
                            <div className='detail'>
                                <h3>{product.ProductName}</h3>
                                <p>{product.Description}</p>
                                <h4 className='price'>Price: ${product.Price}</h4>
                                <h4>Quantity: {product.Quantity}</h4>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
)
}

export default Product_pc_category