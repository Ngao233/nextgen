<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $data = $categories->map(function($category) {
            return [
                'CategoryID' => $category->CategoryID,
                'Name' => $category->Name,
                'Description' => $category->Description,
                'Image' => $category->Image,
                'Create_at' => $category->Create_at,
                'Update_at' => $category->Update_at,
            ];
        });
        return response()->json(['success' => true, 'data' => $data]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'Name' => 'required|string|max:255|unique:categories,Name',
            'Description' => 'nullable|string',
            'Image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Xử lý upload ảnh nếu có
        if ($request->hasFile('Image')) {
            $validated['Image'] = $request->file('Image')->store('categories', 'public');
        } else {
            $validated['Image'] = null; // Nếu không có ảnh, gán là null
        }

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'data' => [
                'CategoryID' => $category->CategoryID,
                'Name' => $category->Name,
                'Description' => $category->Description,
                'Image' => $category->Image,
                'Create_at' => $category->created_at,
                'Update_at' => $category->updated_at,
            ]
        ], 201);
    }

    /**
     * Display the specified resource.
     * Hiển thị thông tin chi tiết của một category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['success' => false, 'message' => 'Category not found'], 404);
        }
        return response()->json([
            'success' => true,
            'data' => [
                'CategoryID' => $category->CategoryID,
                'Name' => $category->Name,
                'Description' => $category->Description,
                'Image' => $category->Image,
                'Create_at' => $category->Create_at,
                'Update_at' => $category->Update_at,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Cập nhật thông tin của một category hiện có.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['success' => false, 'message' => 'Category not found'], 404);
        }

        $validated = $request->validate([
            'Name' => 'sometimes|string|max:255|unique:categories,Name,' . $id . ',CategoryID',
            'Description' => 'nullable|string',
            'Image' => 'nullable|string', // Chỉ cần kiểm tra đường dẫn
        ]);

        // Cập nhật thông tin
        $category->update($validated);

        // Lấy lại thông tin sau khi cập nhật
        return response()->json([
            'success' => true,
            'data' => [
                'CategoryID' => $category->CategoryID,
                'Name' => $category->Name,
                'Description' => $category->Description,
                'Image' => asset('storage/' . $validated['Image']),
                'Create_at' => $category->Create_at,
                'Update_at' => $category->updated_at,
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * Xóa một category khỏi database.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['success' => false, 'message' => 'Category not found'], 404);
        }
        $category->delete();
        return response()->json(['success' => true, 'message' => 'Category deleted']);
    }
}
