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

    public function AgregarEdificio(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validatedData = $request->validate([
            'Nombre_Edificio' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Validación: el área debe existir
        ]);

        try {
            // Crear el nuevo edificio usando los datos validados
            $edificio = new Edificio();
            $edificio->Nombre_Edificio = $validatedData['Nombre_Edificio'];
            $edificio->ID_Area = $validatedData['ID_Area']; // Relación con el área de conocimiento

            // Guardar el edificio en la base de datos
            $edificio->save();

            // Retornar una respuesta de éxito
            return redirect()->back()->with('success', 'Edificio agregado exitosamente.');
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de fallar la inserción
            return redirect()->back()->with('error', 'Ocurrió un error al agregar el edificio: ' . $e->getMessage());
        }
    }

}
