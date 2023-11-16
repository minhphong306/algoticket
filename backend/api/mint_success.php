
<?php

require_once '../crud/util.php';
require_once "../crud/ticket.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  http_response_code(400);
  echo json_encode([
    'error' => 'Bad Request'
  ]);
  exit();
}

// Read the request body
$request_body = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($request_body, true);

$ticketId = $data['ticket_id'];
$nftId = $data['nft_id'];
$userId = $data['user_id'];

$res = updateTicketCurrentQtyAndInsertNFT($ticketId, $nftId, $userId);

echo json_encode([
  'data' => $res
]);