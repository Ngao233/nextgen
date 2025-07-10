<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
public function index()
{
    $categories = Category::where('Status', 1)
        ->select('CategoryID', 'Name', 'Image') 
        ->get();

    return response()->json($categories);
}                                                               

    public function show($id)
    {
        $category = Category::with('products')->find($id);
        if (!$category) return response()->json(['message' => 'Not found'], 404);
        return response()->json($category);
    }

    public function store(Request $request)
    {
        $request->validate(['Name' => 'required|string|max:255']);
        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) return response()->json(['message' => 'Not found'], 404);
        $category->update($request->all());
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) return response()->json(['message' => 'Not found'], 404);
        $category->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
