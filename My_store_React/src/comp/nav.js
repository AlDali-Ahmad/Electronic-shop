import React, { useState, useEffect } from 'react';
import { FaTruckMoving } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { CgLogIn } from 'react-icons/cg';
import { CgLogOut } from 'react-icons/cg';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiBleedingEye } from 'react-icons/gi';
import { BsSuitHeart } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import '../Css/nav.css';
import '../Css/search.css';

const Nav = () => {
  const path = useLocation();
  const isAuthPage = path.pathname === "/auth";
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // قم بفحص localStorage أو sessionStorage عند تحميل الصفحة
    const storedLoginStatus = localStorage.getItem('isLoggedIn');

    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    // عند تسجيل الدخول، قم بتحديث الحالة وحفظها في localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          'Accept': 'application/json',
          // استخدام الtoken المخزن في localStorage
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      if (response.status === 200) {
        alert('تم تسجيل الخروج بنجاح.');
        // اعادة التوجيه للصفحة الرئيسية
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
      } else {
        alert('فشل تسجيل الخروج.');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الخروج:', error);
      alert('حدث خطأ أثناء تسجيل الخروج.');
    }
  };

  // حالة لتخزين قيمة حقل البحث
  const [searchTerm, setSearchTerm] = useState("");

  // حالة لتخزين نتائج البحث
  const [searchResults, setSearchResults] = useState([]);

  // دالة لإجراء البحث
  const handleSearch = () => {
    // إنشاء طلب البحث باستخدام axios
    axios.get(`http://127.0.0.1:8000/api/products/search?search=${searchTerm}`)
      .then((response) => {
        // نجاح الاستجابة
        setSearchResults(response.data);
      })
      .catch((error) => {
        // حدث خطأ في الاستجابة
        console.error('Error fetching data:', error);
      });
  };

  if (isAuthPage) return null;
  return (
    <>
      <div className="free">
        <div className="icon">
          <FaTruckMoving />
        </div>
        <p>Free Shopping when shopping up to $1000</p>
      </div>
      <div className="main_header">
        <div className="cntainer">
          <div className="logo">
            <img src="./img/nhl.jpg" alt="logo" width="40px" height="40px" />
          </div>
          <div className="search_box">
            <input
              type="text"
              placeholder="Search Your Product..."
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="icon">
            <div className="account">
              <div className="user_icon">
                <Link to="/userprofile"><AiOutlineUser /></Link>
              </div>
              <p>Hello </p>
            </div>
            <div className="second_icon">
              <Link to="/" className="link"><AiOutlineHeart /></Link>
              <Link to="/cart" className="link"><BsBagCheckFill /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="nav">
            <ul>
              <li>
                <Link to='/' className="link">Home</Link>
              </li>
              <li>
                <Link to='/product' className="link">Product</Link>
              </li>
              <li>
                <Link to='/about' className="link">About</Link>
              </li>
              <li>
                <Link to='/contact' className="link">Contact</Link>
              </li>
              <li>
                <Link to='/get_order' className="link">Get Order</Link>
              </li>
            </ul>
          </div>

          <div className="auth">
            {isLoggedIn ? (
              <button onClick={handleLogout} className='logout'><CgLogOut /></button>
            ) : (
                <Link to='/auth' className="login" onClick={handleLogin}><CgLogIn /></Link>
              )}
          </div>
        </div>
      </div>
      <div className="cont">
        {searchResults.map((product, index) => (
          <div className='box1' key={index}>
            <Link to={'/'}>
              <button className='closebtn' ><AiOutlineClose /></button>
            </Link>
            <div className='img_box1'>
              <img src={product.Image} alt={product.ProductName} />
            </div>
            <div className='detail1'>
              <h3>{product.ProductName}</h3>
              <p>{product.Description}</p>
              <h4 className='price1'>Price: {product.Price}$</h4>
              <h4>Quantity: {product.Quantity}</h4>
              <button className="btn1">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default Nav;
