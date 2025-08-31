<?php
// api/donors/create.php
require_once __DIR__ . '/../config.php';
require_login();

$data = json_input();
$blood_group = trim($data['blood_group'] ?? '');
$organ = trim($data['organ'] ?? '');
$location = trim($data['location'] ?? '');
$availability = isset($data['availability']) ? intval($data['availability']) : 1;
$last_donation = trim($data['last_donation'] ?? null);

if (!$blood_group && !$organ) {
  http_response_code(422);
  echo json_encode(["error" => "At least blood_group or organ is required."]);
  exit();
}

$user_id = intval($_SESSION['user_id']);

// Check if donor profile exists -> update, else insert
$stmt = $conn->prepare("SELECT id FROM donors WHERE user_id=?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$res = $stmt->get_result();
$existing = $res->fetch_assoc();

if ($existing) {
  $did = intval($existing['id']);
  $stmt2 = $conn->prepare("UPDATE donors SET blood_group=?, organ=?, availability=?, location=?, last_donation=? WHERE id=?");
  $stmt2->bind_param("ssissi", $blood_group, $organ, $availability, $location, $last_donation, $did);
  $ok = $stmt2->execute();
} else {
  $stmt2 = $conn->prepare("INSERT INTO donors (user_id,blood_group,organ,availability,location,last_donation) VALUES (?,?,?,?,?,?)");
  $stmt2->bind_param("ississ", $user_id, $blood_group, $organ, $availability, $location, $last_donation);
  $ok = $stmt2->execute();
}

echo json_encode(["message" => $existing ? "Donor profile updated" : "Donor profile created"]);
?>
