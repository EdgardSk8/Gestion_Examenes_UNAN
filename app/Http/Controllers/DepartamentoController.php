<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departamento;
use App\Models\AreaConocimiento;

class DepartamentoController extends Controller
{
    public function ObtenerDepartamentoPorArea(Request $request)
    {
        $areaId = $request->input('idArea'); // Obtiene el ID del Area 'Area_Conocimiento'

        if ($areaId) {
            // Obtiene los departamentos asociadas al area 
            $departamentos = Departamento::where('ID_Area', $areaId)->get();
            return response()->json($departamentos); // Retorna las carreras en formato JSON
        }
        return response()->json([]);  // Si no se proporciona un ID de area, retorna un array vacío en formato JSON
    }

    

   

}
