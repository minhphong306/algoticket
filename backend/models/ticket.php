<?php

// CREATE TABLE `ticket` (
//   `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
//   `event_id` bigint(20) UNSIGNED,
//   `name` varchar(255) NOT NULL,
//   `amount` int(11),
//   `price` int(11),
//   `status` int(11),
//   `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
// );

class Ticket {
  private $id;
  private $event_id;
  private $name;
  private $amount;
  private $price;
  private $status;
  private $created_at;
  private $updated_at;

  public function __construct($id, $event_id, $name, $amount, $price, $status, $created_at, $updated_at) {
    $this->id = $id;
    $this->event_id = $event_id;
    $this->name = $name;
    $this->amount = $amount;
    $this->price = $price;
    $this->status = $status;
    $this->created_at = $created_at;
    $this->updated_at = $updated_at;
  }

  public function getId() {
    return $this->id;
  }

  public function getEventId() {
    return $this->event_id;
  }

  public function getName() {
    return $this->name;
  }

  public function getAmount() {
    return $this->amount;
  }

  public function getPrice() {
    return $this->price;
  }

  public function getStatus() {
    return $this->status;
  }

  public function getCreatedAt() {
    return $this->created_at;
  }

  public function getUpdatedAt() {
    return $this->updated_at;
  }

  public function setId($id) {
    $this->id = $id;
  }

  public function setEventId($event_id) {
    $this->event_id = $event_id;
  }

  public function setName($name) {
    $this->name = $name;
  }

  public function setAmount($amount) {
    $this->amount = $amount;
  }

  public function setPrice($price) {
    $this->price = $price;
  }

  public function setStatus($status) {
    $this->status = $status;
  }

  public function setCreatedAt($created_at) {
    $this->created_at = $created_at;
  }

  public function setUpdatedAt($updated_at) {
    $this->updated_at = $updated_at;
  }
}
