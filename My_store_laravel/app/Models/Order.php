<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'TotalAmount',
        'OrderDate',
    ];
/*
public function products():MorphToMany
{
    return $this->morphToMany(Product::class,'products');
}*/

    public function updateOrder($data)
    {
        $this->update([
            'user_id' => $data['user_id'],
            'TotalAmount' => $data['TotalAmount'],
            'OrderDate' => $data['OrderDate'],
        ]);
    }
    
   public function products():HasMany
   {
    return $this->hasMany(Order_Item::class,'Order','id');
   }

    use HasFactory;
}
