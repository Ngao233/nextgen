import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/api";
import { useMemo, useEffect, useState } from "react";
import ClientHeader from "../../../layouts/MainLayout/ClientHeader";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const { isLoading, error, data } = useQuery({
    queryKey: ["verifyEmail", userId, token],
    queryFn: async () => {
      const response = await apiClient.get(
        `/api/verify-email/${userId}/${token}`
      );
      return response.data;
    },
    enabled: !!userId && !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { message, status } = useMemo(() => {
    if (error) {
      return {
        status: "error",
        message:
          error.response?.data?.message ||
          "Xác thực email thất bại, vui lòng thử lại hoặc liên hệ hỗ trợ.",
      };
    } else if (data) {
      return {
        status: "success",
        message: data.message || "Xác thực email thành công!",
      };
    } else if (!userId || !token) {
      return {
        status: "error",
        message: "Đường dẫn không hợp lệ, thiếu thông tin xác thực.",
      };
    }
    return {
      status: "pending",
      message: "Đang kiểm tra thông tin xác thực...",
    };
  }, [error, data, userId, token]);

  useEffect(() => {
    if (status === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status, navigate]);

  return (
    <>
      <ClientHeader lightMode={false} />

      <main className="tw-min-h-[80vh] tw-pt-24 tw-pb-2 container">
        <div className="tw-mt-6 tw-mb-24">
          <div className="tw-flex tw-items-center tw-gap-5">
            <Link to="/" className="tw-text-[#9E9E9E]">
              Trang chủ
            </Link>

            <div className="tw-text-[#9E9E9E]">
              <i className="fa-solid fa-chevron-right"></i>
            </div>

            <p className="tw-text-[#1A1C20] tw-font-bold tw-m-0">
              Xác thực Email
            </p>
          </div>

          <div className="tw-w-[600px] tw-max-w-full tw-mx-auto tw-mt-24">
            <h1 className="tw-text-center tw-text-3xl tw-font-bold tw-mb-6">
              Xác thực tài khoản
            </h1>

            <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
              {isLoading ? (
                <div className="tw-p-8 tw-text-center">
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-6">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="tw-mt-4 tw-text-lg tw-text-gray-600">
                      Đang xác thực email của bạn...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="tw-p-8 tw-text-center">
                  {status === "success" ? (
                    <div className="tw-flex tw-flex-col tw-items-center">
                      <div className="tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-green-100 tw-text-green-500 tw-mb-4">
                        <i className="fa-solid fa-check tw-text-4xl"></i>
                      </div>
                      <h4 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-2">
                        Xác thực thành công!
                      </h4>
                      <p className="tw-text-gray-600 tw-mb-6">{message}</p>
                      <div className="alert alert-info tw-mb-6">
                        <p className="tw-m-0">
                          Tự động chuyển hướng đến trang đăng nhập sau{" "}
                          <span className="tw-font-bold">{countdown}</span> giây
                        </p>
                      </div>
                      <button
                        onClick={() => navigate("/login")}
                        className="btn btn-primary rounded-0 btn-lg tw-w-full tw-text-2xl tw-uppercase tw-font-semibold"
                      >
                        Đăng nhập ngay
                      </button>
                    </div>
                  ) : (
                    <div className="tw-flex tw-flex-col tw-items-center">
                      <div className="tw-w-20 tw-h-20 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-red-100 tw-text-red-500 tw-mb-4">
                        <i className="fa-solid fa-xmark tw-text-4xl"></i>
                      </div>
                      <h4 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-2">
                        Xác thực thất bại
                      </h4>
                      <p className="tw-text-gray-600 tw-mb-6">{message}</p>
                      <Link
                        to="/"
                        className="btn btn-secondary rounded-0 btn-lg tw-w-full tw-text-2xl tw-uppercase tw-font-semibold"
                      >
                        Quay về trang chủ
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="tw-text-center tw-mt-6">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="tw-text-[#99CCD0] tw-underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
