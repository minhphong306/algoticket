
<?php

require_once '../crud/util.php';
require_once "../crud/event.php";

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

// Map the data to a model
$date = date('Y-m-d H:i:s', round($data['event']['date']));

$event = [
  'name' => $data['event']['name'],
  'date' => $date,
  'author_id' => $data['event']['author_id'],
  'is_feature' => $data['event']['is_feature'],
  'description' => $data['event']['description'],
  'feature_image' => $data['event']['feature_image'],
  'location' => $data['event']['location']
];



$tickets = [];
for ($i = 0; $i < count($data['tickets']); $i++) {
  $ticket_data = $data['tickets'][$i];  $ticket = [
    'name' => $ticket_data['name'],
    'amount' => $ticket_data['amount'],
    'price' => $ticket_data['price'],
    'image_url' => $ticket_data['image_url'],

    'status' => 1, // Default status is 1 (available)
    'type' => $ticket_data['type'],
  ];
  $tickets[] = $ticket;
}

$model = [
  'event' => $event,
  'tickets' => $tickets
];

$eventId = createEventWithTickets($event, $tickets);
$eventData = getEventWithTicket($eventId);


echo json_encode([
  'data' => $eventData
]);