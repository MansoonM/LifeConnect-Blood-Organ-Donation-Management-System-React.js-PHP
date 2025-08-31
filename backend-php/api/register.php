<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL);
ini_set('display_errors', 1);

include("../db.php");

$data = json_decode(file_get_contents("php://input"), true);

// ✅ Validate input
if (!isset($data["name"], $data["email"], $data["password"], $data["role"])) {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
    exit;
}

$name = trim($data["name"]);
$email = trim($data["email"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);
$role = strtolower(trim($data["role"]));

// ✅ Decide table
$table = ($role === "admin") ? "admins" : "users";

// ✅ Check duplicate
$check = $conn->prepare("SELECT id FROM $table WHERE email=?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "error" => ucfirst($role) . " already exists"]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// ✅ Insert record
$stmt = $conn->prepare("INSERT INTO $table (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => ucfirst($role) . " registered successfully"]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
