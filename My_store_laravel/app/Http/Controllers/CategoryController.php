<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function create(Request $request)
    {
        // استقبال البيانات من الطلب وإنشاء سجل جديد في جدول categories
        $category = new Category;
        $category->CategoryName = $request->input('CategoryName');
        $category->Description = $request->input('Description');
        $category->Image = $request->input('Image');
        $category->save();

        return response()->json(['message' => 'Category created successfully']);
    }

    public function getcategories()
    {
        // استرجاع قائمة الفئات من جدول categories
        $categories = Category::all();

        return response()->json($categories);
    }

    public function delete($id)
    {
        $category = Category::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $category->delete();
    
        return response()->json(['message' => 'Category deleted successfully']);
    }
    
    public function show($id)
    {
        $category = Category::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        return response()->json($category);
    }

    public function update(Request $request, $id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json(['message' => 'Category not found'], 404);
    }

    $data = $request->all(); // احصل على البيانات المرسلة من الطلب

    $category->updateCategory($data); // استخدم دالة التعديل في نموذج الفئة

    return response()->json(['message' => 'Category updated successfully']);
}


}

