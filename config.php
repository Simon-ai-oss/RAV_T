<?php
// Database configuration
$host = 'fdb1030.awardspace.net'; // Replace with your actual hostname (e.g., 'localhost' or your online database host)
$dbname = '4540997_symoh'; // Replace with your database name
$username = '4540997_symoh'; // Replace with your database username
$password = 'symo7699'; // Replace with your database password

try {
    // PDO connection to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, display the error
    die("Could not connect to the database: " . $e->getMessage());
}
?>
