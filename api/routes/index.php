<?php
include '../config/database.php';
include '../config/cors.php';
include '../controllers/ProductController.php';

$data = json_decode(file_get_contents("php://input"), true);
$controller = new ProductController($conn);
$controller->handleRequest($_SERVER['REQUEST_METHOD'], $data);
?>
