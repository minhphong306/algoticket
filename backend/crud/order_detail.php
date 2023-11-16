<?php
// Create OrderDetail
function createOrderDetail($orderId, $productId, $quantity) {
  try {
      $conn = getPDOConnection();
      $query = "INSERT INTO order_detail
                  (order_id, product_id, quantity)
                  VALUES
                  (:order_id, :product_id, :quantity)";
      $stmt = $conn->prepare($query);
      $result = $stmt->execute([
          ":order_id" => $orderId,
          ":product_id" => $productId,
          ":quantity" => $quantity
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

// Read OrderDetail
function getOrderDetail($id) {
  try {
      $conn = getPDOConnection();
      $query = "SELECT * FROM order_detail WHERE id = :id";
      $stmt = $conn->prepare($query);
      $stmt->execute([":id" => $id]);
      $result = $stmt->fetch(PDO::FETCH_ASSOC);

      closeConnection($conn);
      return $result;
  } catch (Exception $exc) {
      print_r($exc);
      return false;
  }
}

// Update OrderDetail
function updateOrderDetail($id, $orderId, $productId, $quantity) {
  try {
      $conn = getPDOConnection();
      $query = "UPDATE order_detail SET
                  order_id = :order_id,
                  product_id = :product_id,
                  quantity = :quantity
                  WHERE id = :id";
      $stmt = $conn->prepare($query);
      $result = $stmt->execute([
          ":id" => $id,
          ":order_id" => $orderId,
          ":product_id" => $productId,
          ":quantity" => $quantity
      ]);

      closeConnection($conn);
      return $result;
  } catch (Exception $exc) {
      print_r($exc);
      return false;
  }
}

// Delete OrderDetail
function deleteOrderDetail($id) {
  try {
      $conn = getPDOConnection();
      $query = "DELETE FROM order_detail WHERE id = :id";
      $stmt = $conn->prepare($query);
      $result = $stmt->execute([":id" => $id]);

      closeConnection($conn);
      return $result;
  } catch (Exception $exc) {
      print_r($exc);
      return false;
  }
}