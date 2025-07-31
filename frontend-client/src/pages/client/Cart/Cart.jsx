import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import { formatPrice } from "../../../utils/formatPrice";

const Cart = () => {
  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-min-h-[80vh] tw-pt-24 container">
        <div className="tw-my-6">
          <div className="tw-flex tw-items-center tw-gap-5">
            <Link to="/" className="tw-text-[#9E9E9E]">
              Trang chủ
            </Link>

            <div className="tw-text-[#9E9E9E]">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">Giỏ hàng</p>
          </div>

          <div className="tw-grid tw-grid-cols-12 tw-gap-6 tw-mt-8">
            <div className="tw-col-span-7">
              <div className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-4">
                <Checkbox>
                  <p className="tw-font-bold tw-text-xl tw-text-[#1A1C20] tw-m-0">
                    Chọn tất cả
                  </p>
                </Checkbox>
              </div>

              <div className="tw-mt-4 tw-flex tw-flex-col tw-gap-y-4">
                <section className="tw-rounded tw-border tw-border-solid tw-border-[#EEEEEE] tw-p-4 tw-flex tw-items-center tw-gap-4">
                  <Checkbox />

                  <img
                    src="https://picsum.photos/200/300"
                    alt=""
                    className="tw-size-28 tw-object-cover tw-rounded"
                  />

                  <div>
                    <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                      Bàn nước Orientale walnut
                    </p>

                    <p className="tw-my-3 tw-flex tw-items-center tw-gap-x-3">
                      <span className="tw-text-sm tw-text-[#757575] tw-line-through">
                        {formatPrice(40000000)}
                      </span>
                      <span className="tw-text-[#1A1C20]">
                        {formatPrice(40000000)}
                      </span>
                    </p>

                    <div className="tw-inline-flex tw-items-center tw-gap-x-2 tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded-full tw-h-9">
                      <div className="tw-pl-4 tw-pr-2 tw-cursor-pointer">
                        <i className="fa-solid fa-minus"></i>
                      </div>

                      <input
                        type="number"
                        name=""
                        id=""
                        className="tw-text-center tw-bg-transparent tw-outline-none tw-border-none tw-w-8 tw-text-black"
                      />

                      <div className="tw-pr-4 tw-pl-2 tw-cursor-pointer">
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  </div>

                  <div className="tw-ml-auto tw-cursor-pointer tw-text-xl">
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </section>

                <section className="tw-rounded tw-border tw-border-solid tw-border-[#EEEEEE] tw-p-4 tw-flex tw-items-center tw-gap-4">
                  <Checkbox />

                  <img
                    src="https://picsum.photos/200/300"
                    alt=""
                    className="tw-size-28 tw-object-cover tw-rounded"
                  />

                  <div>
                    <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                      Bàn nước Orientale walnut
                    </p>

                    <p className="tw-my-3 tw-flex tw-items-center tw-gap-x-3">
                      <span className="tw-text-sm tw-text-[#757575] tw-line-through">
                        {formatPrice(40000000)}
                      </span>
                      <span className="tw-text-[#1A1C20]">
                        {formatPrice(40000000)}
                      </span>
                    </p>

                    <div className="tw-inline-flex tw-items-center tw-gap-x-2 tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded-full tw-h-9">
                      <div className="tw-pl-4 tw-pr-2 tw-cursor-pointer">
                        <i className="fa-solid fa-minus"></i>
                      </div>

                      <input
                        type="number"
                        name=""
                        id=""
                        className="tw-text-center tw-bg-transparent tw-outline-none tw-border-none tw-w-8 tw-text-black"
                      />

                      <div className="tw-pr-4 tw-pl-2 tw-cursor-pointer">
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  </div>

                  <div className="tw-ml-auto tw-cursor-pointer tw-text-xl">
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </section>

                <section className="tw-rounded tw-border tw-border-solid tw-border-[#EEEEEE] tw-p-4 tw-flex tw-items-center tw-gap-4">
                  <Checkbox />

                  <img
                    src="https://picsum.photos/200/300"
                    alt=""
                    className="tw-size-28 tw-object-cover tw-rounded"
                  />

                  <div>
                    <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                      Bàn nước Orientale walnut
                    </p>

                    <p className="tw-my-3 tw-flex tw-items-center tw-gap-x-3">
                      <span className="tw-text-sm tw-text-[#757575] tw-line-through">
                        {formatPrice(40000000)}
                      </span>
                      <span className="tw-text-[#1A1C20]">
                        {formatPrice(40000000)}
                      </span>
                    </p>

                    <div className="tw-inline-flex tw-items-center tw-gap-x-2 tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded-full tw-h-9">
                      <div className="tw-pl-4 tw-pr-2 tw-cursor-pointer">
                        <i className="fa-solid fa-minus"></i>
                      </div>

                      <input
                        type="number"
                        name=""
                        id=""
                        className="tw-text-center tw-bg-transparent tw-outline-none tw-border-none tw-w-8 tw-text-black"
                      />

                      <div className="tw-pr-4 tw-pl-2 tw-cursor-pointer">
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  </div>

                  <div className="tw-ml-auto tw-cursor-pointer tw-text-xl">
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </section>
              </div>
            </div>

            <div className="tw-col-span-5">
              <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-px-4 tw-py-6">
                <h2 className="tw-text-center tw-text-[#1A1C20] tw-text-[32px] tw-font-bold tw-rounded tw-pb-6">
                  Thông tin thanh toán
                </h2>

                <div className="tw-flex tw-flex-col tw-gap-y-3">
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <div className="tw-flex tw-items-center tw-gap-x-2">
                      <p className="tw-m-0">Ghế Bridge</p>

                      <p className="tw-m-0">x2</p>
                    </div>

                    <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                      {formatPrice(1000000)}
                    </p>
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between">
                    <div className="tw-flex tw-items-center tw-gap-x-2">
                      <p className="tw-m-0">Ghế Bridge</p>

                      <p className="tw-m-0">x2</p>
                    </div>

                    <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                      {formatPrice(1000000)}
                    </p>
                  </div>

                  <div className="tw-flex tw-items-center tw-justify-between">
                    <div className="tw-flex tw-items-center tw-gap-x-2">
                      <p className="tw-m-0">Ghế Bridge</p>

                      <p className="tw-m-0">x2</p>
                    </div>

                    <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                      {formatPrice(1000000)}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="tw-flex tw-items-center tw-justify-between">
                  <p className="tw-m-0">Tổng đơn hàng</p>

                  <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                    {formatPrice(1000000)}
                  </p>
                </div>
              </section>

              <button className="tw-bg-[#99CCD0] tw-text-white tw-font-medium tw-px-4 tw-h-12 tw-uppercase tw-cursor-pointer tw-w-full tw-mt-6">
                Thanh toán
              </button>

              <Link className="tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-text-[#1A1C20] tw-mt-6">
                <div className="tw-text-sm tw-text-[#1A1C20]">
                  <i className="fa-solid fa-chevron-left"></i>
                </div>

                <p className="tw-m-0 tw-text-[#1A1C20] tw-font-normal">
                  Quay lại mua hàng
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Cart;
