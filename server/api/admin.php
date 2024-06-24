<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config/database.php';

$database = new Database();
$conn = $database->getConnection();

try {
    // 쿼리 작성
    $sql1 = "SELECT
                c.categoryName, f.foodName,
                SUM(od.quantity) AS totalQuantity,
                SUM(od.totalPrice) AS totalAmount
            FROM
                OrderDetail od
            JOIN
                Food f ON od.foodName = f.foodName
            JOIN
                Contain ct ON f.foodName = ct.foodName
            JOIN
                Category c ON ct.categoryName = c.categoryName
            GROUP BY ROLLUP(c.categoryName, f.foodName)
            ORDER BY c.categoryName, f.foodName";

    // 쿼리 실행
    $stmt = $conn->prepare($sql1);
    $stmt->execute();
    // 결과 가져오기
    $result1 = $stmt->fetchAll(PDO::FETCH_ASSOC);


    // 쿼리 작성
    $sql2 = "SELECT
    c.categoryName,
    f.foodName,
    DENSE_RANK() OVER (PARTITION BY c.categoryName ORDER BY SUM(od.quantity) DESC) AS categoryRank,
    DENSE_RANK() OVER (ORDER BY SUM(od.quantity) DESC) AS totalRank FROM OrderDetail od
    JOIN
        Food f ON od.foodName = f.foodName
    JOIN
        Contain ct ON f.foodName = ct.foodName
    JOIN
        Category c ON ct.categoryName = c.categoryName
    GROUP BY
        f.foodName, f.price, c.categoryName";

    // 쿼리 실행
    $stmt = $conn->prepare($sql2);
    $stmt->execute();
    // 결과 가져오기
    $result2 = $stmt->fetchAll(PDO::FETCH_ASSOC);


    if ($result1 && $result2) {
        // 결과를 JSON 형태로 반환
        echo json_encode(array('success' => true, 'data1' => $result1, 'data2' => $result2));
    } else {
        echo json_encode(array('success' => false, 'message' => 'No data found.'));
    }

    // 연결 종료
    $conn = null;
} catch(PDOException $e) {
    echo json_encode(array('success' => false, 'message' => 'Database error: ' . $e->getMessage()));
}
?>
