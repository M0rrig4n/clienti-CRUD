<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
include 'DbConnect.php';

//Creo un nuovo oggetto DbConnect e usiamo il modulo connect
$objDb = new DbConnect;
$conn = $objDb->connect();
//Controllo il metodo inviato
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
         $sql = "SELECT * FROM clienti";
        //Prendo solo i dati del cliente con l'id specificato nell'URI
        $path = explode('/',$_SERVER['REQUEST_URI']);
        //L'id si trova nella posizione 3 dell'URI
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .= " WHERE ID = :ID";
            $ObjStmt = $conn->prepare($sql);
            $ObjStmt->bindParam(':ID', $path[3]);
            $ObjStmt->execute();
            $clienti = $ObjStmt->fetch(PDO::FETCH_ASSOC);
        }
        else{
            //Retrieve di tutti i clienti
            $ObjStmt = $conn->prepare($sql);
            $ObjStmt->execute();
            $clienti = $ObjStmt->fetchAll(PDO::FETCH_ASSOC);
        }  
        echo json_encode($clienti);
        break;

    case "POST":
        $cliente = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO clienti(ID, Nome, Cognome, Contatti)
        VALUES (null, :nome, 
        :cognome, 
        :contatti)";
        $ObjStmt = $conn->prepare($sql);
        $ObjStmt->bindParam(':nome', $cliente->nome);
        $ObjStmt->bindParam(':cognome', $cliente->cognome);
        $ObjStmt->bindParam(':contatti', $cliente->contatti);
        if($ObjStmt->execute()){
            $response = ['status' => 1, 'message' => 'Creato il nuovo cliente'];
        }
        else{
            $response = ['status'=> 0, 'message'=>'La creazione del nuovo cliente è fallita'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $clientData = json_decode(file_get_contents('php://input'), true);
        //Controllo che ci siano dati dentro la request mandando errore qualora non ci fossero
        if (!$clientData) {
            http_response_code(400);
            echo json_encode(['status' => 0, 'message' => 'Dati JSON non validi']);
            break;
        }

        //Controllo che ID sia valorizzato
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (!isset($path[3]) || !is_numeric($path[3])) {
            http_response_code(400);
            echo json_encode(['status' => 0, 'message' => 'ID cliente invalido']);
            break;
        }
        //Controllo del tipo di id
        $clientId = (int) $path[3]; 

        $sql = "UPDATE clienti SET ";
        $params = [];
        //Controllo che il campo sia il primo per gestire la posizione della virgola
        $isFirst = true; 

        if (isset($clientData['nome'])) {
            $sql .= ($isFirst ? '' : ', ') . "Nome = :nome";
            $params[':nome'] = $clientData['nome'];
            $isFirst = false;
        }

        if (isset($clientData['cognome'])) {
            $sql .= ($isFirst ? '' : ', ') . "Cognome = :cognome";
            $params[':cognome'] = $clientData['cognome'];
            $isFirst = false;
        }

        if (isset($clientData['contatti'])) {
            $sql .= ($isFirst ? '' : ', ') . "Contatti = :contatti";
            $params[':contatti'] = $clientData['contatti'];
            $isFirst = false;
        }

        //Controllo che ci sia qualche field da aggiornare usando isFirst 
        if (!$isFirst) {
            $sql .= " WHERE ID = :id";
            $params[':id'] = $clientId;
           
            $stmt = $conn->prepare($sql);
            $stmt->execute($params);

            if ($stmt->rowCount() > 0) {
                echo json_encode(['status' => 1, 'message' => 'I dati sono stati modificati correttamente']);
            } else {
                http_response_code(400); 
                echo json_encode(['status' => 0, 'message' => 'Non sono richieste modifiche']);
            }
        } else {
            http_response_code(200);
            echo json_encode(['status' => 0, 'message' => 'Non è stato inserito nessun dato nuovo']);
        }

    break;

    case "DELETE":
        $sql = "DELETE FROM clienti WHERE ID=:ID";
        $path = explode('/',$_SERVER['REQUEST_URI']);
        $ObjStmt = $conn->prepare($sql);
        $ObjStmt->bindParam(':ID', $path[3]);
        
         if($ObjStmt->execute()){
            $response = ['status' => 1, 'message' => 'Il cliente è stato cancellato correttamente'];
        }
        else{
            $response = ['status'=> 0, 'message'=>'Il cliente non è stato cancellato correttamente'];
        }
        echo json_encode($response);
        break;
}

?>