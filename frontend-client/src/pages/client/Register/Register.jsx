import React from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("Password");

  const registerMutation = useMutation({
    mutationFn: (data) => apiClient.post("/api/register", data),
    onSuccess: () => {
      message.success("Đăng ký thành công");
      navigate("/login");
    },
    onError: (error) => {
      message.error(
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-min-h-[80vh] tw-pt-24 container">
        <div className="tw-mt-6 tw-mb-24">
          <div className="tw-flex tw-items-center tw-gap-5">
            <Link to="/" className="tw-text-[#9E9E9E]">
              Trang chủ
            </Link>

            <div className="tw-text-[#9E9E9E]">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">Đăng ký</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="tw-w-[600px] tw-max-w-full tw-mx-auto tw-mt-24"
          >
            <h1 className="tw-text-center tw-text-5xl tw-font-bold tw-mb-6">
              Đăng ký
            </h1>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="Fullname">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="Fullname"
                  className={`form-control ${
                    errors.Fullname ? "is-invalid" : ""
                  }`}
                  placeholder="Nguyễn Văn A"
                  {...register("Fullname", {
                    required: "Họ và tên không được để trống",
                    minLength: {
                      value: 3,
                      message: "Họ và tên phải có ít nhất 3 kí tự",
                    },
                  })}
                />
                {errors.Fullname && (
                  <div className="invalid-feedback">
                    {errors.Fullname.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="Username">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  id="Username"
                  className={`form-control ${
                    errors.Username ? "is-invalid" : ""
                  }`}
                  placeholder="username123"
                  {...register("Username", {
                    required: "Tên đăng nhập không được để trống",
                    minLength: {
                      value: 4,
                      message: "Tên đăng nhập phải có ít nhất 4 kí tự",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới",
                    },
                  })}
                />
                {errors.Username && (
                  <div className="invalid-feedback">
                    {errors.Username.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12 mb-3 mb-md-0">
                <label className="font-weight-bold" htmlFor="Email">
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  placeholder="example@email.com"
                  {...register("Email", {
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                />
                {errors.Email && (
                  <div className="invalid-feedback">{errors.Email.message}</div>
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
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                  })}
                />
                {errors.Password && (
                  <div className="invalid-feedback">
                    {errors.Password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12 tw-mb-3 mb-md-0">
                <label
                  className="font-weight-bold"
                  htmlFor="Password_confirmation"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  id="Password_confirmation"
                  className={`form-control ${
                    errors.Password_confirmation ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập lại mật khẩu"
                  {...register("Password_confirmation", {
                    required: "Vui lòng nhập lại mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                />
                {errors.Password_confirmation && (
                  <div className="invalid-feedback">
                    {errors.Password_confirmation.message}
                  </div>
                )}
              </div>
            </div>

            <div className="tw-flex tw-items-center tw-gap-x-2 tw-mb-4">
              <Controller
                name="terms"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
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
                )}
              />
            </div>

            <input
              type="submit"
              value={registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
              disabled={registerMutation.isPending}
              className="btn btn-primary rounded-0 btn-lg tw-w-full tw-text-2xl tw-mt-6 tw-uppercase tw-font-semibold"
            />

            <p className="tw-text-center tw-mt-6">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="tw-text-[#99CCD0] tw-underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
