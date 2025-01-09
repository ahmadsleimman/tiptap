<!-- resources/views/notes/edit.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Note</title>
    @vite('resources/js/app.js')
</head>
<body>
    <div>
        <h1>Edit Note</h1>
        <form action="/note/{{ $note->id }}" method="POST">
            @csrf
            @method('PUT')
            <input type="text" name="title" value="{{ $note->title }}" placeholder="Enter title">
            <textarea name="content" placeholder="Enter content">{{ $note->content }}</textarea>
            <button type="submit">Save</button>
        </form>
        <form action="/note/{{ $note->id }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
        <a href="/">Back to Notes</a>
    </div>
</body>
</html>
