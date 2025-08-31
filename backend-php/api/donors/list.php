<?php
// api/donors/list.php
require_once __DIR__ . '/../config.php';

$blood_group = $_GET['blood_group'] ?? null;
$organ = $_GET['organ'] ?? null;
$location = $_GET['location'] ?? null;

$sql = "SELECT d.id, u.name, u.email, d.blood_group, d.organ, d.availability, d.location, d.last_donation
        FROM donors d INNER JOIN users u ON u.id = d.user_id WHERE d.availability=1";
$params = [];
$types = "";

if ($blood_group) { $sql .= " AND d.blood_group=?"; $types.="s"; $params[]=$blood_group; }
if ($organ) { $sql .= " AND d.organ=?"; $types.="s"; $params[]=$organ; }
if ($location) { $sql .= " AND d.location LIKE ?"; $types.="s"; $params[]="%".$location."%"; }

$stmt = $conn->prepare($sql);
if (!empty($params)) {
  $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$res = $stmt->get_result();

$out = [];
while ($row = $res->fetch_assoc()) { $out[] = $row; }

echo json_encode($out);
?>
