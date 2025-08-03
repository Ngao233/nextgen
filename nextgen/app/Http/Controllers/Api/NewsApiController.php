<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class NewsApiController extends Controller
{
    /**
     * Display a listing of the news articles.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $news = News::where('status', 'published')
                    ->orderBy('published_at', 'desc')
                    ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $news,
        ]);
    }

    /**
     * Display the specified news article.
     *
     * @param string $slug The slug of the news article.
     * @return JsonResponse
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function show(string $slug): JsonResponse
    {
        $news = News::where('slug', $slug)
                    ->where('status', 'published')
                    ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $news,
        ]);
    }

    /**
     * Store a newly created news article.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author_id' => 'required|integer',
            'status' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        $slug = Str::slug($request->title); // Sử dụng Str::slug() để tạo slug

        $news = News::create(array_merge($request->all(), ['slug' => $slug]));

        return response()->json([
            'success' => true,
            'data' => $news,
        ], 201);
    }

    /**
     * Update the specified news article.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author_id' => 'required|integer',
            'status' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        $news = News::findOrFail($id);
        $news->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $news,
        ]);
    }

    /**
     * Remove the specified news article.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'News not found'
            ], 404);
        }
        
        $news->delete();
        return response()->json([
            'success' => true,
            'message' => 'News deleted'
        ]);
    }
}