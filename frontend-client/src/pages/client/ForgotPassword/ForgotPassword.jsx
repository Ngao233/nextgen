import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import apiClient from "../../../api/api";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const forgotPasswordMutation = useMutation({
    mutationFn: (data) => apiClient.post("/api/forgot-password", data),
    onSuccess: () => {
      message.success("Vui lòng kiểm tra email để đặt lại mật khẩu");
      reset();
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.errors?.email?.[0] ||
          error?.response?.data?.message ||
          "Đã xảy ra lỗi, vui lòng thử lại"
      );
    },
  });

  const onSubmit = (data) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-min-h-[80vh] tw-pt-24 tw-pb-24 container">
        <div className="tw-my-6">
          <div className="tw-flex tw-items-center tw-gap-5">
            <Link to="/" className="tw-text-[#9E9E9E]">
              Trang chủ
            </Link>

            <div className="tw-text-[#9E9E9E]">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">
              Quên mật khẩu
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-w-[600px] tw-max-w-full tw-mx-auto tw-mt-24"
          >
            <h1 className="tw-text-center tw-text-3xl tw-font-bold tw-mb-6">
              Quên mật khẩu
            </h1>

            <p className="tw-text-center tw-text-gray-600 tw-mb-8">
              Nhập địa chỉ email của bạn dưới đây và chúng tôi sẽ gửi cho bạn
              một liên kết để đặt lại mật khẩu.
            </p>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Nhập email của bạn"
                  {...register("email", {
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className="btn btn-primary rounded-0 btn-lg tw-w-full tw-text-2xl tw-mt-6 tw-uppercase tw-font-semibold"
            >
              {forgotPasswordMutation.isPending
                ? "Đang xử lý..."
                : "Gửi yêu cầu"}
            </button>

            <div className="tw-text-center tw-mt-6">
              <Link to="/login" className="tw-text-[#99CCD0] tw-underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
