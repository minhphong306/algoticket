<?php

// CRUD functions for users table
function getUsers()
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM users";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getUserById($id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM users WHERE id = :id";
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

function getUserByWallet($wallet)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT * FROM users WHERE wallet_address = :wallet_address";
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":wallet_address" => $wallet,
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function createUser($data)
{
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO users
                    (wallet_address, name, avatar_url, bio, socials)
                    VALUES
                    (:wallet_address, :name, :avatar_url, :bio, :socials)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":wallet_address" => $data["wallet_address"],
            ":name" => $data["name"],
            ":avatar_url" => $data["avatar_url"],
            ":bio" => $data["bio"],
            ":socials" => $data["socials"],
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


function updateUser($id, $data)
{
    try {
        $conn = getPDOConnection();
        $query = "UPDATE users SET
                    wallet_address = :wallet_address,
                    name = :name,
                    avatar_url = :avatar_url,
                    bio = :bio,
                    socials = :socials
                    WHERE id = :id";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":id" => $id,
            ":wallet_address" => $data["wallet_address"],
            ":name" => $data["name"],
            ":avatar_url" => $data["avatar_url"],
            ":bio" => $data["bio"],
            ":socials" => $data["socials"],
        ]);

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function deleteUser($id)
{
    try {
        $conn = getPDOConnection();
        $query = "DELETE FROM users WHERE id = :id";
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