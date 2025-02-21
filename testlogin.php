<?php
// Start session to manage login state
session_start();

// Database connection (update with your details)
$servername = "fdb1030.awardspace.net";
$username = "4540997_symoh";
$password = "symo7699";
$dbname = "4540997_symoh";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $truck_serial_number = $_POST['truck_serial_number'];

    // SQL query to check if the user exists
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password' AND truck_serial_number='$truck_serial_number'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User found, login successful
        $_SESSION['user_id'] = $email; // Store user session
        header('Location: RAV-T.html'); // Redirect to the truck page
    } else {
        echo "Invalid login credentials.";
    }
}

$conn->close();
?>
