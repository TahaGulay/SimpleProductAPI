<?php
include '../models/Product.php';
include '../helpers/ResponseHelper.php';

class ProductController {
    private $product;

    public function __construct($db){
        $this->product = new Product($db);
    }

    public function handleRequest($method, $data){
        switch($method){
            case 'GET':
                ResponseHelper::json($this->product->getAll());
                break;
            case 'POST':
                if(!isset($data['name'], $data['price'], $data['category']))
                    ResponseHelper::json(['error'=>'Eksik alan'], 400);
                $this->product->create($data['name'], $data['price'], $data['category']);
                ResponseHelper::json(['message'=>'Ürün eklendi']);
                break;
            case 'DELETE':
                if(!isset($_GET['id']))
                    ResponseHelper::json(['error'=>'ID gerekli'], 400);
                $this->product->delete($_GET['id']);
                ResponseHelper::json(['message'=>'Ürün silindi']);
                break;
            default:
                ResponseHelper::json(['error'=>'Geçersiz method'], 405);
        }
    }
}
?>
