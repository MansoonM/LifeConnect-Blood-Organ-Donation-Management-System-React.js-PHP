<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["actor_id"], $data["actor_type"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$actor_id = intval($data["actor_id"]);
$actor_type = $data["actor_type"];

$sql = "
SELECT id, blood_group, organ, status, created_at
FROM requests
WHERE actor_id = ? AND actor_type = ?
ORDER BY created_at DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $actor_id, $actor_type);
$stmt->execute();
$result = $stmt->get_result();

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode(["success" => true, "requests" => $requests]);

$stmt->close();
$conn->close();
?>
