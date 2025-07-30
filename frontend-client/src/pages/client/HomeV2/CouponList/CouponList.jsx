import { Flex } from "antd";
import React from "react";

const CouponList = () => {
  return (
    <div className="container tw-mx-auto tw-my-[32px]">
      <Flex gap={48} wrap="wrap">
        <div className="tw-flex tw-gap-[12px] tw-w-[300px] tw-max-w-full">
          <div className="tw-flex tw-items-center tw-gap-x-[12px] tw-bg-[#D2D2D2] tw-p-[16px] tw-rounded-[15px]">
            <img
              src="/images/coupon-1.png"
              alt="Coupon 1"
              className="tw-w-[50px] tw-h-[72px] tw-object-cover"
            />

            <div>
              <p className="tw-mb-[8px] tw-font-medium tw-text-[15px]">
                Dùng CODE: NEXTGEN20
              </p>

              <p className="tw-m-0">
                <span className="tw-font-semibold tw-text-[#AA681D]">
                  Giảm giá 20%{" "}
                </span>
                <span>cho đơn hàng từ 2.000.000đ</span>
              </p>
            </div>
          </div>
        </div>

        <div className="tw-flex tw-gap-[12px] tw-w-[300px] tw-max-w-full">
          <div className="tw-flex tw-items-center tw-gap-x-[12px] tw-bg-[#D2D2D2] tw-p-[16px] tw-rounded-[15px]">
            <img
              src="/images/coupon-2.png"
              alt="Coupon 2"
              className="tw-w-[50px] tw-h-[72px] tw-object-cover"
            />

            <div>
              <p className="tw-mb-[8px] tw-font-medium tw-text-[15px]">
                Dùng CODE: NOITHATVIP15
              </p>

              <p className="tw-m-0">
                <span className="tw-font-semibold tw-text-[#AA681D]">
                  Giảm giá 15%{" "}
                </span>
                <span>cho đơn hàng từ 1.000.000đ</span>
              </p>
            </div>
          </div>
        </div>

        <div className="tw-flex tw-gap-[12px] tw-w-[300px] tw-max-w-full">
          <div className="tw-flex tw-items-center tw-gap-x-[12px] tw-bg-[#D2D2D2] tw-p-[16px] tw-rounded-[15px]">
            <img
              src="/images/coupon-3.png"
              alt="Coupon 3"
              className="tw-w-[50px] tw-h-[72px] tw-object-cover"
            />

            <div>
              <p className="tw-mb-[8px] tw-font-medium tw-text-[15px]">
                Dùng CODE: DECORHOME20
              </p>

              <p className="tw-m-0">
                <span className="tw-font-semibold tw-text-[#AA681D]">
                  Giảm giá 20%{" "}
                </span>
                <span>khi mua combo nội thất</span>
              </p>
            </div>
          </div>
        </div>

        <div className="tw-flex tw-gap-[12px] tw-w-[300px] tw-max-w-full">
          <div className="tw-flex tw-items-center tw-gap-x-[12px] tw-bg-[#D2D2D2] tw-p-[16px] tw-rounded-[15px]">
            <img
              src="/images/coupon-2.png"
              alt="Coupon 2"
              className="tw-w-[50px] tw-h-[72px] tw-object-cover"
            />

            <div>
              <p className="tw-mb-[8px] tw-font-medium tw-text-[15px]">
                Dùng CODE: KHACHVIP15
              </p>

              <p className="tw-m-0">
                <span className="tw-font-semibold tw-text-[#AA681D]">
                  Giảm giá 15%{" "}
                </span>
                <span>cho khách hàng thân thiết</span>
              </p>
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default CouponList;
