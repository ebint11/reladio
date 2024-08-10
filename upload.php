<?php

date_default_timezone_set('Asia/Kolkata'); // Set timezone to Indian Standard Time

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $dateTime = date("Y-m-d h:i:s A"); // Get the current date and time in 12-hour format with AM/PM

    // Construct the data string with name, email, message, and date/time
    $data = "Date/Time: $dateTime\nName: $name\nEmail: $email\nMessage: $message\n\n";

    $folderPath = 'feedback/';
    $filePath = $folderPath . 'form_data.txt';

    if (!file_exists($folderPath)) {
        mkdir($folderPath, 0777, true); // Create the folder if it doesn't exist
    }

    // Append form data to the text file
    if (file_put_contents($filePath, $data, FILE_APPEND | LOCK_EX) !== false) {
        // Redirect to the same HTML page
        header("Location: contact.html");
        exit();
    } else {
        echo "Error uploading form data.";
    }
}

?>
