<?php

// CREATE TABLE `order_detail` (
//   `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
//   `order_id` bigint(20) UNSIGNED,
//   `ticket_id` bigint(20) UNSIGNED,
//   `price` int(11),
//   `qty` int(11),
//   `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
//   FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`)
// );

class OrderDetail {
  private $id;
  private $orderId;
  private $ticketId;
  private $price;
  private $qty;
  private $createdAt;
  private $updatedAt;

  public function __construct($orderId, $ticketId, $price, $qty) {
    $this->orderId = $orderId;
    $this->ticketId = $ticketId;
    $this->price = $price;
    $this->qty = $qty;
  }

  public function getId() {
    return $this->id;
  }

  public function getOrderId() {
    return $this->orderId;
  }

  public function getTicketId() {
    return $this->ticketId;
  }

  public function getPrice() {
    return $this->price;
  }

  public function getQty() {
    return $this->qty;
  }

  public function getCreatedAt() {
    return $this->createdAt;
  }

  public function getUpdatedAt() {
    return $this->updatedAt;
  }

  public function save() {
    // TODO: Implement save method to save the order detail to the database
  }

  public static function findById($id) {
    // TODO: Implement findById method to retrieve an order detail by its ID from the database
  }

  public static function findByOrderId($orderId) {
    // TODO: Implement findByOrderId method to retrieve all order details for a given order ID from the database
  }
}
