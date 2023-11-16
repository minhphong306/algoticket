<?php

require_once '../crud/util.php';
require_once '../crud/event.php';

$userId = isset($_GET['id']) && is_numeric($_GET['id']) ? $_GET['id'] : null;

if (!$userId) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid event ID']);
  exit;
}
$eventData = getEventWithTicket($userId);


// Returning the result as JSON

echo json_encode([
  'data' => $eventData
]);
