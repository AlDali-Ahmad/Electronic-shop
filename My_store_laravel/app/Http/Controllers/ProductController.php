<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function create(Request $request)
    {
        // استقبال البيانات من الطلب وإنشاء سجل جديد في جدول products
        $product = new Product;
        $product->ProductName = $request->input('ProductName');
        $product->Description = $request->input('Description');
        $product->Price = $request->input('Price');
        $product->Quantity = $request->input('Quantity');
        $product->Image = $request->input('Image');
        $product->ListImage = json_encode($request->input('ListImage'));;
        $product->Category_ID = $request->input('Category_ID');
        $product->save();

        return response()->json(['message' => 'Product created successfully']);
    }

    public function get_products()
    {
        // استرجاع قائمة المنتجات من جدول products
        $products = Product::all();

        return response()->json($products);
    }

    public function getByCategory($categoryId)
    {
        // الحصول على المنتجات المنتمية للفئة المحددة
        $products = Product::where('Category_ID', $categoryId)->get();
    
        return response()->json($products);
    }
/*
    public function getByCategory(Request $request)
    {
        $categoryId = $request->input('category_id'); // استقبال معرف الفئة من الطلب
        
        // الحصول على المنتجات المنتمية للفئة المحددة
        $products = Product::where('Category_ID', $categoryId)->get();

        return response()->json($products);
    }*/

    public function delete($id)
    {
        //var_dump($id);
       // die;
        // البحث عن المنتج باستخدام معرفه
        $product = Product::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // حذف المنتج
        $product->delete();
    
        return response()->json(['message' => 'Product deleted successfully']);
    }
    
public function show($id)
{
    // البحث عن المنتج باستخدام معرفه
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    return response()->json($product);
}

public function update(Request $request, $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $data = $request->all(); // احصل على البيانات المرسلة من الطلب

    $product->updateProduct($data); // استخدم دالة التعديل في نموذج المنتجات

    return response()->json(['message' => 'Product updated successfully']);
}

public function search(Request $request)
{
    $searchTerm = $request->input('search');
    
    $products = Product::where(function ($query) use ($searchTerm) {
        $query->where('ProductName', 'LIKE', "%$searchTerm%")
        ->orWhere('Description', 'LIKE', "%$searchTerm%");
    })
    ->orWhereHas('category', function ($query) use ($searchTerm) {
        $query->where('CategoryName', 'LIKE', "%$searchTerm%");
    })
    ->get();
    return response()->json($products);
}

}