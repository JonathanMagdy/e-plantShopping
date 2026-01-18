import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);
    };

    const handleIncrement = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    const handleDecrement = (item) => {
        if (item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    };

    const handleRemove = (item) => dispatch(removeItem({ name: item.name }));

    return (
        <div className="cart-page-container">
            <div className="cart-header-row">
                <h2 className="cart-page-title">Your Shopping Bag ({cart.length})</h2>
                <button className="back-to-shop" onClick={onContinueShopping}>← Continue Shopping</button>
            </div>

            <div className="cart-content-layout">
                {/* Items List */}
                <div className="items-column">
                    {cart.length === 0 ? (
                        <div className="empty-cart-msg">Your bag is currently empty.</div>
                    ) : (
                        cart.map(item => (
                            <div className="pro-cart-item" key={item.name}>
                                <img className="cart-img" src={item.image} alt={item.name} />
                                <div className="item-info">
                                    <h4 className="item-name">{item.name}</h4>
                                    <p className="item-price">{item.cost}</p>
                                    <div className="qty-pill">
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button onClick={() => handleIncrement(item)}>+</button>
                                    </div>
                                </div>
                                <button className="pro-remove-btn" onClick={() => handleRemove(item)}>Remove</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Sticky Summary */}
                <div className="summary-sidebar">
                    <h3 className="summary-title">Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${calculateTotalAmount()}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className="free-tag">FREE</span>
                    </div>
                    <div className="total-divider"></div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>${calculateTotalAmount()}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>Checkout Now</button>
                    <p className="secure-text">Secure SSL Encrypted Payment</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;