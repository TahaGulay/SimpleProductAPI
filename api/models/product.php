<?php
class Product {
    private $conn;
    private $table = "products";

    public function __construct($db){
        $this->conn = $db;
    }

    public function getAll(){
        $result = $this->conn->query("SELECT * FROM " . $this->table);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function create($name, $price, $category){
        $stmt = $this->conn->prepare("INSERT INTO " . $this->table . " (name, price, category) VALUES (?, ?, ?)");
        $stmt->bind_param("sds", $name, $price, $category);
        return $stmt->execute();
    }

    public function delete($id){
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table . " WHERE id=?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>
