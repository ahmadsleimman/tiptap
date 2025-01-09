<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes</title>
    @vite('resources/js/app.jsx') <!-- Use Vite for loading JS -->
</head>
<body>
    <div id="app">
        <!-- Container for buttons that create a new note -->
        <div id="create-buttons">
            <!-- Each button now has a unique ID for tracking which one was clicked -->
            <button onclick="createNote(1)">Create Note 1</button>
            <button onclick="createNote(2)">Create Note 2</button>
            <button onclick="createNote(3)">Create Note 3</button>
        </div>

        <!-- Container for displaying note details -->
        <div id="note-detail" style="display: none;">
            <!-- Display title of the note -->
            <h1 id="note-title"></h1>
            <!-- Update and Delete buttons for the specific note -->
            <button onclick="updateNote()">Update</button>
            <button onclick="deleteNote()">Delete</button>
        </div>
    </div>

    <script>
        // Function to handle the note creation process
        function createNote(noteId) {
            // Hide the 'Create' button that was clicked
            document.querySelectorAll('#create-buttons button').forEach(button => {
                button.style.display = 'block'; // Ensure all buttons are visible initially
            });
            document.querySelector(`#create-buttons button:nth-child(${noteId})`).style.display = 'none';

            // After the note creation, display the note details
            document.getElementById('note-detail').style.display = 'block';

            // Set a dummy title for the note (based on noteId)
            const noteTitle = 'New Note ' + noteId;
            document.getElementById('note-title').innerText = noteTitle;

            // Optionally, send the note to your backend using AJAX or fetch API
            fetch('/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: noteTitle,
                    content: 'This is content for Note ' + noteId, // Example content
                })
            })
            .then(response => response.json())
            .then(data => {
                // You can update the title or handle response data as needed
                console.log('Note created:', data);
            });
        }

        // Function to handle updating the note
        function updateNote() {
            alert('Update note');
        }

        // Function to handle deleting the note
        function deleteNote() {
            alert('Delete note');
        }
    </script>
</body>
</html>
