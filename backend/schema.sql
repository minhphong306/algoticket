CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `wallet_address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar_url` varchar(1000) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `event` (
  `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `author_id` bigint(20) UNSIGNED,
  `is_feature` tinyint(1) UNSIGNED,
  `name` varchar(1000) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `location` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `ticket` (
  `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `event_id` bigint(20) UNSIGNED,
  `name` varchar(255) NOT NULL,
  `amount` int(11),
  `price` int(11),
  `status` int(11),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
);

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `customer_id` bigint(20) UNSIGNED,
  `total` int(11),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `order_detail` (
  `id` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `order_id` bigint(20) UNSIGNED,
  `ticket_id` bigint(20) UNSIGNED,
  `price` int(11),
  `qty` int(11),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`)
);


-- DROP TABLE IF EXISTS `order_detail`;
-- DROP TABLE IF EXISTS `orders`;
-- DROP TABLE IF EXISTS `ticket`;
-- DROP TABLE IF EXISTS `event`;
-- DROP TABLE IF EXISTS `users`;

