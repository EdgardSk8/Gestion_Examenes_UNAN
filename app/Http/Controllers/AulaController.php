<?php

namespace App\Http\Controllers;
use App\Models\Aula;
use App\Models\Edificio;

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

    public function AgregarAula(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'Nombre_Aula' => 'required|string|max:255',
            'ID_Edificio' => 'required|exists:edificio,ID_Edificio',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area'
        ]);

        try {
            // Crear el aula usando los datos validados
            $aula = new Aula();
            $aula->Nombre_Aula = $validatedData['Nombre_Aula'];
            $aula->ID_Edificio = $validatedData['ID_Edificio'];

            // Guardar el aula en la base de datos
            $aula->save();

            // Redirigir con un mensaje de éxito
            return redirect()->back()->with('success', 'Aula agregada exitosamente.');
        } catch (\Exception $e) {
            // En caso de error, redirigir con un mensaje de error
            return redirect()->back()->with('error', 'Ocurrió un error al agregar el aula: ' . $e->getMessage());
        }
    }

    // Método para obtener los edificios asociados a un área de conocimiento
    public function ObtenerEdificiosPorArea(Request $request)
    {
        $areaId = $request->input('idArea');

        if ($areaId) {
            // Obtener edificios asociados al área de conocimiento seleccionada
            $edificios = Edificio::where('ID_Area', $areaId)->get();
            return response()->json($edificios);
        }
        
        return response()->json([]); // Retorna un array vacío si no hay ID de área
    }

}
