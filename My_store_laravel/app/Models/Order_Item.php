<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Order_Item extends Model
{
    use HasFactory;
    protected $table='order_items';
    protected $with=['product_opject'];

    protected $fillable = [
        'Product',
        'Order',
        'Quantity',
    ];


public function product_opject()
{
    return $this->hasOne(Product::class, 'id', 'Product');
}


}
