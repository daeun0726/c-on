<?php
class Order {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = 
            "SELECT 
            C.ID,
            C.CNO,
            C.ORDERDATETIME,
            OD.QUANTITY,
            OD.TOTALPRICE,
            F.FOODNAME
        FROM 
            CART C
        JOIN 
            ORDERDETAIL OD ON C.ID = OD.ID
        JOIN 
            FOOD F ON OD.FOODNAME = F.fOODNAME";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }
}
?>
