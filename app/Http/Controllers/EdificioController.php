<?php

namespace App\Http\Controllers;
use App\Models\Edificio;
use Illuminate\Http\Request;

class EdificioController extends Controller
{
    public function ObtenerEdificioPorArea(Request $request)
    {
        $areaId = $request->input('areaId'); // Obtiene el ID del área

        if ($areaId) {
            // Obtiene los edificios asociados al área seleccionada
            $edificios = Edificio::where('ID_Area', $areaId)->get();
            return response()->json($edificios); // Retorna los edificios en formato JSON
        }
        return response()->json([]); // Si no se proporciona un ID de área, retorna un array vacío en JSON
    }
}
