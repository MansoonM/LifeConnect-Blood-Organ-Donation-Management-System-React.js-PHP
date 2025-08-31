<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"], $data["actor_id"], $data["actor_type"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$id = intval($data["id"]);
$actor_id = intval($data["actor_id"]);
$actor_type = $data["actor_type"];

// ✅ Delete only if request belongs to the logged-in user
$stmt = $conn->prepare("DELETE FROM requests WHERE id = ? AND actor_id = ? AND actor_type = ?");
$stmt->bind_param("iis", $id, $actor_id, $actor_type);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(["success" => true, "message" => "Request deleted successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Request not found or you are not authorized"]);
}

$stmt->close();
$conn->close();
?>
