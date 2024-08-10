<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Your authentication logic goes here
    // For simplicity, let's assume a hardcoded username and password
    $valid_username = 'user';
    $valid_password = 'User@432#';

    // Check if username and password match
    if ($username === $valid_username && $password === $valid_password) {
        // Authentication successful
        // You can redirect the user to a dashboard or any other page
        header("Location: xkpmqojfhzgrtveliwynabsdcuxhjmkloqprzvevymwbtkutcsixandopzqbfthlvicenwmpqjkbraohgdysxetupiwzflvqcnkxygruhblfiedvqtmawzpsncojdhxkbuyragpdfxhjlmcqntiszkvoaewlpbu.html");
        exit;
    } else {
        // Authentication failed
        echo "Invalid username or password. Please try again.";

    }
}
?>
<style>
    .site-btn {
        cursor: pointer;
    }
</style>
<link rel="stylesheet" href="css/style.css" type="text/css">
<br><br><a href="login.html"><button class="site-btn">Go to Login</button></a>
<!--<button type="submit" class="site-btn" id="submitButton" >Login</button>-->