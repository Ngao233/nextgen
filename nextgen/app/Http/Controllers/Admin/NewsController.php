<?php
// app/Http/Controllers/Admin/NewsController.php
// Đây là tệp điều khiển (Controller) chính cho việc quản lý bài viết tin tức trong khu vực Admin.

namespace App\Http\Controllers\Admin; // Dòng này định nghĩa namespace cho Controller.
                                     // Nó phải khớp với đường dẫn thư mục của tệp (Admin/NewsController.php).

use App\Http\Controllers\Controller; // Import Controller cơ sở của Laravel.
use App\Models\News; // Import model News để tương tác với bảng 'news'.
use Illuminate\Http\Request; // Import class Request để lấy dữ liệu từ các yêu cầu HTTP.
use Illuminate\Support\Facades\Validator; // Import Validator để xác thực dữ liệu đầu vào.

class NewsController extends Controller // Định nghĩa class Controller của chúng ta.
{
    /**
     * Lấy tất cả bài viết.
     * Xử lý yêu cầu GET đến /api/admin/news
     *
     * @return \Illuminate\Http\JsonResponse Trả về danh sách bài viết dưới dạng JSON.
     */
    public function index() // Phương thức này xử lý việc lấy tất cả bài viết.
    {
        // Lấy tất cả bài viết từ cơ sở dữ liệu, sắp xếp theo ngày đăng giảm dần.
        $articles = News::orderBy('publish_at', 'desc')->get();
        // Trả về danh sách bài viết dưới dạng phản hồi JSON.
        return response()->json($articles);
    }

    /**
     * Lưu trữ một bài viết mới.
     * Xử lý yêu cầu POST đến /api/admin/news
     *
     * @param  \Illuminate\Http\Request  $request Dữ liệu yêu cầu từ client.
     * @return \Illuminate\Http\JsonResponse Trả về JSON với thông báo thành công và dữ liệu bài viết mới.
     */
    public function store(Request $request) // Phương thức này xử lý việc thêm bài viết mới.
    {
        // Định nghĩa các quy tắc xác thực cho dữ liệu đầu vào.
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:news,title', // Tiêu đề bắt buộc, duy nhất trong bảng 'news'.
            'content' => 'nullable|string', // Nội dung có thể rỗng.
            'publish_date' => 'required|date', // Ngày đăng bắt buộc, định dạng ngày.
            'author' => 'required|string|max:255', // Người đăng bắt buộc.
            'status' => 'required|string|in:published,draft,hidden', // Trạng thái bắt buộc, chỉ chấp nhận 3 giá trị.
        ], [
            // Thông báo lỗi tùy chỉnh.
            'title.required' => 'Tiêu đề bài viết là bắt buộc.',
            'title.unique' => 'Tiêu đề bài viết này đã tồn tại.',
            'publish_date.required' => 'Ngày đăng là bắt buộc.',
            'publish_date.date' => 'Ngày đăng phải là định dạng ngày hợp lệ.',
            'author.required' => 'Người đăng là bắt buộc.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ. Chỉ chấp nhận "published", "draft", hoặc "hidden".',
        ]);

        if ($validator->fails()) { // Kiểm tra nếu xác thực thất bại.
            return response()->json(['errors' => $validator->errors()], 422); // Trả về lỗi xác thực.
        }

        // Tạo một bản ghi bài viết mới trong cơ sở dữ liệu.
        $article = News::create([
            'title' => $request->title,
            'content' => $request->content,
            'publish_date' => $request->publish_date,
            'author' => $request->author,
            'status' => $request->status,
        ]);

        // Trả về phản hồi JSON thông báo thành công.
        return response()->json(['message' => 'Bài viết đã được tạo thành công.', 'article' => $article], 201);
    }

    /**
     * Hiển thị một bài viết cụ thể.
     * Xử lý yêu cầu GET đến /api/admin/news/{id}
     *
     * @param  int  $id ID của bài viết cần hiển thị.
     * @return \Illuminate\Http\JsonResponse Trả về dữ liệu bài viết cụ thể.
     */
    public function show($id) // Phương thức này xử lý việc lấy một bài viết theo ID.
    {
        $article = News::find($id); // Tìm bài viết trong cơ sở dữ liệu bằng ID.

        if (!$article) { // Nếu không tìm thấy bài viết.
            return response()->json(['message' => 'Không tìm thấy bài viết.'], 404); // Trả về lỗi 404.
        }

        return response()->json($article); // Trả về dữ liệu bài viết dưới dạng JSON.
    }

    /**
     * Cập nhật một bài viết hiện có.
     * Xử lý yêu cầu PUT/PATCH đến /api/admin/news/{id}
     *
     * @param  \Illuminate\Http\Request  $request Dữ liệu yêu cầu từ client.
     * @param  int  $id ID của bài viết cần cập nhật.
     * @return \Illuminate\Http\JsonResponse Trả về thông báo thành công và dữ liệu bài viết đã cập nhật.
     */
    public function update(Request $request, $id) // Phương thức này xử lý việc cập nhật bài viết.
    {
        $article = News::find($id); // Tìm bài viết cần cập nhật bằng ID.

        if (!$article) { // Nếu không tìm thấy bài viết.
            return response()->json(['message' => 'Không tìm thấy bài viết.'], 404);
        }

        // Xác thực dữ liệu đầu vào, bỏ qua tính duy nhất của chính bản ghi hiện tại.
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:news,title,' . $id,
            'content' => 'nullable|string',
            'publish_date' => 'required|date',
            'author' => 'required|string|max:255',
            'status' => 'required|string|in:published,draft,hidden',
        ], [
            // Thông báo lỗi tùy chỉnh.
            'title.required' => 'Tiêu đề bài viết là bắt buộc.',
            'title.unique' => 'Tiêu đề bài viết này đã tồn tại.',
            'publish_date.required' => 'Ngày đăng là bắt buộc.',
            'publish_date.date' => 'Ngày đăng phải là định dạng ngày hợp lệ.',
            'author.required' => 'Người đăng là bắt buộc.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ. Chỉ chấp nhận "published", "draft", hoặc "hidden".',
        ]);

        if ($validator->fails()) { // Kiểm tra nếu xác thực thất bại.
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Cập nhật các thuộc tính của bài viết.
        $article->title = $request->title;
        $article->content = $request->content;
        $article->publish_date = $request->publish_date;
        $article->author = $request->author;
        $article->status = $request->status;
        $article->save(); // Lưu các thay đổi vào cơ sở dữ liệu.

        // Trả về phản hồi JSON thông báo cập nhật thành công.
        return response()->json(['message' => 'Bài viết đã được cập nhật thành công.', 'article' => $article]);
    }

    /**
     * Xóa một bài viết.
     * Xử lý yêu cầu DELETE đến /api/admin/news/{id}
     *
     * @param  int  $id ID của bài viết cần xóa.
     * @return \Illuminate\Http\JsonResponse Trả về thông báo thành công.
     */
    public function destroy($id) // Phương thức này xử lý việc xóa bài viết.
    {
        $article = News::find($id); // Tìm bài viết cần xóa bằng ID.

        if (!$article) { // Nếu không tìm thấy bài viết.
            return response()->json(['message' => 'Không tìm thấy bài viết.'], 404);
        }

        $article->delete(); // Xóa bản ghi bài viết khỏi cơ sở dữ liệu.

        return response()->json(['message' => 'Bài viết đã được xóa thành công.'], 200); // Trả về thông báo thành công.
    }

    /**
     * Cập nhật trạng thái của một bài viết.
     * Xử lý yêu cầu PATCH đến /api/admin/news/{id}/status
     *
     * @param  \Illuminate\Http\Request  $request Dữ liệu yêu cầu từ client (chứa 'status' mới).
     * @param  int  $id ID của bài viết cần cập nhật trạng thái.
     * @return \Illuminate\Http\JsonResponse Trả về thông báo thành công và dữ liệu bài viết đã cập nhật.
     */
    public function toggleStatus(Request $request, $id) // Phương thức này xử lý việc chuyển đổi trạng thái.
    {
        $article = News::find($id); // Tìm bài viết cần cập nhật trạng thái.

        if (!$article) { // Nếu không tìm thấy bài viết.
            return response()->json(['message' => 'Không tìm thấy bài viết.'], 404);
        }

        // Xác thực dữ liệu đầu vào cho trạng thái.
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:published,draft,hidden', // Trạng thái bắt buộc, chỉ chấp nhận 3 giá trị.
        ], [
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.in' => 'Trạng thái không hợp lệ. Chỉ chấp nhận "published", "draft", hoặc "hidden".',
        ]);

        if ($validator->fails()) { // Kiểm tra nếu xác thực thất bại.
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $article->status = $request->status; // Cập nhật trạng thái.
        $article->save(); // Lưu thay đổi.

        // Trả về phản hồi JSON thông báo cập nhật thành công.
        return response()->json(['message' => 'Trạng thái bài viết đã được cập nhật thành công.', 'article' => $article]);
    }
}
