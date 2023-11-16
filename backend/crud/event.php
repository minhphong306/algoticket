<?php

// require './util.php';

// Create event
function createEvent($event) {
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO event
                    (author_id, is_feature, name, date, location, description, feature_image)
                    VALUES
                    (:author_id, :is_feature, :name, :date, :location, :description, :feature_image)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":author_id" => $event->author_id,
            ":is_feature" => $event->is_feature,
            ":name" => $event->name,
            ":date" => $event->date,
            ":location" => $event->location,
            ":description" => $event->description,
            ":feature_image" => $event->feature_image
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

// Read event
function readEvent($id) {
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM event WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $id
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

// Get events
function getEvents($params) {
    try {
        $conn = getPDOConnection();
        $query = "SELECT e.*, u.name as author_name, u.id as author_id, u.wallet_address as author_wallet_address, u.avatar_url as author_avatar FROM event e JOIN users u ON e.author_id = u.id ORDER BY e.id DESC LIMIT :limit OFFSET :offset";
        if(isset($params['isFeature']) && $params['isFeature'] === true) {
            $query = "SELECT e.*, u.name as author_name, u.id as author_id, u.wallet_address as author_wallet_address, u.avatar_url as author_avatar FROM event e JOIN users u ON e.author_id = u.id WHERE e.is_feature = true ORDER BY e.id DESC LIMIT :limit OFFSET :offset";
        }

        $offset = ((int) $params['page'] - 1) * (int) $params['limit'];
        
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':limit', (int) $params['limit'], PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as &$event) {
            $event['id'] = (int) $event['id'];
            $event['author_id'] = (int) $event['author_id'];
            
        }

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

// Update event
function updateEvent($event) {
    try {
        $conn = getPDOConnection();
        $query = "UPDATE event SET name = :name, description = :description, date = :date, location = :location, feature_image = :feature_image, is_feature = :is_feature, updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $event->id,
            ":name" => $event->name,
            ":description" => $event->description,
            ":date" => $event->date,
            ":location" => $event->location,
            ":feature_image" => $event->feature_image,
            ":is_feature" => $event->is_feature
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

// Delete event
function deleteEvent($id) {
    try {
        $conn = getPDOConnection();
        $query = "DELETE FROM event WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

// Count events
function countEvents($params) {
    try {
        $conn = getPDOConnection();
        $query = "SELECT COUNT(*) FROM event";
        if(isset($params['isFeature']) && $params['isFeature'] === true) {
            $query = "SELECT COUNT(*) FROM event WHERE is_feature = true";
        }

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

// Create event and tickets in a single transaction
function createEventWithTickets($event, $tickets) {
    try {
        $conn = getPDOConnection();
        $conn->beginTransaction();

        // Insert event
        $query = "INSERT INTO event (author_id, is_feature, name, date, location, description, feature_image) VALUES (:author_id, :is_feature, :name, :date, :location, :description, :feature_image)";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":author_id" => $event['author_id'],
            ":is_feature" => $event['is_feature'],
            ":name" => $event['name'],
            ":date" => $event['date'],
            ":location" => $event['location'],
            ":description" => $event['description'],
            ":feature_image" => $event['feature_image']
        ]);
        $eventId = $conn->lastInsertId();

        // Insert tickets
        $query = "INSERT INTO ticket (event_id, name, amount, price, status, image_url, type) VALUES (:event_id, :name, :amount, :price, :status, :image_url, :type)";
        $stmt = $conn->prepare($query);
        foreach ($tickets as $ticket) {
            $stmt->execute([
                ":event_id" => $eventId,
                ":name" => $ticket['name'],
                ":amount" => $ticket['amount'],
                ":price" => $ticket['price'],
                ":status" => $ticket['status'],
                ":image_url" => $ticket['image_url'],
                ":type" => $ticket['type']
            ]);
        }

        $conn->commit();
        closeConnection($conn);
        return $eventId;
    } catch (Exception $exc) {
        $conn->rollBack();
        print_r($exc);
        return false;
    }
}

function getEventWithTicket($eventId) {
    try {
        $conn = getPDOConnection();

        // Get event details
        $query = "SELECT id, name, date, description, feature_image, location FROM event WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $eventId
        ]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);

        // Get ticket details
        $query = "SELECT * FROM ticket WHERE event_id = :event_id";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":event_id" => $eventId
        ]);
        $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

        closeConnection($conn);

        // Combine event and ticket details into a single response
        $response = [
                "event" => $event,
                "tickets" => $tickets
        ];

        return $response;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getEventsWithTicket($limit, $page) {
    try {
        $conn = getPDOConnection();

        $offset = ((int)$page - 1) * (int)$page;

        // Get event details
        $query = "SELECT id, name, date, description, feature_image, location FROM event LIMIT :limit OFFSET :offset";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int) $offset, PDO::PARAM_INT);
        $stmt->execute();
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get ticket details for each event
        foreach ($events as &$event) {
            $query = "SELECT * FROM ticket WHERE event_id = :event_id";
            $stmt = $conn->prepare($query);
            $stmt->execute([
                ":event_id" => $event['id']
            ]);
            $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $event['tickets'] = $tickets;
        }

        closeConnection($conn);

        return $events;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}