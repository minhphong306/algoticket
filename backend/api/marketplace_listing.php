<?php

require_once '../crud/util.php';
require_once '../crud/ticket.php';

// $userId = isset($_GET['user_id']) && is_numeric($_GET['user_id']) ? $_GET['user_id'] : null;

// if (!$userId) {
//   http_response_code(400);
//   echo json_encode(['error' => 'Invalid user ID']);
//   exit;
// }

// Reading the parameters from the request
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 12;
$eventIds = isset($_GET['event_ids']) ? $_GET['event_ids'] : null;

if ($eventIds) {
  $eventIds = array_map('intval', explode(',', $eventIds));

}

$tickets = getListTicket($limit, $page, $eventIds);
$count = countTicket();

// Returning the result as JSON
echo json_encode([
  'data' => $tickets,
  'current_page' => $page,
  'total_pages' => ceil($count / $limit),
  'total_events' => $count
]);
