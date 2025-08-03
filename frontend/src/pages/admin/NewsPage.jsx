import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Đảm bảo bạn đã cài đặt axios (npm install axios)
//import '../NewsPage.css'; // Giả sử NewsPage.css nằm ở thư mục cha của admin, hoặc điều chỉnh đường dẫn

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('alert-success');

  // ĐƯỜNG DẪN ĐẾN API PHP CỦA BẠN - THAY ĐỔI THEO CẤU HÌNH SERVER CỦA BẠN
  const API_URL = 'http://localhost:8000/api/news'; // Thay đổi theo đường dẫn API của bạn

  const showAndHideAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Hàm tải dữ liệu bài viết từ API PHP
  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL);
      // Giả định API PHP trả về một mảng các bài viết
      setArticles(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu bài viết:", error);
      showAndHideAlert('Không thể tải dữ liệu tin tức. Vui lòng kiểm tra kết nối API.', 'alert-warning');
    }
  };

  // Sử dụng useEffect để tải dữ liệu khi component được render lần đầu
  useEffect(() => {
    fetchArticles();
  }, []); // [] đảm bảo effect chỉ chạy một lần, tương tự componentDidMount

  const addArticle = async () => {
    showAndHideAlert('Chức năng thêm bài viết mới sẽ mở form và gửi dữ liệu tới API!', 'alert-info');
    // Đây chỉ là một ví dụ giả định dữ liệu để POST lên API
    // Trong thực tế, bạn sẽ có một form để nhập dữ liệu
    const newArticleData = {
        title: "Bài viết mới từ Admin React " + Date.now(),
        publishDate: new Date().toISOString().slice(0, 10), // Lấy ngày hiện tại
        author: "Admin",
        statusText: "Bản nháp",
        statusClass: "draft"
    };

    try {
        const response = await axios.post(API_URL, newArticleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.message) {
            showAndHideAlert(response.data.message, 'alert-success');
            fetchArticles(); // Tải lại danh sách để hiển thị bài viết mới
        } else {
            showAndHideAlert('Lỗi không xác định khi thêm bài viết.', 'alert-warning');
        }
    } catch (error) {
        console.error("Lỗi khi thêm bài viết:", error);
        showAndHideAlert('Lỗi kết nối API khi thêm bài viết.', 'alert-warning');
    }
  };

  const editArticle = (article) => {
    showAndHideAlert(`Bạn đang chỉnh sửa bài viết: "${article.title}" (ID: ${article.id}). Chức năng này cần một form chỉnh sửa.`, 'alert-info');
    // Khi bạn phát triển chức năng chỉnh sửa, bạn sẽ điều hướng đến một form
    // hoặc mở một modal, và sau khi người dùng lưu, bạn sẽ gửi yêu cầu PUT/POST
    // tới API để cập nhật dữ liệu vào database.
  };

  const toggleArticleStatus = async (articleToToggle) => {
    let newStatusText;
    let newStatusClass;
    let confirmMessage;
    let alertMsg;
    let alertType;

    if (articleToToggle.statusText === 'Đã đăng') {
      newStatusText = 'Đã ẩn';
      newStatusClass = 'hidden';
      confirmMessage = `Bạn có chắc chắn muốn ẩn bài viết "${articleToToggle.title}" không?`;
      alertMsg = `Đã ẩn bài viết "${articleToToggle.title}" thành công!`;
      alertType = 'alert-warning';
    } else {
      newStatusText = 'Đã đăng';
      newStatusClass = 'active';
      confirmMessage = `Bạn có chắc chắn muốn đăng lại bài viết "${articleToToggle.title}" không?`;
      alertMsg = `Đã đăng lại bài viết "${articleToToggle.title}" thành công!`;
      alertType = 'alert-success';
    }

    if (window.confirm(confirmMessage)) {
      try {
        // Gửi yêu cầu PUT để cập nhật trạng thái lên API PHP
        const response = await axios.put(API_URL, {
          id: articleToToggle.id,
          statusText: newStatusText,
          statusClass: newStatusClass
        }, {
            headers: {
                'Content-Type': 'application/json' // Đảm bảo PHP nhận được JSON
            }
        });

        if (response.data.message) {
          showAndHideAlert(alertMsg, alertType);
          fetchArticles(); // Tải lại danh sách để hiển thị trạng thái mới nhất
        } else {
            showAndHideAlert('Lỗi không xác định khi cập nhật trạng thái.', 'alert-warning');
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái bài viết:", error);
        showAndHideAlert('Lỗi kết nối API khi cập nhật trạng thái.', 'alert-warning');
      }
    } else {
      showAndHideAlert(`Đã hủy thao tác cho bài viết "${articleToToggle.title}".`, 'alert-info');
    }
  };

  return (
    <div className="page-content">
      <div className="page-title">Quản Lý Tin Tức</div>
      <p>Trang này cho phép bạn quản lý các bài viết tin tức, bao gồm việc thêm mới, chỉnh sửa và quản lý trạng thái hiển thị.</p>

      <button className="btn-add" onClick={addArticle}>+ Thêm Bài Viết</button>

      {showAlert && (
        <div className={['alert', alertType].join(' ')}>{alertMessage}</div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu Đề</th>
            <th>Ngày Đăng</th>
            <th>Người Đăng</th>
            <th>Trạng Thái</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {/* Kiểm tra nếu articles rỗng trước khi map */}
          {articles.length > 0 ? (
            articles.map(article => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{article.publishDate}</td>
                <td>{article.author}</td>
                <td><span className={['status', article.statusClass].join(' ')}>{article.statusText}</span></td>
                <td className="actions">
                  <button className="edit" onClick={() => editArticle(article)}>Sửa</button>
                  <button className="delete" onClick={() => toggleArticleStatus(article)}>
                    {article.statusText === 'Đã đăng' ? 'Ẩn' : 'Đăng'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                Đang tải tin tức hoặc không có bài viết nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsPage;
