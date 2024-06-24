<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/database.php';
include_once 'objects/order.php';

$database = new Database();
$db = $database->getConnection();

$order = new Order($db);

$stmt = $order->read();

$order_arr = array();
$order_arr["records"] = array();


while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $order_item = array(
        "cart_id" => $row['ID'],
        "cno" => $row['CNO'],
        "order_date" => $row['ORDERDATETIME'],
        "quantity" => $row['QUANTITY'],
        "total_price" => $row['TOTALPRICE'],
        "food_name" => $row['FOODNAME']
    );

    array_push($order_arr["records"], $order_item);
}

// Set HTTP response code
http_response_code(200);

// Make sure to JSON encode the whole array, not just the "records" part
echo json_encode($order_arr);

?>
