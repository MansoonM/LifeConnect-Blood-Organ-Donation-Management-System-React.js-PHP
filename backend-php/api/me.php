<?php
// api/me.php
require_once __DIR__ . '/config.php';
$user = current_user($conn);
if (!$user) {
  http_response_code(401);
  echo json_encode(["error" => "Not authenticated"]);
  exit();
}
echo json_encode(["user" => $user]);
?>
