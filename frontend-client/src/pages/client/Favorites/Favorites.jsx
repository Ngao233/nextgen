import React from "react";
import { useQuery } from "@tanstack/react-query";
import { favoriteApi } from "../../../api/favoriteApi";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { Spin, Empty, Button } from "antd";
import { Link } from "react-router-dom";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const FavoritesPage = () => {
  const getUserInfo = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const user = getUserInfo();
  const userId = user?.UserID;

  const {
    data: favoritesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => favoriteApi.getFavorites(userId),
    enabled: !!userId,
  });

  const favorites = favoritesData?.data || [];

  const formatFavoriteProducts = () => {
    if (!Array.isArray(favorites)) {
      return [];
    }

    return favorites
      .map((favorite) => {
        const productVariant =
          favorite.product_variant || favorite.productVariant;
        const product = productVariant?.product;

        if (!product) {
          return null;
        }

        return {
          ...product,
          variants: [productVariant],
        };
      })
      .filter(Boolean);
  };

  const favoriteProducts = formatFavoriteProducts();

  if (!userId) {
    return (
      <>
        <ClientHeader />
        <div
          className="site-blocks-cover overlay inner-page"
          style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-12">
                <h1 className="tw-text-center tw-mb-36">Sản phẩm yêu thích</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-light">
          <div className="container">
            <div className="tw-text-center tw-py-12">
              <h2 className="tw-text-2xl tw-font-bold tw-text-gray-600 tw-mb-4">
                Vui lòng đăng nhập để xem danh sách yêu thích
              </h2>
              <Link to="/login">
                <Button type="primary" size="large">
                  Đăng nhập ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ClientHeader />
        <div
          className="site-blocks-cover overlay inner-page"
          style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-12">
                <h1 className="tw-text-center tw-mb-36">Sản phẩm yêu thích</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-light">
          <div className="container">
            <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[400px]">
              <Spin size="large" tip="Đang tải danh sách yêu thích..." />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ClientHeader />
        <div
          className="site-blocks-cover overlay inner-page"
          style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-12">
                <h1 className="tw-text-center tw-mb-36">Sản phẩm yêu thích</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section bg-light">
          <div className="container">
            <div className="tw-text-center tw-py-12 tw-text-red-500">
              <p className="tw-text-lg tw-mb-4">
                Có lỗi xảy ra khi tải danh sách yêu thích
              </p>
              <Button onClick={() => window.location.reload()}>Thử lại</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ClientHeader />

      <div
        className="site-blocks-cover overlay inner-page"
        style={{ backgroundImage: "url(/images/hero_bg_1.jpg)" }}
        data-aos="fade"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-12">
              <h1 className="tw-text-center tw-mb-36">Sản phẩm yêu thích</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="tw-mb-6">
            <nav className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500 tw-mb-4">
              <Link to="/" className="hover:tw-text-[#99CCD0]">
                Trang chủ
              </Link>
              <span>{">"}</span>
              <span className="tw-text-gray-700">Sản phẩm yêu thích</span>
            </nav>

            <div className="tw-flex tw-justify-between tw-items-center">
              <div>
                <h2 className="tw-text-2xl tw-font-bold tw-text-[#212121] tw-mb-2">
                  Danh sách yêu thích của tôi
                </h2>
                <p className="tw-text-gray-600 tw-m-0">
                  Bạn có {favoriteProducts.length} sản phẩm trong danh sách yêu
                  thích
                </p>
              </div>
            </div>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-[400px] tw-text-center">
              <Empty
                description={
                  <div>
                    <p className="tw-text-lg tw-mb-2">
                      Bạn chưa có sản phẩm yêu thích nào
                    </p>
                    <p className="tw-text-gray-500 tw-mb-4">
                      Hãy khám phá và thêm những sản phẩm bạn thích vào danh
                      sách
                    </p>
                  </div>
                }
                imageStyle={{
                  height: 120,
                }}
              >
                <Link to="/products">
                  <Button type="primary" size="large">
                    Khám phá sản phẩm
                  </Button>
                </Link>
              </Empty>
            </div>
          ) : (
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-6">
              {favoriteProducts.map((product) => (
                <ProductItem key={product.ProductID} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
