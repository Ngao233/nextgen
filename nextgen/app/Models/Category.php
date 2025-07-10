<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
protected $table = 'categories';
    protected $primaryKey = 'CategoryID';
    public $timestamps = false;

    protected $fillable = ['Name', 'Image', 'Description', 'Create_at', 'Update_at'];

    public function products()
    {
        return $this->hasMany(Product::class, 'CategoryID', 'CategoryID');
    }
}
