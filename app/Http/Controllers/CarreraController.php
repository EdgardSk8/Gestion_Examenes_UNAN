<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;

class CarreraController extends Controller
{

    //Obtiene la carrera por medio del ID del departamento
    public function ObtenerCarreraPorDepartamento(Request $request)
    {
        $departamentoId = $request->input('departamentoId'); // Obtiene el ID del departamento
        
        if ($departamentoId) {
            // Obtiene las carreras asociadas al departamento seleccionado
            $carreras = Carrera::where('ID_Departamento', $departamentoId)->get();
            return response()->json($carreras); // Retorna las carreras en formato JSON
        }
        return response()->json([]); // Si no se proporciona un ID de departamento, retorna un array vacío en formato JSON
    }
}
