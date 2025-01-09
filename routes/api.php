<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



//Delete
Route::delete('notes/{id}', [NoteController::class, 'destroy'])->name('notes.destroy');
//Create
Route::post('notes/create', [NoteController::class, 'store'])->name('notes.store');

