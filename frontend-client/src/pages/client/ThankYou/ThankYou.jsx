import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { formatPrice } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-min-h-[80vh] tw-pt-24 container">
        <div className="tw-mt-6 tw-mb-16">
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

          <div className="tw-flex tw-size-24 tw-items-center tw-justify-center tw-bg-[#F2F9F9] tw-rounded-full tw-mx-auto">
            <i className="fa-solid fa-check tw-text-[#99CCD0] tw-text-4xl"></i>
          </div>

          <h1 className="tw-text-center tw-font-bold tw-text-[32px] tw-text-[#1A1C20] tw-my-4">
            Thanh toán thành công
          </h1>

          <p className="tw-m-0 tw-text-[#1A1C20] tw-text-center">
            Cảm ơn bạn đã lựa chọn mua sắm tại Interior Haven, đơn hàng của bạn
            đã được chuyển tới hệ thống xử lý đơn hàng. Trong quá trình xử lý
            Interior Haven sẽ liên hệ lại nếu như cần thêm thông tin từ bạn và
            bạn sẽ nhận được Email xác nhận đơn hàng từ Interior Haven.
          </p>

          <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-4 tw-mt-4 tw-flex tw-flex-col tw-items-center">
            <p className="tw-mb-1">
              <span className="tw-text-[#1A1C20]">Mã đơn hàng:</span>
              <span className="tw-text-[#1A1C20] tw-ml-1 tw-font-bold">
                #0001
              </span>
            </p>

            <p className="tw-mb-1">
              <span className="tw-text-[#1A1C20]">Thời gian đặt hàng:</span>
              <span className="tw-text-[#1A1C20] tw-ml-1 tw-font-bold">
                15:26 22/11/2024
              </span>
            </p>
          </section>

          <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-6 tw-mt-4">
            <p className="tw-text-[#1A1C20] tw-font-bold tw-text-[32px] tw-text-center tw-mb-6">
              Thông tin đơn hàng
            </p>

            <div className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-px-6 tw-py-3">
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

            <div className="tw-flex tw-items-center tw-justify-between tw-mt-6">
              <p className="tw-m-0 tw-text-[#1A1C20]">Tổng đơn hàng</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                {formatPrice(61000000)}
              </p>
            </div>

            <hr className="tw-my-4 tw-bg-[#EEEEEE] tw-h-[1px] tw-outline-none tw-border-none" />

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Mã giảm giá</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                -{formatPrice(1000000)}
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Phí vận chuyển</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                {formatPrice(0)}
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Phương thức thanh toán</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                Thanh toán khi nhận hàng
              </p>
            </div>

            <hr className="tw-my-4 tw-bg-[#EEEEEE] tw-h-[1px] tw-outline-none tw-border-none" />

            <div className="tw-flex tw-items-center tw-justify-between">
              <p className="tw-m-0 tw-text-[#1A1C20]">Tổng thanh toán</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20] tw-text-xl">
                {formatPrice(60000000)}
              </p>
            </div>
          </section>

          <section className="tw-border tw-border-solid tw-border-[#EEEEEE] tw-rounded tw-p-6 tw-mt-4">
            <p className="tw-text-[#1A1C20] tw-font-bold tw-text-[32px] tw-text-center tw-mb-6">
              Thông tin giao hàng
            </p>

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Họ tên người nhận</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">Hao Le</p>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Số điện thoại</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                0378596059
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <p className="tw-m-0 tw-text-[#1A1C20]">Email</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                haonle.design@gmail.com
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between">
              <p className="tw-m-0 tw-text-[#1A1C20]">Địa chỉ</p>
              <p className="tw-m-0 tw-font-bold tw-text-[#1A1C20]">
                27 Hoàng Hoa Thám, P. 6, Q. Bình Thạnh, TP. Hồ Chí Minh
              </p>
            </div>
          </section>

          <div className="tw-text-center tw-mt-4">
            <Link
              to="/products"
              className="tw-font-normal tw-inline-flex tw-items-center"
            >
              <p className="tw-m-0 tw-text-[#1A1C20]">Tiếp tục mua hàng</p>
              <i className="fa-solid fa-chevron-right tw-text-[#1A1C20] tw-ml-2 tw-text-sm"></i>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
