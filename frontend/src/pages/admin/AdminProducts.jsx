import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api';
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data.data || []);
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const getHeaders = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  });

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
        setProducts(products.filter(product => product.ProductID !== productId));
      } catch (err) {
        setError("Error deleting product");
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleUpdateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        await fetchProducts();
        alert('Cập nhật sản phẩm thành công!');
        setShowAddForm(false);
        setEditingProduct(null);
      } else {
        const errorMessage = data.message || 'Lỗi khi cập nhật sản phẩm';
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật sản phẩm:', err);
      alert('Lỗi kết nối server khi cập nhật sản phẩm');
    }
  };

  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      await handleUpdateProduct(editingProduct.ProductID, productData);
    } else {
      try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.success) {
          fetchProducts();
          alert('Thêm sản phẩm thành công!');
          setShowAddForm(false);
          setEditingProduct(null);
        } else {
          alert(response.data.message || 'Lỗi khi lưu sản phẩm');
        }
      } catch (err) {
        console.error('Lỗi khi lưu sản phẩm:', err);
        alert('Lỗi kết nối server khi lưu sản phẩm');
      }
    }
  };

  const handleViewVariants = (productId) => {
    navigate(`/admin/productvariant/${productId}`);
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>Quản lý sản phẩm</h2>
        <button onClick={() => { setEditingProduct(null); setShowAddForm(true); }} style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
          Thêm sản phẩm
        </button>
      </div>

      {showAddForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => { setShowAddForm(false); setEditingProduct(null); }}
        />
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: 12 }}>Hình ảnh</th>
            <th style={{ padding: 12 }}>Tên sản phẩm</th>
            <th style={{ padding: 12 }}>Giá</th>
            <th style={{ padding: 12 }}>Trạng thái</th>
            <th style={{ padding: 12 }}>Ngày tạo</th>
            <th style={{ padding: 12 }}>Ngày cập nhật</th>
            <th style={{ padding: 12 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.ProductID} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>
                  <img src={`http://localhost:8000/storage/${product.Image}`} alt={product.Name} style={{ width: 50, height: 50, objectFit: "cover" }} />
                </td>
                <td style={{ padding: 12, cursor: 'pointer' }} onClick={() => handleViewVariants(product.ProductID)}>
                  {product.Name}
                </td>
                <td style={{ padding: 12 }}>{parseInt(product.base_price).toLocaleString("vi-VN")} VNĐ</td>
                <td style={{ padding: 12 }}>
                  <span style={{ padding: "4px 8px", borderRadius: 4, background: product.Status ? "#d4edda" : "#f8d7da", color: product.Status ? "#155724" : "#721c24" }}>
                    {product.Status ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </td>
                <td style={{ padding: 12 }}>{new Date(product.Create_at).toLocaleDateString()}</td>
                <td style={{ padding: 12 }}>{new Date(product.Update_at).toLocaleDateString()}</td>
                <td style={{ padding: 12 }}>
                  <button onClick={() => handleEditProduct(product)} style={{ marginRight: 8, padding: "4px 8px", background: "#ffc107", color: "black", border: "none", borderRadius: 4, cursor: "pointer" }}>Sửa</button>
                  <button onClick={() => handleDeleteProduct(product.ProductID)} style={{ padding: "4px 8px", background: "#dc3545", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>Không có sản phẩm nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Component form để thêm/sửa sản phẩm
const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: product ? product.Name : "",
    Description: product ? product.Description : "",
    base_price: product ? product.base_price : "",
    CategoryID: product ? product.CategoryID : "",
    Image: null,
    Status: product ? (product.Status !== null ? product.Status : false) : false,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, Status: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div style={{ marginBottom: 20, padding: 20, background: "#f8f9fa", borderRadius: 8 }}>
      <h3>{product ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tên sản phẩm" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd", marginBottom: 10 }} />
        <textarea placeholder="Mô tả sản phẩm" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ddd", minHeight: 100, marginBottom: 10 }} />
        <input type="number" placeholder="Giá" value={formData.base_price} onChange={(e) => setFormData({ ...formData, base_price: e.target.value })} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd", marginBottom: 10 }} />
        <input type="text" placeholder="Danh mục ID" value={formData.CategoryID} onChange={(e) => setFormData({ ...formData, CategoryID: e.target.value })} required style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd", marginBottom: 10 }} />
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 10 }} />
        <label>
          <input type="checkbox" checked={formData.Status} onChange={handleCheckboxChange} />
          Trạng thái
        </label>
        <button type="submit" style={{ padding: "8px 16px", background: "#28a745", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
          {product ? "Cập nhật" : "Thêm"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "8px 16px", background: "#6c757d", color: "white", border: "none", borderRadius: 4, cursor: "pointer", marginLeft: 10 }}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default AdminProducts;