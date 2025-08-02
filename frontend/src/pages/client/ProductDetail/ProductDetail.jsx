import React, { useState } from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/api";
import { getProductImageUrl } from "../../../utils/formatImage";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [availableAttributeValues, setAvailableAttributeValues] = useState({});
  const [noMatchingVariant, setNoMatchingVariant] = useState(false);

  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/detail/${id}`);
      return response.data.data;
    },
    onSuccess: (data) => {
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);

        const initialAttributes = {};
        if (data.variants[0].attributes) {
          data.variants[0].attributes.forEach((attr) => {
            initialAttributes[attr.attribute.AttributeID] = attr.value;
          });
          setSelectedAttributes(initialAttributes);
        }

        updateAvailableAttributeValues(initialAttributes, data.variants);
      }
    },
  });

  const { data: latestProducts, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response.data.data;
    },
  });

  const updateAvailableAttributeValues = (currentAttributes, variants) => {
    if (!variants) return;

    const available = {};

    const allAttributeIds = new Set();
    variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        allAttributeIds.add(attr.attribute.AttributeID);
      });
    });

    allAttributeIds.forEach((attrId) => {
      const validValues = new Set();

      variants.forEach((variant) => {
        const matchesOtherAttributes = Object.entries(currentAttributes).every(
          ([currentAttrId, currentValue]) => {
            if (currentAttrId == attrId) return true;

            return variant.attributes.some(
              (attr) =>
                attr.attribute.AttributeID == currentAttrId &&
                attr.value === currentValue
            );
          }
        );

        if (matchesOtherAttributes) {
          const attrValue = variant.attributes.find(
            (attr) => attr.attribute.AttributeID == attrId
          )?.value;
          if (attrValue) validValues.add(attrValue);
        }
      });

      available[attrId] = Array.from(validValues);
    });

    setAvailableAttributeValues(available);
  };

  const handleAttributeSelect = (attributeId, value) => {
    const updatedAttributes = { ...selectedAttributes };

    if (selectedAttributes[attributeId] === value) {
      delete updatedAttributes[attributeId];
    } else {
      updatedAttributes[attributeId] = value;
    }

    setSelectedAttributes(updatedAttributes);

    if (product && product.variants) {
      const matchingVariant = product.variants.find((variant) => {
        if (Object.keys(updatedAttributes).length === 0) return false;

        const allAttributesMatch = Object.entries(updatedAttributes).every(
          ([attrId, attrValue]) => {
            return variant.attributes.some(
              (attr) =>
                attr.attribute.AttributeID == attrId && attr.value === attrValue
            );
          }
        );

        return allAttributesMatch;
      });

      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        setNoMatchingVariant(false);
      } else {
        if (
          Object.keys(updatedAttributes).length === 0 &&
          product.variants.length > 0
        ) {
          setSelectedVariant(product.variants[0]);
          setNoMatchingVariant(false);
        } else {
          setNoMatchingVariant(true);
        }
      }

      updateAvailableAttributeValues(updatedAttributes, product.variants);
    }
  };

  const addToCart = () => {
    if (noMatchingVariant) {
      alert("Vui lòng chọn tổ hợp thuộc tính hợp lệ");
      return;
    }
    alert(`Added ${quantity} items to cart`);
  };

  if (isLoading)
    return (
      <>
        <ClientHeader lightMode={false} />
        <div className="tw-pt-32 tw-min-h-[calc(100vh-128px)] container tw-text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );

  if (!product)
    return (
      <div className="tw-pt-32 container tw-text-center">Product not found</div>
    );

  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-pt-32 container">
        <div className="tw-grid tw-grid-cols-2 tw-gap-6">
          <div className="tw-col-span-1">
            <div className="tw-relative tw-pt-[100%]">
              <img
                src={`http://localhost:8000/storage/images/${getProductImageUrl(product.Image)}`}
                alt={product.Name}
                className="tw-w-full tw-h-full tw-object-cover tw-block tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0"
              />
            </div>
          </div>

          <div className="tw-col-span-1">
            <div className="tw-flex tw-items-center tw-gap-3 tw-uppercase">
              <Link
                to="/"
                className="tw-m-0 tw-text-[#9E9E9E] tw-text-sm tw-uppercase tw-font-normal"
              >
                Trang chủ
              </Link>

              <div className="tw-text-xs tw-text-[#9e9e9e]">
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              <p className="tw-m-0 tw-text-[#9E9E9E] tw-text-sm tw-uppercase tw-font-normal">
                Sản phẩm
              </p>

              <div className="tw-text-xs tw-text-[#9e9e9e]">
                <i className="fa-solid fa-chevron-right"></i>
              </div>

              {product.category && (
                <>
                  <p className="tw-m-0 tw-text-[#9E9E9E] tw-text-sm tw-uppercase tw-font-normal">
                    {product.category.Name}
                  </p>

                  <div className="tw-text-xs tw-text-[#9e9e9e]">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </>
              )}

              <p className="tw-m-0 tw-text-[#212121] tw-text-sm tw-uppercase tw-font-normal">
                {product.Name}
              </p>
            </div>

            <h1 className="tw-mt-6 tw-text-[#212121] tw-text-[32px] tw-font-bold">
              {product.Name}
            </h1>

            <div className="tw-flex tw-items-center tw-gap-6 tw-mt-4">
              <p className="tw-m-0 tw-text-2xl tw-font-bold tw-text-[#99CCD0]">
                {formatPrice(
                  selectedVariant ? selectedVariant.Price : product.base_price
                )}
              </p>
            </div>

            <hr className="tw-my-6" />

            <section>
              <p className="tw-font-semibold tw-text-[#212121] tw-m-0">
                Mô tả:
              </p>
              <p className="tw-m-0 tw-text-[#424242] tw-mt-1.5">
                {product.Description || "Không có mô tả"}
              </p>
            </section>

            <hr className="tw-my-6" />

            {product.variants &&
              product.variants.length > 0 &&
              product.variants[0].attributes &&
              product.variants[0].attributes.length > 0 && (
                <>
                  {Array.from(
                    new Set(
                      product.variants.flatMap((v) =>
                        v.attributes.map((a) => a.attribute.AttributeID)
                      )
                    )
                  ).map((attrId) => {
                    const attributeName = product.variants
                      .find((v) =>
                        v.attributes.some(
                          (a) => a.attribute.AttributeID === attrId
                        )
                      )
                      ?.attributes.find(
                        (a) => a.attribute.AttributeID === attrId
                      )?.attribute.name;

                    const uniqueValues = [
                      ...new Set(
                        product.variants.flatMap((v) =>
                          v.attributes
                            .filter((a) => a.attribute.AttributeID === attrId)
                            .map((a) => a.value)
                        )
                      ),
                    ];

                    return (
                      <section key={attrId} className="tw-mb-6">
                        <p className="tw-font-semibold tw-text-[#212121] tw-m-0">
                          {attributeName || "Thuộc tính"}:
                        </p>
                        <div className="tw-mt-2 tw-flex tw-items-center tw-gap-3">
                          {uniqueValues.map((value, idx) => {
                            const isAvailable =
                              !availableAttributeValues[attrId] ||
                              availableAttributeValues[attrId].includes(
                                value
                              ) ||
                              selectedAttributes[attrId] === value;

                            return (
                              <div
                                key={idx}
                                className={`tw-cursor-pointer tw-border tw-border-solid 
                                  ${
                                    selectedAttributes[attrId] === value
                                      ? "tw-border-[#99CCD0]"
                                      : isAvailable
                                      ? "tw-border-[#E0E0E0]"
                                      : "tw-border-[#E0E0E0] tw-opacity-40 tw-bg-gray-100"
                                  } tw-px-3 tw-py-1`}
                                onClick={() => {
                                  if (isAvailable)
                                    handleAttributeSelect(attrId, value);
                                }}
                              >
                                <p className="tw-m-0">{value}</p>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                  {noMatchingVariant && (
                    <div className="tw-text-red-500 tw-font-medium">
                      Thuộc tính không tồn tại
                    </div>
                  )}
                  <hr className="tw-my-6" />
                </>
              )}

            <section className="tw-flex tw-items-center">
              <div className="tw-h-12 tw-border tw-border-solid tw-border-[#E0E0E0] tw-flex tw-items-center">
                <div
                  className="tw-size-6 tw-flex tw-items-center tw-justify-center tw-mx-3 tw-cursor-pointer"
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  <i className="fa-solid fa-minus"></i>
                </div>

                <input
                  type="number"
                  name=""
                  id=""
                  className="tw-bg-transparent tw-border-none tw-outline-none tw-text-black tw-w-12 tw-text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />

                <div
                  className="tw-size-6 tw-flex tw-items-center tw-justify-center tw-mx-3 tw-cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>

              <button
                className={`tw-text-white tw-font-medium tw-px-4 tw-h-12 tw-uppercase tw-ml-4 tw-cursor-pointer ${
                  noMatchingVariant ? "tw-bg-gray-400" : "tw-bg-[#99CCD0]"
                }`}
                onClick={addToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </section>

            <hr className="tw-my-6" />

            <section>
              {product.category && (
                <p className="tw-mb-2">
                  <span className="tw-font-semibold tw-text-[#616161]">
                    Danh mục:
                  </span>
                  <span className="tw-text-[#9E9E9E] tw-ml-1">
                    {product.category.Name}
                  </span>
                </p>
              )}

              {selectedVariant && (
                <p>
                  <span className="tw-font-semibold tw-text-[#616161]">
                    Mã sản phẩm:
                  </span>
                  <span className="tw-text-[#9E9E9E] tw-ml-1">
                    {selectedVariant.Sku}
                  </span>
                </p>
              )}
            </section>
          </div>
        </div>

        <section className="tw-mb-12 tw-mt-6">
          <div className="tw-flex tw-justify-center tw-border-b tw-border-solid tw-border-[#E0E0E0] tw-border-x-0 tw-border-t-0">
            <p className="tw-m-0 tw-px-6 tw-py-3 tw-cursor-pointer tw-font-bold tw-text-[#99CCD0] tw-border-b-2 tw-border-solid tw-border-[#99CCD0] tw-border-x-0 tw-border-t-0 tw-text-xl">
              Mô tả
            </p>
            {product.reviews && product.reviews.length > 0 && (
              <p className="tw-m-0 tw-px-6 tw-py-3 tw-cursor-pointer tw-font-bold tw-text-[#757575] tw-text-xl">
                Đánh giá ({product.reviews.length})
              </p>
            )}
          </div>
        </section>

        <section>
          {product.Description || "Không có mô tả chi tiết cho sản phẩm này"}
        </section>

        <section className="tw-my-12">
          <h2 className="tw-text-[32px] tw-font-bold tw-text-[#212121] tw-text-center">
            Sản phẩm liên quan
          </h2>

          <div className="tw-mt-8 tw-grid tw-grid-cols-12 tw-gap-6">
            {isLoadingLatest ? (
              <div className="tw-col-span-12 tw-text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : latestProducts && latestProducts.length > 0 ? (
              latestProducts
                .filter((item) => item.ProductID !== parseInt(id))
                .slice(0, 4)
                .map((product) => (
                  <div key={product.ProductID} className="tw-col-span-3">
                    <ProductItem product={product} />
                  </div>
                ))
            ) : (
              <div className="tw-col-span-12 tw-text-center">
                <p>Không có sản phẩm nào.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetail;
