<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductVariant;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index(Request $request)
        {
            $productId = $request->get('ProductID');

            if (!$productId) {
                return response()->json(['success' => false, 'message' => 'ProductID không được cung cấp'], 400);
            }

            $variants = ProductVariant::where('ProductID', $productId)
                ->with(['product', 'attributes.attribute'])
                ->get();

            return response()->json(['success' => true, 'data' => $variants]);
        }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ProductID' => 'required|integer|exists:products,ProductID',
            'Image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'Sku' => 'required|integer|unique:productvariants,Sku',
            'Price' => 'required|numeric|min:0',
            'Stock' => 'required|integer|min:0',
        ]);
        $variant = ProductVariant::create($validated);
        return response()->json(['success' => true, 'data' => $variant], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $variant = ProductVariant::with(['product', 'attributes.attribute'])->find($id);
        if (!$variant) {
            return response()->json(['success' => false, 'message' => 'Variant not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $variant]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $variant = ProductVariant::find($id);
        if (!$variant) {
            return response()->json(['success' => false, 'message' => 'Variant not found'], 404);
        }
        $validated = $request->validate([
            'ProductID' => 'sometimes|integer|exists:products,ProductID',
            'Image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'Sku' => 'sometimes|integer|unique:productvariants,Sku,' . $id . ',ProductVariantID',
            'Price' => 'sometimes|numeric|min:0',
            'Stock' => 'sometimes|integer|min:0',
        ]);
        $variant->update($validated);
        return response()->json(['success' => true, 'data' => $variant]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $variant = ProductVariant::find($id);
        if (!$variant) {
            return response()->json(['success' => false, 'message' => 'Variant not found'], 404);
        }
        $variant->delete();
        return response()->json(['success' => true, 'message' => 'Variant deleted']);
    }
}
