<?php

class Database{
    // 데이터베이스 접속 정보
    public $conn;

    public function getConnection() {
        $this->conn = null;
        $tns = "
            (DESCRIPTION=
                (ADDRESS_LIST=
                    (ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))
                )
                (CONNECT_DATA=
                    (SERVICE_NAME=XE)
                )
            )
        ";
        $url = "oci:dbname=".$tns.";charset=utf8";
        $username = 'd202102673';
        $password = '1111';


        try {
            $this->conn = new PDO($url, $username, $password);
            // $query = "SELECT F.FOODNAME, F.PRICE, C.CATEGORYNAME 
            // FROM FOOD F
            // LEFT JOIN CONTAIN CT ON F.FOODNAME = CT.FOODNAME
            // LEFT JOIN CATEGORY C ON CT.CATEGORYNAME = C.CATEGORYNAME";

            // $stmt = $this->conn->prepare($query);
            // $stmt->execute();
            
        } catch (PDOException $e) {
            echo("에러 내용: ".$e->getMessage());
        }
        return $this->conn;
    }
}

?>