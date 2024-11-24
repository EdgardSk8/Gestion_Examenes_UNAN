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

    public function ObtenerTodosEdificiosAJAXaula()
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
            return response()->json($edificios);
        } catch (\Exception $e) {
            return response()->json([], 500);
        }
    }
    public function ObtenerTodosEdificiosAJAX()
    {
        try {
            $edificios = Edificio::with('areaConocimiento')->get();

            if ($edificios->isEmpty()) {
                return response()->json(['success' => false, 'message' => 'No hay edificios disponibles', 'data' => []]);
            }

            return response()->json(['success' => true, 'data' => $edificios]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al obtener edificios.'], 500);
        }
    }

// Las demás mejoras seguirían el mismo esquema mostrado anteriormente.

    


    public function ObtenerEdificioPorAreaAJAX(Request $request)
    {
        $areaId = $request->input('areaId'); // Obtiene el ID del área

        if ($areaId) {
            // Obtiene los edificios asociados al área seleccionada
            $edificios = Edificio::where('ID_Area', $areaId)->get();
            return response()->json($edificios); // Retorna los edificios en formato JSON
        }
        return response()->json([]); // Si no se proporciona un ID de área, retorna un array vacío en JSON
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


    public function EditarEdificioAJAX($id)
    {
        $edificio = Edificio::find($id);

        if (!$edificio) {
            return response()->json(['success' => false, 'message' => 'Edificio no encontrado']);
        }

        // Devolver el edificio con su área de conocimiento
        return response()->json(['success' => true, 'data' => $edificio]);
    }
    // Actualizar un edificio existente
    public function ActualizarEdificioAJAX(Request $request, $id)
    {
        $edificio = Edificio::find($id);

        if (!$edificio) {
            return response()->json(['success' => false, 'message' => 'Edificio no encontrado']);
        }

        // Validar y actualizar los datos
        $validated = $request->validate([
            'Nombre_Edificio' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Asegúrate de que el ID del área sea válido
        ]);

        $edificio->Nombre_Edificio = $validated['Nombre_Edificio'];
        $edificio->ID_Area = $validated['ID_Area'];
        $edificio->save();

        return response()->json(['success' => true, 'message' => 'Edificio actualizado correctamente']);
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
