import { Radio, Slider, Spin } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { formatPrice } from "../../../utils/formatPrice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/api";

const fetchProducts = async (filters) => {
  const params = new URLSearchParams();

  if (filters.minPrice) params.append("min_price", filters.minPrice);
  if (filters.maxPrice) params.append("max_price", filters.maxPrice);
  if (filters.category) params.append("category_id", filters.category);
  if (filters.query) params.append("q", filters.query);

  const { data } = await apiClient.get(
    `/api/products/search?${params.toString()}`
  );
  return data;
};

const fetchCategories = async () => {
  const { data } = await apiClient.get("/api/categories");
  return data;
};

const Products = () => {
  const location = useLocation();
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  // const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000000,
    sortBy: "newest",
    query: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      setFilters((prev) => ({
        ...prev,
        query: query,
      }));
    }
  }, [location.search]);

  const { data, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.data || [];

  const sortProducts = (products, sortBy) => {
    if (!products || products.length === 0) return [];

    const productsCopy = [...products];

    switch (sortBy) {
      case "newest":
        return productsCopy.sort(
          (a, b) => new Date(b.Create_at) - new Date(a.Create_at)
        );
      case "bestseller":
        return productsCopy.sort(
          (a, b) => (b.sales_count || 0) - (a.sales_count || 0)
        );
      case "price_asc":
        return productsCopy.sort((a, b) => a.base_price - b.base_price);
      case "price_desc":
        return productsCopy.sort((a, b) => b.base_price - a.base_price);
      default:
        return productsCopy;
    }
  };

  const products = data?.data ? sortProducts(data.data, filters.sortBy) : [];
  const productsCount = data?.data?.length || 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const searchTitle = filters.query
    ? `Kết quả tìm kiếm cho "${filters.query}"`
    : "Products";

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
              <h1 className="tw-text-center tw-mb-36">{searchTitle}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="tw-grid tw-grid-cols-12 tw-gap-8">
            <div className="tw-col-span-3">
              <section>
                <h2 className="tw-text-[#212121] tw-font-bold tw-text-[32px]">
                  Danh mục
                </h2>

                <div className="tw-flex tw-flex-col tw-gap-3 tw-mt-4">
                  {isCategoriesLoading ? (
                    <div className="tw-flex tw-justify-center tw-py-4">
                      <Spin size="small" />
                    </div>
                  ) : (
                    <>
                      <div className="tw-flex tw-items-center tw-justify-between">
                        <Radio
                          checked={selectedCategory === null}
                          onChange={() => handleCategoryChange(null)}
                          className="tw-text-[#212121] tw-text-base"
                        >
                          Tất cả sản phẩm
                        </Radio>
                      </div>

                      {categories.map((category) => (
                        <div
                          key={category.CategoryID}
                          className="tw-flex tw-items-center tw-justify-between"
                        >
                          <Radio
                            checked={selectedCategory === category.CategoryID}
                            onChange={() =>
                              handleCategoryChange(category.CategoryID)
                            }
                            className="tw-text-[#212121] tw-text-base"
                          >
                            {category.Name}
                          </Radio>

                          {/* <p className="tw-m-0 tw-border tw-border-solid tw-border-[#999] tw-rounded-xl tw-text-xs tw-text-[#999] tw-min-w-6 tw-flex tw-justify-center tw-px-1">
                            {category.productCount || 0}
                          </p> */}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </section>

              <hr className="tw-my-8 tw-bg-[#EEEEEE]" />

              <section>
                <h3 className="tw-text-[#212121] tw-font-bold tw-text-xl tw-mb-4">
                  Mức giá
                </h3>

                <Slider
                  range
                  value={priceRange}
                  min={0}
                  max={100000000}
                  onChange={handlePriceChange}
                  tooltip={{
                    formatter: (value) => formatPrice(value),
                  }}
                  step={1000000}
                />

                <p>
                  <span className="tw-text-[#212121]">Giá:</span>{" "}
                  <span className="tw-text-[#9E9E9E]">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </span>
                </p>
              </section>
            </div>

            <div className="tw-col-span-9">
              <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
                <p className="tw-m-0 tw-text-xs tw-uppercase tw-text-[#666]">
                  Hiển thị {products.length} sản phẩm, trong số {productsCount}{" "}
                  sản phẩm
                </p>
              </div>

              <div className="tw-mt-4 tw-grid tw-grid-cols-3 tw-gap-6">
                {isLoading ? (
                  <div className="tw-col-span-3 tw-flex tw-justify-center tw-py-12">
                    <Spin size="large" />
                  </div>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductItem key={product.ProductID} product={product} />
                  ))
                ) : (
                  <div className="tw-col-span-3 tw-text-center tw-py-12 tw-text-[#666]">
                    {filters.query
                      ? `Không tìm thấy sản phẩm nào phù hợp với "${filters.query}"`
                      : "Không tìm thấy sản phẩm nào"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
