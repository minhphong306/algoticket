<?php

require_once '../crud/util.php';
require_once '../crud/ticket.php';

$nftId = isset($_GET['id']) && is_numeric($_GET['id']) ? $_GET['id'] : null;
$status = isset($_GET['status']) && is_numeric($_GET['status']) ? intval($_GET['status']) : null;

if ($status !== 1 && $status !== 2) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid status value']);
  exit;
}

if (!$nftId) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid NFT id']);
  exit;
}

$result = updateNFTStatus($nftId, $status);

// Returning the result as JSON
echo json_encode([
  'data' => $result,
]);