/* eslint-disable no-unused-vars */
import Product from 'components/Product/Product';
import fakeData from 'fakeData';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    // @ts-ignore
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>Detail of {productKey}</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;