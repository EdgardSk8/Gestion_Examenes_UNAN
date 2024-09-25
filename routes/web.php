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
use App\Http\Controllers\TipoExamenController;

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
Route::post('/area-conocimiento/agregar', [AreaConocimientoController::class, 'AgregarAreaConocimiento'])->name('area-conocimiento.agregar');

Route::get('/departamentos', [DepartamentoController::class, 'ObtenerDepartamentoPorArea']);
Route::get('/carreras', [CarreraController::class, 'ObtenerCarreraPorDepartamento']);
Route::get('/equipos', [EquipoController::class, 'ObtenerTodosLosEquipos']);
Route::get('/profesor', [ProfesorController::class, 'ObtenerProfesor']);
Route::get('/profesorPorDepartamento', [ProfesorController::class, 'ObtenerProfesorPorDepartamento']);
Route::get('/estudiante', [EstudianteController::class, 'ObtenerEstudiantePorCarrera']);
Route::get('/edificio', [EdificioController::class, 'ObtenerEdificioPorArea']);
Route::get('/aula', [AulaController::class, 'ObtenerAulaPorEdificio']);
Route::get('/tipoexamen', [TipoExamenController::class, 'ObtenerTipoExamen']);



//Route::post('/equipos', [EquipoController::class, 'CrearNuevoEquipo']);
Route::post('/equipo/crear', [EquipoController::class, 'CrearNuevoEquipo'])->name('crearEquipo');
//Route::post('/crear-equipo', [EquipoController::class, 'CrearNuevoEquipo']);


// Rutas para cargar vistas dinámicamente de agregar equipos
Route::get('/vista-area-conocimiento', function() {
    return view('vistas-equipoagregar.agregardatos.radio-area-conocimiento');
});

Route::get('/vista-departamento', function() {
    return view('vistas-equipoagregar.agregardatos.radio-departamento');
});

Route::get('/vista-carrera', function() {
    return view('vistas-equipoagregar.agregardatos.radio-carrera');
});

Route::get('/vista-estudiante', function() {
    return view('vistas-equipoagregar.agregardatos.radio-estudiante');
});

Route::get('/vista-profesor', function() {
    return view('vistas-equipoagregar.agregardatos.radio-profesor');
});

Route::get('/vista-localidades', function() {
    return view('vistas-equipoagregar.agregardatos.radio-localidades');
});

Route::get('/vista-edificio', function() {
    return view('vistas-equipoagregar.agregardatos.radio-edificio');
});

Route::get('/vista-aula', function() {
    return view('vistas-equipoagregar.agregardatos.radio-aula');
});

Route::get('/vista-tipo-examen', function() {
    return view('vistas-equipoagregar.agregardatos.radio-tipo-examen');
});

Route::get('/vista-rol', function() {
    return view('vistas-equipoagregar.agregardatos.radio-rol');
});

Route::get('/vista-perfil', function() {
    return view('vistas-equipoagregar.agregardatos.radio-perfil');
});



