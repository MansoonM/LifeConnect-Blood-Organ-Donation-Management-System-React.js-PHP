<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate input
if (!isset($data["email"], $data["password"], $data["role"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$email = trim($data["email"]);
$password = $data["password"];
$role = strtolower(trim($data["role"]));

// ✅ Decide table
$table = ($role === "admin") ? "admins" : "users";

// ✅ Check if account exists
$stmt = $conn->prepare("SELECT id, name, email, password FROM $table WHERE email=? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // ✅ Verify password
    if (password_verify($password, $row["password"])) {
        unset($row["password"]); // don’t expose hash
        $row["role"] = $role;    // explicitly attach role

        echo json_encode(["success" => true, "user" => $row]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => ucfirst($role) . " not found"]);
}

$stmt->close();
$conn->close();
?>
