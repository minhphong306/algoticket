<?php

require_once '../crud/util.php';
require_once '../crud/ticket.php';


$ticketId = isset($_GET['id']) && is_numeric($_GET['id']) ? $_GET['id'] : null;

if (!$ticketId) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid item id']);
  exit;
}
$ticketData = getTicketById($ticketId);


// Returning the result as JSON

echo json_encode([
  'data' => $ticketData
]);
