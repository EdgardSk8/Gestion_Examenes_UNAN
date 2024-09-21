<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;

/*          ----- Controladores -----             */
use App\Http\Controllers\AreaConocimientoController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\EdificioController;
use App\Http\Controllers\AulaController;

/*          ----- Controladores -----             */

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('calendar'); });

Route::get('/events', action: [EventoController::class, 'MostrarEquiposEnCalendario']); //Muestra los equipos en el FullCalendar
Route::get('/events/{id}', [EventoController::class, 'MostrarDetallesPorId']); //Muestra los detalles de cada Evento
Route::put('/events/{id}', [EventoController::class, 'ActualizarEventoEnCalendario']); //Actualiza los cambios del evento hacia la BD




/*          ----- Rutas -----          */

Route::get('/area-conocimiento', [AreaConocimientoController::class, 'ObtenerAreaConocimiento']);
Route::get('/departamentos', [DepartamentoController::class, 'ObtenerDepartamentoPorArea']);
Route::get('/carreras', [CarreraController::class, 'ObtenerCarreraPorDepartamento']);
Route::get('/equipos', [EquipoController::class, 'ObtenerTodosLosEquipos']);
Route::get('/profesor', [ProfesorController::class, 'ObtenerProfesor']);
Route::get('/profesorPorDepartamento', [ProfesorController::class, 'ObtenerProfesorPorDepartamento']);
Route::get('/estudiante', [EstudianteController::class, 'ObtenerEstudiantePorCarrera']);
Route::get('/edificio', [EdificioController::class, 'ObtenerEdificioPorArea']);
Route::get('/aula', [AulaController::class, 'ObtenerAulaPorEdificio']);



Route::post('/equipos', [EquipoController::class, 'CrearNuevoEquipo']);


