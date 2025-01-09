<?php
namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function showNotes(Request $request)
    {
        // Validate the incoming request to ensure 'user_id' is required
        $validated = $request->validate([
            'user_id' => 'required|integer',  // Ensure user_id is required and is an integer
        ]);
        // $notes = Note::all();
        // // Fetch notes based on the validated user_id
        $notes = Note::where('user_id', $validated['user_id'])->get();
    
        // Return the filtered notes to the view
        
        return response()->json($notes);
    }




    // public function showNotes()
    // {
    //     // Fetch all notes
    //     $notes = Note::all();

    //     // Return the notes as a JSON response
    //     return response()->json($notes, 200);
    // }







    public function show($id)
    {
        $note = Note::findOrFail($id);
        return response()->json($note);
    }




    public function edit($id)
{
    $note = Note::findOrFail($id); // Find the note by ID or fail

    return view('editor', [
        'title' => $note->title,
        'content' => $note->content,
        'noteId' => $note->id
    ]);
}








    public function editor($id)
    {
        $note = Note::findOrFail($id);
        $content = $note->content;
        $title = $note->title;
        return view('editor',['title'=>$title,'content'=>$content,'noteId'=>$id]);
    }








    public function store(Request $request)
    {
            // Validate the incoming request data
            $validated = $request->validate([
               'title' => 'nullable|string',
                'content' => 'nullable|string',
                'user_id' => 'required|integer',      
                'language_id' => 'required|integer', 
            ]);

            // Create a new note in the database
            $note = Note::create([
                'title' => $validated['title'],
                'content' => $validated['content'],
                'user_id' => $validated['user_id'],     
                'language_id' => $validated['language_id'],
            ]);
            return redirect()->route('notes.edit', ['id' => $note->id])->with('success', 'Note created successfully. You can now edit it.');

        
    }








    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string',
            'content' => 'sometimes|string',
        ]);

        $note = Note::findOrFail($id);
        $note->update($validated);

        return response()->json(['message' => 'Note updated successfully', 'data' => $note]);
    }










    public function destroy($id): JsonResponse
{
    $note = Note::find($id);

    if (!$note) {
        return response()->json(['message' => 'Note not found'], 404);
    }

    $note->delete();

    return response()->json(['message' => 'Note deleted successfully'], 200);
}
}
