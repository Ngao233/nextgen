<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'voucher', 'paymentGateway', 'orderDetails.productVariant.product'])->get();
        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'voucher', 'paymentGateway', 'orderDetails.productVariant.product'])->find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $order]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'UserID' => 'required|integer|exists:users,UserID',
            'VoucherID' => 'nullable|integer|exists:voucher,VoucherID',
            'PaymentID' => 'nullable|integer|exists:payment_gateway,PaymentID',
            'Status' => 'nullable|string',
            'Total_amount' => 'required|numeric|min:0',
            'Receiver_name' => 'required|string|max:255',
            'Receiver_phone' => 'required|string|max:255',
            'Shipping_address' => 'required|string',
            'order_details' => 'nullable|array', // Thay đổi để không bắt buộc
            'order_details.*.ProductVariantID' => 'sometimes|integer|exists:productvariants,ProductVariantID',
            'order_details.*.Quantity' => 'sometimes|integer|min:1',
            'order_details.*.Unit_price' => 'sometimes|numeric|min:0',
            'order_details.*.Subtotal' => 'nullable|numeric|min:0',
        ]);

        // Lưu order
        $orderData = $validated;
        unset($orderData['order_details']);
        $order = Order::create($orderData);

        // Lưu order details nếu có
        if (isset($validated['order_details'])) {
            foreach ($validated['order_details'] as $detail) {
                $detail['OrderID'] = $order->OrderID;
                \App\Models\OrderDetail::create($detail);
            }
        }

        $order->load(['orderDetails.productVariant.product']);
        return response()->json(['success' => true, 'data' => $order], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return response()->json(['success' => false, 'message' => 'Order not found'], 404);
            }

            $validated = $request->validate([
                'UserID' => 'sometimes|integer|exists:users,UserID',
                'VoucherID' => 'nullable|integer|exists:voucher,VoucherID',
                'PaymentID' => 'nullable|integer|exists:payment_gateway,PaymentID',
                'Status' => 'sometimes|string|in:pending,processing,completed,cancelled,shipped',
                'Total_amount' => 'sometimes|numeric|min:0',
                'Receiver_name' => 'sometimes|string|max:255',
                'Receiver_phone' => 'sometimes|string|max:255',
                'Shipping_address' => 'sometimes|string',
            ]);

            // Cập nhật thông tin order chính
            $orderData = $validated;

            if (!empty($orderData)) {
                $order->update($orderData);
            }

            // Không cần cập nhật order details trong lần cập nhật này

            // Load lại relationships
            $order->load(['user', 'voucher', 'paymentGateway', 'orderDetails.productVariant.product']);

            return response()->json([
                'success' => true, 
                'message' => 'Order updated successfully',
                'data' => $order
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating order: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }
        
        // Xóa order details khi xóa order
        $order->orderDetails()->delete();
        $order->delete();

        return response()->json(['success' => true, 'message' => 'Order deleted']);
    }
}