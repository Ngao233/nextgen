<?php

namespace App\Http\Controllers\Api; // Đã thay đổi namespace thành Api

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon; // Đảm bảo Carbon được import để sử dụng now() hoặc Carbon::now()
use App\Models\CartItem;
class CartController extends Controller
{
    /**
     * Hiển thị nội dung giỏ hàng của người dùng hiện tại dưới dạng JSON.
     * Phương thức này xử lý các yêu cầu GET đến '/api/cart/view'.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function viewCart()
    {
        $userId = Auth::id();

        if (!$userId) {
            // Trả về lỗi 401 Unauthorized nếu không có người dùng đăng nhập
            return response()->json(['message' => 'Vui lòng đăng nhập để xem giỏ hàng của bạn.'], 401);
        }

        try {
            // Lấy tất cả các mục trong giỏ hàng của người dùng, tải kèm thông tin biến thể, sản phẩm và thuộc tính
            $cartItems = Cart::where('UserID', $userId)
                             ->with(['productVariant.product', 'productVariant.attributes.attribute'])
                             ->get();

            // Trả về phản hồi JSON chứa danh sách các mục trong giỏ hàng
            return response()->json([
                'message' => 'Giỏ hàng của bạn:',
                'cart_items' => $cartItems
            ], 200);
        } catch (\Exception $e) {
            // Bắt và xử lý lỗi, trả về phản hồi JSON với mã trạng thái 500
            return response()->json([
                'message' => 'Có lỗi xảy ra khi tải giỏ hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Thêm sản phẩm vào giỏ hàng (API endpoint).
     * Phương thức này xử lý các yêu cầu POST đến '/api/cart/add'.
     *
     * @param  \Illuminate\Http\Request  $request Đối tượng Request chứa dữ liệu gửi lên từ client
     * @return \Illuminate\Http\JsonResponse Trả về một phản hồi JSON cho client
     */
    public function addToCart(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.'], 401);
        }

        // Xác thực dữ liệu đầu vào
        $request->validate([
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID',
            'Quantity' => 'required|integer|min:1',
        ]);

        $productVariantId = $request->input('ProductVariantID');
        $quantity = $request->input('Quantity');

        try {
            // Tìm kiếm hoặc tạo mới mục giỏ hàng
            $cartItem = Cart::where('UserID', $userId)
                            ->where('ProductVariantID', $productVariantId)
                            ->first();

            if ($cartItem) {
                $cartItem->Quantity += $quantity;
                $cartItem->Update_at = Carbon::now(); // Cập nhật thủ công timestamp
                $cartItem->save();
            } else {
                $cartItem = Cart::create([
                    'UserID' => $userId,
                    'ProductVariantID' => $productVariantId,
                    'Quantity' => $quantity,
                    'Create_at' => Carbon::now(), // Gán thủ công timestamp
                    'Update_at' => Carbon::now(), // Gán thủ công timestamp
                ]);
            }

            // Tải lại mục giỏ hàng với các mối quan hệ để trả về đầy đủ thông tin
            $cartItem->load(['productVariant.product', 'productVariant.attributes.attribute']);

            return response()->json([
                'message' => 'Sản phẩm đã được thêm vào giỏ hàng thành công.',
                'cart_item' => $cartItem,
                'current_cart_state' => $this->getCartItemsForApi($userId) // Lấy trạng thái giỏ hàng đầy đủ
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cập nhật số lượng của một sản phẩm trong giỏ hàng (API endpoint).
     * Phương thức này xử lý các yêu cầu PUT đến '/api/cart/update'.
     *
     * @param  \Illuminate\Http\Request  $request Đối tượng Request chứa dữ liệu gửi lên
     * @return \Illuminate\Http\JsonResponse Trả về một phản hồi JSON
     */
    public function updateCartItem(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Vui lòng đăng nhập để cập nhật giỏ hàng.'], 401);
        }

        $request->validate([
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID', // Đổi từ 'cart_id' để phù hợp với React
            'Quantity' => 'required|integer|min:0', // min:0 để cho phép xóa mục nếu Quantity là 0
        ]);

        $productVariantId = $request->input('ProductVariantID');
        $quantity = $request->input('Quantity');

        try {
            $cartItem = Cart::where('UserID', $userId)
                            ->where('ProductVariantID', $productVariantId)
                            ->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng.'], 404);
            }

            if ($quantity === 0) {
                $cartItem->delete();
                $message = 'Sản phẩm đã được xóa khỏi giỏ hàng.';
            } else {
                $cartItem->Quantity = $quantity;
                $cartItem->Update_at = Carbon::now(); // Cập nhật thủ công timestamp
                $cartItem->save();
                $message = 'Số lượng sản phẩm đã được cập nhật.';
            }

            return response()->json([
                'message' => $message,
                'cart_item' => $cartItem->load(['productVariant.product', 'productVariant.attributes.attribute']), // Tải lại để trả về đầy đủ thông tin
                'current_cart_state' => $this->getCartItemsForApi($userId)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi cập nhật giỏ hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa một sản phẩm khỏi giỏ hàng (API endpoint).
     * Phương thức này xử lý các yêu cầu DELETE đến '/api/cart/remove'.
     *
     * @param  \Illuminate\Http\Request  $request Đối tượng Request chứa dữ liệu gửi lên
     * @return \Illuminate\Http\JsonResponse Trả về một phản hồi JSON
     */
    public function removeFromCart(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng.'], 401);
        }

        $request->validate([
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID',
        ]);

        $productVariantId = $request->input('ProductVariantID');

        try {
            $cartItem = Cart::where('UserID', $userId)
                            ->where('ProductVariantID', $productVariantId)
                            ->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng.'], 404);
            }

            $cartItem->delete();

            return response()->json([
                'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng thành công.',
                'current_cart_state' => $this->getCartItemsForApi($userId) // Lấy trạng thái giỏ hàng đầy đủ
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Xóa toàn bộ giỏ hàng của người dùng (API endpoint).
     * Phương thức này xử lý các yêu cầu POST đến '/api/cart/clear'.
     *
     * @param  \Illuminate\Http\Request  $request Đối tượng Request (ít được sử dụng trực tiếp cho POST này)
     * @return \Illuminate\Http\JsonResponse Trả về một phản hồi JSON
     */
    public function clearCart(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Vui lòng đăng nhập để xóa giỏ hàng.'], 401);
        }

        try {
            $cartItems = Cart::where('UserID', $userId)
                             ->with(['productVariant.product', 'productVariant.attributes.attribute'])
                             ->get();
            foreach ($cartItems as $cartItem) {
                CartItem::where('CartID', $cartItem->CartID)->delete();
            }

            Cart::where('UserID', $userId)->delete();

            return response()->json([
                'message' => 'Giỏ hàng đã được xóa thành công.',
                'current_cart_state' => [] // Giỏ hàng rỗng sau khi xóa
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi xóa giỏ hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Phương thức trợ giúp để lấy các mục trong giỏ hàng của một người dùng cụ thể với các mối quan hệ cần thiết cho API.
     *
     * @param  int|null  $userId ID của người dùng, hoặc null nếu là khách vãng lai.
     * @return \Illuminate\Database\Eloquent\Collection Trả về một Collection các đối tượng Cart Model
     */
    protected function getCartItemsForApi($userId)
    {
        if ($userId === null) {
            return collect();
        }

        return Cart::where('UserID', $userId)
                   ->with(['productVariant.product', 'productVariant.attributes.attribute'])
                   ->get();
    }
}
