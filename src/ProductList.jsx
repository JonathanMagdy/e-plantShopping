import React, { useState, useRef, useEffect, useMemo } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [showCart, setShowCart] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);
    const [showExplorer, setShowExplorer] = useState(true);
    const categoryRefs = useRef([]);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant known for its fragrance.", cost: "$22" }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", description: "Contains compounds that deter certain insects.", cost: "$10" },
                { name: "Marigold", image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", description: "Natural insect repellent, also adds color to the garden.", cost: "$8" },
                { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", description: "Known for their insect-repelling properties.", cost: "$20" },
                { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Repels flies and mosquitoes, also used in cooking.", cost: "$9" },
                { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Repels mosquitoes and attracts cats.", cost: "$13" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Soothing gel used for skin ailments.", cost: "$14" },
                { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system, helps fight colds.", cost: "$16" },
                { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues and headaches.", cost: "$13" },
                { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Soothes anxiety and promotes sleep.", cost: "$15" }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Thrives in low light and requires minimal watering.", cost: "$25" },
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect and can grow in various conditions.", cost: "$10" },
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Needs infrequent watering and is resilient to pests.", cost: "$15" },
                { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Requires minimal care and adds color to indoor spaces.", cost: "$22" }
            ]
        }
    ];

    // Pick a random image from each category list for the Explorer background
    const randomCategoryImages = useMemo(() => {
        return plantsArray.map(cat => {
            const randomIndex = Math.floor(Math.random() * cat.plants.length);
            return cat.plants[randomIndex].image;
        });
    }, []);

    useEffect(() => {
        if (!showExplorer || showCart) return;
        const observerOptions = { root: null, threshold: 0.6 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(parseInt(entry.target.getAttribute('data-index')));
                }
            });
        }, observerOptions);
        document.querySelectorAll('.explorer-section').forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [showExplorer, showCart]);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleCategoryClick = (idx) => {
        setShowExplorer(false);
        setTimeout(() => categoryRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const isAdded = (name) => cartItems.some(item => item.name === name);

    return (
        <div className="main-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="brand" onClick={onHomeClick}>
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" />
                    <div className="nav-title-box">
                        <h3 className="nav-main-title">PARADISE NURSERY</h3>
                        <span className="nav-sub-title">Where Green Meets Serenity</span>
                    </div>
                </div>

                <div className="nav-links">
                    <button className="nav-link-btn" onClick={() => { setShowCart(false); setShowExplorer(true); }}>Plants</button>
                    <button className="cart-icon-btn" onClick={() => { setShowCart(true); setShowExplorer(false); }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cart-svg">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {totalItems > 0 && <span className="cart-count-inside">{totalItems}</span>}
                    </button>
                </div>
            </nav>

            <div className="content-body" style={{ paddingTop: showExplorer && !showCart ? '0' : '90px' }}>
                {showExplorer && !showCart ? (
                    <div className="explorer-view">
                        <div className="background-layer">
                            {plantsArray.map((cat, i) => (
                                <div key={i} className="bg-image" style={{ 
                                    backgroundImage: `url(${randomCategoryImages[i]})`, 
                                    opacity: i === activeCategory ? 1 : 0 
                                }} />
                            ))}
                            <div className="overlay"></div>
                        </div>
                        <div className="scroll-container no-scrollbar">
                            {plantsArray.map((cat, i) => (
                                <section key={i} data-index={i} className="explorer-section">
                                    <h1 className={i === activeCategory ? "cat-title active" : "cat-title"}>{cat.category}</h1>
                                    <button onClick={() => handleCategoryClick(i)} className="explore-btn">Explore Collection</button>
                                </section>
                            ))}
                        </div>
                    </div>
                ) : !showCart ? (
                    <div className="product-grid-container">
                        {plantsArray.map((cat, i) => (
                            <div key={i} ref={el => categoryRefs.current[i] = el} className="category-group">
                                <h2 className="grid-category-title">{cat.category}</h2>
                                <div className="grid-responsive">
                                    {cat.plants.map((p, j) => (
                                        <div key={j} className="plant-card">
                                            <img src={p.image} alt={p.name} className="plant-img" />
                                            <div className="plant-details">
                                                <div className="plant-header">
                                                    <h3>{p.name}</h3>
                                                    <span className="plant-cost">{p.cost}</span>
                                                </div>
                                                <p className="plant-desc">{p.description}</p>
                                                <button 
                                                    disabled={isAdded(p.name)} 
                                                    onClick={() => handleAddToCart(p)}
                                                    className={isAdded(p.name) ? "add-btn added" : "add-btn"}
                                                >
                                                    {isAdded(p.name) ? '✓ Added' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <CartItem onContinueShopping={() => { setShowCart(false); setShowExplorer(true); }} />
                )}
            </div>
        </div>
    );
}

export default ProductList;