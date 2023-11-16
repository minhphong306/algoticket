<?php

require './util.php';

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$urls = $body["urls"];

if (sizeof($urls) == 0) {
    resErr("Missing urls");
    exit();
}

$phishingIds = [];
for ($i = 0; $i < sizeof($urls); $i++) {
    if ($i % 2 == 0) {
        $phishingIds[] = $urls[$i]['id'];
    }
}

resData($phishingIds, 'phishings');


function checkUrl($query)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT 
                         id, url
                    FROM url
                    WHERE url like '%" . $query . "%'";


        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":url" => $query
        ]);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $item = [
                "id" => $row['id'],
                "url" => $row["url"]
            ];

            $data[] = $item;
        }

        closeConnection($conn);
        return $data;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}