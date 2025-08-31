<?php
// api/requests/list.php
require_once __DIR__ . '/../config.php';
require_login();

$user = current_user($conn);
$role = $user['role'] ?? 'donor';

if ($role === 'admin') {
  $sql = "SELECT r.id, u.name as recipient_name, r.blood_group, r.organ, r.urgency, r.status, r.details, r.created_at
          FROM requests r INNER JOIN users u ON u.id = r.recipient_id ORDER BY r.created_at DESC";
  $stmt = $conn->prepare($sql);
} else {
  // recipient sees own requests
  $uid = intval($user['id']);
  $sql = "SELECT r.id, r.blood_group, r.organ, r.urgency, r.status, r.details, r.created_at
          FROM requests r WHERE r.recipient_id=? ORDER BY r.created_at DESC";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $uid);
}

$stmt->execute();
$res = $stmt->get_result();
$out = [];
while ($row = $res->fetch_assoc()) { $out[] = $row; }
echo json_encode($out);
?>
