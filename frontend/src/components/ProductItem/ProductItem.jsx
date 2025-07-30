import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../../utils/formatImage";
import { message } from "antd";
import apiClient from "../../api/api";
import { useMutation } from "@tanstack/react-query";

const addToCartFn = async ({ variantId, quantity }) => {
  const response = await apiClient.post("/api/carts", {
    ProductVariantID: variantId,
    Quantity: quantity,
  });

  return response.data;
};

const ProductItem = ({ product }) => {
  const { ProductID, Name, base_price, Image, variants = [] } = product;

  const defaultVariant = variants && variants.length > 0 ? variants[0] : null;

  const mutation = useMutation({
    mutationFn: addToCartFn,
    onSuccess: (data) => {
      message.success(data.message || "Đã thêm sản phẩm vào giỏ hàng!");
    },
    onError: (error) => {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);

      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra khi thêm vào giỏ hàng.");
      }
    },
  });

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    const variantId = defaultVariant ? defaultVariant.ProductVariantID : null;

    if (!variantId) {
      message.error("Sản phẩm không có biến thể");
      return;
    }

    mutation.mutate({ variantId, quantity: 1 });
  };

  return (
    <div className="tw-mb-4">
      <div className="tw-relative tw-pt-[100%]">
        <img
          src={`http://localhost:8000${getProductImageUrl(Image)}`}
          alt={Name}
          className="tw-w-full tw-h-full tw-object-cover tw-absolute tw-top-0 tw-left-0"
        />
      </div>

      <div className="tw-mt-5 tw-flex tw-flex-col tw-items-center tw-gap-y-3">
        <Link
          to={`/products/${ProductID}`}
          className="tw-text-center tw-line-clamp-1 tw-font-semibold tw-text-[#212121]"
        >
          {Name}
        </Link>

        <p className="tw-m-0 tw-flex tw-items-center tw-gap-x-4">
          <span className="tw-text-[#99CCD0]">{formatPrice(base_price)}</span>
        </p>

        <hr className="tw-bg-[#EEEEEE] tw-w-full tw-m-0" />

        <button
          onClick={handleAddToCart}
          disabled={mutation.isPending}
          className="tw-uppercase tw-bg-transparent tw-text-[#9E9E9E] tw-font-medium tw-outline-none tw-border-none tw-flex tw-items-center tw-gap-x-2 tw-cursor-pointer hover:tw-text-[#99CCD0] disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          {mutation.isPending ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
