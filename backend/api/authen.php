
<?php

require_once '../crud/util.php';
require_once "../crud/user.php";

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

$userData = getUserByWallet($data['wallet_address']);

if ($userData == false) {
  // create user with this wallet
  // ":wallet_address" => $data["wallet_address"],
  // ":name" => $data["name"],
  // ":avatar_url" => $data["avatar_url"],
  // ":bio" => $data["bio"],
  // ":socials" => $data["socials"],
  $data = [
    'wallet_address' => $data["wallet_address"],
    'name' => "John Doe",
    'avatar_url' => "https://congcu.org/php-nft-ticket/images/avatar.jpg",
    'bio' => "I am a software developer",
    'socials' => "{\"twitter\": \"johndoe\", \"github\": \"johndoe\"}",
  ];

  $userId = createUser($data);
  $userData = getUserById($userId);
}

$userData['id'] = (int) $userData['id'];

echo json_encode([
  'data' => $userData
]);