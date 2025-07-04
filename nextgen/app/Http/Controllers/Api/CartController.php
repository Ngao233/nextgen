<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // Lấy giỏ hàng của user
    public function viewCart(Request $request)
    {
        $userId = $request->query('UserID');
        $cart = Cart::with(['productVariant.product'])
            ->where('UserID', $userId)
            ->get();
        return response()->json(['success' => true, 'data' => $cart]);
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'UserID' => 'required|integer|exists:users,UserID',
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID',
            'Quantity' => 'required|integer|min:1',
        ]);
        // Nếu đã có thì cộng dồn số lượng
        $cartItem = Cart::where('UserID', $validated['UserID'])
            ->where('ProductVariantID', $validated['ProductVariantID'])
            ->first();
        if ($cartItem) {
            $cartItem->Quantity += $validated['Quantity'];
            $cartItem->save();
            return response()->json(['success' => true, 'data' => $cartItem]);
        }
        $cart = Cart::create($validated);
        return response()->json(['success' => true, 'data' => $cart], 201);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateCartItem(Request $request)
    {
        $validated = $request->validate([
            'UserID' => 'required|integer|exists:users,UserID',
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID',
            'Quantity' => 'required|integer|min:1',
        ]);
        $cartItem = Cart::where('UserID', $validated['UserID'])
            ->where('ProductVariantID', $validated['ProductVariantID'])
            ->first();
        if (!$cartItem) {
            return response()->json(['success' => false, 'message' => 'Cart item not found'], 404);
        }
        $cartItem->Quantity = $validated['Quantity'];
        $cartItem->save();
        return response()->json(['success' => true, 'data' => $cartItem]);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeFromCart(Request $request)
    {
        $validated = $request->validate([
            'UserID' => 'required|integer|exists:users,UserID',
            'ProductVariantID' => 'required|integer|exists:productvariants,ProductVariantID',
        ]);
        $cartItem = Cart::where('UserID', $validated['UserID'])
            ->where('ProductVariantID', $validated['ProductVariantID'])
            ->first();
        if (!$cartItem) {
            return response()->json(['success' => false, 'message' => 'Cart item not found'], 404);
        }
        $cartItem->delete();
        return response()->json(['success' => true, 'message' => 'Cart item deleted']);
    }

    // Xóa toàn bộ giỏ hàng của user
    public function clearCart(Request $request)
    {
        $userId = $request->input('UserID');
        Cart::where('UserID', $userId)->delete();
        return response()->json(['success' => true, 'message' => 'Cart cleared']);
    }
}
