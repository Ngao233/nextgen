import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductVariantForm = ({ variant, onSubmit }) => {
    const [formData, setFormData] = useState({
        ProductID: '',
        Sku: '',
        Price: '',
        Stock: '',
        Image: null,
    });

    useEffect(() => {
        if (variant) {
            setFormData({
                ProductID: variant.ProductID,
                Sku: variant.Sku,
                Price: variant.Price,
                Stock: variant.Stock,
                Image: null, // Reset image on edit
            });
        }
    }, [variant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, Image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let response;
            
            if (formData.Image) {
                // Use FormData when uploading image
                const formDataToSend = new FormData();
                formDataToSend.append('ProductID', formData.ProductID);
                formDataToSend.append('Sku', formData.Sku);
                formDataToSend.append('Price', formData.Price);
                formDataToSend.append('Stock', formData.Stock);
                formDataToSend.append('Image', formData.Image);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                if (variant) {
                    response = await axios.put(
                        `http://localhost:8000/api/product-variants/${variant.ProductVariantID}`,
                        formDataToSend,
                        config
                    );
                } else {
                    response = await axios.post(
                        'http://localhost:8000/api/product-variants',
                        formDataToSend,
                        config
                    );
                }
            } else {
                // Use JSON when not uploading image
                const data = {
                    ProductID: formData.ProductID,
                    Sku: formData.Sku,
                    Price: formData.Price,
                    Stock: formData.Stock
                };

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                if (variant) {
                    response = await axios.put(
                        `http://localhost:8000/api/product-variants/${variant.ProductVariantID}`,
                        data,
                        config
                    );
                } else {
                    response = await axios.post(
                        'http://localhost:8000/api/product-variants',
                        data,
                        config
                    );
                }
            }

            onSubmit();
        } catch (error) {
            console.error('Error saving variant:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="ProductID"
                value={formData.ProductID}
                onChange={handleChange}
                placeholder="Product ID"
                required
            />
            <input
                name="Sku"
                value={formData.Sku}
                onChange={handleChange}
                placeholder="SKU"
                required
            />
            <input
                name="Price"
                type="number"
                value={formData.Price}
                onChange={handleChange}
                placeholder="Price"
                required
            />
            <input
                name="Stock"
                type="number"
                value={formData.Stock}
                onChange={handleChange}
                placeholder="Stock"
                required
            />
            <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange} 
            />
            <button type="submit">{variant ? 'Update' : 'Add'} Variant</button>
        </form>
    );
};

export default ProductVariantForm;