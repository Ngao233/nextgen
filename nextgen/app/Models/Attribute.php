<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $table = 'attributes';

    protected $fillable = [
        'name',
    ];

    public function variantAttributes()
    {
        return $this->hasMany(VariantAttribute::class, 'AttributeID');
    }
}