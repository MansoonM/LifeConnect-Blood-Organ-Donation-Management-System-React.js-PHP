<?php
// api/requests/create.php
require_once __DIR__ . '/../config.php';
require_login();

$data = json_input();
$blood_group = trim($data['blood_group'] ?? '');
$organ = trim($data['organ'] ?? '');
$urgency = $data['urgency'] ?? 'medium';
$details = trim($data['details'] ?? '');
$recipient_id = intval($_SESSION['user_id']);

if (!$blood_group && !$organ) {
  http_response_code(422);
  echo json_encode(["error" => "At least blood_group or organ is required."]);
  exit();
}

$stmt = $conn->prepare("INSERT INTO requests (recipient_id, blood_group, organ, urgency, details) VALUES (?,?,?,?,?)");
$stmt->bind_param("issss", $recipient_id, $blood_group, $organ, $urgency, $details);

if ($stmt->execute()) {
  echo json_encode(["message" => "Request created"]);
} else {
  http_response_code(400);
  echo json_encode(["error" => "Failed to create request", "details" => $stmt->error]);
}
?>
