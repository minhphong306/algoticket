<?php
// Importing the required files
require_once '../crud/util.php';
require_once '../crud/event.php';

// Reading the parameters from the request
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 12;

// Calling the get function from event.php
$condition = [
  // 'isFeature' => true,
  'page' => $page,
  'limit' => $limit
];

$events = getEvents($condition);
$count = countEvents($condition);



echo json_encode([
  'data' => $events,
  'current_page' => $page,
  'total_pages' => ceil($count / $limit),
  'total_events' => $count
]);

