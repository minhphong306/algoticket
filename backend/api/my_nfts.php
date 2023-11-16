<?php

require_once '../crud/util.php';
require_once '../crud/ticket.php';

$userId = isset($_GET['user_id']) && is_numeric($_GET['user_id']) ? $_GET['user_id'] : null;

if (!$userId) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid user ID']);
  exit;
}

// Reading the parameters from the request
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 12;

$tickets = getUserNfts($limit, $page, $userId);
$count = countUserNfts($userId);

// Returning the result as JSON
echo json_encode([
  'data' => $tickets,
  'current_page' => (int) $page,
  'total_pages' => ceil($count / $limit),
  'total_events' => $count
]);
