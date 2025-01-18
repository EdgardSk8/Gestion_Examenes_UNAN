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
    
        try {// Crear el nuevo aula usando los datos validados
            $aula = new Aula();
            $aula->ID_Edificio = $validated['ID_Edificio'];
            $aula->Nombre_Aula = $validated['Nombre_Aula'];
    
            // Guardar el aula en la base de datos
            $aula->save();
    
            return response()->json([
                'success' => true,
                'message' => 'Aula agregada exitosamente.',
                'data' => $aula // Opcional: Puedes devolver el aula creada si es necesario
            ]);
        } catch (\Exception $e) {
            // Retornar una respuesta JSON de error
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el aula: ' . $e->getMessage()
            ], 500); // 500 indica un error interno del servidor
        }
    }    

    // Editar un aula (Retorna los datos de un aula para edición)
    public function EditarAulaAJAX($id)
    {
        // Obtener el aula con la relación del edificio cargada
        $aula = Aula::with('edificio.area_conocimiento')->find($id);

        if ($aula) {
            // Verificar si el área de conocimiento está presente en el edificio
            $area = $aula->edificio && $aula->edificio->area_conocimiento ? $aula->edificio->area_conocimiento : null;

            return response()->json([
                'success' => true,
                'data' => [
                    'ID_Aula' => $aula->ID_Aula,
                    'Nombre_Aula' => $aula->Nombre_Aula,
                    'ID_Edificio' => $aula->ID_Edificio,
                    'ID_Area' => $area ? $area->ID_Area : null, // Solo asignar ID_Area si el área existe
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
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'Nombre_Aula' => 'nullable|string|max:255',
            'ID_Edificio' => 'nullable|exists:edificio,ID_Edificio', // Validación del ID_Edificio
        ]);
    
        // Buscar el aula en la base de datos
        $aula = Aula::find($id);
    
        if ($aula) { // Verificar si el aula existe
            try {
                // Actualizar los campos con los datos validados
                $aula->update([
                    'Nombre_Aula' => $validatedData['Nombre_Aula'],
                    'ID_Edificio' => $validatedData['ID_Edificio'],
                ]);
    
                // Devolver una respuesta exitosa con los datos actualizados
                return response()->json([
                    'success' => true,
                    'message' => 'Aula actualizada exitosamente.',
                    'data' => $aula
                ]);
            } catch (\Exception $e) {
                // Si ocurre un error, devolver una respuesta con el error
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al actualizar el aula: ' . $e->getMessage()
                ], 500);
            }
        }
    
        // Si no se encuentra el aula, devolver un error 404
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
                $aula->delete();// Eliminar el aula

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
