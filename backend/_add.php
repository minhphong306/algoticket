<?php

require './util.php';

// Parse input json
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$url = $body["url"];

if (strlen($url) == 0) {
    resErr("Missing url");
    exit();
}

// create url
$urlId = insertUrl($url);

resData([
    "id" => $urlId,
]);
