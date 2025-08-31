<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

// Check input
if (!isset($data["actor_id"], $data["actor_type"], $data["blood_group"], $data["organ"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$actor_id = intval($data["actor_id"]);
$actor_type = $data["actor_type"]; // 'user' or 'admin'
$blood_group = $data["blood_group"];
$organ = $data["organ"];
$status = "pending";

// Insert request
$stmt = $conn->prepare("INSERT INTO requests (actor_type, actor_id, blood_group, organ, status) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sisss", $actor_type, $actor_id, $blood_group, $organ, $status);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Request submitted successfully"]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
