<?php
include_once 'config/database.php';

header("Access-Control-Allow-Origin: *"); // 모든 출처에서의 요청 허용
header("Access-Control-Allow-Methods: POST, OPTIONS"); // POST 요청과 OPTIONS 메서드 허용
header("Access-Control-Allow-Headers: Content-Type"); // Content-Type 헤더 허용
header("Content-Type: application/json; charset=UTF-8");

// HTTP OPTIONS 메서드 요청일 경우, 200 OK 응답 반환
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
//클라이언트로부터 JSON 형식으로 전달된 데이터를 가져와 PHP 객체로 변환

//필요한 모든 필드(cno, name, passwd, phoneno)가 있는지 확인
if (isset($data['cno']) && isset($data['name']) && isset($data['passwd']) && isset($data['phoneno'])) {
    $cno = $data['cno'];
    $name = $data['name'];
    $passwd = $data['passwd'];
    $phoneno = $data['phoneno'];


    $database = new Database();
    $conn = $database->getConnection();
    //데이터베이스에 연결
    $stmt = $conn->prepare('INSERT INTO Customer (cno, name, passwd, phoneno) VALUES (:cno, :name, :passwd, :phoneno)');
    //고객 정보를 삽입하는 SQL 쿼리를 준비
    
    $stmt->bindParam(':cno', $cno);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':passwd', $passwd);
    $stmt->bindParam(':phoneno', $phoneno);
    //입력 데이터를 쿼리에 바인딩

    try {
        $stmt->execute();
        
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
    //쿼리를 실행하고, 성공 여부에 따라 적절한 HTTP 응답 코드를 설정하고 메시지를 반환
    $conn = null;
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    // 필요한 데이터가 모두 없을 경우, 400 응답 코드와 함께 에러 메시지를 반환
}
?>
