<?php
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

    // SQL query to check if the email already exists
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Email already registered. Please login.";
    } else {
        // Insert new user into database
        $sql = "INSERT INTO users (email, password, truck_serial_number) VALUES ('$email', '$password', '$truck_serial_number')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Signup successful! Please login.";
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

$conn->close();
?>
