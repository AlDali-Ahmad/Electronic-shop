import React from 'react'
import { BsFacebook } from 'react-icons/bs';
import { FiLinkedin } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai';
import { useLocation } from "react-router-dom";
import '../Css/footer.css'

function Footer() {
  // استخدام useLocation للوصول إلى معلومات المسار الحالي
  const path = useLocation()
  
  // التحقق مما إذا كان المسار الحالي هو صفحة المصادقة
  const isAuthPage = path.pathname === "/auth";
  
  // إذا كان المسار الحالي هو صفحة المصادقة، سنعيد قيمة فارغة (لا تعرض القدم)
  if (isAuthPage) return null;

  return (
    <>
      <div className='footer'>
        <div className='container'>
          <div className='about'>
            <div className='logo'>
              <img src='./img/nhl.jpg' alt='logo' width="75px" height="75px"></img>
            </div>
            <div className='detail'>
              <p>WE are a team Designers and developers that create high quality</p>
              <div className='icon'>
                <li><BsFacebook/></li>
                <li><FiLinkedin/></li>
                <li><AiFillGithub/></li>
              </div>
            </div>
          </div>
          <div className='account'>
            <h3>My Account</h3>
            <ul>
              <li>Account</li>
              <li>Order</li>
              <li>create</li>
              <li>Shipping</li>
              <li>return</li>
            </ul>
          </div>
          <div className='page'>
            <h3>Pages</h3>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Terma & Condition</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
