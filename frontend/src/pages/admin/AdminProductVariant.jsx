import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminProductVariant = () => {
  const { id } = useParams();
  const productId = id;
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVariant, setNewVariant] = useState({
    Sku: '',
    Price: '',
    Stock: '',
    Image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductVariants();
  }, [productId]);

  const fetchProductVariants = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product-variants`, {
        params: { ProductID: productId },
      });
      setVariants(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Error fetching variants");
    } finally {
      setLoading(false);
    }
  };

const handleAddVariant = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('ProductID', productId);
  formData.append('Sku', newVariant.Sku);
  formData.append('Price', newVariant.Price);
  formData.append('Stock', newVariant.Stock);
  if (newVariant.Image) {
    formData.append('Image', newVariant.Image);
  }

  try {
    await axios.post(`http://localhost:8000/api/product-variants`, formData);
    setNewVariant({ Sku: '', Price: '', Stock: '', Image: null }); // Reset form
    fetchProductVariants(); // Refresh variants
  } catch (err) {
    console.error(err.response.data); // Log chi tiết lỗi
    setError("Error adding variant");
  }
};

  const handleDeleteVariant = async (variantId) => {
    if (window.confirm("Bạn có chắc muốn xóa biến thể này?")) {
      try {
        await axios.delete(`http://localhost:8000/api/product-variants/${variantId}`);
        setVariants(variants.filter(variant => variant.ProductVariantID !== variantId));
      } catch (err) {
        setError("Error deleting variant");
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h2>Biến thể của sản phẩm</h2>
      <button onClick={() => navigate(-1)} style={{ padding: "10px 20px", marginBottom: "20px", background: "#6c757d", color: "white", border: "none", borderRadius: 4 }}>
        Quay lại
      </button>

      {/* Form thêm biến thể */}
      <form onSubmit={handleAddVariant} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="SKU" value={newVariant.Sku} onChange={e => setNewVariant({ ...newVariant, Sku: e.target.value })} required />
        <input type="number" placeholder="Giá" value={newVariant.Price} onChange={e => setNewVariant({ ...newVariant, Price: e.target.value })} required />
        <input type="number" placeholder="Kho" value={newVariant.Stock} onChange={e => setNewVariant({ ...newVariant, Stock: e.target.value })} required />
        <input type="file" onChange={e => setNewVariant({ ...newVariant, Image: e.target.files[0] })} />
        <button type="submit" style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: 4 }}>
          Thêm Biến Thể
        </button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={{ padding: 12 }}>Hình ảnh</th>
            <th style={{ padding: 12 }}>SKU</th>
            <th style={{ padding: 12 }}>Giá</th>
            <th style={{ padding: 12 }}>Kho</th>
            <th style={{ padding: 12 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {variants.length > 0 ? (
            variants.map((variant) => (
              <tr key={variant.ProductVariantID} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>
                  {variant.Image ? (
                    <img src={`http://localhost:8000/storage/${variant.Image}`} alt={variant.Sku} style={{ maxWidth: "100px" }} />
                  ) : (
                    "Không có hình ảnh"
                  )}
                </td>
                <td style={{ padding: 12 }}>{variant.Sku}</td>
                <td style={{ padding: 12 }}>{parseFloat(variant.Price).toLocaleString("vi-VN")} VNĐ</td>
                <td style={{ padding: 12 }}>{variant.Stock}</td>
                <td style={{ padding: 12 }}>
                  <button onClick={() => handleDeleteVariant(variant.ProductVariantID)} style={{ padding: "4px 8px", background: "#dc3545", color: "white", border: "none", borderRadius: 4 }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Không có biến thể nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductVariant;