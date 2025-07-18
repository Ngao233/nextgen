<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController; // Import HomeController cho trang chủ


// Import các Controller mới cho giao diện người dùng (frontend)
use App\Http\Controllers\ProductDetailController; // Controller cho trang chi tiết sản phẩm
use App\Http\Controllers\CartController;          // Controller cho trang giỏ hàng
use App\Http\Controllers\CheckoutController;      // Controller cho trang thanh toán

// Admin Controllers - Các Controller dành cho bảng điều khiển quản trị
use App\Http\Controllers\Admin\DashboardController; // Controller cho trang tổng quan Admin
use App\Http\Controllers\Admin\UserController;      // Controller quản lý người dùng Admin
use App\Http\Controllers\Admin\CategoryController;  // Controller quản lý danh mục Admin
use App\Http\Controllers\Admin\ProductController;   // Controller quản lý sản phẩm Admin (Giữ nguyên tên này cho Admin ProductController)
use App\Http\Controllers\Admin\OrderController;     // Controller quản lý đơn hàng Admin
use App\Http\Controllers\Admin\VoucherController;   // Controller quản lý voucher Admin
use App\Http\Controllers\Admin\NewsController;      // Import NewsController cho Admin

// Import NewsApiController cho các API route
use App\Http\Controllers\Api\NewsApiController;
use App\Http\Controllers\PaymentGatewayController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use App\Models\User;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Email verification routes (đặt ở đầu để ưu tiên cao nhất)
Route::get('/verify-email/{id}/{token}', [App\Http\Controllers\EmailVerificationController::class, 'verify'])->name('verification.verify');
Route::get('/verify-email-success', [App\Http\Controllers\EmailVerificationController::class, 'success'])->name('verification.success');
Route::get('/verify-email-error', [App\Http\Controllers\EmailVerificationController::class, 'error'])->name('verification.error');

// Password reset routes
Route::get('/forgot-password', [App\Http\Controllers\PasswordResetWebController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('/forgot-password', [App\Http\Controllers\PasswordResetWebController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('/reset-password/{id}/{token}', [App\Http\Controllers\PasswordResetWebController::class, 'showResetPasswordForm'])->name('password.reset');
Route::post('/reset-password/{id}/{token}', [App\Http\Controllers\PasswordResetWebController::class, 'resetPassword'])->name('password.update');

// Route cho trang chủ, sử dụng HomeController@index để hiển thị trang chính của website
Route::get('/', [HomeController::class, 'index']);

// Các route mặc định của Laravel Breeze cho Dashboard
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Nhóm các route liên quan đến Profile người dùng, yêu cầu xác thực
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });



// Test route để debug
Route::get('/test-verify/{id}/{token}', function($id, $token) {
    return "Test verify: ID=$id, Token=$token";
});

// Test route đơn giản cho verify email
Route::get('/test-verify-email/{id}/{token}', function($id, $token) {
    return "Testing verify email: User ID=$id, Token=$token";
});

// Test route cho verify email thật
Route::get('/test-real-verify/{id}/{token}', function($id, $token) {
    try {
        $user = \App\Models\User::findOrFail($id);
        $verificationRecord = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('email', $user->Email)
            ->where('token', $token)
            ->first();
        
        if ($verificationRecord) {
            return "Token hợp lệ! User: " . $user->Fullname . ", Email: " . $user->Email;
        } else {
            return "Token không hợp lệ!";
        }
    } catch (\Exception $e) {
        return "Lỗi: " . $e->getMessage();
    }
});

// Clear cache route
Route::get('/clear-cache', function() {
    \Artisan::call('route:clear');
    \Artisan::call('config:clear');
    \Artisan::call('cache:clear');
    return "Cache cleared!";
});

// Bao gồm các route xác thực (login, register, logout, password reset) từ file auth.php
require __DIR__.'/auth.php';

// --- Các Route mới cho giao diện người dùng (Chi tiết sản phẩm, Giỏ hàng, Thanh toán) ---

// Route cho trang chi tiết sản phẩm, hiển thị thông tin của một sản phẩm cụ thể dựa trên ID
Route::get('/products/{id}', [ProductDetailController::class, 'show'])->name('product.detail');

// Nhóm các route liên quan đến giỏ hàng, với prefix 'cart' và tên route 'cart.'
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index'); // Hiển thị trang giỏ hàng
    Route::post('/add', [CartController::class, 'add'])->name('add'); // Thêm sản phẩm vào giỏ hàng
    Route::put('/update', [CartController::class, 'update'])->name('update'); // Cập nhật số lượng sản phẩm trong giỏ hàng
    Route::delete('/remove/{cartId}', [CartController::class, 'remove'])->name('remove'); // Xóa sản phẩm khỏi giỏ hàng
});

// Nhóm các route liên quan đến thanh toán, yêu cầu người dùng đăng nhập
Route::prefix('checkout')->name('checkout.')->middleware('auth')->group(function () {
    Route::get('/', [CheckoutController::class, 'index'])->name('index'); // Hiển thị trang thanh toán
    Route::post('/place-order', [CheckoutController::class, 'placeOrder'])->name('placeOrder'); // Xử lý đặt hàng
    Route::get('/success/{orderId}', [CheckoutController::class, 'success'])->name('success'); // Trang thông báo đặt hàng thành công
});

// --- Các API Route cho Frontend React.js (News) ---
// Các route này sẽ trả về dữ liệu JSON cho ứng dụng React.js của bạn
Route::prefix('api')->group(function () {
    Route::get('/news', [NewsApiController::class, 'index']); // Lấy danh sách tin tức
    Route::get('/news/{slug}', [NewsApiController::class, 'show']); // Lấy chi tiết tin tức theo slug
});


// --- Route Group cho Admin Panel ---
// Các route trong nhóm này yêu cầu người dùng đã xác thực và có vai trò 'admin'
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard'); // Trang tổng quan Admin

    // Các route Resource cho quản lý Người dùng (CRUD)
    Route::resource('users', UserController::class);

    // Các route Resource cho quản lý Danh mục (CRUD)
    Route::resource('categories', CategoryController::class); // Đã có sẵn và đúng

    // Các route Resource cho quản lý Sản phẩm (CRUD)
    Route::resource('products', ProductController::class);

    // Các route Resource cho quản lý Đơn hàng (CRUD)
    Route::resource('orders', OrderController::class);

    // Các route Resource cho quản lý Voucher (CRUD)
    Route::resource('vouchers', VoucherController::class);

    // Các route Resource cho quản lý Tin tức (CRUD)
    Route::resource('news', NewsController::class);
});

Route::get('/test-mail', function () {
    Mail::raw('Test gửi mail thành công!', function ($message) {
        $message->to('chauttc01@gmail.com')
                ->subject('Test Mail');
    });
    return 'Đã gửi mail!';
});







