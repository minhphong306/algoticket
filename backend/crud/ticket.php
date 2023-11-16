<?php
function insertTicket($urlId)
{
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO ticket
                    (url_id)
                    VALUES
                    (:url_id)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":url_id" => $urlId,
        ]);

        if ($result) {
            return $conn->lastInsertId();
        } else {
            return -1;
        }

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getTicket($id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM ticket WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $id,
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function updateTicket($id, $urlId)
{
    try {
        $conn = getPDOConnection();
        $query = "UPDATE ticket SET url_id = :url_id WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
            ":url_id" => $urlId,
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}





function deleteTicket($id)
{
    try {
        $conn = getPDOConnection();
        $query = "DELETE FROM ticket WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getListTicket($limit, $page, $event_ids = [])
{
    try {
        $conn = getPDOConnection();
        $offset = ($page - 1) * $limit;
        $query = "SELECT ticket.*, event.name AS event_name, event.description as event_description, users.name AS creator_name FROM ticket JOIN event ON ticket.event_id = event.id JOIN users ON event.author_id = users.id";
        if (!empty($event_ids)) {
            $query .= " WHERE event.id IN (" . implode(",", $event_ids) . ")";
        }
        $query .= " LIMIT :limit OFFSET :offset";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getTicketById($id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT ticket.*, event.name AS event_name, event.description as event_description, users.name AS creator_name, users.name as owner_name FROM ticket JOIN event ON ticket.event_id = event.id JOIN users ON event.author_id = users.id WHERE ticket.id = :id";

        
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $id,
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function countTicket()
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT COUNT(*) FROM ticket";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchColumn();

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function updateTicketCurrentQty($id)
{
    try {
        $conn = getPDOConnection();
        $query = "UPDATE ticket SET current_qty = current_qty + 1 WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function insertNFT($nft_id, $ticket_id, $user_id)
{
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO nft (nft_id, ticket_id, user_id) VALUES (:nft_id, :ticket_id, :user_id)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":nft_id" => $nft_id,
            ":ticket_id" => $ticket_id,
            ":user_id" => $user_id
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function updateNFTStatus($id, $status) {
    try {
        $conn = getPDOConnection();
        $query = "UPDATE nft SET status = :status WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
            ":status" => $status
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function updateTicketCurrentQtyAndInsertNFT($id, $nft_id, $user_id)
{
    try {
        $conn = getPDOConnection();
        $conn->beginTransaction();

        $query1 = "UPDATE ticket SET current_qty = current_qty + 1 WHERE id = :id";
        $stmt1 = $conn->prepare($query1);
        $result1 = $stmt1->execute([
            ":id" => $id,
        ]);

        $query2 = "INSERT INTO nft (nft_id, ticket_id, user_id) VALUES (:nft_id, :ticket_id, :user_id)";
        $stmt2 = $conn->prepare($query2);
        $result2 = $stmt2->execute([
            ":nft_id" => $nft_id,
            ":ticket_id" => $id,
            ":user_id" => $user_id
        ]);

        if ($result1 && $result2) {
            $conn->commit();
            closeConnection($conn);
            return true;
        } else {
            $conn->rollBack();
            closeConnection($conn);
            return false;
        }
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getUserNfts($limit, $page, $user_id)
{
    try {
        $conn = getPDOConnection();
        $offset = ($page - 1) * $limit;
        $query = "SELECT nft.id, nft.nft_id, ticket.event_id, ticket.name, ticket.amount, ticket.price, nft.status, ticket.image_url, ticket.created_at, ticket.updated_at, ticket.current_qty, ticket.type, event.name as event_name, event.description as event_description, users.name as creator_name FROM nft JOIN ticket ON nft.ticket_id = ticket.id JOIN event ON ticket.event_id = event.id JOIN users ON event.author_id = users.id WHERE nft.user_id = :user_id LIMIT :limit OFFSET :offset";

        $stmt = $conn->prepare($query);
        $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function countUserNfts($user_id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT COUNT(*) FROM nft WHERE user_id = :user_id";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchColumn();

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}
