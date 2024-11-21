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

    //Metodos AJAX

    public function ObtenerTodosEdificiosAJAX()
    {
        try {
            // Obtener todos los edificios con sus áreas de conocimiento asociadas
            $edificios = Edificio::with('areaConocimiento')->get();

            // Si no hay edificios, devolver un mensaje con data vacía
            if ($edificios->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay edificios disponibles',
                    'data' => []
                ]);
            }

            // Respuesta exitosa con todos los edificios y sus áreas de conocimiento asociadas
            return response()->json([
                'success' => true,
                'data' => $edificios // Retorna todos los edificios con sus áreas asociadas
            ]);

        } catch (\Exception $e) {
            // Si hay un error, se devuelve un mensaje de error con success: false
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los edificios: ' . $e->getMessage(),
                'data' => []
            ]);
        }
    }
    


    public function ObtenerEdificioPorAreaAJAX(Request $request)
    {
        $areaId = $request->input('areaId'); // Obtener ID del área

        if (!$areaId) {
            return response()->json([
                'success' => false,
                'message' => 'El ID del área es requerido.',
                'data' => []
            ]);
        }

        $edificios = Edificio::where('ID_Area', $areaId)->get();

        return response()->json([
            'success' => true,
            'message' => 'Edificios obtenidos correctamente.',
            'data' => $edificios
        ]);
    }

    public function AgregarEdificioAJAX(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'Nombre_Edificio' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area',
        ]);

        try {
            // Crear el edificio
            $edificio = Edificio::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Edificio agregado exitosamente.',
                'data' => $edificio
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el edificio: ' . $e->getMessage()
            ]);
        }
    }

    // Actualizar un edificio existente
    public function ActualizarEdificioAJAX(Request $request, $id)
    {
        // Validar los datos
        $validatedData = $request->validate([
            'Nombre_Edificio' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area',
        ]);

        try {
            $edificio = Edificio::findOrFail($id);

            $edificio->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Edificio actualizado correctamente.',
                'data' => $edificio
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al actualizar el edificio: ' . $e->getMessage()
            ]);
        }
    }

    // Eliminar un edificio
    public function EliminarEdificioAJAX($id)
    {
        try {
            // Buscar el edificio por su ID
            $edificio = Edificio::findOrFail($id);

            // Eliminar el edificio
            $edificio->delete();

            return response()->json([
                'success' => true,
                'message' => 'Edificio eliminado correctamente.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al eliminar el edificio: ' . $e->getMessage()
            ]);
        }
    }

}
