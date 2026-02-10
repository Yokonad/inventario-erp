<?php

use Illuminate\Support\Facades\Route;

$moduleName = basename(dirname(__DIR__));
$ctrl = "Modulos_ERP\\{$moduleName}\\Controllers\\InventarioController";

// Inventory Data
Route::get('/list', "{$ctrl}@list");
Route::get('/stats', "{$ctrl}@stats");
Route::get('/{id}', "{$ctrl}@show")->where('id', '[0-9]+');

// Actions (Mock)
Route::post('/create', "{$ctrl}@store");
Route::put('/{id}', "{$ctrl}@update")->where('id', '[0-9]+');
Route::delete('/{id}', "{$ctrl}@destroy")->where('id', '[0-9]+');

// Integration with ComprasKrsft (Purchased items)
Route::post('/add-from-purchase', "{$ctrl}@addPurchasedItems");
Route::get('/reserved-items', "{$ctrl}@getReservedItems");
Route::post('/assign-location', "{$ctrl}@assignLocation");

// Verification
Route::post('/verify/{id}', "{$ctrl}@verify")->where('id', '[0-9]+');
