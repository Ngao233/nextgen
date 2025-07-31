import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link } from "react-router-dom";
import { Checkbox, Radio, Select } from "antd";
import { formatPrice } from "../../../utils/formatPrice";

const Checkout = () => {
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

            <Link to="/cart" className="tw-text-[#9E9E9E]">
              Giỏ hàng
            </Link>

            <div className="tw-text-[#9E9E9E]">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">Thanh toán</p>
          </div>

          <div className="tw-grid tw-grid-cols-12 tw-gap-6 tw-mt-8">
            <div className="tw-col-span-7">
              <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-6">
                <p className="tw-text-[#1A1C20] tw-font-bold tw-text-[32px] tw-text-center tw-mb-6">
                  Thông tin đơn hàng
                </p>

                <div>
                  <div className="tw-flex tw-items-center tw-gap-x-4 tw-border-x-0 tw-border-t-0 tw-py-4 [&:not(:last-child)]:tw-border-b [&:not(:last-child)]:tw-border-solid [&:not(:last-child)]:tw-border-[#EEEEEE]">
                    <img
                      src="https://picsum.photos/200/300"
                      alt=""
                      className="tw-size-28 tw-object-cover tw-rounded"
                    />

                    <div>
                      <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                        Bàn nước Orientale walnut
                      </p>

                      <p className="tw-mt-3 tw-text-[#1A1C20]">SL: 1</p>
                    </div>

                    <p className="tw-ml-auto tw-text-[#1A1C20] tw-text-xl">
                      {formatPrice(39999999)}
                    </p>
                  </div>

                  <div className="tw-flex tw-items-center tw-gap-x-4 tw-border-x-0 tw-border-t-0 tw-py-4 [&:not(:last-child)]:tw-border-b [&:not(:last-child)]:tw-border-solid [&:not(:last-child)]:tw-border-[#EEEEEE]">
                    <img
                      src="https://picsum.photos/200/300"
                      alt=""
                      className="tw-size-28 tw-object-cover tw-rounded"
                    />

                    <div>
                      <p className="tw-m-0 tw-font-bold tw-text-xl tw-text-[#1A1C20]">
                        Bàn nước Orientale walnut
                      </p>

                      <p className="tw-mt-3 tw-text-[#1A1C20]">SL: 1</p>
                    </div>

                    <p className="tw-ml-auto tw-text-[#1A1C20] tw-text-xl">
                      {formatPrice(39999999)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-6 tw-mt-4">
                <p className="tw-text-[#1A1C20] tw-font-bold tw-text-[32px] tw-text-center tw-mb-6">
                  Thông tin giao hàng
                </p>

                <div>
                  <label htmlFor="name" className="tw-text-[#1A1C20]">
                    Họ và tên
                  </label>

                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Nhập họ và tên"
                    className="tw-w-full tw-h-12 tw-bg-transparent tw-outline-none tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-px-3 tw-text-black placeholder:tw-text-[#9E9E9E]"
                  />
                </div>

                <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mt-4">
                  <div>
                    <label htmlFor="phone" className="tw-text-[#1A1C20]">
                      Số điện thoại
                    </label>

                    <input
                      type="tel"
                      name=""
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      className="tw-w-full tw-h-12 tw-bg-transparent tw-outline-none tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-px-3 tw-text-black placeholder:tw-text-[#9E9E9E]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="tw-text-[#1A1C20]">
                      Email
                    </label>

                    <input
                      type="email"
                      name=""
                      id="email"
                      placeholder="Nhập email"
                      className="tw-w-full tw-h-12 tw-bg-transparent tw-outline-none tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-px-3 tw-text-black placeholder:tw-text-[#9E9E9E]"
                    />
                  </div>
                </div>

                <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-4">
                  <div>
                    <label htmlFor="province" className="tw-text-[#1A1C20]">
                      Tỉnh/thành
                    </label>

                    <Select
                      id="province"
                      placeholder="Chọn tỉnh/thành"
                      className="tw-w-full tw-h-12"
                      style={{ fontSize: "16px" }}
                      options={[
                        { value: "hanoi", label: "Hà Nội" },
                        { value: "hcm", label: "TP. Hồ Chí Minh" },
                        { value: "danang", label: "Đà Nẵng" },
                      ]}
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="tw-text-[#1A1C20]">
                      Quận/huyện
                    </label>

                    <Select
                      id="district"
                      placeholder="Chọn quận/huyện"
                      className="tw-w-full tw-h-12"
                      style={{ fontSize: "16px" }}
                      options={[
                        { value: "district1", label: "Quận 1" },
                        { value: "district2", label: "Quận 2" },
                        { value: "district3", label: "Quận 3" },
                      ]}
                    />
                  </div>

                  <div>
                    <label htmlFor="ward" className="tw-text-[#1A1C20]">
                      Phường/xã
                    </label>

                    <Select
                      id="ward"
                      placeholder="Chọn phường/xã"
                      className="tw-w-full tw-h-12"
                      style={{ fontSize: "16px" }}
                      options={[
                        { value: "ward1", label: "Phường 1" },
                        { value: "ward2", label: "Phường 2" },
                        { value: "ward3", label: "Phường 3" },
                      ]}
                    />
                  </div>
                </div>

                <div className="tw-mt-4">
                  <label htmlFor="address" className="tw-text-[#1A1C20]">
                    Địa chỉ
                  </label>

                  <input
                    type="text"
                    name=""
                    id="address"
                    placeholder="Nhập địa chỉ cụ thể"
                    className="tw-w-full tw-h-12 tw-bg-transparent tw-outline-none tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-px-3 tw-text-black placeholder:tw-text-[#9E9E9E]"
                  />
                </div>
              </section>

              <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-6 tw-mt-4">
                <p className="tw-text-[#1A1C20] tw-font-bold tw-text-[32px] tw-text-center tw-mb-6">
                  Phương thức thanh toán
                </p>

                <Radio.Group className="tw-w-full">
                  <div className="tw-flex tw-flex-col tw-gap-4">
                    <div>
                      <Radio
                        value="cod"
                        className="tw-text-[#1A1C20] tw-text-base"
                      >
                        Thanh toán khi nhận hàng
                      </Radio>
                    </div>

                    <div>
                      <Radio
                        value="bank_transfer"
                        className="tw-text-[#1A1C20] tw-text-base"
                      >
                        Chuyển khoản ngân hàng
                      </Radio>
                    </div>

                    <div>
                      <Radio
                        value="atm_card"
                        className="tw-text-[#1A1C20] tw-text-base"
                      >
                        Thanh toán bằng thẻ ATM
                      </Radio>
                    </div>

                    <div>
                      <Radio
                        value="momo"
                        className="tw-text-[#1A1C20] tw-text-base"
                      >
                        Thanh toán bằng ví MOMO
                      </Radio>
                    </div>
                  </div>
                </Radio.Group>
              </section>
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

              <form action="" className="tw-mt-6">
                <label htmlFor="name" className="tw-text-[#1A1C20]">
                  Mã giảm giá
                </label>

                <div className="tw-flex tw-h-12">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Nhập mã"
                    className="tw-bg-transparent tw-outline-none tw-flex-1 tw-border tw-border-solid tw-border-[#EEEEEE] tw-border-r-0 tw-text-black tw-px-3"
                  />

                  <button className="tw-bg-[#99CCD0] tw-cursor-pointer tw-px-3 tw-font-medium">
                    ADD
                  </button>
                </div>
              </form>

              <div className="tw-flex tw-items-center tw-gap-x-2 tw-mt-6">
                <Checkbox>
                  <p className="tw-text-[#1A1C20] tw-m-0">
                    Đồng ý với{" "}
                    <Link className="tw-text-[#99CCD0] tw-underline">
                      điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link className="tw-text-[#99CCD0] tw-underline">
                      điều kiện
                    </Link>{" "}
                    của chúng tôi
                  </p>
                </Checkbox>
              </div>

              <button className="tw-bg-[#99CCD0] tw-text-white tw-font-medium tw-px-4 tw-h-12 tw-uppercase tw-cursor-pointer tw-w-full tw-mt-4">
                Đặt hàng
              </button>

              <Link
                to="/cart"
                className="tw-flex tw-items-center tw-justify-center tw-gap-x-2 tw-text-[#1A1C20] tw-mt-4"
              >
                <div className="tw-text-sm tw-text-[#1A1C20]">
                  <i className="fa-solid fa-chevron-left"></i>
                </div>

                <p className="tw-m-0 tw-text-[#1A1C20] tw-font-normal">
                  Quay lại giỏ hàng
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
