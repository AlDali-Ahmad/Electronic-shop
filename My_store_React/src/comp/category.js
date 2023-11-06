import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import '../Css/home.css';

function Category() {
    // حالة لتخزين الفئات
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // استدعاء API للحصول على الفئات عند تحميل المكون
        axios.get('http://127.0.0.1:8000/api/get_categories')
            .then(response => {
                // تحديث حالة الفئات بالبيانات المسترجعة من الاستدعاء
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error in Get Data   :', error);
            });
    }, []);

    return (
        <div className='product_type'>
            <h2>Categories</h2>
            <div className='container'>
                {categories.map((category, index) => (
                    <div className='box' key={index}>
                        <div className='img_box'>
                            {/* ربط كل عنصر بصفحة تفاصيل الفئة باستخدام React Router */}
                            <Link to={`get_products_by_category/${category.id}`}>
                                <img src={category.Image} alt={category.CategoryName} />
                            </Link>
                        </div>
                        <div className='detail'>
                            <h3>{category.CategoryName}</h3>
                            <p>{category.Description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category;
