/* eslint-disable no-unused-vars */
import Cart from 'components/Cart/Cart';
import ReviewItem from 'components/ReviewItem/ReviewItem';
import fakeData from 'fakeData';
import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from 'utilities/databaseManager';
import './Review.css';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = productkey => {
        const newCart = cart.filter(pd => pd.key !== productkey);
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="will add soon" />
    }
    return (
        <div className="review twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;