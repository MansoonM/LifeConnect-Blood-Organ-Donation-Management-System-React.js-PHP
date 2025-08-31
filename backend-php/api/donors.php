<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../db.php");

// Fetch donors with name + email from users/admins
$sql = "
SELECT d.id, d.blood_group, d.organ, d.availability, d.created_at,
       CASE 
         WHEN d.actor_type = 'user' THEN u.name
         WHEN d.actor_type = 'admin' THEN a.name
       END AS donor_name,
       CASE 
         WHEN d.actor_type = 'user' THEN u.email
         WHEN d.actor_type = 'admin' THEN a.email
       END AS donor_email
FROM donors d
LEFT JOIN users u ON (d.actor_type = 'user' AND d.actor_id = u.id)
LEFT JOIN admins a ON (d.actor_type = 'admin' AND d.actor_id = a.id)
ORDER BY d.created_at DESC
";

$result = $conn->query($sql);

$donors = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $donors[] = $row;
    }
}

echo json_encode(["success" => true, "donors" => $donors]);

$conn->close();
?>
