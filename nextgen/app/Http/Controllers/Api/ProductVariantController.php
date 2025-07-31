<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductVariant;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $variants = ProductVariant::with(['product', 'attributes.attribute'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $variants,
                'message' => 'Product variants retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving product variants: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            // Validate input data
            $validator = Validator::make($request->all(), [
                'ProductID' => 'required|integer',
                'Sku' => 'required|string',
                'Price' => 'required|numeric|min:0',
                'Stock' => 'required|integer|min:0',
                'Image' => 'nullable|file|image|max:2048', // Cho phép tệp hình ảnh
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create new product variant
            $variantData = $validator->validated();
            if ($request->hasFile('Image')) {
                $imagePath = $request->file('Image')->store('images', 'public');
                $variantData['Image'] = $imagePath; // Lưu đường dẫn hình ảnh
            }

            $variant = ProductVariant::create($variantData);

            return response()->json([
                'success' => true,
                'data' => $variant,
                'message' => 'Product variant created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating product variant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $variant = ProductVariant::with(['product', 'attributes.attribute'])->find($id);

            if (!$variant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product variant not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $variant,
                'message' => 'Product variant retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving product variant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            // Tìm sản phẩm biến thể
            $variant = ProductVariant::find($id);

            if (!$variant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product variant not found'
                ], 404);
            }

            // Validate input data
            $validator = Validator::make($request->all(), [
                'ProductID' => 'sometimes|integer',
                'Sku' => 'sometimes|string',
                'Price' => 'sometimes|numeric|min:0',
                'Stock' => 'sometimes|integer|min:0',
                'Image' => 'nullable|sometimes|file|image|max:2048', // Make image truly optional
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Cập nhật dữ liệu
            $variantData = $validator->validated();

            // Kiểm tra và xử lý hình ảnh
            if ($request->hasFile('Image')) {
                $imagePath = $request->file('Image')->store('images', 'public');
                $variantData['Image'] = $imagePath; // Cập nhật đường dẫn hình ảnh
            }

            // Cập nhật sản phẩm biến thể
            $variant->update($variantData);

            return response()->json([
                'success' => true,
                'data' => $variant,
                'message' => 'Product variant updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating product variant: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $variant = ProductVariant::find($id);

            if (!$variant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product variant not found'
                ], 404);
            }

            if ($variant->Image && Storage::disk('public')->exists($variant->Image)) {
                Storage::disk('public')->delete($variant->Image);
            }

            $variant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product variant deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting product variant: ' . $e->getMessage()
            ], 500);
        }
    }
}