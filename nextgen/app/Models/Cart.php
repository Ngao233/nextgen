<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\CartItem;

class Cart extends Model
{
    // Tên bảng trong cơ sở dữ liệu
    protected $table = 'carts';

    // Khóa chính của bảng
    protected $primaryKey = 'CartID';

    // Tắt Laravel's auto-timestamps nếu bạn muốn quản lý thủ công
    // Hoặc chỉ định tên cột nếu chúng khác 'created_at' và 'updated_at'
    public $timestamps = false; // Tắt tự động quản lý timestamps

    // Định nghĩa các cột có thể gán hàng loạt (mass assignable)
    protected $fillable = [
        'UserID',
        'Status',
        'Create_at', // Tên cột tạo thủ công
        'Update_at', // Tên cột cập nhật thủ công
    ];

    /**
     * Định nghĩa mối quan hệ với User.
     * Một giỏ hàng thuộc về một User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'UserID', 'UserID');
    }

    /**
     * Định nghĩa mối quan hệ với CartItem.
     * Một giỏ hàng có nhiều cart_items.
     */
    public function items()
    {
        return $this->hasMany(CartItem::class, 'CartID', 'CartID');
    }
        public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class, 'ProductVariantID'); // Thay 'ProductVariantID' bằng khóa ngoại thực tế trong bảng Cart
    }
}
