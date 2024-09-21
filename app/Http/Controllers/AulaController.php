<?php

namespace App\Http\Controllers;
use App\Models\Aula;

use Illuminate\Http\Request;

class AulaController extends Controller
{
    public function ObtenerAulaPorEdificio (Request $request)
    {
        $edificioId = $request->input('edificioId'); // Obtiene el ID del edificio

        if ($edificioId) {
            // Obtiene las aulas asociadas al edificio seleccionado
            $aulas = Aula::where('ID_Edificio', $edificioId)->get();
            return response()->json($aulas); // Retorna las aulas en formato JSON
        }

        return response()->json([]); // Si no se proporciona un ID de edificio, retorna un array vacío en JSON
    }
}
