<?php
// api/config.php
// Database + CORS + Session bootstrap

// ===== CORS =====
// Adjust the allowed origin to your React dev server or deployed domain
$allowed_origin = "http://localhost:3000";
header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// ===== Session =====
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', 'false'); // set true if using HTTPS
session_start();

// ===== DB =====
$host = "127.0.0.1";
$user = "root";
$pass = ""; // set your password for MySQL
$dbname = "donation_db";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Database connection failed: ".$conn->connect_error]);
  exit();
}

// ===== Helpers =====
function json_input() {
  $body = file_get_contents("php://input");
  $data = json_decode($body, true);
  return is_array($data) ? $data : [];
}

function require_login() {
  if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Not authenticated"]);
    exit();
  }
}

function current_user($conn) {
  if (!isset($_SESSION['user_id'])) return null;
  $uid = intval($_SESSION['user_id']);
  $stmt = $conn->prepare("SELECT id,name,email,role,created_at FROM users WHERE id=?");
  $stmt->bind_param("i", $uid);
  $stmt->execute();
  $res = $stmt->get_result();
  return $res->fetch_assoc();
}

header("Content-Type: application/json; charset=utf-8");
?>
