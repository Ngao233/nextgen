import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductVariantForm from './ProductVariantForm';
import { useNavigate } from 'react-router-dom';
import '../../../public/css/ProductVariantList.css'; // Giả sử bạn sẽ tạo file CSS riêng

const ProductVariantList = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editVariant, setEditVariant] = useState(null);

    const API_BASE_URL = 'http://localhost:8000/api';
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/product-variants`);
            setVariants(response.data.data || []);
        } catch (err) {
            setError("Error fetching product variants");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ProductVariantID) => {
        try {
            await axios.delete(`${API_BASE_URL}/product-variants/${ProductVariantID}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting variant:', error);
        }
    };

    const handleEdit = (variant) => {
        setEditVariant(variant);
    };

    const handleFormSubmit = () => {
        setEditVariant(null);
        fetchProducts();
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-variant-list">
            <h1>Quản lý sản phẩm</h1>
            <ProductVariantForm variant={editVariant} onSubmit={handleFormSubmit} />
            <table className="variant-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ProductID</th>
                        <th>Image</th>
                        <th>SKU</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {variants.length > 0 ? (
                        variants.map((variant) => (
                            <tr key={variant.ProductVariantID}>
                                <td>{variant.ProductVariantID}</td>
                                <td>{variant.ProductID}</td>
                                <td>
                                    {variant.Image ? (
                                        <img
                                            src={`http://localhost:8000/storage/${variant.Image}`}
                                            alt="Product"
                                            className="product-image"
                                        />
                                    ) : (
                                        <span className="no-image">No Image</span>
                                    )}
                                </td>
                                <td>{variant.Sku}</td>
                                <td>${variant.Price}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit(variant)}>Sửa</button>
                                    <button className="delete-button" onClick={() => handleDelete(variant.ProductVariantID)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-variants">Không có sản phẩm nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductVariantList;