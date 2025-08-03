import React, { useState, useEffect } from 'react';
import { updateNews, addNews, deleteNews } from '../../../api/api'; // Đảm bảo rằng bạn đã định nghĩa các hàm này

const AdminNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        status: 'published',
        published_at: '',
        author_id: '', // Thêm trường author_id
    });

    const API_URL = 'http://localhost:8000/api/news';

    const fetchNews = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (response.ok && data.success) {
                setNews(data.data.data);
            } else {
                setError('Không thể tải danh sách bài viết');
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách bài viết:', err);
            setError('Lỗi kết nối server');
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
        setError(null);

        try {
            if (editingNews) {
                await updateNews({ ...formData, id: editingNews.id });
            } else {
                await addNews(formData);
            }
            setFormData({ title: '', content: '', image: '', status: 'published', published_at: '', author_id: '' }); // Reset form
            setEditingNews(null);
            setShowModal(false);
            fetchNews();
        } catch (err) {
            setError('Lỗi: ' + (err.message || 'Có gì đó không ổn'));
        }
    };

    const openAddModal = () => {
        setEditingNews(null);
        setFormData({ title: '', content: '', image: '', status: 'published', published_at: '', author_id: '' });
        setShowModal(true);
    };

    const openEditModal = (newsItem) => {
        setEditingNews(newsItem);
        setFormData({
            title: newsItem.title,
            content: newsItem.content,
            image: newsItem.image,
            status: newsItem.status,
            published_at: newsItem.published_at.split('T')[0], // Chỉ lấy phần ngày
            author_id: newsItem.author_id, // Giữ lại author_id
        });
        setShowModal(true);
    };

    const handleDeleteNews = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
            try {
                await deleteNews(id);
                fetchNews();
            } catch (err) {
                setError('Lỗi: ' + (err.message || 'Không thể xóa'));
            }
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div>
            <h2>Quản lý bài viết</h2>
            <button onClick={openAddModal} style={{ marginBottom: '20px' }}>
                Thêm bài viết
            </button>

            {/* Modal Form */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '8px',
                        width: '500px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}>
                        <h3>{editingNews ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Tên bài viết *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Nội dung *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Hình ảnh (URL)</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Trạng thái</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="published">Đã xuất bản</option>
                                    <option value="draft">Nháp</option>
                                </select>
                            </div>
                            <div>
                                <label>Ngày xuất bản</label>
                                <input
                                    type="date"
                                    name="published_at"
                                    value={formData.published_at}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>ID tác giả *</label>
                                <input
                                    type="text"
                                    name="author_id"
                                    value={formData.author_id}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">{editingNews ? 'Cập nhật' : 'Thêm'}</button>
                            <button type="button" onClick={() => setShowModal(false)}>Hủy</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bảng danh sách bài viết */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                        <th>Ngày xuất bản</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.content}</td>
                            <td>
                                <img src={item.image} alt={item.title} style={{ width: '100px' }} />
                            </td>
                            <td>{item.status}</td>
                            <td>{new Date(item.published_at).toLocaleDateString('vi-VN')}</td>
                            <td>
                                <button onClick={() => openEditModal(item)}>Sửa</button>
                                <button onClick={() => handleDeleteNews(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminNews;