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
                Image: null, // Reset image
            });
        } else {
            setFormData({
                ProductID: '',
                Sku: '',
                Price: '',
                Stock: '',
                Image: null,
            });
        }
    }, [variant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, Image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        
        // Thêm các trường vào FormData
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });

        try {
            if (variant) {
                await axios.put(`http://localhost:8000/api/product-variants/${variant.ProductVariantID}`, formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Gửi dưới dạng multipart/form-data
                    },
                });
            } else {
                await axios.post('http://localhost:8000/api/product-variants', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Gửi dưới dạng application/json
                    },
                });
            }
            // Reset form after successful submission
            setFormData({
                ProductID: '',
                Sku: '',
                Price: '',
                Stock: '',
                Image: null,
            });
            onSubmit();
        } catch (error) {
            console.error('Error saving variant:', error);
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
            <input type="file" onChange={handleFileChange} />
            <button type="submit">{variant ? 'Update' : 'Add'} Variant</button>
        </form>
    );
};

export default ProductVariantForm;