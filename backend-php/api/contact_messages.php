<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include("../db.php");

$sql = "SELECT * FROM messages ORDER BY created_at DESC";
$result = $conn->query($sql);

$messages = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

echo json_encode(["success" => true, "messages" => $messages]);
$conn->close();
?>
