<?php
// app/Http/Controllers/Api/ProductController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\VariantAttribute;
use App\Models\Attribute;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $products = Product::with(['category', 'variants.attributes.attribute', 'reviews'])
                ->orderBy('Create_at', 'desc')
                ->get();
            
            return response()->json([
                'success' => true, 
                'data' => $products,
                'message' => 'Products retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving products: ' . $e->getMessage()
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
                'CategoryID' => 'required|integer|exists:categories,CategoryID',
                'Name' => 'required|string|max:255',
                'Description' => 'nullable|string',
                'base_price' => 'required|numeric|min:0',
                'Status' => 'nullable|boolean',
                'Image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create new product
            $productData = $validator->validated();
            $productData['Create_at'] = now();
            $productData['Update_at'] = now();

            // Handle image upload if present
            if ($request->hasFile('Image')) {
                $imagePath = $request->file('Image')->store('products', 'public');
                $productData['Image'] = $imagePath;
            }

            $product = Product::create($productData);

            // Load product with relationships
            $product->load(['category']);

            return response()->json([
                'success' => true, 
                'data' => $product,
                'message' => 'Product created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating product: ' . $e->getMessage()
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
            $product = Product::with(['category', 'variants.attributes'])
                ->find($id);

            if (!$product) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Product not found'
                ], 404);
            }

            return response()->json([
                'success' => true, 
                'data' => $product,
                'message' => 'Product retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving product: ' . $e->getMessage()
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
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Product not found'
                ], 404);
            }

            // Validate input data
            $validator = Validator::make($request->all(), [
                'CategoryID' => 'sometimes|integer|exists:categories,CategoryID',
                'Name' => 'sometimes|string|max:255',
                'Description' => 'nullable|string',
                'base_price' => 'sometimes|numeric|min:0',
                'Status' => 'nullable|boolean',
                'Image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Prepare updated data
            $productData = $validator->validated();
            $productData['Update_at'] = now();

            // Handle image upload if present
            if ($request->hasFile('Image')) {
                if ($product->Image && Storage::disk('public')->exists($product->Image)) {
                    Storage::disk('public')->delete($product->Image);
                }
                $imagePath = $request->file('Image')->store('products', 'public');
                $productData['Image'] = $imagePath;
            } else {
                unset($productData['Image']); // Giữ nguyên hình ảnh cũ nếu không có hình ảnh mới
            }

            // Cập nhật thông tin sản phẩm
            $product->update($productData);

            // Load updated product with relationships
            $product->load(['category']);

            return response()->json([
                'success' => true, 
                'data' => $product,
                'message' => 'Product updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating product: ' . $e->getMessage()
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
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false, 
                    'message' => 'Product not found'
                ], 404);
            }

            // Xóa ảnh nếu có
            if ($product->Image && Storage::disk('public')->exists($product->Image)) {
                Storage::disk('public')->delete($product->Image);
            }

            // Xóa product (cascade sẽ xóa variants và attributes)
            $product->delete();

            return response()->json([
                'success' => true, 
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting product: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search products by name or description
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        try {
            $query = $request->get('q');
            $categoryId = $request->get('category_id');
            $minPrice = $request->get('min_price');
            $maxPrice = $request->get('max_price');

            $products = Product::with(['category', 'variants.attributes.attribute'])
                ->when($query, function ($q) use ($query) {
                    return $q->where('Name', 'like', "%{$query}%")
                            ->orWhere('Description', 'like', "%{$query}%");
                })
                ->when($categoryId, function ($q) use ($categoryId) {
                    return $q->where('CategoryID', $categoryId);
                })
                ->when($minPrice, function ($q) use ($minPrice) {
                    return $q->where('base_price', '>=', $minPrice);
                })
                ->when($maxPrice, function ($q) use ($maxPrice) {
                    return $q->where('base_price', '<=', $maxPrice);
                })
                ->orderBy('Create_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Products searched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error searching products: ' . $e->getMessage()
            ], 500);
        }
    }
}
