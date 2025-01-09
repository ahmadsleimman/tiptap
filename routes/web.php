<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
Route::get('/', function () {
    return view('welcome');
});


// Route::get('/editor/{id}', [NoteController::class, 'editor'])->name('editor');

//Display
Route::get('/notes', [NoteController::class, 'showNotes'])->name('notes.show');
// get note data
Route::get('/get-notes/{id}', [NoteController::class, 'show'])->name('notes.show');
//autosave
Route::put('notes/{id}', [NoteController::class, 'update'])->name('notes.update');
//Edit
Route::get('/notes/{id}/edit', [NoteController::class, 'edit'])->name('notes.edit');