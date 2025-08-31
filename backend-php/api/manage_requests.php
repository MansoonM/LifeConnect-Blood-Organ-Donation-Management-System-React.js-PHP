<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../db.php");

// Fetch all requests with requester info (user/admin)
$sql = "
SELECT r.id, r.blood_group, r.organ, r.status, r.created_at,
       CASE 
         WHEN r.actor_type = 'user' THEN u.name
         WHEN r.actor_type = 'admin' THEN a.name
       END AS requester_name,
       CASE 
         WHEN r.actor_type = 'user' THEN u.email
         WHEN r.actor_type = 'admin' THEN a.email
       END AS requester_email
FROM requests r
LEFT JOIN users u ON (r.actor_type = 'user' AND r.actor_id = u.id)
LEFT JOIN admins a ON (r.actor_type = 'admin' AND r.actor_id = a.id)
ORDER BY r.created_at DESC
";

$result = $conn->query($sql);

$requests = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
}

echo json_encode(["success" => true, "requests" => $requests]);

$conn->close();
?>
