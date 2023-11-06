<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\Order_Item;
use App\Http\Controllers\JsonResponse;

class OrderController extends Controller
{
    public function create(Request $request)
    {

        if(empty($request->products)){
            return response()-> json([
                'message'=>'products is not exists'
            ],
            400,
        );
        }

        // استقبال البيانات من الطلب وإنشاء سجل جديد في جدول orders
        $order = Order::create([
            'user_id'=>$request->user()->id,
            'TotalAmount'=>0,
            'OrderDate'=>date('Y-m-d H:i:s')
        ]);

        
        $total=0;
        foreach ($request->products as $product) {
            $dbproduct=Product::where('id',$product['id'])->first();
            
            if(empty($dbproduct)){
                return response()-> json([
                    'message'=>"products " .$product['id'] ." is not exists",
                ],
                400,
            );
            }
           // var_dump($order->OrderID);
           // die;
            $total +=$dbproduct->Price * $product['Quantity'];

            Order_Item::create([
                'Product'=>$product['id'],
                'Quantity'=>$product['Quantity'],
                'Order'=>$order->id,
            ]);
        }

        $order->TotalAmount=$total;
        $order->save();

        return response()->json([
            'message'=>'Order has been created successfully',
            'order'=>$order,
        ],200);
    }

   /* public function get_oreder(Request $request)
    {
        $products=Order_Item::where('id','>=',0)
        ->with('product_opject')->get();
        return response()->json([
            'message' => 'Order has been retrieved successfully',
            'order' => $products,
        ], 200);
        var_dump($products);
        die;

        // استرجاع قائمة الطلبات من جدول orders
        $order = Order::where('user_id', $request->user()->id)->get();
        var_dump($order[0]->$products);
        return response()->json([
            'message' => 'Order has been retrieved successfully',
            'order' => $order,
        ], 200);
    }*/
    public function get_oreder(Request $request)
{
    $orders = Order_Item::where('id', '>=', 0)
        ->with('product_opject')
        ->get();

    $ordersWithTotalAmount = [];

    foreach ($orders as $order) {
        // حساب المجموع الإجمالي للأموال المدفوعة لهذا الطلب
        $totalAmount = $order->product_opject->Price * $order->Quantity;
        
        // إضافة المجموع إلى كل سجل في القائمة
        $order->totalAmount = $totalAmount;

        $ordersWithTotalAmount[] = $order;
    }

    return response()->json([
        'message' => 'Order has been retrieved successfully',
        'order' => $ordersWithTotalAmount,
    ], 200);
}


public function delete($id){
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    $order->delete();

    return response()->json(['message' => 'Order deleted successfully']);
}

public function show($id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    return response()->json($order);
}

public function update(Request $request, $id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    $data = $request->all(); // احصل على البيانات المرسلة من الطلب

    // قم بتحديث البيانات اللازمة في الطلب
    if (isset($data['user_id'])) {
        $order->user_id = $data['user_id'];
    }

    if (isset($data['TotalAmount'])) {
        $order->TotalAmount = $data['TotalAmount'];
    }

    if (isset($data['OrderDate'])) {
        $order->OrderDate = $data['OrderDate'];
    }

    // حفظ التغييرات
    $order->save();

    return response()->json(['message' => 'Order updated successfully']);

    // قم بالتحقق من وجود الطلب
    /*$order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    $data = $request->all();

    // التحقق من وجود العناصر المرتبطة بالطلب
    $orderItems = Order_Item::where('Order', $id)->get();

    foreach ($orderItems as $orderItem) {
        $quantity = $request->input('products.' . $orderItem->id . '.Quantity');

        // التحقق من وجود العنصر المرتبط بالكمية المحدثة
        if ($orderItem->product) {
            // قراءة السعر فقط إذا كان المنتج متاحًا (غير null)
            $price = $orderItem->product->Price;
            // حساب السعر الجديد باستخدام الكمية المحدثة
            $newTotalPrice = $quantity * $price;
            // تحديث الكمية والسعر الإجمالي في العنصر
            $orderItem->Quantity = $quantity;
            $orderItem->TotalPrice = $newTotalPrice;
            $orderItem->save();
        }
    }

    // حساب المجموع الجديد للطلب بناءً على الكميات المحدثة
    $newTotalAmount = $orderItems->sum('TotalPrice');

    // تحديث المجموع في الطلب
    $order->TotalAmount = $newTotalAmount;
    $order->save();

    return response()->json(['message' => 'Order has been updated successfully'], 200);*/
}


    }