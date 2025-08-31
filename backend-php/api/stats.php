<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include("../db.php");

$stats = [
    "total_donors" => 0,
    "total_organs" => 0,
    "total_requests" => 0
];

// Total donors
$res1 = $conn->query("SELECT COUNT(*) as cnt FROM donors");
if ($res1 && $row = $res1->fetch_assoc()) {
    $stats["total_donors"] = $row["cnt"];
}

// Total organs (count only where organ is not null)
$res2 = $conn->query("SELECT COUNT(*) as cnt FROM donors WHERE organ IS NOT NULL AND organ <> ''");
if ($res2 && $row = $res2->fetch_assoc()) {
    $stats["total_organs"] = $row["cnt"];
}

// Total pending requests
$res3 = $conn->query("SELECT COUNT(*) as cnt FROM requests WHERE status='pending'");
if ($res3 && $row = $res3->fetch_assoc()) {
    $stats["total_requests"] = $row["cnt"];
}

echo json_encode(["success" => true, "stats" => $stats]);
$conn->close();
?>
