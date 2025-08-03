import React, { useEffect, useState } from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link, Navigate } from "react-router-dom";
import { Checkbox, message } from "antd";
import { formatPrice } from "../../../utils/formatPrice";
import apiClient from "../../../api/api";
import Checkout from "./Checkout"; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" />; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiClient.get("/carts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token vào tiêu đề
          },
        });
        setCartItems(response.data.cart_items);
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải giỏ hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productVariantId) => {
    try {
      await apiClient.delete("/carts/item", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token vào tiêu đề
        },
        data: { ProductVariantID: productVariantId },
      });
      setCartItems(cartItems.filter(item => item.ProductVariantID !== productVariantId));
      message.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  const handleUpdateItem = async (productVariantId, quantity) => {
    try {
      await apiClient.put("/carts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token vào tiêu đề
        },
        ProductVariantID: productVariantId,
        Quantity: quantity,
      });
      message.success("Số lượng sản phẩm đã được cập nhật.");
      setCartItems(cartItems.map(item => 
        item.ProductVariantID === productVariantId ? { ...item, Quantity: quantity } : item
      ));
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.product_variant?.Price || 0;
    const quantity = item.Quantity || 0;
    return total + (price * quantity);
  }, 0);

  return (
    <>
      <ClientHeader lightMode={false} />
      <main className="tw-min-h-[80vh] tw-pt-24 container">
        <div className="tw-my-6">
          <div className="tw-flex tw-items-center tw-gap-5">
            <Link to="/" className="tw-text-[#9E9E9E]">Trang chủ</Link>
            <div className="tw-text-[#9E9E9E]"><i className="fa-solid fa-chevron-right"></i></div>
            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">Giỏ hàng</p>
          </div>

          {loading ? (
            <p>Đang tải giỏ hàng...</p>
          ) : (
            <div className="tw-grid tw-grid-cols-12 tw-gap-6 tw-mt-8">
              <div className="tw-col-span-7">
                <div className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-4">
                  <Checkbox><p className="tw-font-bold tw-text-xl tw-text-[#1A1C20] tw-m-0">Chọn tất cả</p></Checkbox>
                </div>

                <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-y-4">
                  {cartItems.map(item => (
                    <section key={item.CartItemID} className="tw-rounded tw-border tw-border-solid tw-border-[#EEEEEE] tw-p-4 tw-flex tw-items-center tw-gap-4">
                      <Checkbox />
                      <img
                        src={item.product_variant?.product?.Image ? `http://localhost:8000/storage/${item.product_variant.product.Image}` : "default_image.jpg"}
                        alt={item.product_variant?.product?.Name || "Không có tên"}
                        className="tw-size-28 tw-object-cover tw-rounded"
                      />
                      <div>
                        <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                          {item.product_variant?.product?.Name || "Tên sản phẩm không xác định"}
                        </p>
                        <p className="tw-my-3 tw-flex tw-items-center tw-gap-x-3">
                          <span className="tw-text-sm tw-text-[#757575] tw-line-through">
                            {formatPrice(item.product_variant?.Price)} 
                          </span>
                          <span className="tw-text-[#1A1C20]">
                            {formatPrice(item.product_variant?.Price * item.Quantity)} 
                          </span>
                        </p>
                        <div className="tw-inline-flex tw-items-center tw-gap-x-2 tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded-full tw-h-9">
                          <div className="tw-pl-4 tw-pr-2 tw-cursor-pointer" onClick={() => handleUpdateItem(item.ProductVariantID, item.Quantity - 1)}>
                            <i className="fa-solid fa-minus"></i>
                          </div>
                          <input
                            type="number"
                            value={item.Quantity}
                            className="tw-text-center tw-bg-transparent tw-outline-none tw-border-none tw-w-8 tw-text-black"
                            onChange={(e) => handleUpdateItem(item.ProductVariantID, parseInt(e.target.value))}
                          />
                          <div className="tw-pr-4 tw-pl-2 tw-cursor-pointer" onClick={() => handleUpdateItem(item.ProductVariantID, item.Quantity + 1)}>
                            <i className="fa-solid fa-plus"></i>
                          </div>
                        </div>
                      </div>
                      <div className="tw-ml-auto tw-cursor-pointer tw-text-xl" onClick={() => handleRemoveItem(item.ProductVariantID)}>
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <div className="tw-col-span-5">
                <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-px-4 tw-py-6">
                  <h2 className="tw-text-center tw-text-[#1A1C20] tw-text-[32px] tw-font-bold tw-rounded tw-pb-6">Thông tin thanh toán</h2>
                  <div className="tw-flex tw-flex-col tw-gap-y-3">
                    <div className="tw-flex tw-items-center tw-justify-between">
                      <p className="tw-m-0">Tổng đơn hàng</p>
                      <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                        {formatPrice(totalAmount)} 
                      </p>
                    </div>
                  </div>
                  <hr />
                  <Checkout cartItems={cartItems} totalAmount={totalAmount} userId={user.UserID} /> {/* Sử dụng user.UserID */}
                </section>
                <Link className="tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-text-[#1A1C20] tw-mt-6">
                  <div className="tw-text-sm tw-text-[#1A1C20]"><i className="fa-solid fa-chevron-left"></i></div>
                  <p className="tw-m-0 tw-text-[#1A1C20] tw-font-normal">Quay lại mua hàng</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Cart;