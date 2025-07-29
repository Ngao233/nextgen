<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ProductVariant extends Model
{
    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'productvariants'; // Theo cấu trúc SQL dump của bạn
    // Khóa chính của bảng
    protected $primaryKey = 'ProductVariantID';

    // Tắt Laravel's auto-timestamps nếu bạn muốn quản lý thủ công
    // Hoặc chỉ định tên cột nếu chúng khác 'created_at' và 'updated_at'
    public $timestamps = false; // Tắt tự động quản lý timestamps

    // Định nghĩa các cột có thể gán hàng loạt (mass assignable)
    protected $fillable = [
        'ProductID',
        'Sku',
        'Image', // Thêm cột Image nếu bạn muốn lưu trữ hình ảnh
        'Price',
        'Stock',
        'created_at', // Theo SQL dump là created_at
        'Update_at', // Theo SQL dump là Update_at
    ];

    /**
     * Định nghĩa mối quan hệ với Product.
     * Một ProductVariant thuộc về một Product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductID', 'ProductID');
    }

    public function attributes()
    {
        return $this->hasMany(\App\Models\VariantAttribute::class, 'ProductVariantID', 'ProductVariantID');
    }
}
