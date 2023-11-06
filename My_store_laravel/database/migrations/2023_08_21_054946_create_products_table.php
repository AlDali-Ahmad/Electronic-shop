<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('id');
            $table->string('ProductName');
            $table->text('Description');
            $table->decimal('Price', 10, 2);
            $table->integer('Quantity');
            $table->string('Image');
            $table->json('ListImage');
            $table->unsignedBigInteger('Category_ID');
            $table->foreign('Category_ID')->references('id')->on('categories')->onDelete('cascade');
            $table->timestamps();
        
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};