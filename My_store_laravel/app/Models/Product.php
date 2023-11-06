<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'ProductName',
        'Description',
        'Price',
        'Quantity',
        'Image',
        'ListImage',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders():MorphToMany
{
    return $this->morphedByToMany(Order::class,'orders');
}

    public function updateProduct($data)
{
    $this->update([
        'ProductName' => $data['ProductName'],
        'Description' => $data['Description'],
        'Price' => $data['Price'],
        'Quantity' => $data['Quantity'],
        'Image' => $data['Image'],
        'ListImage' => $data['ListImage'],
        'Category_ID' => $data['Category_ID'],
    ]);
}

    use HasFactory;
}
