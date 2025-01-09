<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel Notes</title>
    <script>
        function toggleButtons(noteId) {
            // Hide the "Create" button
            document.getElementById('createButton' + noteId).style.display = 'none';
            
            // Show the "Update" and "Delete" buttons
            document.getElementById('updateDeleteButtons' + noteId).style.display = 'block';
        }
    </script>
</head>
<body>
    <!-- Success message -->
    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    <h1>Notes</h1>
    @if($notes->isEmpty())
    <form action="{{ route('notes.store') }}" method="POST">
        @csrf
        <input type="text" name="title" placeholder="Note Title">
        <textarea name="content" placeholder="Note Content"></textarea>
        <button type="submit">Create Note</button>
    </form>
        
    @else
    <ul>
        @foreach($notes as $note)
            <li>
                <strong>Title:</strong> {{ $note->title }}<br>
                <strong>Content:</strong> {{ $note->content }}<br>
                
                <!-- Buttons for updating or deleting notes -->
                @if($note)
                    <!-- Show Update and Delete buttons if the note exists -->
                    <div id="updateDeleteButtons{{ $note->id }}">
                        <button onclick="updateNote({{ $note->id }})">Update</button>
                        <button onclick="deleteNote({{ $note->id }})">Delete</button>
                    </div>
                @else
                    <!-- Show Create button if the note does not exist -->
                    <form action="{{ route('notes.create') }}" method="post" id="createForm{{ $note->id }}">
                        @csrf
                        <button type="button" id="createButton{{ $note->id }}" onclick="toggleButtons({{ $note->id }})">Create Note</button>
                    </form>
                @endif
            </li>
        @endforeach
    </ul>
@endif

<script>
   function createNote() {
    const noteData = {
        title: 'New Note', // Replace with user input if needed
        content: 'Note content here' // Replace with user input if needed
    };

    fetch('/notes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify(noteData),
    })
    .then(response => response.json())
    .then(data => {
        // On success, dynamically add the new note
        location.reload();
        const note = data;
        const notesList = document.querySelector('ul');
        const newNote = document.createElement('li');
        newNote.innerHTML = `
            <strong>Title:</strong> ${note.title}<br>
            <strong>Content:</strong> ${note.content}<br>
            <div id="updateDeleteButtons${note.id}">
                <button onclick="updateNote(${note.id})">Update</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        notesList.appendChild(newNote);

        // Optionally, redirect to the newly created note's editor page
        window.location.href = `/editor/{id}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to create note');
    });
}
    function updateNote(noteId) {
        window.location.href = `/notes/${noteId}/edit`;
    }

    function deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            fetch(`/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                }
            })
            .then(response => response.json())
            // .then(data => {
            //     if (data.message === 'Note deleted successfully') {
            //         location.reload();
            //         alert('Note deleted successfully');
            //         // Optionally, remove the note from the DOM
            //         document.getElementById(`updateDeleteButtons${noteId}`).parentElement.remove();
            //     } else {
            //         alert('Failed to delete the note: ' + data.message);
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('An error occurred while deleting the note.');
            // });
        }
    }
</script>

    
</body>
</html>
