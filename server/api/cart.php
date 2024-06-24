<?php
include_once 'config/database.php';

header("Access-Control-Allow-Origin: *"); // 모든 출처에서의 요청 허용
header("Access-Control-Allow-Methods: POST, OPTIONS"); // POST 요청과 OPTIONS 메서드 허용
header("Access-Control-Allow-Headers: Content-Type"); // Content-Type 헤더 허용
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Retrieve and decode JSON data from client
$data = json_decode(file_get_contents('php://input'), true);

$database = new Database();
$conn = $database->getConnection();


$cno = $data['cno'];
$id = $data['id'];
$items = $data['items'];

try {

    // Insert into Cart table and get the generated ID
    $query_cart = 'INSERT INTO CART (ID, ORDERDATETIME, CNO) VALUES (:id, CURRENT_TIMESTAMP, :cno)';
    $stmt_cart = $conn->prepare($query_cart);
    $stmt_cart->bindParam(':id', $id);
    $stmt_cart->bindParam(':cno', $cno);
    $stmt_cart->execute();

    // Insert each item into OrderDetail table
    foreach ($items as $item) {
        $stmt_orderdetail = $conn->prepare('INSERT INTO OrderDetail (itemNo, id, quantity, totalPrice, foodName) 
        VALUES (seq_orderdetail_itemno.nextval, :id, :quantity, :totalPrice, :foodName)');
        $stmt_orderdetail->bindParam(':id', $id);
        $stmt_orderdetail->bindParam(':quantity', $item['quantity']);
        $stmt_orderdetail->bindParam(':totalPrice', $item['totalPrice']);
        $stmt_orderdetail->bindParam(':foodName', $item['name']);
        
        $stmt_orderdetail->execute();
    }

    $response = array("success" => true);
    echo json_encode($response);

} catch (Exception $e) {
    $response = array("success" => false, 'message' => $e->getMessage());
    echo json_encode($response);
} finally {
    $conn = null;
}
?>
