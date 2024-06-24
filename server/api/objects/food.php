<?php
class Food {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        $query = "SELECT F.FOODNAME, F.PRICE, C.CATEGORYNAME 
                  FROM FOOD F
                  LEFT JOIN CONTAIN CT ON F.FOODNAME = CT.FOODNAME
                  LEFT JOIN CATEGORY C ON CT.CATEGORYNAME = C.CATEGORYNAME";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>
