import.meta.env = {
  "BASE_URL": "/",
  "DEV": true,
  "MODE": "development",
  "PROD": false,
  "SSR": false,
  "VITE_APP_API_URL": "http://localhost:8000/api", // Thay đổi ở đây
};

import axios from "/node_modules/.vite/deps/axios.js?v=259acad9";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Sử dụng URL đã được thiết lập
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptors để thêm token và xử lý phản hồi
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Phiên đăng nhập hết hạn hoặc không hợp lệ");
    }
    return Promise.reject(error);
  }
);

// Cấu hình các phương thức API
export const fetchCategories = () => apiClient.get('/categories');
export const addCategory = async (formData) => {
    const response = await fetch('http://localhost:8000/api/categories', {
        method: 'POST',
        body: formData, // Không cần thiết phải thiết lập Content-Type
    });
    if (!response.ok) {
        throw new Error('Failed to add category');
    }
    return response.json();
};
export const updateCategory = async (id, data) => {
    const response = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: 'PUT',
        body: data, // Gửi FormData trực tiếp
    });
    return response.json();
};

export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);


export const getVouchers = () => apiClient.get('/vouchers');
export const addVoucher = (data) => apiClient.post('/vouchers', data);
export const updateVoucher = (data) => apiClient.put(`/vouchers/${data.id}`, data);
export const deleteVoucher = (id) => apiClient.delete(`/vouchers/${id}`);
export default apiClient;