<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

function closeConnection($conn)
{
    $conn = null;
}


function getPDOConnection()
{
    $servername = "LOCALHOST";
    $username = "LOCALHOST";
    $password = "LOCALHOST";
    $dbname = "LOCALHOST";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec("set names utf8");
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        return null;
    }
    return $conn;
}

function resErr($message)
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: X-Requested-With");
    header("Content-Type: application/json");
    $res = [
        "success" => false,
        "message" => $message,
    ];
    echo json_encode($res);
    http_response_code(400);
    
}

function resData($data, $key = 'data')
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: X-Requested-With");
    header("Content-Type: application/json");
    $res = [
        "success" => true,
        $key => $data,
    ];
    echo json_encode($res);
    
}

function sendPostRequest($url)
{
    $ch = curl_init();

//set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);

//So that curl_exec returns the contents of the cURL; rather than echoing it
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//execute post
    return curl_exec($ch);
}

function oauth($user)
{
    if (strlen($user->getToken()) == 0) {
        return false;
    }

    return true;
}
