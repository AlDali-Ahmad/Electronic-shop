<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = [
        'CategoryName',
        'Description',
        'Image',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function updateCategory($data)
    {
        $this->update([
            'CategoryName' => $data['CategoryName'],
            'Description' => $data['Description'],
            'Image' => $data['Image'],
        ]);
    }
    
    use HasFactory;
}
