import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../../utils/formatImage";
import { message } from "antd";
import apiClient from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "../../api/favoriteApi";

const addToCartFn = async ({ variantId, quantity }) => {
  const response = await apiClient.post("/api/carts", {
    ProductVariantID: variantId,
    Quantity: quantity,
  });

  return response.data;
};

const ProductItem = ({ product }) => {
  const { ProductID, Name, base_price, Image, variants = [] } = product;
  const queryClient = useQueryClient();

  const defaultVariant = variants && variants.length > 0 ? variants[0] : null;

  const getUserInfo = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const user = getUserInfo();
  const userId = user?.UserID;

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => favoriteApi.getFavorites(userId),
    enabled: !!userId,
    select: (data) => data.data || [],
  });

  const isFavorite = favorites.some(
    (fav) =>
      fav.ProductVariantID === defaultVariant?.ProductVariantID ||
      fav.productVariant?.ProductVariantID === defaultVariant?.ProductVariantID
  );

  const addToCartMutation = useMutation({
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

  const addToFavoritesMutation = useMutation({
    mutationFn: favoriteApi.addToFavorites,
    onSuccess: () => {
      message.success("Đã thêm vào danh sách yêu thích!");
      queryClient.invalidateQueries(["favorites", userId]);
    },
    onError: (error) => {
      console.error("Lỗi khi thêm vào yêu thích:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra khi thêm vào danh sách yêu thích.");
      }
    },
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: favoriteApi.removeFromFavorites,
    onSuccess: () => {
      message.success("Đã xóa khỏi danh sách yêu thích!");
      queryClient.invalidateQueries(["favorites", userId]);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa khỏi yêu thích:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra khi xóa khỏi danh sách yêu thích.");
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

    addToCartMutation.mutate({ variantId, quantity: 1 });
  };

  const handleToggleFavorite = () => {
    const token = localStorage.getItem("token");
    if (!token || !userId) {
      message.error("Vui lòng đăng nhập để sử dụng tính năng yêu thích!");
      return;
    }

    const variantId = defaultVariant ? defaultVariant.ProductVariantID : null;

    if (!variantId) {
      message.error("Sản phẩm không có biến thể");
      return;
    }

    const favoriteData = {
      UserID: userId,
      ProductVariantID: variantId,
    };

    if (isFavorite) {
      removeFromFavoritesMutation.mutate(favoriteData);
    } else {
      addToFavoritesMutation.mutate(favoriteData);
    }
  };

  return (
    <div className="tw-mb-4">
      <div className="tw-relative tw-pt-[100%]">
        <img
          src={getProductImageUrl(Image)}
          alt={Name}
          className="tw-w-full tw-h-full tw-object-cover tw-absolute tw-top-0 tw-left-0"
        />

        <button
          onClick={handleToggleFavorite}
          disabled={
            addToFavoritesMutation.isPending ||
            removeFromFavoritesMutation.isPending
          }
          className="tw-absolute tw-top-2 tw-right-2 tw-w-10 tw-h-10 tw-bg-white tw-rounded-full tw-border-none tw-cursor-pointer tw-shadow-md hover:tw-shadow-lg tw-transition-all tw-flex tw-items-center tw-justify-center disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
          title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
        >
          <i
            className={`fa-heart tw-text-base ${
              isFavorite
                ? "fas tw-text-red-500"
                : "far tw-text-gray-400 hover:tw-text-red-500"
            } tw-transition-colors`}
          ></i>
        </button>
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
          disabled={addToCartMutation.isPending}
          className="tw-uppercase tw-bg-transparent tw-text-[#9E9E9E] tw-font-medium tw-outline-none tw-border-none tw-flex tw-items-center tw-gap-x-2 tw-cursor-pointer hover:tw-text-[#99CCD0] disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        >
          {addToCartMutation.isPending ? "Đang thêm..." : "Thêm vào giỏ hàng"}
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
