<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
Route::get('/', function () {
    return view('welcome');
});


// Route::get('/editor/{id}', [NoteController::class, 'editor'])->name('editor');

//Display
Route::get('/notes', [NoteController::class, 'showNotes'])->name('notes.show');
//Autosave
Route::get('/notes/{id}', [NoteController::class, 'show'])->name('notes.show');
//Update
Route::put('/notes/{id}', [NoteController::class, 'update'])->name('notes.update');
//Delete
Route::delete('/notes/{id}', [NoteController::class, 'destroy'])->name('notes.destroy');
//Create
Route::post('/notes/create', [NoteController::class, 'store'])->name('notes.store');
//Edit
Route::get('/notes/{id}/edit', [NoteController::class, 'edit'])->name('notes.edit');