<?php

require_once '../crud/util.php';
require_once '../crud/event.php';


// Reading the parameters from the request
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 12;

$tickets = getEventsWithTicket($limit, $page);

// For each item in tickets, remove property tickets
foreach ($tickets as &$ticket) {
  unset($ticket['tickets']);
}

// Returning the result as JSON
echo json_encode([
  'data' => $tickets,
]);