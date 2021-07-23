/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from 'components/Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from 'utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 15);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const matchedProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (matchedProduct) {
            count = matchedProduct.quantity + 1;
            matchedProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, matchedProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} showAddToCart={true} product={product} handleAddProduct={handleAddProduct} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;