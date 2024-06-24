<?php
session_start();
session_unset();
session_destroy();
header("Access-Control-Allow-Origin: http://localhost:5173"); // 모든 출처에서의 요청 허용
header("Access-Control-Allow-Methods: POST, OPTIONS"); // POST 요청과 OPTIONS 메서드 허용
header("Access-Control-Allow-Headers: Content-Type"); // Content-Type 헤더 허용
header("Content-Type: application/json; charset=UTF-8");
http_response_code(200);
echo json_encode(['success' => true]);
?>
