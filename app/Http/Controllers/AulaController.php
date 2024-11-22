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

    //Metodos AJAX
    public function ObtenerTodasAulasAJAX()
    {
        $aulas = Aula::with(['edificio.areaConocimiento'])->get();
        return response()->json([
            'success' => true,
            'data' => $aulas
        ]);
    }

    // Agregar un aula
    public function agregarAulaAjax(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validated = $request->validate([
            'ID_Edificio' => 'required|exists:edificio,ID_Edificio',
            'Nombre_Aula' => 'required|string|max:255',
        ]);
    
        try {
            // Crear el nuevo aula usando los datos validados
            $aula = new Aula();
            $aula->ID_Edificio = $validated['ID_Edificio'];
            $aula->Nombre_Aula = $validated['Nombre_Aula'];
    
            // Guardar el aula en la base de datos
            $aula->save();
    
            return redirect()->back()->with('success', 'Aula agregada exitosamente.');
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de fallar la inserción
            return redirect()->back()->with('error', 'Ocurrió un error al agregar el aula: ' . $e->getMessage());
        }
    }    

    // Editar un aula (Retorna los datos de un aula para edición)
    public function EditarAulaAJAX($id)
    {
        $aula = Aula::with(['edificio'])->find($id);
    
        if ($aula) {
            // Obtener el área de conocimiento asociada (si es relevante)
            $area = $aula->edificio->area_conocimiento ?? null;
    
            return response()->json([
                'success' => true,
                'data' => [
                    'ID_Aula' => $aula->ID_Aula,
                    'Nombre_Aula' => $aula->Nombre_Aula,
                    'ID_Edificio' => $aula->ID_Edificio,
                    'ID_Area' => $area ? $area->ID_Area : null, // Retorna el área asociada si existe
                    'Edificio' => $aula->edificio,
                ]
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'Aula no encontrada.'
        ], 404);
    }

    // Actualizar un aula
    public function ActualizarAulaAJAX(Request $request, $id)
    {
        $validatedData = $request->validate([
            'Nombre_Aula' => 'required|string|max:255',
            'ID_Edificio' => 'required|exists:edificio,ID_Edificio',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Agregar validación de ID_Area
        ]);

        $aula = Aula::find($id);

        if ($aula) {
            try {
                $aula->update($validatedData);

                return response()->json([
                    'success' => true,
                    'message' => 'Aula actualizada exitosamente.',
                    'data' => $aula
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al actualizar el aula: ' . $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Aula no encontrada.'
        ], 404);
    }

    // Eliminar un aula
    public function EliminarAulaAJAX($id)
    {
        $aula = Aula::find($id);

        if ($aula) {
            try {
                // Eliminar el aula
                $aula->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Aula eliminada exitosamente.',
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al eliminar el aula: ' . $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Aula no encontrada.'
        ], 404);
    }

}
