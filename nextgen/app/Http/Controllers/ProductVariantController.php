<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    public function index()
    {
        return response()->json(ProductVariant::with('product', 'attributes.attribute')->get());
    }

    public function show($id)
    {
        $variant = ProductVariant::with('product', 'attributes.attribute')->find($id);
        if (!$variant) return response()->json(['message' => 'Not found'], 404);
        return response()->json($variant);
    }

    public function store(Request $request)
    {
        $request->validate(['Image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 'Sku' => 'required', 'Price' => 'required']);
        $variant = ProductVariant::create($request->all());
        return response()->json($variant, 201);
    }

    public function update(Request $request, $id)
    {
        $variant = ProductVariant::find($id);
        if (!$variant) return response()->json(['message' => 'Not found'], 404);
        $variant->update($request->all());
        return response()->json($variant);
    }

    public function destroy($id)
    {
        $variant = ProductVariant::find($id);
        if (!$variant) return response()->json(['message' => 'Not found'], 404);
        $variant->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
