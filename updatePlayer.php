<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->auth) && isset($data->stars)) {
    $auth = $data->auth;
    $stars = $data->stars;

    $host = "localhost";
    $user = "root";
    $pass = ""; 
    $db = "indohax";

    $mysqli = new mysqli($host, $user, $pass, $db);

    if ($mysqli->connect_error) {
        die("Koneksi database gagal: " . $mysqli->connect_error);
    }

    // Check if auth exists
    $check_query = "SELECT COUNT(*) AS count FROM users WHERE auth = ?";
    $check_stmt = $mysqli->prepare($check_query);
    $check_stmt->bind_param("s", $auth);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    $row = $check_result->fetch_assoc();
    $count = $row['count'];

    if ($count > 0) {
        // Update existing record
        $query = "UPDATE users SET stars = ? WHERE auth = ?";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("is", $stars, $auth);
        $stmt->execute();
    } else {
        // Insert new record
        $query = "INSERT INTO users (auth, stars) VALUES (?, ?)";
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("si", $auth, $stars);
        $stmt->execute();
    }

    if ($stmt->affected_rows > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Player stars updated successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to update player stars'
        ]);
    }

    $stmt->close();
    $mysqli->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Missing auth or stars parameter'
    ]);
}
?>
