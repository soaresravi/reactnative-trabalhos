<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json, charset=UTF-8");

$host='localhost';
$banco= 'contatos';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$banco;charset=utf8",$user,$pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query('SELECT id, nome, telefone FROM contatos');
    $contatos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($contatos);
} catch (PDOException $error) {
    echo json_encode(["erro" => "Erro de conexão com o banco de dados"]);
}
?>