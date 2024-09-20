<?php

namespace App\Http\Controllers;
use App\Models\AreaConocimiento;

use Illuminate\Http\Request;

class AreaConocimientoController extends Controller
{

    // Mostrar todos los datos de la tabla Area_Conocimiento
    public function ObtenerAreaConocimiento()
    {
        $areas = AreaConocimiento::all(); // Obtener todas las areas de conocimiento
        return response()->json($areas);// Retorna los datos en formato JSON
    }
}
