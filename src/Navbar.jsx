import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = ({ onPlantsClick, onCartClick, onHomeClick }) => {
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="brand" onClick={onHomeClick}>
                <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" />
                <div className="nav-title-box">
                    <h3 className="nav-main-title">PARADISE NURSERY</h3>
                    <span className="nav-sub-title">Where Green Meets Serenity</span>
                </div>
            </div>

            <div className="nav-links">
                <button className="nav-link-btn" onClick={onPlantsClick}>Plants</button>
                <button className="cart-icon-btn" onClick={onCartClick}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cart-svg">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    {totalItems > 0 && <span className="cart-count-inside">{totalItems}</span>}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;