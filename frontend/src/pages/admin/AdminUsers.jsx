import React, { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Fullname: '',
    Phone: '',
    Address: '',
    Password: '',
    Role: 0,
    Status: 1
  });

  // API Base URL
  const API_BASE_URL = 'http://localhost:8000/api';

  // Hàm tạo headers cho API calls
  const getHeaders = (includeAuth = false) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    
    if (includeAuth) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  };

  // Hàm xử lý response
  const handleResponse = async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'Có lỗi xảy ra');
      if (data.errors) error.errors = data.errors;
      throw error;
    }
    
    return data;
  };

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: getHeaders(),
        credentials: 'include'
      });
      
      const data = await handleResponse(response);
      if (data.success) {
        setUsers(data.data);
      } else {
        setError('Không thể tải danh sách người dùng');
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng:', err);
      setError('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Thêm người dùng mới
  const handleAddUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        // Refresh danh sách sau khi thêm thành công
        await fetchUsers();
        alert('Thêm người dùng thành công!');
        setShowModal(false);
        resetForm();
      } else {
        const errorMessage = data.message || 'Lỗi khi thêm người dùng';
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Lỗi khi thêm người dùng:', err);
      alert('Lỗi kết nối server khi thêm người dùng');
    }
  };

  // Cập nhật người dùng
  const handleUpdateUser = async (userId, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        // Refresh danh sách sau khi cập nhật thành công
        await fetchUsers();
        alert('Cập nhật người dùng thành công!');
        setShowModal(false);
        setEditingUser(null);
        resetForm();
      } else {
        const errorMessage = data.message || 'Lỗi khi cập nhật người dùng';
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật người dùng:', err);
      alert('Lỗi kết nối server khi cập nhật người dùng');
    }
  };

  // Xóa người dùng
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: getHeaders(),
          credentials: 'include'
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          // Cập nhật danh sách sau khi xóa thành công
          setUsers(users.filter(user => user.UserID !== userId));
          alert('Xóa người dùng thành công!');
        } else {
          // Hiển thị lỗi từ server
          const errorMessage = data.message || 'Lỗi khi xóa người dùng';
          alert(errorMessage);
        }
      } catch (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        alert('Lỗi kết nối server khi xóa người dùng');
      }
    }
  };

  // Cập nhật trạng thái người dùng
  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          Status: newStatus
        })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        // Cập nhật danh sách sau khi thay đổi trạng thái thành công
        setUsers(users.map(user => 
          user.UserID === userId 
            ? { ...user, Status: newStatus }
            : user
        ));
        alert('Cập nhật trạng thái thành công!');
      } else {
        const errorMessage = data.message || 'Lỗi khi cập nhật trạng thái';
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      alert('Lỗi kết nối server khi cập nhật trạng thái');
    }
  };

  // Mở modal để thêm người dùng mới
  const openAddModal = () => {
    setEditingUser(null);
    resetForm();
    setShowModal(true);
  };

  // Mở modal để sửa người dùng
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      Username: user.Username,
      Email: user.Email,
      Fullname: user.Fullname || '',
      Phone: user.Phone || '',
      Address: user.Address || '',
      Password: '', // Không hiển thị mật khẩu cũ
      Role: user.Role,
      Status: user.Status
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      Username: '',
      Email: '',
      Fullname: '',
      Phone: '',
      Address: '',
      Password: '',
      Role: 0,
      Status: 1
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.Username || !formData.Email) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    if (editingUser) {
      // Cập nhật người dùng
      const updateData = { ...formData };
      if (!updateData.Password) {
        delete updateData.Password; // Không gửi password nếu không thay đổi
      }
      handleUpdateUser(editingUser.UserID, updateData);
    } else {
      // Thêm người dùng mới
      if (!formData.Password) {
        alert('Vui lòng nhập mật khẩu!');
        return;
      }
      handleAddUser(formData);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Quản lý người dùng</h2>
        <button
          onClick={openAddModal}
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Thêm người dùng
        </button>
      </div>

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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3>{editingUser ? 'Sửa người dùng' : 'Thêm người dùng mới'}</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Tên đăng nhập *</label>
                <input
                  type="text"
                  value={formData.Username}
                  onChange={(e) => setFormData({...formData, Username: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
                <input
                  type="email"
                  value={formData.Email}
                  onChange={(e) => setFormData({...formData, Email: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Họ tên</label>
                <input
                  type="text"
                  value={formData.Fullname}
                  onChange={(e) => setFormData({...formData, Fullname: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Số điện thoại</label>
                <input
                  type="text"
                  value={formData.Phone}
                  onChange={(e) => setFormData({...formData, Phone: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Địa chỉ</label>
                <textarea
                  value={formData.Address}
                  onChange={(e) => setFormData({...formData, Address: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '60px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Mật khẩu {editingUser ? '(để trống nếu không thay đổi)' : '*'}
                </label>
                <input
                  type="password"
                  value={formData.Password}
                  onChange={(e) => setFormData({...formData, Password: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  required={!editingUser}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Vai trò</label>
                <select
                  value={formData.Role}
                  onChange={(e) => setFormData({...formData, Role: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value={0}>User</option>
                  <option value={1}>Admin</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Trạng thái</label>
                <select
                  value={formData.Status}
                  onChange={(e) => setFormData({...formData, Status: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value={1}>Hoạt động</option>
                  <option value={0}>Không hoạt động</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {editingUser ? 'Cập nhật' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bảng danh sách người dùng */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: 12, textAlign: "left" }}>ID</th>
            <th style={{ padding: 12, textAlign: "left" }}>Tên đăng nhập</th>
            <th style={{ padding: 12, textAlign: "left" }}>Họ tên</th>
            <th style={{ padding: 12, textAlign: "left" }}>Email</th>
            <th style={{ padding: 12, textAlign: "left" }}>Số điện thoại</th>
            <th style={{ padding: 12, textAlign: "left" }}>Địa chỉ</th>
            <th style={{ padding: 12, textAlign: "left" }}>Vai trò</th>
            <th style={{ padding: 12, textAlign: "left" }}>Trạng thái</th>
            <th style={{ padding: 12, textAlign: "left" }}>Ngày tạo</th>
            <th style={{ padding: 12, textAlign: "left" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 12 }}>{user.UserID}</td>
              <td style={{ padding: 12 }}>{user.Username}</td>
              <td style={{ padding: 12 }}>{user.Fullname || 'N/A'}</td>
              <td style={{ padding: 12 }}>{user.Email}</td>
              <td style={{ padding: 12 }}>{user.Phone || 'N/A'}</td>
              <td style={{ padding: 12 }}>{user.Address || 'N/A'}</td>
              <td style={{ padding: 12 }}>
                {user.Role === 1 ? "Admin" : "User"}
              </td>
              <td style={{ padding: 12 }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: 4,
                    background: user.Status === 1 ? "#d4edda" : "#f8d7da",
                    color: user.Status === 1 ? "#155724" : "#721c24",
                  }}
                >
                  {user.Status === 1 ? "Hoạt động" : "Không hoạt động"}
                </span>
              </td>
              <td style={{ padding: 12 }}>
                {user.Create_at ? new Date(user.Create_at).toLocaleDateString('vi-VN') : 'N/A'}
              </td>
              <td style={{ padding: 12 }}>
                <button
                  onClick={() => openEditModal(user)}
                  style={{
                    marginRight: 8,
                    padding: "4px 8px",
                    background: "#ffc107",
                    color: "black",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleToggleStatus(user.UserID, user.Status)}
                  style={{
                    marginRight: 8,
                    padding: "4px 8px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  {user.Status === 1 ? "Vô hiệu" : "Kích hoạt"}
                </button>
                <button
                  onClick={() => handleDeleteUser(user.UserID)}
                  style={{
                    padding: "4px 8px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;