<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
     use SoftDeletes;
protected $table = 'products';
    protected $primaryKey = 'ProductID';
    public $timestamps = false;
     protected $dates = ['deleted_at']; 

    protected $fillable = ['CategoryID', 'Name', 'Description', 'Image', 'base_price', 'Status', 'Create_at', 'Update_at'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'CategoryID', 'CategoryID');
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'ProductID', 'ProductID');
    }
}
