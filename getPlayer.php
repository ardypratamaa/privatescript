<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$data = json_decode(file_get_contents("php://input"));

if (isset($data->auth)) {
    $auth = $data->auth;

    $host = "localhost";
    $user = "root";
    $pass = ""; 
    $db = "indohax";

    $mysqli = new mysqli($host, $user, $pass, $db);

    if ($mysqli->connect_error) {
        die("Koneksi database gagal: " . $mysqli->connect_error);
    }

    $query = "SELECT * FROM users WHERE auth = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $auth);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'data' => [
                'auth' => $row['auth'],
                'stars' => $row['stars']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Player not found'
        ]);
    }

    $stmt->close();
    $mysqli->close();
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Missing auth parameter'
    ]);
}
?>
