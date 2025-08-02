import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews, addNews, updateNews, deleteNews } from '../../../api/api'; 
import '../../../../public/css/AdminNews.css'; 

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({
        Title: '',
        Content: '',
        Author: '',
        Status: true,
        Description: '',
        Expiry_date: '',
    });
    const [selectedNews, setSelectedNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // State để điều khiển hiển thị form
    const API_BASE_URL = 'http://localhost:8000/api';

    // Hàm lấy danh sách tin tức
    const fetchNews = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/news`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.success) {
                setNews(data.data || []);
            } else {
                setError('Failed to fetch news: ' + (data.message || 'Unknown error'));
            }
        } catch (err) {
            console.error('Fetch error: ', err);
            setError('Error fetching news: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (selectedNews) {
                await updateNews({ ...formData, id: selectedNews.id });
            } else {
                await addNews(formData);
            }
            setFormData({ Title: '', Content: '', Author: '', Status: true, Description: '', Expiry_date: '' });
            setSelectedNews(null);
            setIsFormVisible(false); // Ẩn form sau khi thêm/sửa
            fetchNews(); // Cập nhật lại danh sách tin tức
        } catch (err) {
            setError('Error: ' + (err.response?.data?.message || 'Something went wrong'));
        }
    };

    const handleEdit = (newsItem) => {
        setSelectedNews(newsItem);
        setFormData(newsItem);
        setIsFormVisible(true); // Hiện form khi chỉnh sửa
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            try {
                await deleteNews(id);
                fetchNews(); // Cập nhật lại danh sách tin tức
            } catch (err) {
                setError('Error: ' + (err.response?.data?.message || 'Could not delete'));
            }
        }
    };

    return (
        <div className="news-management">
            <h2>News Management</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button onClick={() => {
                        setSelectedNews(null);
                        setIsFormVisible(true); // Hiện form khi nhấn nút thêm
                    }}>Add New News</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Expiry Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(news) && news.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td> {/* Chỉnh sửa ở đây */}
                                    <td>{item.Content}</td>
                                    <td>{item.Author}</td>
                                    <td>{item.Status ? 'Active' : 'Inactive'}</td>
                                    <td>{item.Description}</td>
                                    <td>{new Date(item.Expiry_date).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {isFormVisible && (  // Chỉ hiển thị form khi isFormVisible là true
                        <form onSubmit={handleSubmit}>
                            <h3>{selectedNews ? 'Edit News' : 'Add News'}</h3>
                            <input
                                name="Title"
                                placeholder="News Title"
                                value={formData.Title}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="Content"
                                placeholder="News Content"
                                value={formData.Content}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="Author"
                                placeholder="Author"
                                value={formData.Author}
                                onChange={handleChange}
                                required
                            />
                            <select name="Status" value={formData.Status} onChange={handleChange}>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                            <textarea
                                name="Description"
                                placeholder="Description"
                                value={formData.Description}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="Expiry_date"
                                value={formData.Expiry_date}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">{selectedNews ? 'Update' : 'Add'} News</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminNews;