import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBleedingEye } from 'react-icons/gi';
import { BsSuitHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../Css/home.css';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل

  // دالة لإضافة المنتج إلى سلة التسوق
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    alert("Active product added");
  };

  useEffect(() => {
    // استدعاء الـ API وجلب البيانات عند تحميل المكون
    axios.get('http://127.0.0.1:8000/api/get_products')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false); // بمجرد تحميل البيانات بنجاح، قم بتعيين حالة التحميل إلى false
      })
      .catch(error => {
        console.error('An error occurred in fetching data :', error);
        setIsLoading(false); // في حالة حدوث خطأ أيضًا، قم بتعيين حالة التحميل إلى false
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // عنصر "تحميل"
      ) : (
        <div className='product'>
          <h2># All Products 💖</h2>
          <div className='container'>
            {products.map((product, index) => (
              <div className='box' key={index}>
                <div className='img_box'>
                  <img src={product.Image} alt={product.ProductName} />
                  <div className='icon'>
                    <li onClick={() => addToCart(product)}>
                      <AiOutlineShoppingCart />
                    </li>
                    {/* استخدام React Router لإنشاء رابط لصفحة عرض المنتج */}
                    <Link to={`/products_show/${product.id}`}>
                      <li><GiBleedingEye /></li>
                    </Link>
                    <li><BsSuitHeart /></li>
                  </div>
                </div>
                <div className='detail'>
                  <h3>{product.ProductName}</h3>
                  <p>{product.Description}</p>
                  <h4 className='price'>Price: {product.Price}$</h4>
                  <h4>Quantity: {product.Quantity}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Product;
