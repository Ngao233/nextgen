<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\PaymentGateway;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\ProductVariant;
use App\Models\CartItem;
class CheckoutController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to checkout.');
        }

        $userId = Auth::id();
        $cartItems = Cart::where('UserID', $userId)
                         ->with(['productVariant']) // Loại bỏ các mối quan hệ không cần thiết
                         ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty. Please add some products.');
        }

        $paymentGateways = PaymentGateway::all();
        $totalAmount = $cartItems->sum(function($item) {
            return $item->Quantity * $item->productVariant->Price;
        });

        return view('checkout.index', compact('cartItems', 'paymentGateways', 'totalAmount'));
    }

    public function placeOrder(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login to place an order.');
        }

        $request->validate([
            'receiver_name'     => 'required|string|max:255',
            'receiver_phone'    => 'required|string|max:255',
            'shipping_address'  => 'required|string',
            'payment_id'        => 'required|exists:payment_gateway,PaymentID',
            'voucher_code'      => 'nullable|string|exists:voucher,Code',
        ]);

        $userId = Auth::id();
        $cartItems = Cart::where('UserID', $userId)->with('productVariant')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();
        try {
            $totalAmount = $cartItems->sum(function($item) {
                return $item->Quantity * $item->productVariant->Price; // Kiểm tra giá trị
            });

            $voucherId = null;
            if ($request->filled('voucher_code')) {
                $voucher = Voucher::where('Code', $request->input('voucher_code'))
                                  ->where('Quantity', '>', 0)
                                  ->where('Expiry_date', '>=', now()->toDateString())
                                  ->first();
                if ($voucher) {
                    $totalAmount -= $voucher->Value;
                    $voucherId = $voucher->VoucherID;
                    $voucher->decrement('Quantity'); // Giảm số lượng voucher
                } else {
                    DB::rollBack();
                    return redirect()->back()->withInput()->with('error', 'Invalid or expired voucher code.');
                }
            }

            // Tạo đơn hàng mới
            $order = Order::create([
                'InvoiceCode' => 'INV-' . uniqid(),
                'UserID' => $userId,
                'VoucherID' => $voucherId,
                'PaymentID' => $request->input('payment_id'),
                'Status' => 'Pending', 
                'Total_amount' => max(0, $totalAmount),
                'Receiver_name' => $request->input('receiver_name'),
                'Receiver_phone' => $request->input('receiver_phone'),
                'Shipping_address' => $request->input('shipping_address'),
                'Create_at' => now(),
                'Update_at' => now(),
            ]);

            // Thêm chi tiết đơn hàng
            foreach ($cartItems as $item) {
                OrderDetail::create([
                    'OrderID' => $order->OrderID,
                    'ProductVariantID' => $item->productVariant->ProductVariantID, // Sử dụng thuộc tính đúng
                    'Quantity' => $item->Quantity,
                    'Unit_price' => $item->productVariant->Price,
                    'Subtotal' => $item->Quantity * $item->productVariant->Price,
                ]);

                // Giảm số lượng sản phẩm trong kho
                $item->productVariant->decrement('Stock', $item->Quantity); 
            }
            $cartItems = Cart::where('UserID', $userId)
                             ->with(['productVariant.product', 'productVariant.attributes.attribute'])
                             ->get();
            foreach ($cartItems as $cartItem) {
                CartItem::where('CartID', $cartItem->CartID)->delete();
            }
            // Xóa các sản phẩm khỏi giỏ hàng
            Cart::where('UserID', $userId)->delete();

            DB::commit();
            return redirect()->route('order.success', $order->OrderID)->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withInput()->with('error', 'Failed to place order: ' . $e->getMessage());
        }
    }

    public function success($orderId)
    {
        $order = Order::with(['orderDetails.productVariant', 'paymentGateway'])->findOrFail($orderId);
        return view('checkout.success', compact('order'));
    }

    public function checkout(Request $request, $userId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'cartItems' => 'required|array',
            'totalAmount' => 'required|numeric',
        ]);

        $cartItems = Cart::where('UserID', $userId)->with('productVariant')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Your cart is empty.'], 400);
        }

        DB::beginTransaction();
        try {
            $totalAmount = $request->input('totalAmount');

            // Tạo đơn hàng mới
            $order = Order::create([
                'InvoiceCode' => 'INV-' . uniqid(),
                'UserID' => $userId,
                'Total_amount' => $totalAmount,
                'Status' => 'Pending',
                'Create_at' => now(),
                'Update_at' => now(),
            ]);

            foreach ($request->input('cartItems') as $item) {
                $productVariant = ProductVariant::find($item['ProductVariantID']);
                if (!$productVariant) {
                    return response()->json(['error' => 'Invalid ProductVariantID'], 400);
                }

                OrderDetail::create([
                    'OrderID' => $order->OrderID,
                    'ProductVariantID' => $item['ProductVariantID'],
                    'Quantity' => $item['Quantity'],
                    'Unit_price' => $productVariant->Price,
                    'Subtotal' => $item['Quantity'] * $productVariant->Price,
                ]);
            }

            // Xóa tất cả các mục trong giỏ hàng
            CartItem::where('CartID', $cartItems->first()->CartID)->delete(); // Xóa tất cả các mục dựa trên CartID
            Cart::where('UserID', $userId)->delete(); // Xóa giỏ hàng

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Order placed successfully!', 'orderId' => $order->OrderID]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to place order: ' . $e->getMessage()], 500);
        }
    }
}