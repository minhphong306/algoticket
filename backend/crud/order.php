<?php

function createOrder($data)
{
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO orders
                    (customer_name, customer_email, product_name, quantity, price)
                    VALUES
                    (:customer_name, :customer_email, :product_name, :quantity, :price)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":customer_name" => $data["customer_name"],
            ":customer_email" => $data["customer_email"],
            ":product_name" => $data["product_name"],
            ":quantity" => $data["quantity"],
            ":price" => $data["price"],
        ]);

        if ($result) {
            $orderId = $conn->lastInsertId();
            return getOrderById($orderId);
        } else {
            return false;
        }

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getOrderById($id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM orders WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $id,
        ]);
        $order = $stmt->fetch(PDO::FETCH_ASSOC);
        closeConnection($conn);
        return $order;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getAllOrders()
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM orders";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        closeConnection($conn);
        return $orders;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function updateOrder($id, $data)
{
    try {
        $conn = getPDOConnection();
        $query = "UPDATE orders SET
                    customer_name = :customer_name,
                    customer_email = :customer_email,
                    product_name = :product_name,
                    quantity = :quantity,
                    price = :price
                    WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":customer_name" => $data["customer_name"],
            ":customer_email" => $data["customer_email"],
            ":product_name" => $data["product_name"],
            ":quantity" => $data["quantity"],
            ":price" => $data["price"],
            ":id" => $id,
        ]);

        if ($result) {
            return getOrderById($id);
        } else {
            return false;
        }

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function deleteOrder($id)
{
    try {
        $conn = getPDOConnection();
        $query = "DELETE FROM orders WHERE id = :id";
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