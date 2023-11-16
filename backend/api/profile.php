<?php

require_once '../crud/util.php';
require_once '../crud/user.php';


$userId = isset($_GET['id']) && is_numeric($_GET['id']) ? $_GET['id'] : null;

if (!$userId) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid user ID']);
  exit;
}

$userData = getUserById($userId);
if (!$userData) {
  http_response_code(404);
  echo json_encode(['error' => 'User not found']);
  exit;
}

$socials = json_decode($userData['socials'], true);

$eventData = [
  'id' => $userData['id'],
  'wallet_address' => $userData['wallet_address'],
  'name' => $userData['name'],
  'bio' => $userData['bio'],
  'avatar_url' => $userData['avatar_url'],
  'socials' => [
    'twitter' => isset($socials['twitter']) ? $socials['twitter'] : null,
    'facebook' => isset($socials['facebook']) ? $socials['facebook'] : null,
    'instagram' => isset($socials['instagram']) ? $socials['instagram'] : null,
    'linkedin' => isset($socials['linkedin']) ? $socials['linkedin'] : null
  ]
];


// Returning the result as JSON
echo json_encode([
  'data' => $eventData,
]);
