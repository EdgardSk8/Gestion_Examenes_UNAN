<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;

class EquipoController extends Controller
{

    public function ObtenerTodosLosEquipos() // Método para obtener todos los equipos
    {
        $equipos = Equipo::all();  // Obtiene todos los registros de la tabla 'equipos'
        return response()->json($equipos); // Retorna la colección de equipos en formato JSON
    }
    
}
