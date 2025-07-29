<?php
// database/migrations/YYYY_MM_DD_HHMMSS_create_carts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id(); // Khóa chính tự tăng
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Khóa ngoại liên kết với bảng users
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Khóa ngoại liên kết với bảng products
            $table->integer('quantity')->default(1); // Số lượng sản phẩm
            $table->timestamps(); // created_at và updated_at
            // Bạn có thể thêm các cột khác tùy theo yêu cầu của giỏ hàng (ví dụ: price_at_add, options, etc.)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};

