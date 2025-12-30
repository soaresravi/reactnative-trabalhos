<?php
header("Access-Control-Allow-Origin: *"); //é o CORS, totalmente obrigatório pra conectar no db. permite que qualquer origem (domínio ou IP) acesse o arquivo. ou seja, permite requisições do react pro backend mesmo em máquinas diferentes
header("Access-Control-Allow-Methods: POST"); //informa que só aceita requisições tipo POST (aquilo que defini lá o method post)
header("Access-Control-Allow-Headers: Content-Type"); //garante o envio de dados em json, pois informa que é permitido o cabeçalho content type nas requisições

header('Content-Type: application/json'); //o cabeçalho content type. define que a resposta desse script será em formato json. garante que o react entenda a resposta res.json no fetch

$host='localhost';
$banco= 'contatos';
$user = 'root';
$pass = '';

try {

    $pdo = new PDO("mysql:host=$host;dbname=$banco", $user, $pass);
    $data = json_decode(file_get_contents("php://input"), true); //o file get content lê o corpo da requisição (os dados enviados via fetch do react, que foram transformados em json pra ler), e esse conteúdo entran no php pelo php input
    //como essa estrutura ainda está em string e o php precisa em json pra manipular, o json_decode faz isso e o true diz pro php retornar em array associativo (é um vetor com chaves nomeadas, se for conectar no bd tem que ser ele) ao invés de um objeto
    //e tudo isso fica na variável data que é chamada lá no react

    if (!isset($data["nome"]) || !isset($data["telefone"])) { //o isset checa primeiro se a chave existe e se não é null, então se o campo nome não foi enviado ou está vazio Ou o mesmo com telefone...

        echo json_encode(["message" => "Dados incompletos."]);
        exit();
    }

    $stmt = $pdo->prepare('INSERT INTO contatos (nome, telefone) VALUES (:nome, :telefone)');

    $stmt->bindParam(":nome", $data["nome"]);
    $stmt->bindParam(":telefone", $data["telefone"]);

    if ($stmt->execute()) {
        echo json_encode(["message"=> "Contato salvo com sucesso!"]);

    } else {
        echo json_encode(["message"=> "Erro ao salvar o contato."]);
    }
    
} catch (PDOException $e) {
    echo json_encode(["message" => "Erro de banco de dados: " . $e->getMessage()]);
}