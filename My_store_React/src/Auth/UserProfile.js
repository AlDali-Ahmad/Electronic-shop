import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userprofile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);

  // استخدم useEffect لجلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      // إعداد رأس الطلب مع الرمز المميز
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      };

      // إجراء طلب GET إلى رابط الـAPI لجلب بيانات المستخدم
      axios.get('http://127.0.0.1:8000/api/user', { headers })
        .then(response => {
          if (response.status === 200) {
            // نجاح الاستجابة، يمكنك تحديث حالة userData
            setUserData(response.data);
          } else {
            console.error('حدث خطأ في جلب معلومات المستخدم');
          }
        })
        .catch(error => {
          console.error('حدث خطأ في جلب معلومات المستخدم:', error);
        });
    } else {
      console.error('الرمز المميز غير موجود في localStorage');
    }
  }, []); // تأكد من أنها تنفذ مرة واحدة عند تحميل الصفحة

  return (
    <div className='div2'>
      <h2 className='h2'>User Profile</h2>
      <div className='img'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png'></img></div>
      {userData && (
        <div className='userProfile'>
          <p className='profileP'>Name: {userData.name}</p>
          <p className='profileP'>Email: {userData.email}</p>
        </div >
      )}
    </div>
  );
}

export default UserProfile;
