import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import '../Css/productdetail.css'
function Productdetail() {
    const { id } = useParams();
    const [products, setproduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // استدعاء API لجلب تفاصيل الطلب بناءً على معرف الطلب
        axios.get(`http://localhost:8000/api/products_show/${id}`)
            .then(response => {
                setproduct(response.data);
                setLoading(false);
                //console.log(id);
                //console.log(response.data);
            })
            .catch(error => {
                console.error('Error in Get Details Product :', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    const listImage = JSON.parse(products.ListImage || '{}');

return (
    <>
    <div className='product_detail'>
        <div className='container'>
            <Link to={'/product'}>
            <button className='closebtn' ><AiOutlineClose/></button>
            </Link>
            
            <div className='productbox'>
                <div className='img-box'>
                    <img src={products.Image} alt={products.ProductName} width='250px' height='250px'></img>
                </div>
                <div className='detail'>
                    <h2>{products.ProductName}</h2>
                    <p>{products.Description}</p>
                    <h3>${products.Price}</h3>
                    <p>Quantity: {products.Quantity}</p>
                    <button>Add To Cart</button>
                </div>                
            </div>
            <div className='list_image'>
            <img src={listImage.Image} alt={`Image`} width='150px' height='150px' />
            <img src={listImage.Image1} alt={`Image 1`} width='150px' height='150px' />
            <img src={listImage.Image2} alt={`Image 2`} width='150px' height='150px' />
            </div>

        </div>
    </div>        
    </>
)
}
export default Productdetail
