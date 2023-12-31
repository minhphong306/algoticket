<?php
require_once '../crud/util.php';
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    $uploadOk = 1;
  } else {
    $msg = "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  $random_prefix = substr(str_shuffle("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 5);
  $target_file = $target_dir . $random_prefix . basename($_FILES["fileToUpload"]["name"]);
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  $msg = "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  $msg = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  $response = array("success" => false, "message" => $msg);
  echo json_encode($response);
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    $response = array("success" => true, "image_url" => "https://congcu.org/php-nft-ticket/api/" . $target_file);
    echo json_encode($response);
  } else {
    $response = array("success" => false, "message" => "Sorry, there was an error uploading your file.");
    echo json_encode($response);
  }
}
?>