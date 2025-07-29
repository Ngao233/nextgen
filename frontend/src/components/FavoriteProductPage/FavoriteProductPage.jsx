// src/components/FavoriteProductPage/FavoriteProductPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoriteProductPage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/api";
  const USER_ID = 1; // Giả định UserID. Trong thực tế, bạn sẽ lấy từ Auth Context/State

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${USER_ID}/favorites`);
      setFavoriteProducts(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching favorite products:", err);
      setError("Error fetching favorite products");
      setLoading(false);
    }
  };

  const handleRemoveFromFavorites = async (productId) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi danh sách yêu thích?")) {
      try {
        await axios.delete(`${API_BASE_URL}/users/${USER_ID}/favorites/${productId}`);
        setFavoriteProducts(
          favoriteProducts.filter((product) => product.ProductID !== productId)
        );
        alert("Đã xóa sản phẩm khỏi danh sách yêu thích!");
      } catch (err) {
        console.error("Error removing product from favorites:", err);
        setError("Error removing product from favorites");
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải danh sách yêu thích...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Lỗi: {error}</div>;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto", border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Sản phẩm yêu thích của bạn</h3>
      {favoriteProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, border: "1px dashed #ccc", borderRadius: 8, color: "#777", marginTop: 20 }}>
          Bạn chưa có sản phẩm yêu thích nào.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 20 }}>
          {favoriteProducts.map((product) => (
            <div
              key={product.ProductID}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 15,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={
                  product.Image
                    ? `http://localhost:8000/storage/${product.Image}`
                    : "https://via.placeholder.com/150"
                }
                alt={product.Name}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              />
              <h4 style={{ margin: "10px 0", fontSize: "1.2em" }}>{product.Name}</h4>
              <p style={{ color: "#555", marginBottom: 5 }}>
                Giá:{" "}
                <strong style={{ color: "#e44d26" }}>
                  {parseInt(product.base_price).toLocaleString("vi-VN")} VNĐ
                </strong>
              </p>
              <p style={{ color: "#777", fontSize: "0.9em" }}>
                Danh mục: {product.category?.Name || "N/A"}
              </p>
              <button
                onClick={() => handleRemoveFromFavorites(product.ProductID)}
                style={{
                  marginTop: 15,
                  padding: "8px 15px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: "0.9em",
                  transition: "background-color 0.3s ease",
                }}
              >
                Xóa khỏi yêu thích
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProductPage;
