<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\LogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/cars', [CarController::class, 'store']);
Route::get('/cars', [CarController::class, 'index']);
Route::delete('/cars/{id}', [CarController::class, 'destroy']);
Route::put('/cars/{id}', [CarController::class, 'update'])->name('cars.update');
Route::get('/displayCars', [CarController::class, 'displayCars']);
Route::get('/logs', [LogController::class, 'index']);
