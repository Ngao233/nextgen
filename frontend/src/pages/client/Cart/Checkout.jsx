import React, { useState } from "react";
import { message } from "antd";
import apiClient from "../../../api/api"; // Giả sử bạn đã cấu hình apiClient
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice"; // Đảm bảo đường dẫn đúng

const Checkout = ({ cartItems, totalAmount, userId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Kiểm tra cartItems có đầy đủ thông tin không
      for (const item of cartItems) {
        if (!item.product_variant || !item.product_variant.Price) {
          throw new Error(`Missing price for ProductVariantID: ${item.ProductVariantID}`);
        }
      }

      const response = await apiClient.put(`/checkout/${userId}`, {
        cartItems: cartItems.map(item => ({
          ProductVariantID: item.ProductVariantID,
          Quantity: item.Quantity,
          Unit_price: item.product_variant.Price, // Lấy giá từ product_variant
        })),
        totalAmount,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 && response.data.success) {
        message.success("Thanh toán thành công!");
        navigate("/thank-you");
      } else {
        message.error(response.data.message || "Lỗi khi thanh toán");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      message.error(error.message || "Lỗi kết nối server khi thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="tw-text-center tw-text-[#1A1C20] tw-text-[32px] tw-font-bold tw-rounded tw-pb-6">
        Thông tin thanh toán
      </h2>
      <div className="tw-flex tw-flex-col tw-gap-y-3">
        <div className="tw-flex tw-items-center tw-justify-between">
          <p className="tw-m-0">Tổng đơn hàng</p>
          <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
            {formatPrice(totalAmount)} {/* Hiển thị tổng tiền */}
          </p>
        </div>
      </div>
      <button
        className="tw-bg-[#99CCD0] tw-text-white tw-font-medium tw-px-4 tw-h-12 tw-uppercase tw-cursor-pointer tw-w-full tw-mt-6"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Thanh toán"}
      </button>
    </div>
  );
};

export default Checkout;