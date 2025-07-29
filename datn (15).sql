-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 29, 2025 lúc 08:21 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `datn`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attributes`
--

CREATE TABLE `attributes` (
  `AttributeID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `attributes`
--

INSERT INTO `attributes` (`AttributeID`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Màu sắc', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(2, 'Kích thước', '2025-07-01 15:43:13', '2025-07-01 15:43:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `CartID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'active',
  `Create_at` datetime DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`CartID`, `UserID`, `Status`, `Create_at`, `Update_at`) VALUES
(1, 14, 'active', '2025-07-27 13:31:20', '2025-07-27 13:31:20'),
(2, 1, 'active', '2025-07-27 14:23:07', '2025-07-27 14:23:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `CartItemID` int(11) NOT NULL,
  `CartID` int(11) DEFAULT NULL,
  `ProductVariantID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`CartItemID`, `CartID`, `ProductVariantID`, `Quantity`, `Create_at`, `Update_at`) VALUES
(1, 1, 19, 3, '2025-07-27 13:31:21', '2025-07-27 07:32:36'),
(2, 1, 3, 2, '2025-07-27 13:31:21', '2025-07-27 07:32:39'),
(3, 1, 18, 2, '2025-07-27 07:27:08', '2025-07-27 07:32:20'),
(4, 2, 18, 3, '2025-07-27 14:23:07', '2025-07-28 16:04:41'),
(6, 2, 5, 2, '2025-07-28 16:06:40', '2025-07-28 17:11:10'),
(7, 2, 9, 1, '2025-07-28 17:11:21', '2025-07-28 17:11:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`CategoryID`, `Name`, `Description`, `Image`, `Create_at`, `Update_at`) VALUES
(1, 'Bàn ăn cao cấp', 'Các loại bàn ăn chất lượng cao, thiết kế hiện đại và cao cấp', '', '2025-07-01 22:40:00', '2025-07-27 07:50:10'),
(2, 'Ghế', 'Các loại ghế ăn, ghế sofa, ghế gỗ tự nhiên', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(3, 'Sofa', 'Sofa da, sofa vải, sofa gỗ', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(4, 'Tủ bếp', 'Tủ bếp hiện đại, tủ bếp gỗ', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(5, 'Tủ giày', 'Tủ giày gỗ, tủ giày thông minh', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(6, 'Tủ quần áo', 'Tủ quần áo gỗ, tủ quần áo nhiều ngăn', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(7, 'Kệ tivi', 'Kệ tivi phòng khách', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(8, 'Giường ngủ', 'Giường ngủ gỗ tự nhiên, giường ngủ hiện đại', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(9, 'Nệm', 'Nệm cao su, nệm lò xo, nệm mousse', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(10, 'Combo bàn ăn', 'Combo bàn ăn và ghế', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(11, 'Combo sofa', 'Combo sofa phòng khách', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(12, 'Gương - Ngủ', 'Gương phòng ngủ, gương trang trí', '', '2025-07-01 22:40:00', '2025-07-01 22:40:00'),
(13, 'Thảm lông', 'Các loại thảm.', '', NULL, NULL),
(14, 'lalaa', '434345', 'categories/tbxccctbQ2nKqx9rAov8OBLCyea7hbF9wS55xgVT.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorite_products`
--

CREATE TABLE `favorite_products` (
  `FavoriteProductID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ProductVariantID` int(11) DEFAULT NULL,
  `Create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `MessageID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Message` text NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Create_at` date NOT NULL DEFAULT current_timestamp(),
  `FromUser` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(4, '2025_05_29_154550_create_personal_access_tokens_table', 1),
(5, '0001_01_01_000002_create_jobs_table', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `content`, `image`, `author_id`, `status`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Thiết kế nội thất hiện đại cho căn hộ nhỏ', 'thiet-ke-noi-that-hien-dai-cho-can-ho-nho', 'Nội dung bài viết về thiết kế nội thất hiện đại cho căn hộ nhỏ...', '/images/img_1.jpg', 1, 'published', '2025-07-08 10:00:00', '2025-07-22 16:32:48', '2025-07-22 17:47:35'),
(2, 'Xu hướng màu sắc nội thất năm 2025', 'xu-huong-mau-sac-noi-that-nam-2025', 'Nội dung bài viết về xu hướng màu sắc nội thất năm 2025...', '/images/img_2.jpg', 1, 'published', '2025-07-08 11:00:00', '2025-07-22 16:32:48', '2025-07-22 17:47:46'),
(3, 'Bí quyết chọn sofa phù hợp cho phòng khách', 'bi-quyet-chon-sofa-phu-hop-cho-phong-khach', 'Nội dung bài viết về bí quyết chọn sofa phù hợp...', '/images/img_3.jpg', 1, 'published', '2025-07-08 12:00:00', '2025-07-22 16:32:48', '2025-07-22 17:47:49'),
(4, 'Tối ưu hóa không gian với nội thất thông minh', 'toi-uu-hoa-khong-gian-voi-noi-that-thong-minh', 'Nội dung bài viết về tối ưu hóa không gian...', '/images/img_4.jpg', 1, 'published', '2025-07-08 13:00:00', '2025-07-22 16:32:48', '2025-07-22 17:48:01'),
(5, 'Phong cách Scandinavian trong thiết kế nội thất', 'phong-cach-scandinavian-trong-thiet-ke-noi-that', 'Nội dung bài viết về phong cách Scandinavian...', '/images/img_5.jpg', 1, 'published', '2025-07-08 14:00:00', '2025-07-22 16:32:48', '2025-07-22 17:48:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `NotificationID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Message` text NOT NULL,
  `IsRead` tinyint(4) NOT NULL DEFAULT 0,
  `Create_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `OrderDetailID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductVariantID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Unit_price` decimal(10,0) DEFAULT NULL,
  `Subtotal` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orderdetail`
--

INSERT INTO `orderdetail` (`OrderDetailID`, `OrderID`, `ProductVariantID`, `Quantity`, `Unit_price`, `Subtotal`) VALUES
(1, NULL, NULL, NULL, NULL, NULL),
(2, NULL, NULL, NULL, NULL, NULL),
(3, 5, 5, 2, 6000000, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `InvoiceCode` varchar(50) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `VoucherID` int(11) DEFAULT NULL,
  `PaymentID` int(11) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Total_amount` decimal(10,0) DEFAULT NULL,
  `Receiver_name` varchar(255) DEFAULT NULL,
  `Receiver_phone` varchar(255) DEFAULT NULL,
  `Shipping_address` text DEFAULT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`OrderID`, `InvoiceCode`, `UserID`, `VoucherID`, `PaymentID`, `Status`, `Total_amount`, `Receiver_name`, `Receiver_phone`, `Shipping_address`, `Create_at`, `Update_at`) VALUES
(1, NULL, NULL, NULL, NULL, 'completed', 15000000, 'Nguyen Van B', '0987654321', '456 Đường XYZ', '2025-07-01 18:34:13', '2025-07-05 17:24:18'),
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-01 18:35:53', '2025-07-01 18:35:53'),
(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-07-01 18:40:05', '2025-07-01 18:40:05'),
(4, NULL, NULL, NULL, NULL, NULL, 11500000, NULL, NULL, NULL, '2025-07-01 18:41:39', '2025-07-01 18:41:39'),
(5, NULL, 1, 2, 2, 'pending', 12000000, 'Nguyen Van A', '0123456789', '123 Đường ABC', '2025-07-05 17:22:46', '2025-07-05 17:22:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('blackrabitxx@gmail.com', 'pBRWO6CKb7CaX6cI6o4nvzkkUjU9cLFqwfncPvzpCOU5gpO8B4jdOmVo37FG', '2025-07-12 11:11:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_gateway`
--

CREATE TABLE `payment_gateway` (
  `PaymentID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `payment_gateway`
--

INSERT INTO `payment_gateway` (`PaymentID`, `Name`) VALUES
(2, 'COD'),
(3, 'Ví điện tử Momo'),
(4, 'Thẻ tín dụng/ghi nợ'),
(5, 'Thanh toán khi nhận hàng'),
(6, 'Ví điện tử ZaloPay');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(23, 'App\\Models\\User', 1, 'auth_token', '188fa630767a98b98f089047c3e2ffcff773174bac95370866d1a132a50ea012', '[\"*\"]', NULL, NULL, '2025-07-24 09:13:16', '2025-07-24 09:13:16'),
(24, 'App\\Models\\User', 1, 'auth_token', 'f23f77a10a8414926772c6c5529045e4c113a7563a74024aa9dbfb768bfe3633', '[\"*\"]', NULL, NULL, '2025-07-24 09:23:26', '2025-07-24 09:23:26'),
(25, 'App\\Models\\User', 1, 'auth_token', 'fdf872474ee6fb37ef3070d244ec5971c147391d480ddcb1fad5d6ed4b601766', '[\"*\"]', NULL, NULL, '2025-07-25 11:13:16', '2025-07-25 11:13:16'),
(26, 'App\\Models\\User', 1, 'auth_token', 'e9a83e4f73e4cdf19a72c206f2bb9de3156f59e56fb2b6910779a24daa09d1e1', '[\"*\"]', NULL, NULL, '2025-07-25 11:14:03', '2025-07-25 11:14:03'),
(27, 'App\\Models\\User', 1, 'auth_token', '2aca26e75fea15da65d2cb90ba4a63e51a021857fa3bca41f347767f17fb015c', '[\"*\"]', NULL, NULL, '2025-07-26 08:51:14', '2025-07-26 08:51:14'),
(28, 'App\\Models\\User', 1, 'auth_token', '6bbe593a7342678978e8e0f8ed0163c6136f5bd8aff74147bc3634432228a48c', '[\"*\"]', NULL, NULL, '2025-07-26 22:48:35', '2025-07-26 22:48:35'),
(29, 'App\\Models\\User', 1, 'auth_token', '8c81e699082f39f8560ea0953d6aad8a3a3d05342de0f53437b3efb0c2fcd9d8', '[\"*\"]', NULL, NULL, '2025-07-26 22:48:39', '2025-07-26 22:48:39'),
(30, 'App\\Models\\User', 1, 'auth_token', '9c7f766f9238314b22a6a5417ec6cff33d1ecde5fd9f0c90ed34b2559918abd9', '[\"*\"]', NULL, NULL, '2025-07-26 22:48:55', '2025-07-26 22:48:55'),
(31, 'App\\Models\\User', 1, 'auth_token', 'f70e1e2468295da0733d30c2684a12bffa25f71e33c224395afb6a9b585eb4ab', '[\"*\"]', NULL, NULL, '2025-07-26 22:54:45', '2025-07-26 22:54:45'),
(32, 'App\\Models\\User', 14, 'auth_token', 'b1328680054147d48c15fa8c556f3557a39257baffad995595e2ba3e5400c231', '[\"*\"]', NULL, NULL, '2025-07-26 22:58:29', '2025-07-26 22:58:29'),
(33, 'App\\Models\\User', 14, 'auth_token', 'a2e95fadf1f7c018ce54cf44ae5b6a010e350f48db760a8bf20b9afbc76b0b75', '[\"*\"]', NULL, NULL, '2025-07-26 23:03:04', '2025-07-26 23:03:04'),
(34, 'App\\Models\\User', 14, 'auth_token', '59a0e8e909bf821b62b948681c23e9d029a2c2efe8e42f7b4fc5de8996e1de37', '[\"*\"]', NULL, NULL, '2025-07-26 23:03:07', '2025-07-26 23:03:07'),
(35, 'App\\Models\\User', 1, 'auth_token', '756866838295ff6475c9c9b8fd7a1bd63124a01159bb881b741909ed545f3d75', '[\"*\"]', NULL, NULL, '2025-07-26 23:11:21', '2025-07-26 23:11:21'),
(36, 'App\\Models\\User', 1, 'auth_token', '5c40d44abe8cf88bb5a0b11a24e55116445a4cf1cdfcfd22cc8dd4c194a0153b', '[\"*\"]', NULL, NULL, '2025-07-26 23:11:23', '2025-07-26 23:11:23'),
(37, 'App\\Models\\User', 14, 'auth_token', 'e62936e61ec94a4c915ac6e3cea87480e71c1b62ef593f6269e43100f7a0ea4a', '[\"*\"]', NULL, NULL, '2025-07-26 23:12:56', '2025-07-26 23:12:56'),
(38, 'App\\Models\\User', 14, 'auth_token', 'e19fee43b79c6606e22ef214abffccac54346d432bc1d9380e134bb3349ee17b', '[\"*\"]', NULL, NULL, '2025-07-26 23:14:28', '2025-07-26 23:14:28'),
(39, 'App\\Models\\User', 14, 'auth_token', '6e420249db26268ea7abbb43388392905bff1e0998842b9af748c443b33e43c4', '[\"*\"]', NULL, NULL, '2025-07-26 23:15:47', '2025-07-26 23:15:47'),
(40, 'App\\Models\\User', 1, 'auth_token', '76a8cfa4c35f05b6159aa83e743f245761c38c24117afad49515ea1250a18aee', '[\"*\"]', NULL, NULL, '2025-07-26 23:15:59', '2025-07-26 23:15:59'),
(41, 'App\\Models\\User', 14, 'auth_token', 'b81280faa1305bbce6efb9e1efccfc91482bccce40df11930414cfa39353e97d', '[\"*\"]', '2025-07-27 00:33:05', NULL, '2025-07-26 23:26:20', '2025-07-27 00:33:05'),
(42, 'App\\Models\\User', 1, 'auth_token', 'daf6a90530d28a7df2b23d359563216cb711fdeb625fd02ac4733740734bd1cd', '[\"*\"]', NULL, NULL, '2025-07-27 00:35:59', '2025-07-27 00:35:59'),
(43, 'App\\Models\\User', 1, 'auth_token', '737e7d5505cba4b0827c6c37dd66172eb83a3665926c12224d551dde3812122d', '[\"*\"]', '2025-07-27 07:23:07', NULL, '2025-07-27 07:23:02', '2025-07-27 07:23:07'),
(44, 'App\\Models\\User', 1, 'auth_token', 'feba5da10c3f92ad8556b388f1a3c30273a7f18a875fded765df3a0ceeb39c6c', '[\"*\"]', '2025-07-28 07:28:07', NULL, '2025-07-27 08:03:08', '2025-07-28 07:28:07'),
(45, 'App\\Models\\User', 14, 'auth_token', 'af342f56da57320a39b865805f0d0e17ac14e2783077c1a521739a4ba4d6bda3', '[\"*\"]', NULL, NULL, '2025-07-28 07:54:43', '2025-07-28 07:54:43'),
(46, 'App\\Models\\User', 1, 'auth_token', '83cc4ac6dcfa2c06415d1e7b510212e9096a292b80d8c6fd0cd3ecb296d470bb', '[\"*\"]', NULL, NULL, '2025-07-28 08:30:29', '2025-07-28 08:30:29'),
(47, 'App\\Models\\User', 1, 'auth_token', 'c467513b0eb063a4b64dc23fcdd320661ed93d9800e8a06c7bb8529741963751', '[\"*\"]', NULL, NULL, '2025-07-28 08:30:50', '2025-07-28 08:30:50'),
(48, 'App\\Models\\User', 1, 'auth_token', 'aa033f273b1d762bc27eec036604e2e1599d9e98711fc0c3a0d0411d2335448e', '[\"*\"]', NULL, NULL, '2025-07-28 08:31:53', '2025-07-28 08:31:53'),
(49, 'App\\Models\\User', 14, 'auth_token', '129a84f3f4665882d73314e7ca4bb1cd3ab33525b57243e233d469a9162d2308', '[\"*\"]', NULL, NULL, '2025-07-28 08:38:04', '2025-07-28 08:38:04'),
(50, 'App\\Models\\User', 1, 'auth_token', '301ebcc17dfdd39195f49fbc1f61a3065275e5ad661b35996b9bf670cea9e570', '[\"*\"]', NULL, NULL, '2025-07-28 08:38:26', '2025-07-28 08:38:26'),
(51, 'App\\Models\\User', 1, 'auth_token', 'c3282b1fe39d4289b386a6786c32f1592dd1f163e2f10a475b7cba1cf44898f5', '[\"*\"]', '2025-07-29 09:06:09', NULL, '2025-07-28 08:38:44', '2025-07-29 09:06:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Image` text DEFAULT NULL,
  `base_price` decimal(20,0) NOT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`ProductID`, `CategoryID`, `Name`, `Description`, `Image`, `base_price`, `Status`, `Create_at`, `Update_at`) VALUES
(1, 1, 'Sofa gỗ cao su cập nhật', 'Mô tả mới', 'ban/Ban-an-Go-Cao-Su-MOHO-OSLO01.png', 6000000, 1, '2025-07-01 22:42:19', '2025-07-11 16:59:03'),
(2, 1, 'Bàn ăn Gỗ MOHO GRENAA01', 'Bàn ăn gỗ tự nhiên, phong cách Bắc Âu', 'ban/Ban-an-Go-MOHO-GRENAA01.png', 4200000, 1, '2025-07-01 22:42:19', '2025-07-01 22:42:19'),
(3, 2, 'Ghế ăn Gỗ Cao Su Tự Nhiên Milan01', 'Ghế ăn gỗ cao su tự nhiên, kiểu dáng Milan', 'ghe/Ghe-an-Go-Cao-Su-Tu-Nhien-milan01.png', 900000, 1, '2025-07-01 22:42:19', '2025-07-01 22:42:19'),
(4, 3, 'Sofa Da RIGA 2m', 'Sofa da cao cấp, dài 2m, phù hợp phòng khách hiện đại', 'ghe/Ghe-Sofa-Da-RIGA-2m.png', 7500000, 1, '2025-07-01 22:42:19', '2025-07-01 22:42:19'),
(5, 4, 'Tủ bếp Kitchen Premium Narvik01', 'Tủ bếp gỗ cao cấp, thiết kế hiện đại', 'tu-bep/Kitchen-Premium-Narvik01.png', 12000000, 1, '2025-07-01 22:42:19', '2025-07-01 22:42:19'),
(6, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:34:44', '2025-07-05 15:34:44'),
(7, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:36:27', '2025-07-05 15:36:27'),
(8, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:38:32', '2025-07-05 15:38:32'),
(9, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:39:15', '2025-07-05 15:39:15'),
(10, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:46:42', '2025-07-05 15:46:42'),
(11, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:47:53', '2025-07-05 15:47:53'),
(12, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:51:37', '2025-07-05 15:51:37'),
(13, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:53:50', '2025-07-05 15:53:50'),
(14, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 15:54:19', '2025-07-05 15:54:19'),
(15, 1, 'Sofa gỗ cao su', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-05 17:03:30', '2025-07-05 17:03:30'),
(16, 1, 'Sofa gỗ ván ép', 'Sofa đẹp', NULL, 5000000, 1, '2025-07-11 16:57:16', '2025-07-27 16:22:11'),
(17, 1, 'Bàn trà kiểu Nhật', 'Bạn có thích uống trà không?', NULL, 3000000, 1, '2025-07-27 16:19:35', '2025-07-27 16:19:35'),
(18, 1, 'Bàn trà kiểu Nhật', 'Bạn có thích uống trà không?', NULL, 3000000, 1, '2025-07-27 16:20:23', '2025-07-27 16:46:14'),
(19, 1, 'Bàn quý tộc', 'Bạn thích phong cách quý sì tộc?', NULL, 10000000, 1, '2025-07-27 17:01:39', '2025-07-29 15:03:51'),
(20, 1, 'Bàn gấu', 'bàn kiểu TQ', 'products/f2eyNgujGMdY6dJ2y6T8zFJFStk0eBKoMIJ2cFcq.jpg', 3000000, 1, '2025-07-29 15:05:57', '2025-07-29 16:17:44'),
(22, 2, 'ghế nè', 'bạn có bao giờ hỏi cần tôi không', 'products/pOAgqQcmXC0sU8YnSktT6D4rwumt0qfc3DTNC83Z.jpg', 20000, 1, '2025-07-29 15:45:37', '2025-07-29 15:45:37'),
(27, 2, 'ghế chậu cây', 'chịu đấy', 'products/k8FxvZMfY0E2ZLgfYunmIV7B1dnl9xR3MHcEfFw8.jpg', 60000, 1, '2025-07-29 16:44:25', '2025-07-29 17:15:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productvariants`
--

CREATE TABLE `productvariants` (
  `ProductVariantID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Sku` varchar(255) NOT NULL,
  `Price` int(20) NOT NULL,
  `Stock` int(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `Update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `productvariants`
--

INSERT INTO `productvariants` (`ProductVariantID`, `ProductID`, `Image`, `Sku`, `Price`, `Stock`, `created_at`, `Update_at`) VALUES
(3, 2, '', '20001', 4300000, 8, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(4, 2, '', '20002', 4400000, 6, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(5, 3, '', '30001', 950000, 15, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(6, 3, '', '30002', 970000, 10, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(7, 4, '', '40001', 7600000, 4, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(8, 4, '', '40002', 7700000, 3, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(9, 5, '', '50001', 12100000, 2, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(10, 5, '', '50002', 12200000, 1, '2025-07-01 22:42:30', '2025-07-01 22:42:30'),
(11, 10, '', 'SKU-686948e23c737', 5000000, 10, '2025-07-05 22:46:42', '2025-07-05 15:46:42'),
(12, 11, '', 'SKU-68694929e17cd', 5000000, 10, '2025-07-05 22:47:53', '2025-07-05 15:47:53'),
(13, 12, '', 'SKU-68694a09c9a83', 5000000, 10, '2025-07-05 22:51:37', '2025-07-05 15:51:37'),
(14, 13, '', 'SKU-68694a8e75e43', 5000000, 10, '2025-07-05 22:53:50', '2025-07-05 15:53:50'),
(15, 14, '', 'SKU-68694aabcbd84', 5000000, 10, '2025-07-05 22:54:19', '2025-07-05 15:54:19'),
(17, 15, '', 'SKU-68695ae2e9d4d', 5000000, 10, '2025-07-06 00:03:30', '2025-07-05 17:03:30'),
(18, 16, '', 'SKU-6871426cdcd80', 5000000, 10, '2025-07-11 23:57:16', '2025-07-11 16:57:16'),
(19, 1, '', 'SKU-687142d72f68f', 6000000, 15, '2025-07-11 23:59:03', '2025-07-11 16:59:03'),
(21, 5, 'C:\\xampp\\tmp\\php8173.tmp', '1111111111', 15000000, 15, '2025-07-30 01:19:47', '2025-07-30 01:19:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `ReviewID` int(11) NOT NULL,
  `OrderDetailID` int(11) DEFAULT NULL,
  `ProductVariantID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Star_rating` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Image` varchar(255) NOT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('07RxhOJauoJStivfwBeU3VOjgwmshzXH0Hwyf94N', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaUtWN0g0dXRTa1Nud24xa21GR1BHQ1FmR0xrNjYwRGRWamtZVXdtVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753456976),
('0mmXBGTKqh6KY1PZaATD6wPIgXGjzOt4ggVgvLxW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaExRWXdSMlcxc1B0T1liaWtyOG4xN3JXYjVRM3hJOVN6ZXBWaklZSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753374085),
('0o0X8hkI8liIJajuryIJquXnKJ35Sf8pt6t783k8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRFR5MW1ra0lsVzRjdnNDdzBwVjFFT2JLQ0pJcHRSNXZ0dmpnZWd2TiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753452195),
('0ZlnQlJeUxkpvaocbLhUQPFHi45jRJDNJTz76Pz4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnd2bmpycVdQWmRKNFRoc1Zqd0JtZG9PTGtERFIzb3BMaUtYUTE4cCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458182),
('11KRlXpjQXl5ZN70FQBHtVKYg16vsK6rUG25vgcW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidldCQURtQjlJQ3I3SVAwWVZIZVg2TDVQMk0xVVJ0QlVzOTQzeXptYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458453),
('1TedUFE2LFfx7uPSKy3yhZx2OGPvuv91dh69viyE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkU4bkxuMXhNOTdmcUxlemJkSVZTdU1ETDNUMGJOWlJhaVJPVmR0ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458259),
('3Gc4oOimm8qvhqEE1v5QczANaPFFRNsKjeJqhDyC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFZyTnRUQjNRVUFYZG9LbzNhenc2YTJ2cFhZZ1FhNG9HRlVMUUplTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464362),
('3RKlvzIiGtVgl69pSXIkeZf3RNXvexweZuJDCtBS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0NxMU8wRjFvTHJCSFJIczlJWU50RFhqcnIzN3FHeGpnbW16MlY5VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753453812),
('4hj0hjvnHBsWhOgb5y84TaixLShggPbT4qtYaRev', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRUc5cnNJYWNLMjUwMFNkeTNrS0Q1Wm5BYWRzR3hHY29ERHp6bHFSaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458444),
('56IRVL22woP4hpMvyG2vTCDAFMZQ6WXVHAdSH8KR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiekdrelhTU1R2WWQ3Y0F4R1pISVBmREJNMTBsdUtZcnpPUmVCa0xHTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465574),
('5ds9gQtxJ1NmfNWQINfiCTLYXCJYNMkEIqI3uqjl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFZtVlZKOU85TnZjNGFmNXR2VlFSSEtmMVdBdE1hUDVjYmdCN0IycCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464176),
('5o2tWZG9eITqUBkeAAxqtvBG6escFyjan1sUm6N5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNnhySnJpUkhMNTJDNnVQYjdFeWRaeGcxeVdqNktJMXhtNE8xWEtkOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465219),
('5UwJ7km7gXhdAArX2dBmDxww9n9rFrhcr37f0Qrb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaWgxZUkxOXJCNDEyTW5zT1pzYkpINFFyT0x0QWoyNEtwTk44clNsMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464150),
('6KDesJsrmvZBKiQqHEhftzloqSMtixkpuboQP2yf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUprQVB4aTdNUDNXYVpXSWdMd2xreWdJbHphS1dyQWNleDhQYUFLYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753453828),
('7gO3Fzu6eZ4ePxeyfnx7cv6ZhXK0WWNW8cbTMxYr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTRlUWJxOVZnOWVuQ3NzMVA0bXBNc1ZZSnFLM0JKN2tXYzZpTUR2RCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464153),
('8OducLZBpHbXEWYKGhCrh4PBA5q7dKuEnBsXeSiM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnRwajlQbFlXSGx6R3pORlRUeXNnWGRMSklZc3hDd1Nnc1ZZMjF1aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465234),
('A5bvTkZN1xjosH3uMqpR9Px1MkJdAib7Tm41j9B8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFlXSjdPbkp4ZGFxUUkybnIycE9IODF3SjVhRXRWSUxJQ3R5cFhOayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458426),
('BA0P4Is7brhzsDjxuQ600A5Dr6gNbiwg6NkbWP14', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNkYwVVAyWFYwWFNwbk55aksxWFZKaWliNEN5RWpqd09BcndqaGNtTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458191),
('BaIVxAaBr14ncmBe5dLuJ6lZkuhngpM4bta1K1ry', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieTVpcjZUQmRVaEhCRFIzMjZxaGN4YkROWTNFV09KS3R4Q2tVTGZ2dSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753374207),
('bYdaEMDjs2eoiHHxKsgYa4lafsXGE0aMQ830MSKw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR3Zmc2VoZnZpNHo4U29LMUhlMlRZVFFNMjJGTUUzT1YyT1VNZDRKUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465791),
('C8X0BHrkcDWbX7CTLsrvxCAImXvuNId5Qd094fGD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblBQZm9mQ2EwZ1ZFN1dNbUFQeWhJeldiV1JBemNubGJLQjkyZkRhayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458197),
('d4qWuuNSgFNoS2CezdXuDe62OdBfodEU42JpST6j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGRxWDR6akpEU3lwTTYwbkFDc3FQYmRTaVFLalFpTFpibTlWUVlSRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464155),
('dQ3gqEHKM8Lml0l6SM9SkfrWEhdEBCJ8KZjfQCn9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGdzbGhVbjNVMzcxeGRObEhSWlNLUDFFZXVnUVNUWUNBNDBueExrSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458266),
('dSDJ6UYlJRsNGMxSf8S9FIq30Ro4wsPTWhBjzwU6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHJDNW5oUFh3VmdOQ09YU212ejdGeXVaTkdRQThSeUhaNzVjYXUwZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464914),
('DtJFdzX2JXa74QHEAhYJADyfjMuzPkQgebVASBdC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYUcwWTVsUUtMbXFwYjRaQ1BUVFZsRlFHcldNQnNWVHpaWmZrUkFuaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464573),
('dZZGnA4xvjmDCXMqZoqn93at4IETHVeq1JFnxjqu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0p2YUNSYUhDZkliUW54M0xLbWtCZnFIeGZKRVR0SFdDc1dzZGF0UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458203),
('EluSOOS6cNB82TcY4gq0P8TuMANn3cm3ngSLPNWV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjNmSHp6amNSOUN5RHdJU1FFVXpOdnJXVTZIMXQ2bzhvOWFhN3pwZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458396),
('fb96DlHYfvs36WUQ7TPZF50x8xlYTshNKAHwKUcX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFdVUkxqQ1Bvb01wTVdJY3pkUlBCak9GQWpFbm5iNjMxWjhOdWJTRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753455756),
('FBlaAP4rOWZLlTITDSkURes50E4zcbMBKNEIsRCS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1g3R21SM3ppOTM4cWl4WVVOYmtPNTgyZHJuNlZhdWhWQjVwa2NwTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458262),
('GdlSnaiyqQxtNiPognpPHjnoedda609yjQz5f8PZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidUlOZ29OWUZqZEhKV1pINUlVTkZRdnhhUTMxMFNlRzluNkZYaWV5SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464928),
('gesb2ktEsDUAX6yC213tqzuJKPVTpvNHehq42Byo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiczZtZWlhUTdMUUM5Z1ptNlFBUUk4NGZZS3ZBRkZ2QXk1a1VkYzVaUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464908),
('gF6gH1Nu8gI56nX337CizW5q49xEuw9XnExX57N9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidEpOWXJ0cWViQjdncGNTSXVxZ25WVDI4QXpDWEMxaDZUYjYwMmttbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458398),
('HdHSNraEzEKr4bzk7gATKT3CUD3tt13KvB4mWBr6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVHpMVlZMaEhVT0taNmlEenBxdGl4VEY2QXIyZDBQSHVFNFpJaVZWNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465994),
('HuNM0hrJD8gijxYCdWpJbhcibz7cRCUOthg77m2m', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnUyT21WTlZZMW5JNERmMGxlMXNIdkpmTmFZOG1LdjU2RkdHRmdIVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458205),
('IbFXaYGhQUTSHJAr8ywtKy0p3ibZDjiN1jXagIPr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkJVemo2OERsam1iNzlJWTJnWUxMMUpyb2VOZFhJZks5STVaNjZCYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458429),
('jCa8GyhCeMpV9NCmbs64vOpYm4Sn9wPsy3hb3Xqg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicEplSVAxR0duYzZXUnhjbHJYRVR4a1VKSlNhcUs4VWxTZVhUamlPcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753453808),
('jEIk5EMwXrml8rg0ygrB34seE4sDGfE0U2HKTY5R', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSDYyZFJzSk1vcVVzaXlRVDBXSHB5OVVzaHg1T0JDMzVWUURSRkxKcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753466341),
('JIJBM6oKBjr8bgLdRzPPDtyKUgWaI1SjULFwrMMw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzRGSm5EVzFFUGtpWElpeDZZQ2J6V0pSSXp0d0hxRHB4dGMwQk1EOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464585),
('jRsjhWWAX600b7KDYBpYLUwGH4djLu6DrvjhZdIw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSkZsNzlTaFppR21ZVjhUeVZTdnlZRGdJaEkyVENNQ3F0bU41MEh1OCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465240),
('ke2y40T3q5b6dJg404DojRXzE6TOyKkEAbZhrYPD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ1BLQThhakY2aG9CcGlwbEpaVDVGdUNxZEpab0JTS01kRGJnUWpnSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465259),
('kF3UHONnyRp4yTJQsNjX8bbJ4bnA5vgeR2tim60p', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0Q1d0o1MTFkWERZQmtSZm1VaG5BVTZSR2NZbnhJNEdwWW9zT2daRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465197),
('KhT5vH3yvFRLFmkjeqWb3w31uHY4RMig7qEmR1S0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2JZeGp4VDNTeGk0b0t0RHlSUWs5V1o4Z2h0VmJTaWZUbzZYTDNSYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753453421),
('kjEB70p2lu9oYlkfkTEAvYRogf9Zmw3cHMx9o0J1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzRGaEJ3WW81dVZYdFpqNUUzS1NZd0Z3OFVQTkFaZGg3Y0JZdmY0UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753460637),
('KpWAmGoVETzvxN8nP71LA1ZsuV8M8WEB20ykjnUc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMTltdzNHVGU5UG1ya1dZalF3cEhoNUJqTWJUSmo5cEkxRGdsN0pMUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458399),
('MgaO5AtND27eRWA5vFXOqNbqeVmAVg76taQvDMpM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0ZkSEl1elBoUThTWHBuaEpMV211R2NVVW5FRnZKQWhtMkNoRENMbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753463893),
('ML0VRXhUcNfouoXMLhpMZ3wUYMCDCOFK5PX1c0mt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicTlJYm5UZm5oZFo1dndNOFNKYzNJc1BncktkOUxHNnhhN1h2b29tUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464358),
('MsKlLmA1ZuzhL4MY1jhIAppNP2LOJtci4jVd8vez', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWZFR3hkNFlDYmNBcHhnRTFVYThjRVhkRUVUN3RlbzNnZDFrUmlnNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465809),
('N5RHTvBkqv5pPvmyDk2rPVwmCEThuxDQA0ynvLnN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS253Skx4NDdkOXRzMGRiYnczM0gzakE3S2U2S083MTZhVjJCQ2FJbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458257),
('OFYeBAO0hz9fuICD4eoMwkQ4CElb2HT8f6DL3WWA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRExNNHJXSFZZOGw5b2wwaGJhNzdqMG9Iek1mYUJMM09tamd4eHlONiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464074),
('ojeXLmVBJRxVaINXKltfqIvGOefNXXgeBvH3K0ON', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZnM2Y3ZTbHFxVjMyUEVJT3FrdUFEU1J6aEtnWURyRWFMWGY2WTgxVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753456149),
('pFiLmJCR4fuYVGetORxifOs7wvNNFIRLPVkDb6ro', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDVEWG02Y1prM2Z6Y0FvdmlMSnV6anduRHMwYXpiNUREcmNNSjBKUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753463944),
('pONZc1ISYvzXGz0GTuPCqdTAdajNiiDWO3nvGlWf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGJTNWZzY0ZiRnVrZ0VJNmFnRE9IMVZwMGR6RXN2SXFycEsxUzRqWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458505),
('ppvYQuxUqM2Uoa9JgruxHf3O88noPhUy7QXd6Be8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibkZCZDN2WFlPZ2ZEZXM1VWMxRkx5R2swS2pFVnBrNHdxWjUwalpnQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458207),
('prlhNTPO2AXcR9BEnHgfDOUl32mMHcnjguwezLgo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicGl3ZHl0YmQ4OVduZmppU1ZJWlZGVHBKdWRjQVRXbnZnT2Q2SEoyNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753463937),
('PuLzjmmHzSetmOegCIPqN48HJIfstatmMa5Jvfp5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDBSNXhBelplM2M5VmFSRWFMb2VoY1pBaDIzSGhsd2RqSFc2cmdRVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464239),
('PZyiua1v8stvu57SC5SjnhOHIGNjlZ2brN3ZG0ju', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFQ5TUVhYk9BZWR2VXBmUDljNTR4Wnd3bXNVcWJtcHNQdEswRTVldyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464302),
('q7SGGJycTPSpEDc4Lkvx5cwY7zokTlDgW1gyXtlt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW1nTFY1N1BEZzVUTnFqbTc2dWRTeUtub25xUzg4QVJMc0pQM2MxUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464231),
('Q9jPfjEHzYIoaDoEjT12fNvfdwTn8Ld2v0jepzCc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSmRGcmR6eWZzWmxpY04zSHBzYkE1VHBRTm9JVmpvSjVlOUhJY0pkeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464149),
('QeT6ZdgAiFaSsgIA3bQLfQfXbVUTJBJGhwcL458j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW1PbGRzWHdLZHU0U09LZVhjZ0w4OFNxNHA5Y0RMS0tHOFEyeWQyVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753466130),
('Rd7CiDmUZ6GPgHxRc3uAqkzb28ItwvNhtYQsVQIR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjA3enhKdHdnQ2JFc0g3VDJ3TXFXemllbzdoblhKbTFKVFduallCUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465762),
('rHaLzEDBoHXdpiIJV8hmM8dMj36oMx59o9AkBEgr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTUhhblBuVFdnVkhuRFhRVWdGRzRvVzRDVlVWMVNkQ050RlNzcTNYayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465216),
('s2aQNsuJN4xcA1FyEaXE6yC1yVCzGFnSm4ehCuB8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoianQxb0pHSUpQVjF1b1VIUUtvNmZRdHRsTVBLZGVmSWU1NkVDdExlbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458499),
('S8nLs5yZ5Yi9IL3rwuZmhAZm9lRPxr9S9nstUWKS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXBRUnhSYWUyRFNWd2ppdWUwMDMxSDNHMlFXbTRFSGdDRWhrWGlleSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465794),
('SkDH0EZwuGqvTLl6AsGCOlqwRr8SUVoXhlZtYUpc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVk84VTZEY3VXRTFaSFRNd2pRU2FnQlpWbkh4NG45cVNUYzBEV0Z6NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465997),
('smWtyNMNtJ5wudYua0VnSyFihaiZOOULN0DkTFJg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNVlZREVUVmVPTXltVHlTVGNzczRFcEJ4NmlQVlZOcHdoMFhoeU9jQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465889),
('SpWo4XCCSI62phxpzPAfBHC3mmaPB4iPi2WcTeVw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOW1KWXdVUnFyNjJ1WUgySXdxQ1pTT2lKeURmd3MxWXZIMXlQdGs0RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753457825),
('SSM6qhyCSntusTEb4Z9RhLA4HVUZQxnz8u7TVRJg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRm5mc25ZRGFkdHhWNWkxVHJyT29KSXoyR1pQdEhpMkxzNGZGWjVkZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753373567),
('thQvRPytmWNjDRGTJW9SQFz3uZocDJnhp92ztXzq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVE0xOHE5MnhablF3ZEtBUTR1ell0WWlXQ01iTnhXZHhGMFZXeTJRYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464153),
('TTG3YhHaWccSSsgg7OAcVz5yNHcRq8isaUXVpggB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFU0YkZmWFk3ZFR6MHN1bkRqVTc1aGlXeDZwQWlUNzhoUUpPdHpYVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458265),
('uHzdDwCca2aW3c0VQSRAG74xDU83812EGKBjq0of', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVZqUDlZZTBrUDRBeDlLa3Fpa0tiOWhSdE5XaFF0ZDB5M0dVOGM3NiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464135),
('UsGtW9kmEgZPZWftW4VFg8BEwd42W0qplKABEWc2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVDZkQUtGbERSUWpCWkUzZk43VVNuY3VEbGtuUkRaUmxEMGRXY001YiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753452151),
('USkl6F5RwvKQZ91TVcf9gRETpZrLn7lsztf6X4tl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidVdEU0FJamVsVzdsNzd5RWlwUUdzSzVvNHp4SGJBQlpJOEJmSndUTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753457973),
('vvGt1l9NBVVNNM6AWPgzhmjcOuNeqIHcd3yHWKE7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0M5b1lRWG9abjBiTmxGNGwxcXNBelRhRFNWQ1poMEtEcEU4Wjc0aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753373598),
('WbH9Nu2yCUOHPmw6WrpZYniNAm4Ld6eL1NVfX2Gh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidUdKVjdsM1ZlTTZmdXU3aTlWMU1HemxROVRvUEladUpRSGh6S2ZsZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458200),
('wHxeY6P00xbDuSo70qDZDHJwHtCcS2GW8rpNtHEE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQjZlMUNnQTdmTGl1NGE0VEx4d2M2YTZsODg3Sm4wQW40Q09VUnJkeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465803),
('WjTI3zJyM3gMCoxByX9tUM5GF3JPDeeOnMImvTxd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVJ5cmZEVXlXSFJQYjdNekZLblFYNXI5ZHhEbXpYeXJYVlFvRURIeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465253),
('WkxMrBDkrpKSwClhoHb1u1rWNIEsRUAifjW1cWbb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ0dHTHNGbkJmOWR6RUdLN3RTN3NuTW80bXYwUG1peGtyTGt0OUZUUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753462594),
('wRXfIbS9OhAwFGQjZb5yWcKr6UyCG3ylzXc1dUFA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSnZKWWxvSXVuRWc3bzd1aEwwU1dFb01oWlFwemJVQ3pqekdmUVF0NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464302),
('WXWphfVDLpZBHtNAk7DS81usTuvOsygNFM8TIUYy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUW5UVG9rRzVLQ0ZyUG44VVZQeklqdjlNZmVXWHZpM2NIajlYcVF4NiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458251),
('WYCzfClvzTSzCJ0dXB6jCBdky0G0ELBb2g8rbHkk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS3NjUEZDekxCTEk5Y3VZbmFjNXNVVkNNdjE0SDRZWFRNb3FKVXpvUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458240),
('XAiHrmSwd1hb4zuGnLwmIuVnnv6RRy6ItArBIRL0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnBKTmpZU2plZ21IRDJBZkdLNGNxVWQza05wdkpJSTRzbE44Sk8yTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464894),
('XBRamniE7mGGzfoShnr9AH7I52YBPYChRure5E5w', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicjM3endFSHBlVGw5OUJDUTY0MWZNMUlaSHpERmZ4dlNLQXdSb3p1eSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465797),
('Xh7DvTvaRnKmRlFYWkeDgcOPaop0pGKKBRqiVFK9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHRjeE1YUEpZQ2FrM2JKNzRTeEZGSkNpTzNZajJkenhYaFNqdE5XciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753453696),
('xjksVvvtwJNV3ak626AX0IhzZzOBZffQCSxy3y1x', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHJhSU13M3o4SWtnMFFibUIwY0wxTFVCN2lIamZyRG9OY2o5bEZkVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464586),
('XSTgtNTB2NHes37aD5R3ksA8RBVQiPHASTF524nY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0NxT25CbU0xbHRYSWpDeExUTnVlazRzU3BmV1RRMjV6OVVOd2NITSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465806),
('XXxGYcKXK25oJ7xrfy39hGvE57TbJj3XaybfhZd9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGpTWUlwTlZiY08wdnVtVktFaE5nMUh2UTZicUdpVGtHRmREMndzaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465225),
('yTVz77X1kTxaj7AXQ7lK7XeEjNyflMiG8UeJlpMB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoianZTOGlPcXhKeVFFQURFVFR6aW1nVzg4WnJGVzZYZWxIaURJS2M4MCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753462604),
('yxXHpPLAxuJwdeVey8P6Oj8CSEDUWt22FmzYqv0c', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFIxdmZaTFpwUHliRWRmSTNPNW9nQmJmcFJsSE84UHQ2dEVpUFR3WSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458446),
('Z2w10P2Sjb1ACH4P5UJymHI23TagnEMrwRZUasc3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid2ZySXdjUUxlSGtFdFlBNnVGVXpzSENVRHJweFBJZEptRGJucXdvRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753458149),
('zcwauvUuP5fbS21hh5UbgfmVmozffjnxuIquAIdf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVnRGOVB4eVdUSVp4cWlDSzc2c1JKU2YzanZxVkV0UjNLeFIxd0V0ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465249),
('zo70HkrknLHGbTaRH25Ebw2GgLbVcaFSoHhiQho7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid0FsWDUyZjYyNmRHSTFvZDRtYW8xdXRLT0JXdVczT2NRQjltbENCRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753465890),
('zwqaum9WuzVflc3y3q4j44J5hvAEyXjoEKpzcnIM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicXFFNExCa05VcERqdUR2V2tZSEJhYWxOZ1VzMXhlb2o0SmhMclJoSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvbmV3cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753464292);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Fullname` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `Updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `remember_token`, `Email`, `email_verified_at`, `Role`, `Fullname`, `Phone`, `Address`, `Status`, `Created_at`, `Updated_at`) VALUES
(1, 'chauchau', '$2y$12$Ywmq1ViGmO2r/YTJdkmm1uBqUZIzfoHPPoR0aCm0StR65ON8R6w4y', NULL, 'blackrabitxx@gmail.com', '2025-07-13 17:06:12', '1', 'Châu nè bạn', NULL, NULL, NULL, '2025-06-06 14:55:57', '2025-06-06 14:55:57'),
(2, NULL, NULL, NULL, NULL, NULL, NULL, 'Nguyen Van L', '0123456789', NULL, NULL, NULL, NULL),
(14, 'nguyenvanchien', '$2y$12$L5VNH3JnJtJSY1T6vke9Fe8XGNY/IRF0ygGjUxP2dOK3tlfAfzkpe', NULL, 'chauttc01@gmail.com', '2025-07-07 15:38:04', NULL, 'Nguyen Van A', NULL, NULL, NULL, NULL, NULL),
(17, 'nguyenvanfy', '$2y$12$cod1X9/hB0FD85CYiOHcquekn7F0j2aKDB4601d7es9ulw7r3rD.e', NULL, 'nguyenvanfy@example.com', NULL, NULL, 'Nguyễn Văn F', '0123456789', 'Hà Nội', 1, NULL, NULL),
(18, 'nguyenvanchau', '$2y$12$.uAFAM2gwbuPOZsBP4hnVeLgK8q7FEEtK4RHcQjs13DnDFTelsWyW', NULL, 'chauttcps38292@fpt.edu.vn', '2025-07-12 14:49:27', NULL, 'Nguyen Van Chau', NULL, NULL, NULL, NULL, NULL),
(25, 'linh123456', '$2y$12$ni.2cUEGahjjRpPXshw6feQacB3ZOj8.wIoWh06Pb9aZcOCBF5KCu', NULL, 'linh@gmail.com', NULL, NULL, 'linh', '12345678', 'hà lội', 1, NULL, NULL),
(26, 'chau123', '$2y$12$9TT6ammCpIFSvsZHisHmBubS425J3XScAFHNz0v53.y.sh6DS8jqy', NULL, 'blambxx@gmail.com', '2025-07-13 14:28:20', NULL, 'chau', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `variant_attributes`
--

CREATE TABLE `variant_attributes` (
  `VariantAttributeID` int(11) NOT NULL,
  `ProductVariantID` int(11) NOT NULL,
  `AttributeID` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `variant_attributes`
--

INSERT INTO `variant_attributes` (`VariantAttributeID`, `ProductVariantID`, `AttributeID`, `value`, `created_at`, `updated_at`) VALUES
(9, 3, 1, 'Trắng', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(10, 3, 2, '1m6', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(11, 4, 1, 'Nâu', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(12, 4, 2, '1m8', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(13, 5, 1, 'Tự Nhiên', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(14, 6, 1, 'Nâu', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(15, 7, 1, 'Kem', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(16, 8, 1, 'Xám', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(17, 9, 2, '2m4', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(18, 10, 2, '3m', '2025-07-01 15:43:13', '2025-07-01 15:43:13'),
(19, 15, 1, 'Đỏ', '2025-07-05 08:54:19', '2025-07-05 08:54:19'),
(20, 15, 2, 'XL', '2025-07-05 08:54:19', '2025-07-05 08:54:19'),
(23, 17, 1, 'Đỏ', '2025-07-05 10:03:30', '2025-07-05 10:03:30'),
(24, 17, 2, 'XL', '2025-07-05 10:03:30', '2025-07-05 10:03:30'),
(25, 18, 1, 'Đỏ', '2025-07-11 09:57:16', '2025-07-11 09:57:16'),
(26, 18, 2, 'XL', '2025-07-11 09:57:16', '2025-07-11 09:57:16'),
(27, 19, 1, 'Đỏ', '2025-07-11 09:59:03', '2025-07-11 09:59:03'),
(28, 19, 2, 'XL', '2025-07-11 09:59:03', '2025-07-11 09:59:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `voucher`
--

CREATE TABLE `voucher` (
  `VoucherID` int(11) NOT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `Value` decimal(10,0) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Create_at` datetime DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Expiry_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `voucher`
--

INSERT INTO `voucher` (`VoucherID`, `Code`, `Value`, `Quantity`, `Update_at`, `Create_at`, `Status`, `Description`, `Expiry_date`) VALUES
(1, 'SALE20', 200000, 20, '2025-07-03 22:59:41', '2025-07-03 22:59:41', 1, 'Giảm 200k cho đơn từ 2 triệu', '2025-12-31'),
(2, 'FREESHIP', 0, 100, '2025-07-03 22:59:41', '2025-07-03 22:59:41', 1, 'Miễn phí vận chuyển toàn quốc', '2025-12-31'),
(3, 'SUMMER20', 200000, 30, '2025-07-03 22:59:41', '2025-07-03 22:59:41', 1, 'Giảm 200k cho đơn từ 2 triệu', '2025-08-31');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`AttributeID`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`CartID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`CartItemID`),
  ADD KEY `CartID` (`CartID`),
  ADD KEY `ProductVariantID` (`ProductVariantID`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `favorite_products`
--
ALTER TABLE `favorite_products`
  ADD PRIMARY KEY (`FavoriteProductID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ProductID` (`ProductVariantID`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`MessageID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`NotificationID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`OrderDetailID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductVariantID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD UNIQUE KEY `InvoiceCode` (`InvoiceCode`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `VoucherID` (`VoucherID`),
  ADD KEY `PaymentID` (`PaymentID`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `payment_gateway`
--
ALTER TABLE `payment_gateway`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Chỉ mục cho bảng `productvariants`
--
ALTER TABLE `productvariants`
  ADD PRIMARY KEY (`ProductVariantID`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `OrderDetailID` (`OrderDetailID`),
  ADD KEY `ProductID` (`ProductVariantID`),
  ADD KEY `UserID` (`UserID`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Chỉ mục cho bảng `variant_attributes`
--
ALTER TABLE `variant_attributes`
  ADD PRIMARY KEY (`VariantAttributeID`),
  ADD KEY `ProductVariantID` (`ProductVariantID`),
  ADD KEY `AttributeID` (`AttributeID`);

--
-- Chỉ mục cho bảng `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`VoucherID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `attributes`
--
ALTER TABLE `attributes`
  MODIFY `AttributeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `CartItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `favorite_products`
--
ALTER TABLE `favorite_products`
  MODIFY `FavoriteProductID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `MessageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `OrderDetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `payment_gateway`
--
ALTER TABLE `payment_gateway`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `productvariants`
--
ALTER TABLE `productvariants`
  MODIFY `ProductVariantID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `review`
--
ALTER TABLE `review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `variant_attributes`
--
ALTER TABLE `variant_attributes`
  MODIFY `VariantAttributeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `voucher`
--
ALTER TABLE `voucher`
  MODIFY `VoucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `carts` (`CartID`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`ProductVariantID`) REFERENCES `productvariants` (`ProductVariantID`);

--
-- Các ràng buộc cho bảng `favorite_products`
--
ALTER TABLE `favorite_products`
  ADD CONSTRAINT `favorite_products_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `favorite_products_ibfk_2` FOREIGN KEY (`ProductVariantID`) REFERENCES `productvariants` (`ProductVariantID`);

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_author_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users` (`UserID`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductVariantID`) REFERENCES `productvariants` (`ProductVariantID`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`VoucherID`) REFERENCES `voucher` (`VoucherID`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`PaymentID`) REFERENCES `payment_gateway` (`PaymentID`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`);

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`OrderDetailID`) REFERENCES `orderdetail` (`OrderDetailID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`ProductVariantID`) REFERENCES `productvariants` (`ProductVariantID`),
  ADD CONSTRAINT `review_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `variant_attributes`
--
ALTER TABLE `variant_attributes`
  ADD CONSTRAINT `variant_attributes_ibfk_1` FOREIGN KEY (`ProductVariantID`) REFERENCES `productvariants` (`ProductVariantID`) ON DELETE CASCADE,
  ADD CONSTRAINT `variant_attributes_ibfk_2` FOREIGN KEY (`AttributeID`) REFERENCES `attributes` (`AttributeID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
