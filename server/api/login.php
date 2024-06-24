<?php
// 데이터베이스 설정 파일을 포함합니다.
include_once 'config/database.php';

header("Access-Control-Allow-Origin: http://localhost:5173"); // 모든 출처에서의 요청 허용
header("Access-Control-Allow-Methods: POST, OPTIONS"); // POST 요청과 OPTIONS 메서드 허용
header("Access-Control-Allow-Headers: Content-Type"); // Content-Type 헤더 허용
header("Content-Type: application/json; charset=UTF-8");


// OPTIONS 메서드에 대한 처리
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 만약 이미 로그인 상태라면 세션을 파기하고 다시 세션을 시작합니다.
if (isset($_SESSION['cno'])) {
    session_destroy();
    session_start();
}

    $data = json_decode(file_get_contents('php://input'), true);
    $cno = $data['cno'];
    $passwd = $data['passwd'];

    // 데이터베이스 연결
    $database = new Database();
    $conn = $database->getConnection();

    try {
        $stmt = $conn->prepare("SELECT * FROM Customer WHERE cno = :cno AND passwd = :passwd");
        $stmt->bindParam(':cno', $cno);
        $stmt->bindParam(':passwd', $passwd);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            session_start();
            http_response_code(200);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        // 필요한 데이터가 모두 없을 경우, 400 응답 코드와 함께 에러 메시지를 반환
    }
?>
