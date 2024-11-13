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
use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\RolController;
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

Route::get('/', function () { return view('calendar'); }); //Vista Principal
Route::get('/VistaAgregarDatos', function () { return view('VistaAgregarDatos'); })->name('VistaAgregarDatos');

Route::get('/events', action: [EventoController::class, 'MostrarEquiposEnCalendario']); //Muestra los equipos en el FullCalendar
Route::get('/events/{id}', [EventoController::class, 'MostrarDetallesPorId']); //Muestra los detalles de cada Evento
Route::put('/events/{id}', [EventoController::class, 'ActualizarEventoEnCalendario']); //Actualiza los cambios del evento hacia la BD




/*          ----- Rutas que retornan datos -----          */

Route::get('/area-conocimiento', [AreaConocimientoController::class, 'ObtenerAreaConocimiento'])->name('area-conocimiento.mostrar');
Route::get('/departamentos', [DepartamentoController::class, 'ObtenerDepartamentoPorArea']);
Route::get('/carreras', [CarreraController::class, 'ObtenerCarreraPorDepartamento']);
Route::get('/equipos', [EquipoController::class, 'ObtenerTodosLosEquipos']);
Route::get('/profesor', [ProfesorController::class, 'ObtenerProfesor']);
Route::get('/profesorPorDepartamento', [ProfesorController::class, 'ObtenerProfesorPorDepartamento']);
Route::get('/estudiante', [EstudianteController::class, 'ObtenerEstudiantePorCarrera']);
Route::get('/edificio', [EdificioController::class, 'ObtenerEdificioPorArea']);
Route::get('/aula', [AulaController::class, 'ObtenerAulaPorEdificio']);
Route::get('/perfil', [PerfilController::class, 'ObtenerPerfil']);
Route::get('/tipoexamen', [TipoExamenController::class, 'ObtenerTipoExamen']);
Route::get('/localidades', [LocalidadController::class, 'obtenerLocalidad']);


/*          ----- Rutas que Suben datos -----          */

Route::post('/area-conocimiento/agregar', [AreaConocimientoController::class, 'AgregarAreaConocimiento'])->name('area-conocimiento.agregar');
Route::post('/departamento/agregar', [DepartamentoController::class, 'AgregarDepartamento'])->name('departamento.agregar');
Route::post('/carrera/agregar', [CarreraController::class, 'AgregarCarrera'])->name('carrera.agregar');
Route::post('/localidad/agregar', [LocalidadController::class, 'AgregarLocalidad'])->name('localidad.agregar');
Route::post('/edificio/agregar', [EdificioController::class, 'AgregarEdificio'])->name('edificio.agregar');
Route::post('/aula/agregar', [AulaController::class, 'AgregarAula'])->name('aula.agregar');
Route::post('/rol/agregar', [RolController::class, 'AgregarRol'])->name('rol.agregar');
Route::post('/perfil/agregar', [PerfilController::class, 'AgregarPerfil'])->name('perfil.agregar');
Route::post('/tipoexamen/agregar', [TipoExamenController::class, 'AgregarTipoExamen'])->name('tipoexamen.agregar');

Route::post('/estudiante/agregar', [EstudianteController::class, 'AgregarEstudiante'])->name('estudiante.agregar');
Route::post('/profesor/agregar', [ProfesorController::class, 'AgregarProfesor'])->name('profesor.agregar');

Route::post('/equipo/crear', [EquipoController::class, 'CrearNuevoEquipo'])->name('crearEquipo'); //Crea un nuevo equipo

/*          ----- Rutas que eliminan datos -----          */

Route::delete('/equipos/{id}', [EquipoController::class, 'EliminarEquipo']);


// Rutas para cargar vistas dinámicamente en 'agregar nuevos datos'. Logica en /cuadro-equipos/equipoagregar.blade.php
Route::get('/vista-area-conocimiento', function() {return view('vistas-equipoagregar.agregardatos.radio-area-conocimiento');});
Route::get('/vista-departamento', function() {return view('vistas-equipoagregar.agregardatos.radio-departamento');});
Route::get('/vista-carrera', function() {return view('vistas-equipoagregar.agregardatos.radio-carrera');});
Route::get('/vista-estudiante', function() {return view('vistas-equipoagregar.agregardatos.radio-estudiante');});
Route::get('/vista-profesor', function() {return view('vistas-equipoagregar.agregardatos.radio-profesor');});
Route::get('/vista-localidades', function() {return view('vistas-equipoagregar.agregardatos.radio-localidades');});
Route::get('/vista-edificio', function() {return view('vistas-equipoagregar.agregardatos.radio-edificio');});
Route::get('/vista-aula', function() {return view('vistas-equipoagregar.agregardatos.radio-aula');});
Route::get('/vista-tipo-examen', function() {return view('vistas-equipoagregar.agregardatos.radio-tipo-examen');});
Route::get('/vista-rol', function() {return view('vistas-equipoagregar.agregardatos.radio-rol');});
Route::get('/vista-perfil', function() {return view('vistas-equipoagregar.agregardatos.radio-perfil');});




Route::get('/validar-carnet', [EstudianteController::class, 'validarCarnet']);
Route::get('/validar-correo', [EstudianteController::class, 'validarCorreo']);
