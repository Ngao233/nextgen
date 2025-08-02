import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../../api/api';

const EditCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Image: '', // Chỉ lưu đường dẫn hình ảnh
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategory = async () => {
            const response = await fetchCategories();
            const cat = response.data.data.find((c) => c.CategoryID === parseInt(id));
            if (cat) {
                setCategory(cat);
                setFormData({
                    Name: cat.Name,
                    Description: cat.Description,
                    Image: cat.Image || '', // Đường dẫn hình ảnh hiện tại
                });
            }
        };
        loadCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const filePath = `categories/${file.name}`; // Hoặc đường dẫn mà bạn muốn
            setFormData(prev => ({ ...prev, Image: filePath })); // Lưu tên tệp với tiền tố đường dẫn
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            Name: formData.Name,
            Description: formData.Description,
            Image: formData.Image || category.Image, // Giữ lại đường dẫn hình ảnh cũ nếu không có tệp mới
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios.put(`http://localhost:8000/api/categories/${id}`, data, config);
            navigate('/admin/categories');
        } catch (error) {
            console.error("Error updating category:", error.response?.data || error.message);
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    if (!category) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Category</h2>
            <input
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Category Name"
                required
            />
            <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,gif"
                onChange={handleFileChange}
            />
            {category.Image && (
                <div>
                    <img src={`${import.meta.env.REACT_APP_IMAGE_URL}/categories/${category.Image}`} alt={category.Name} style={{ width: '100px', height: 'auto' }} />
                    <p>Current Image</p>
                </div>
            )}
            <button type="submit">Update Category</button>
        </form>
    );
};

export default EditCategory;