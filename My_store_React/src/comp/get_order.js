import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Css/getOrder.css'

function Get_order() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استخدام localStorage للحصول على الـtoken
    const authToken = localStorage.getItem('authToken');

    // التحقق من وجود الـtoken
    if (!authToken) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    // إجراء طلب GET إلى رابط الـAPI لجلب الطلبات
    axios.get('http://127.0.0.1:8000/api/get_orders', { headers })
      .then((response) => {
        setOrders(response.data.order);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error in Get Orders  :', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='getOrder'>
      <h1>Order list</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className='order-list'>
          {orders.map((order) => (
            <li className='order-item' key={order.id}>
              <div className='order-details'>
                <h4>OrderID : {order.Order}</h4>
                <h3>product: {order.product_opject.ProductName}</h3>
                <p className='p'>Description product : {order.product_opject.Description}</p>
                <p className='p'>Quantity: {order.Quantity}</p>
                <p className='p'>product proce : {order.product_opject.Price}</p>
                <h2>ORder totalAmount : {order.totalAmount}</h2>
              </div>
              <div className='order-image'>
                <img src={order.product_opject.Image} alt={order.product_opject.ProductName} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Get_order;
