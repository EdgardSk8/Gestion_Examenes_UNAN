<?php

namespace App\Http\Controllers;
use App\Models\Estudiante;

use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    public function ObtenerEstudiantePorCarrera(Request $request)
    {
        $carreraId = $request->input('carreraId'); // Obtiene el ID de la carrera

    if ($carreraId) {
        // Obtiene los estudiantes asociados a la carrera seleccionada
        $estudiantes = Estudiante::where('ID_Carrera', $carreraId)->get();
        return response()->json($estudiantes); // Retorna los estudiantes en formato JSON
    }
    
    return response()->json([]); // Si no se proporciona un ID de carrera, retorna un array vacío en JSON
    }
}
