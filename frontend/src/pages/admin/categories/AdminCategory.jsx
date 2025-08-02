import React, { useEffect, useState } from 'react';
import { fetchCategories, deleteCategory } from '../../../api/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../../public/css/AdminCategory.css'; 

const AdminCategory = () => { 
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:8000/api';
    const navigate = useNavigate();

    // Hàm lấy danh sách danh mục
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            const data = await response.json();
            setCategories(data.data || []);
        } catch (err) {
            setError("Error fetching categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((category) => category.CategoryID !== id));
    };

    if (loading) return <div className="admin-category-loading">Loading...</div>;
    if (error) return <div className="admin-category-error">Error: {error}</div>;

    return (
        <div className="admin-category-container">
            <h2 className="admin-category-title">Category List</h2>
            <Link to="/admin/add-category" className="admin-category-add-link">Add Category</Link>
            <ul className="admin-category-list">
                {categories.map((category) => (
                    <li key={category.CategoryID} className="admin-category-item">
                        {category.Image && (
                            <img src={`http://localhost:8000/storage/${category.Image}`} alt={category.Name} className="admin-category-image" />
                        )}
                        <div className="admin-category-details">
                            <h3 className="admin-category-name">{category.Name}</h3>
                            <p className="admin-category-description">{category.Description}</p>
                        </div>
                        <div className="admin-category-actions">
                            <Link to={`/admin/edit-category/${category.CategoryID}`} className="admin-category-edit-link">Edit</Link>
                            <button 
                                className="admin-category-delete-button" 
                                onClick={() => handleDelete(category.CategoryID)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCategory;