import React, { useState, useEffect } from 'react';
import '../Css/cart.css';

export default function CartPage() {
  // حالة تخزين المنتجات المحفوظة في السلة
  const [cartItems, setCartItems] = useState([]);
  
  // حالة تخزين السلة الحالية مع كمية كل منتج
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // استرجاع بيانات السلة من sessionStorage عند تحميل الصفحة
    const savedCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    
    // إعداد السلة الحالية بناءً على بيانات السلة المسترجعة
    setCart(
      savedCartItems.map((item) => ({
        ...item,
        quantity: 1,
      }))
    );
  }, []);

  // زيادة كمية المنتج في السلة
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    updateCartCount(updatedCart.length);
  };

  // تقليل كمية المنتج في السلة
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      updateCartCount(updatedCart.length);
    }
  };

  // حذف منتج من السلة
  const deleteProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    updateCartCount(updatedCart.length);
  
    // تحديث sessionStorage بعد الحذف
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // مسح السلة بأكملها
  const clearCart = () => {
    setCart([]);
    updateCartCount(0);
  
    // مسح السلة من sessionStorage بعد مسحها
    sessionStorage.removeItem("cartItems");
  };

  // حساب إجمالي سعر السلة
  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  // دالة لتنفيذ أي عمليات إضافية عند تحديث عدد العناصر في السلة
  const updateCartCount = (count) => {
    // يمكنك هنا تنفيذ أي عمليات أخرى عند تحديث عدد العناصر في السلة
  };

  return (
    <div className="cart-page1">
      <h1>Cart</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* عرض المنتجات في السلة */}
          {cart.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="product1">
                  <img
                    src={item.Image}
                    alt={item.ProductName}
                    className="product-image1"
                  />
                  <div className="product-description1">
                    <h3>{item.ProductName}</h3>
                    <p>{item.Description.slice(0, 25)} ...</p>
                  </div>
                </div>
              </td>
              <td>${item.Price}</td>
              <td>
                {/* زرين لزيادة وتقليل الكمية */}
                <button
                  className="btn btn-sm btn-secondary bbb"
                  onClick={() => decreaseQuantity(index)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-sm btn-secondary bbb"
                  onClick={() => increaseQuantity(index)}
                >
                  +
                </button>
              </td>
              <td>${item.Price * item.quantity}</td>
              <td>
                {/* زر لحذف المنتج */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* عرض إجمالي سعر السلة */}
      <div className="cart-total1">
        Total: <span>${calculateTotal(cart)}</span>
      </div>
      <div className="cart-actions1">
        {/* زر لمسح السلة بأكملها */}
        <button onClick={clearCart} className="btn btn-danger">
          Clear Cart
        </button>
      </div>
    </div>
  );
}
