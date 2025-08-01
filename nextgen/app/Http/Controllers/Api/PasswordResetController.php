<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PasswordResetController extends Controller
{
    // Redirect đến web form reset password
    public function redirectToWebForm(Request $request)
    {
        $token = $request->query('token');
        $email = $request->query('email');

        if (!$token || !$email) {
            return response()->json([
                'success' => false,
                'message' => 'Token hoặc email không hợp lệ.'
            ], 400);
        }

        // Tìm user theo email
        $user = User::where('Email', $email)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Email không tồn tại trong hệ thống.'
            ], 400);
        }

        // Kiểm tra token có hợp lệ không
        $reset = DB::table('password_reset_tokens')
            ->where('email', $email)
            ->where('token', $token)
            ->first();

        if (!$reset) {
            return response()->json([
                'success' => false,
                'message' => 'Token không hợp lệ hoặc đã hết hạn.'
            ], 400);
        }

        // Redirect đến web form
        return redirect("/reset-password/{$user->UserID}/{$token}");
    }

    // Gửi email reset password
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);
        $user = User::where('Email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Email không tồn tại trong hệ thống.'],
            ]);
        }
        // Tạo token reset
        $token = Str::random(60);
        // Lưu token vào bảng password_reset_tokens
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->Email],
            [
                'email' => $user->Email,
                'token' => $token,
                'created_at' => now(),
            ]
        );
        // Tạo link reset
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:8080');
        $resetUrl = $frontendUrl . "/reset-password?token=$token&email={$user->Email}";
        // Gửi mail thủ công
        Mail::raw(
            "Chào {$user->Fullname},\n\nVui lòng nhấn vào link sau để đặt lại mật khẩu:\n$resetUrl",
            function ($message) use ($user) {
                $message->to($user->Email)
                        ->subject('Khôi phục mật khẩu');
            }
        );
        return response()->json(['status' => 'Đã gửi email khôi phục mật khẩu.']);
    }

    // Đặt lại mật khẩu mới
    public function reset(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Kiểm tra token trong bảng password_reset_tokens
        $reset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            throw ValidationException::withMessages([
                'email' => ['Token không hợp lệ hoặc đã hết hạn.'],
            ]);
        }

        // Cập nhật mật khẩu mới (bằng bcrypt)
        $user = User::where('Email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Email không tồn tại.'],
            ]);
        }
        $user->Password = Hash::make($request->password);
        $user->save();

        // Xóa token sau khi dùng
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json(['status' => 'Đặt lại mật khẩu thành công!']);
    }
}
