import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, message } from "antd";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data) => apiClient.post("/api/login", data),
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      message.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại"
      );
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
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

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">Đăng nhập</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-w-[600px] tw-max-w-full tw-mx-auto tw-mt-24"
          >
            <h1 className="tw-text-center tw-text-5xl tw-font-bold tw-mb-6">
              Đăng nhập
            </h1>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="login">
                  Tên đăng nhập hoặc Email
                </label>
                <input
                  type="text"
                  id="login"
                  className={`form-control ${errors.login ? "is-invalid" : ""}`}
                  placeholder="Nhập tên đăng nhập hoặc email"
                  {...register("login", {
                    required: "Tên đăng nhập hoặc Email không được để trống",
                    minLength: {
                      value: 4,
                      message: "Tên đăng nhập phải có ít nhất 4 kí tự",
                    },
                  })}
                />
                {errors.login && (
                  <div className="invalid-feedback">{errors.login.message}</div>
                )}
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12 tw-mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="Password">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="Password"
                  className={`form-control ${
                    errors.Password ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập mật khẩu"
                  {...register("Password", {
                    required: "Mật khẩu không được để trống",
                  })}
                />
                {errors.Password && (
                  <div className="invalid-feedback">
                    {errors.Password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-items-center tw-gap-x-2">
                <Checkbox {...register("rememberMe")}>
                  <p className="tw-text-[#1A1C20] tw-m-0">Ghi nhớ mật khẩu</p>
                </Checkbox>
              </div>

              <Link
                to="/forgot-password"
                className="tw-text-[#99CCD0] tw-underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn btn-primary rounded-0 btn-lg tw-w-full tw-text-2xl tw-mt-6 tw-uppercase tw-font-semibold"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <p className="tw-text-center tw-mt-6">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="tw-text-[#99CCD0] tw-underline">
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
