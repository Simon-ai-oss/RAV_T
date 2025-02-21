<?php
session_start();
include_once 'config.php'; // Replace with your actual database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $truck_serial_number = $_POST['truck_serial_number'] ?? '';

    // Validate form inputs
    if (empty($email) || empty($password) || empty($truck_serial_number)) {
        die('All fields are required.');
    }

    // Query to check user credentials
    $sql = "SELECT id FROM users WHERE email = ? AND password = ? AND truck_serial_number = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $email, $password, $truck_serial_number);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Successful login
        $_SESSION['user_id'] = $result->fetch_assoc()['id'];
        header("Location: RAV-T.html");
        exit;
    } else {
        // Invalid credentials
        echo "Invalid login credentials.";
    }
    $stmt->close();
    $conn->close();
} else {
    // Redirect if not a POST request
    header("Location: login.html");
    exit;
}
?>
