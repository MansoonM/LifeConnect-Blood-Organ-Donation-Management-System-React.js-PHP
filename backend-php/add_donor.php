<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data["name"]) && !empty($data["email"]) && !empty($data["blood_group"]) && !empty($data["organ"])) {
    $name = $data["name"];
    $email = $data["email"];
    $blood_group = $data["blood_group"];
    $organ = $data["organ"];

    $query = "INSERT INTO donors (name, email, blood_group, organ) VALUES ('$name', '$email', '$blood_group', '$organ')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}
