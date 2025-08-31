<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"], $data["status"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$id = intval($data["id"]);
$status = $data["status"]; // "approved" or "rejected"

$stmt = $conn->prepare("UPDATE requests SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
