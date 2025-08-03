<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DashboardController; // Import DashboardController
use App\Http\Controllers\Api\OrderController;    // Import OrderController
use App\Http\Controllers\Api\ProductController;  // Import ProductController
use App\Http\Controllers\Admin\VoucherController; // Import VoucherController

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route mặc định của Laravel cho người dùng đã xác thực API
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// Thêm các API Route cho Dashboard Admin
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // Route để lấy các số liệu thống kê dashboard
    Route::get('/dashboard-stats', [DashboardController::class, 'index']);
    // Route để xuất số liệu thống kê dashboard ra Google Sheet
    Route::post('/dashboard-stats/export-to-sheet', [DashboardController::class, 'exportStatsToSheet']);


    // Các route Resource cho quản lý Đơn hàng (CRUD)
    Route::resource('orders', OrderController::class);
    // Route để xuất dữ liệu đơn hàng ra Google Sheet
    Route::post('orders/export-to-sheet', [OrderController::class, 'exportOrdersToSheet'])->name('admin.orders.exportToSheet');

    // Các route Resource cho quản lý Sản phẩm (CRUD)
    // Đặt route search trước resource để tránh xung đột với {product} parameter
    Route::get('products/search', [ProductController::class, 'search'])->name('admin.products.search');
    Route::resource('products', ProductController::class);
    // Route để xuất dữ liệu sản phẩm ra Google Sheet
    Route::post('products/export-to-sheet', [ProductController::class, 'exportProductsToSheet'])->name('admin.products.exportToSheet');

    // Các route Resource cho quản lý Voucher (CRUD)
    Route::resource('vouchers', VoucherController::class);
    // Các route tùy chỉnh cho kích hoạt/hủy kích hoạt voucher
    Route::patch('vouchers/{voucher}/activate', [VoucherController::class, 'activate'])->name('admin.vouchers.activate');
    Route::patch('vouchers/{voucher}/deactivate', [VoucherController::class, 'deactivate'])->name('admin.vouchers.deactivate');
    // Route để xuất dữ liệu voucher ra Google Sheet
    Route::post('vouchers/export-to-sheet', [VoucherController::class, 'exportVouchersToSheet'])->name('admin.vouchers.exportToSheet');
});

// Nếu bạn có các API route cho Category (CRUD) như đã đề cập trước đó, bạn có thể thêm chúng ở đây, ví dụ:
// use App\Http\Controllers\Api\CategoryApiController; // Giả sử bạn có CategoryApiController cho API
// Route::prefix('categories')->group(function () {
//     Route::get('/', [CategoryApiController::class, 'index']);
//     Route::post('/', [CategoryApiController::class, 'store']);
//     Route::get('/{id}', [CategoryApiController::class, 'show']);
//     Route::put('/{id}', [CategoryApiController::class, 'update']);
//     Route::delete('/{id}', [CategoryApiController::class, 'destroy']);
// });

