import React, { useState, useEffect } from 'react';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:8000/api/news';

    const fetchNews = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            if (response.ok && data.success) {
                setNews(data.data.data); // Lấy dữ liệu bài viết
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

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div style={{ color: 'red' }}>Lỗi: {error}</div>;

    return (
        <div>
            <h2>Danh sách bài viết</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Trạng thái</th>
                        <th>Ngày xuất bản</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsList;