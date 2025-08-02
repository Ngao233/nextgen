import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Spin } from "antd";
import apiClient from "../../../../api/api";
import ProductItem from "../../../../components/ProductItem/ProductItem";

const ProductLatest = () => {
  const fetchProducts = async () => {
    const response = await apiClient.get("/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.data.success) {
      return response.data.data;
    }
    return response.data;
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="container tw-mx-auto tw-py-[48px] tw-text-center">
        <Spin size="large" />
        <p className="tw-mt-4">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="container tw-mx-auto tw-py-[48px]">
      <h2 className="tw-font-bold tw-text-[32px] tw-mb-8">Sản phẩm nổi bật</h2>

      <Row gutter={[24, 24]}>
        {products.slice(0, 4).map((product) => (
          <Col key={product.ProductID} xs={24} sm={12} md={6}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductLatest;
