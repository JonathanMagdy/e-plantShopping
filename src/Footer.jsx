import React from 'react';

const Footer = () => {
    return (
        <footer className="pro-footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4 className="footer-brand">Paradise Nursery</h4>
                    <p>Bringing nature's finest air purifiers and aromatic wonders straight to your doorstep since 2023.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#plants">All Plants</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#shipping">Shipping Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>123 Garden Lane, Green City</p>
                    <p>contact@paradisenursery.com</p>
                    <p>+1 (555) 000-GREEN</p>
                </div>
                <div className="footer-section">
                    <h4>Newsletter</h4>
                    <div className="footer-subscribe">
                        <input type="email" placeholder="Enter your email" />
                        <button>Join</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Paradise Nursery. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;