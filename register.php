<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config.php'; // Include the database configuration

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect the form data
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password
    $truck_serial_number = $_POST['truck_serial_number'];

    // Prepare a SQL statement to check if the email already exists
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);

    // Check if the email already exists
    if ($stmt->rowCount() > 0) {
        echo "Email already exists.";
        exit;
    }

    // Insert the new user into the database
    $sql = "INSERT INTO users (email, password, truck_serial_number) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email, $password, $truck_serial_number]);

    echo "User registered successfully!";
}
?>

<form method="post" action="register.php">
    <label for="email">Email:</label>
    <input type="email" name="email" required><br>
    
    <label for="password">Password:</label>
    <input type="password" name="password" required><br>
    
    <label for="truck_serial_number">Truck Serial Number:</label>
    <input type="text" name="truck_serial_number" required><br>
    
    <input type="submit" value="Register">
</form>
