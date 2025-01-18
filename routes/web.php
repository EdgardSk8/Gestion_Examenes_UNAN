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



Route::get('/', function () { return view('vistas-principales/login'); });
Route::get('/calendar', function () { return view('vistas-principales/calendar'); }); //Vista Principal
Route::get('/VistaAgregarDatos', function () { return view('vistas-principales/VistaAgregarDatos'); })->name('VistaAgregarDatos');

Route::get('/events', [EventoController::class, 'MostrarEquiposEnCalendario']); //Muestra los equipos en el FullCalendar
Route::get('/departamento_evento/{id}', [EventoController::class, 'EventosPorDepartamentos']); //Muestra los equipos por departamento
Route::get('/events/{id}', [EventoController::class, 'MostrarDetallesPorId']); //Muestra los detalles de cada Evento
Route::put('/events/{id}', [EventoController::class, 'ActualizarEventoEnCalendario']); //Actualiza los cambios del evento hacia la BD

Route::get('/equipo/editar/{id}', [EquipoController::class, 'EditarEquipo'])->name('equipo.editar');
Route::post('/equipo/actualizar/{id}', [EquipoController::class, 'ActualizarEquipo'])->name('equipo.actualizar');

/*          ----- Rutas que retornan datos -----          */

Route::get('/area-conocimiento', [AreaConocimientoController::class, 'ObtenerAreaConocimiento'])->name('area-conocimiento.mostrar');
Route::get('/departamentos', [DepartamentoController::class, 'ObtenerDepartamentoPorArea']);
Route::get('/departamentosajax', [DepartamentoController::class, 'ObtenerDepartamentoPorAreaAJAX']);
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
Route::post('/equipo/crear', [EquipoController::class, 'CrearNuevoEquipo'])->name('crearEquipo');

/*          ----- Rutas que eliminan datos -----          */

Route::delete('/equipos/{id}', [EquipoController::class, 'EliminarEquipo']);

/*          ----- EndPoints de la vista Administrador con AJAX -----          */

Route::post('/area-conocimiento/agregar/ajax', [AreaConocimientoController::class, 'AgregarAreaConocimientoAJAX'])->name('area-conocimiento.agregar.ajax');
Route::delete('/area-conocimiento/eliminar/{id}', [AreaConocimientoController::class, 'EliminarAreaConocimientoAJAX'])->name('area-conocimiento.eliminar');
Route::get('/area-conocimiento/editar/{ID_Area}', [AreaConocimientoController::class, 'mostrarAreaParaEditarAJAX']);
Route::put('/area-conocimiento/actualizar/{ID_Area}', [AreaConocimientoController::class, 'actualizarAreaConocimientoAJAX']);

Route::get('/departamento/ajax', [DepartamentoController::class, 'ObtenerTodosDepartamentosAJAX'])->name('departamentos.ajax');
Route::post('/departamento/agregar/ajax', [DepartamentoController::class, 'AgregarDepartamentoAJAX'])->name('departamentos.agregar.ajax');
Route::get('/departamento/editar/ajax/{id}', [DepartamentoController::class, 'EditarDepartamentoAJAX'])->name('departamentos.editar.ajax');
Route::put('/departamento/actualizar/ajax/{id}', [DepartamentoController::class, 'ActualizarDepartamentoAJAX'])->name('departamentos.actualizar.ajax');
Route::delete('/departamento/eliminar/ajax/{id}', [DepartamentoController::class, 'EliminarDepartamentoAJAX'])->name('departamentos.eliminar.ajax');

Route::get('/carrera/ajax', [CarreraController::class, 'ObtenerTodasCarrerasAJAX'])->name('carrera.ajax');
Route::post('/carrera/agregar/ajax', [CarreraController::class, 'AgregarCarreraAJAX'])->name('carrera.agregar.ajax');
Route::get('/carrera/editar/ajax/{id}', [CarreraController::class, 'EditarCarreraAJAX'])->name('carrera.editar.ajax');
Route::put('/carrera/actualizar/ajax/{id}', [CarreraController::class, 'ActualizarCarreraAJAX'])->name('carrera.actualizar.ajax');
Route::delete('/carrera/eliminar/ajax/{id}', [CarreraController::class, 'EliminarCarreraAJAX'])->name('carrera.eliminar.ajax');

Route::get('/estudiante/ajax', [EstudianteController::class, 'ObtenerTodosEstudiantesAJAX'])->name('estudiantes.ajax');
Route::post('/estudiante/agregar/ajax', [EstudianteController::class, 'AgregarEstudianteAJAX'])->name('estudiante.agregar.ajax');
Route::delete('/estudiante/eliminar/ajax/{id}', [EstudianteController::class, 'EliminarEstudianteAJAX'])->name('estudiante.eliminar.ajax');
Route::get('/estudiante/editar/ajax/{id}', [EstudianteController::class, 'EditarEstudianteAJAX'])->name('estudiante.editar.ajax');
Route::put('/estudiante/actualizar/ajax/{id}', [EstudianteController::class, 'ActualizarEstudianteAJAX'])->name('estudiante.actualizar.ajax');

Route::get('/profesor/ajax', [ProfesorController::class, 'ObtenerTodosLosProfesoresAJAX'])->name('profesor.ajax');
Route::post('/profesor/agregar/ajax', [ProfesorController::class, 'AgregarProfesorAJAX'])->name('profesor.agregar.ajax');
Route::delete('/profesor/eliminar/ajax/{id}', [ProfesorController::class, 'EliminarProfesorAJAX'])->name('profesor.eliminar.ajax');
Route::get('/profesor/editar/ajax/{id}', [ProfesorController::class, 'EditarProfesorAJAX'])->name('profesor.editar.ajax');
Route::put('/profesor/actualizar/ajax/{id}', [ProfesorController::class, 'ActualizarProfesorAJAX'])->name('profesor.actualizar.ajax');

Route::get('/aulas/ajax', [AulaController::class, 'ObtenerTodasAulasAJAX'])->name('aulas.ajax');
Route::post('/aulas/agregar/ajax', [AulaController::class, 'AgregarAulaAJAX'])->name('aulas.agregar.ajax');
Route::get('/aulas/editar/ajax/{id}', [AulaController::class, 'EditarAulaAJAX'])->name('aulas.editar.ajax');
Route::put('/aulas/actualizar/ajax/{id}', [AulaController::class, 'ActualizarAulaAJAX'])->name('aulas.actualizar.ajax');
Route::delete('/aulas/eliminar/ajax/{id}', [AulaController::class, 'EliminarAulaAJAX'])->name('aulas.eliminar.ajax');

Route::get('/edificios/aula/ajax', [EdificioController::class, 'ObtenerTodosEdificiosAJAXaula'])->name('edificio.obtener.aula.ajax');
Route::get('/edificios/ajax', [EdificioController::class, 'ObtenerTodosEdificiosAJAX'])->name('edificio.obtener.ajax');
Route::get('/edificio/obtener-por-area/ajax', [EdificioController::class, 'ObtenerEdificioPorAreaAJAX'])->name('edificio.obtener.area.ajax');
Route::post('/edificio/agregar/ajax', [EdificioController::class, 'AgregarEdificioAJAX'])->name('edificio.agregar.ajax');
Route::get('/edificio/editar/ajax/{id}', [EdificioController::class, 'EditarEdificioAJAX'])->name('edificio.editar.ajax');
Route::put('/edificio/actualizar/ajax/{id}', [EdificioController::class, 'ActualizarEdificioAJAX'])->name('edificio.actualizar.ajax');
Route::delete('/edificio/eliminar/ajax/{id}', [EdificioController::class, 'EliminarEdificioAJAX'])->name('edificio.eliminar.ajax');

Route::post('/localidad/agregar/ajax', [LocalidadController::class, 'AgregarLocalidadAJAX'])->name('localidad.agregar.ajax');
Route::get('/localidad/ajax', [LocalidadController::class, 'obtenerLocalidadAJAX'])->name('localidad.obtener.ajax');
Route::delete('/localidad/eliminar/{id}', [LocalidadController::class, 'EliminarLocalidadAJAX'])->name('localidad.eliminar.ajax');
Route::put('/localidad/actualizar/{id}', [LocalidadController::class, 'ActualizarLocalidadAJAX'])->name('localidad.actualizar.ajax');

Route::get('tipoexamen/obtener/ajax', [TipoExamenController::class, 'ObtenerTipoExamenAJAX'])->name('tipoexamen.obtener.ajax');
Route::post('/tipoexamen/agregar/ajax', [TipoExamenController::class, 'AgregarTipoExamenAJAX'])->name('tipoexamen.agregar.ajax');
Route::get('/tipoexamen/editar/ajax/{id}', [TipoExamenController::class, 'EditarTipoExamenAJAX'])->name('tipoexamen.editar.ajax');
Route::delete('/tipoexamen/eliminar/{id}', [TipoExamenController::class, 'EliminarTipoExamenAJAX'])->name('tipoexamen.eliminar.ajax');
Route::put('/tipoexamen/actualizar/{id}', [TipoExamenController::class, 'ActualizarTipoExamenAJAX'])->name('tipoexamen.actualizar.ajax');

Route::post('/rol/agregar/ajax', [RolController::class, 'AgregarRolAJAX'])->name('rol.agregar.ajax');
Route::get('/rol/obtener/ajax', [RolController::class, 'ObtenerRolAJAX'])->name('rol.obtener.ajax'); // Obtener todos los roles
Route::get('/rol/editar/ajax/{id}', [RolController::class, 'EditarRolAJAX'])->name('rol.editar.ajax'); // Editar un rol por su ID
Route::put('/rol/actualizar/ajax/{id}', [RolController::class, 'ActualizarRolAJAX'])->name('rol.actualizar.ajax'); // Actualizar un rol por su ID
Route::delete('/rol/eliminar/ajax/{id}', [RolController::class, 'EliminarRolAJAX'])->name('rol.eliminar.ajax'); // Eliminar un rol por su ID

Route::post('/perfil/agregar/ajax', [PerfilController::class, 'AgregarPerfilAJAX'])->name('perfil.agregar.ajax');
Route::get('/perfil/obtener/ajax', [PerfilController::class, 'ObtenerPerfilAJAX'])->name('perfil.obtener.ajax');
Route::get('/perfil/editar/ajax/{id}', [PerfilController::class, 'EditarPerfilAJAX'])->name('perfil.editar.ajax');
Route::put('/perfil/actualizar/ajax/{id}', [PerfilController::class, 'ActualizarPerfilAJAX'])->name('perfil.actualizar.ajax');
Route::delete('/perfil/eliminar/ajax/{id}', [PerfilController::class, 'EliminarPerfilAJAX'])->name('perfil.eliminar.ajax');

Route::get('/validar-carnet', [EstudianteController::class, 'validarCarnet']);
Route::get('/validar-correo', [EstudianteController::class, 'validarCorreo']);
