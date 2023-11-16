<?php

// CREATE TABLE `orders` (
//   `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
//   `customer_id` bigint(20) UNSIGNED,
//   `total` int(11),
//   `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
// );

class Order {
  private $id;
  private $customer_id;
  private $total;
  private $created_at;
  private $updated_at;

  public function __construct($customer_id, $total) {
    $this->customer_id = $customer_id;
    $this->total = $total;
  }

  public function getId() {
    return $this->id;
  }

  public function getCustomerId() {
    return $this->customer_id;
  }

  public function getTotal() {
    return $this->total;
  }

  public function getCreatedAt() {
    return $this->created_at;
  }

  public function getUpdatedAt() {
    return $this->updated_at;
  }

  public function save() {
    // TODO: Implement save method to insert or update the order in the database
  }
}
