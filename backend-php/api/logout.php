<?php
// api/logout.php
require_once __DIR__ . '/config.php';
session_destroy();
echo json_encode(["message" => "Logged out"]);
?>
