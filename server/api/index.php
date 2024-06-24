<?php
// 필수 헤더 설정
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 안내 메시지
echo json_encode(array("message" => "이 API는 Customer 관련 작업을 수행합니다."));
