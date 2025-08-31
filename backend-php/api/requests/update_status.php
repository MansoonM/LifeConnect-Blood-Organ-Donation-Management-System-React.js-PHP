<?php
// api/requests/update_status.php
require_once __DIR__ . '/../config.php';
require_login();

$user = current_user($conn);
if (($user['role'] ?? '') !== 'admin') {
  http_response_code(403);
  echo json_encode(["error" => "Admin only"]);
  exit();
}

$data = json_input();
$id = intval($data['id'] ?? 0);
$status = $data['status'] ?? 'pending';

$allowed = ['pending','matched','fulfilled','cancelled'];
if (!in_array($status, $allowed)) {
  http_response_code(422);
  echo json_encode(["error" => "Invalid status"]);
  exit();
}

$stmt = $conn->prepare("UPDATE requests SET status=? WHERE id=?");
$stmt->bind_param("si", $status, $id);
if ($stmt->execute()) {
  echo json_encode(["message" => "Status updated"]);
} else {
  http_response_code(400);
  echo json_encode(["error" => "Failed to update status"]);
}
?>
