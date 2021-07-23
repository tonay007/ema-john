import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    };

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 8.99;
    }

    const formatNumber = num => {
        return Number(num.toFixed(2));
    };

    const tax = (total / 10);

    const grandTotal = (formatNumber(total) + formatNumber(shipping) + formatNumber(tax));

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {formatNumber(shipping)}</small></p>
            <p><small>Tax + Vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;