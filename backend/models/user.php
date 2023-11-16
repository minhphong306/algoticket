<?php
// CREATE TABLE `users` (
//   `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
//   `wallet_address` varchar(255) NOT NULL,
//   `name` varchar(255) NOT NULL,
//   `avatar_url` varchar(1000) NOT NULL,
//   `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
//   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
// );

class User {
  private $id;
  private $wallet_address;
  private $name;
  private $avatar_url;
  private $created_at;
  private $updated_at;

  public function __construct($wallet_address, $name, $avatar_url) {
    $this->wallet_address = $wallet_address;
    $this->name = $name;
    $this->avatar_url = $avatar_url;
  }

  public function getId() {
    return $this->id;
  }

  public function getWalletAddress() {
    return $this->wallet_address;
  }

  public function getName() {
    return $this->name;
  }

  public function getAvatarUrl() {
    return $this->avatar_url;
  }

  public function getCreatedAt() {
    return $this->created_at;
  }

  public function getUpdatedAt() {
    return $this->updated_at;
  }

  public function save() {
    // TODO: Implement save method to insert or update the user in the database
  }

  public static function findById($id) {
    // TODO: Implement findById method to retrieve a user by ID from the database
  }

  public static function findByWalletAddress($wallet_address) {
    // TODO: Implement findByWalletAddress method to retrieve a user by wallet address from the database
  }
}
