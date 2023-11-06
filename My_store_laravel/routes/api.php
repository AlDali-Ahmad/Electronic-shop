<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('orders', [OrderController::class, 'create']); // مسار الإضافة

    Route::get('user',function(Request $request){
        return $request->user();
    });

    Route::get('get_orders', [OrderController::class, 'get_oreder']); // مسار الجلب
    
});


Route::middleware('guest')->group(function (){
    // 1) Register
    Route::post('register', [RegisteredUserController::class, 'store']);
   // 2) Login
   Route::post('login', [AuthenticatedSessionController::class, 'store']);


});
Route::middleware('auth:sanctum')->post('/logout', [RegisteredUserController::class, 'logout']);


Route::post('categories', [CategoryController::class, 'create']); // مسار الإضافة
Route::get('get_categories', [CategoryController::class, 'getcategories']); // مسار الجلب
Route::delete('categories_delete/{id}',[CategoryController::class, 'delete']);
Route::get('categories_show/{id}', [CategoryController::class, 'show']);
Route::put('categories_update/{id}', [CategoryController::class, 'update']);



Route::post('products', [ProductController::class, 'create']); // مسار الإضافة
Route::get('get_products', [ProductController::class, 'get_products']); // مسار الجلب
//Route::get('get_products_bycategory', [ProductController::class, 'getByCategory']); // مسار الحصول على المنتجات حسب الفئة
Route::get('get_products_by_category/{categoryId}', [ProductController::class, 'getByCategory']);

Route::delete('delete_product/{id}', [ProductController::class, 'delete']);
Route::get('products_show/{id}', [ProductController::class, 'show']);
Route::put('products_update/{id}',  [ProductController::class, 'update']);
Route::get('products/search',  [ProductController::class, 'search']);



Route::delete('delete_orders/{id}', [OrderController::class, 'delete']);
Route::get('orders_show/{id}', [OrderController::class, 'show']);
Route::put('orders_update/{id}', [OrderController::class, 'update']);



//require __DIR__. '/auth.php'; 
