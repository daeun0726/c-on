<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/database.php';
include_once 'objects/food.php';

$database = new Database();
$db = $database->getConnection();

$food = new Food($db);

$stmt = $food->read();

$foods_arr = array();
$foods_arr["records"] = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    
    $food_item = array(
        "FOODNAME" => $row['FOODNAME'],
        "PRICE" => $row['PRICE'],
        "CATEGORYNAME" => $row['CATEGORYNAME']
    );

    array_push($foods_arr["records"], $food_item);
}

// Set HTTP response code
http_response_code(200);

// Make sure to JSON encode the whole array, not just the "records" part
echo json_encode($foods_arr);

?>
