<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\VariantAttributeController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

// Route::apiResource('product_variants', ProductVariantController::class);
// Route::apiResource('variant_attributes', VariantAttributeController::class);
// Route::apiResource('attributes', AttributeController::class);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Category routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/hidden', [ProductController::class, 'hidden']);
Route::get('/products/detail/{id}', [ProductController::class, 'show']);
Route::post('/products/add', [ProductController::class, 'store']);
Route::put('/products/update/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::put('/products/restore/{id}', [ProductController::class, 'restore']);



// ProductVariant routes
Route::get('/variants', [ProductVariantController::class, 'index']);
Route::get('/variants/{id}', [ProductVariantController::class, 'show']);
Route::post('/variants', [ProductVariantController::class, 'store']);
Route::put('/variants/{id}', [ProductVariantController::class, 'update']);
Route::delete('/variants/{id}', [ProductVariantController::class, 'destroy']);


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users/register', [UserController::class, 'register']);
Route::post('/users/login', [UserController::class, 'login']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

