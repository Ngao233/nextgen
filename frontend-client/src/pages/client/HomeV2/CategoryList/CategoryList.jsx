import { Flex, Spin } from "antd";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../../api/api";

const CategoryList = () => {
  const fetchCategories = async () => {
    const response = await apiClient.get("/api/categories", {
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

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "/images/category-1.png";
    }

    return `${import.meta.env.VITE_API_URL || ""}/storage/${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="container tw-mx-auto tw-mt-[52px] tw-text-center">
        <Spin size="large" />
        <p className="tw-mt-4">Đang tải danh mục...</p>
      </div>
    );
  }

  return (
    <div className="container tw-mx-auto tw-mt-[52px]">
      <h2 className="tw-font-bold tw-text-[32px]">Danh mục</h2>

      <Flex className="tw-mt-[32px]" wrap="wrap" gap={42} justify="center">
        {categories.length > 0 ? (
          categories.slice(0, 6).map((category) => (
            <div
              key={category.CategoryID}
              className="tw-text-center tw-cursor-pointer hover:tw-transform hover:tw-scale-105 tw-transition-all tw-duration-300"
            >
              <img
                src={getImageUrl(category.Image)}
                alt={category.Name}
                className="tw-size-[123px] tw-border tw-border-solid tw-border-[#2196F3] tw-rounded-full tw-object-cover"
                onError={(e) => {
                  e.target.src = "/images/category-1.png";
                }}
              />
              <p className="tw-text-[20px] tw-mt-[12px] tw-font-medium">
                {category.Name}
              </p>
            </div>
          ))
        ) : (
          <div className="tw-text-center tw-py-8">
            <p className="tw-text-gray-500 tw-text-lg">Chưa có danh mục nào</p>
          </div>
        )}
      </Flex>
    </div>
  );
};

export default CategoryList;
