import React, { useEffect } from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import apiClient from "../../../api/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (!token || !email) {
      message.error("Đường dẫn đặt lại mật khẩu không hợp lệ");
      navigate("/login");
    }
  }, [token, email, navigate]);

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => apiClient.post("/api/reset-password", data),
    onSuccess: () => {
      message.success("Đặt lại mật khẩu thành công");
      navigate("/login");
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
    resetPasswordMutation.mutate({
      ...data,
      token,
      email,
    });
  };

  const password = watch("password");

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
              Đặt lại mật khẩu
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-w-[600px] tw-max-w-full tw-mx-auto tw-mt-24"
          >
            <h1 className="tw-text-center tw-text-3xl tw-font-bold tw-mb-6">
              Đặt lại mật khẩu
            </h1>

            <p className="tw-text-center tw-text-gray-600 tw-mb-8">
              Nhập mật khẩu mới của bạn
            </p>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="password">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập mật khẩu mới"
                  {...register("password", {
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label
                  className="font-weight-bold"
                  htmlFor="password_confirmation"
                >
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  className={`form-control ${
                    errors.password_confirmation ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập lại mật khẩu mới"
                  {...register("password_confirmation", {
                    required: "Xác nhận mật khẩu không được để trống",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                />
                {errors.password_confirmation && (
                  <div className="invalid-feedback">
                    {errors.password_confirmation.message}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="btn btn-primary rounded-0 btn-lg tw-w-full tw-text-2xl tw-mt-6 tw-uppercase tw-font-semibold"
            >
              {resetPasswordMutation.isPending
                ? "Đang xử lý..."
                : "Đặt lại mật khẩu"}
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

export default ResetPassword;
