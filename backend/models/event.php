<?php

// CREATE TABLE `event` (
//   `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
//   `author_id` bigint(20) UNSIGNED,
//   `name` varchar(1000) NOT NULL,
//   `date` timestamp NULL DEFAULT NULL,
//   `location` varchar(1000) NOT NULL,
//   `description` varchar(1000) NOT NULL,
//   `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
//   FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
// );

class Event {
  private $id;
  private $author_id;
  private $name;
  private $date;
  private $location;
  private $description;
  private $created_at;
  private $updated_at;

  public function __construct($id, $author_id, $name, $date, $location, $description, $created_at, $updated_at) {
    $this->id = $id;
    $this->author_id = $author_id;
    $this->name = $name;
    $this->date = $date;
    $this->location = $location;
    $this->description = $description;
    $this->created_at = $created_at;
    $this->updated_at = $updated_at;
  }

  public function getId() {
    return $this->id;
  }

  public function getAuthorId() {
    return $this->author_id;
  }

  public function getName() {
    return $this->name;
  }

  public function getDate() {
    return $this->date;
  }

  public function getLocation() {
    return $this->location;
  }

  public function getDescription() {
    return $this->description;
  }

  public function getCreatedAt() {
    return $this->created_at;
  }

  public function getUpdatedAt() {
    return $this->updated_at;
  }
}
