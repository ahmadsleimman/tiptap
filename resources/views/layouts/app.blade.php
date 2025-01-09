<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel with Vite</title>
    @vite(['resources/js/app.js'])  <!-- Use Vite helper -->
</head>
<body>
    <div id="root"></div> <!-- React root element -->

    @vite(['resources/js/app.js'])  <!-- Ensure this is added correctly for development/production -->
</body>
</html>
