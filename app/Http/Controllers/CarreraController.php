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

    // Método AgregarCarrera
    public function AgregarCarrera(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required|string|max:255', // Nombre de la carrera
            'ID_Departamento' => 'required|exists:departamento,ID_Departamento', // Verifica que el departamento exista
        ]);

        try {
            // Crear una nueva carrera utilizando los datos validados
            $carrera = new Carrera();
            $carrera->Nombre = $validatedData['Nombre'];
            $carrera->ID_Departamento = $validatedData['ID_Departamento']; // Relacionar con el departamento

            // Guardar la carrera en la base de datos
            $carrera->save();

            // Retornar una respuesta de éxito
            return redirect()->back()->with('success', 'Carrera agregada exitosamente.');
        } catch (\Exception $e) {
            // Si ocurre algún error, retornar con mensaje de error
            return redirect()->back()->with('error', 'Ocurrió un error al agregar la carrera: ' . $e->getMessage());
        }
    }

    //Metodos AJAX

    public function ObtenerTodasCarrerasAJAX()
    {
        try {
            // Obtener todos los carrera con su área de conocimiento asociada
            $carrera = Carrera::with('departamento.areaConocimiento')->get();

            if ($carrera->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay carrera disponibles',
                    'data' => []
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $carrera
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener carrera.',
            ], 500);
        }
        
    }

    public function AgregarCarreraAJAX(Request $request)
    {
        $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Departamento' => 'required|exists:departamento,ID_Departamento',
        ]);

        try {
            $carrera = Carrera::create($request->only(['Nombre', 'ID_Departamento']));

            return response()->json([
                'success' => true,
                'message' => 'Carrera agregada exitosamente.',
                'data' => $carrera
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al agregar la carrera: ' . $e->getMessage()
            ], 500);
        }
    }

    public function EditarCarreraAJAX($id)
    {
        try {
            // Cargar la carrera con su departamento y el área de conocimiento asociada al departamento
            $carrera = Carrera::with('departamento.areaConocimiento')->findOrFail($id);
    
            // Verificar si el departamento tiene un área de conocimiento
            $areaConocimiento = $carrera->departamento && $carrera->departamento->areaConocimiento
                ? $carrera->departamento->areaConocimiento
                : null;
    
            return response()->json([
                'success' => true,
                'data' => [
                    'ID_Carrera' => $carrera->ID_Carrera,
                    'Nombre' => $carrera->Nombre,
                    'ID_Departamento' => $carrera->ID_Departamento,
                    'Departamento' => $carrera->departamento,
                    'ID_Area' => $areaConocimiento ? $areaConocimiento->ID_Area : null, // Solo devolver el ID_Area si existe
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la carrera: ' . $e->getMessage()
            ], 500);
        }
    }

    public function ActualizarCarreraAJAX(Request $request, $id)
    {
        $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Departamento' => 'required|exists:departamento,ID_Departamento',
        ]);
    
        try {
            $carrera = Carrera::findOrFail($id);
            $carrera->update($request->only(['Nombre', 'ID_Departamento']));
    
            // Cargar el departamento y el área de conocimiento después de la actualización
            $carrera->load('departamento', 'departamento.areaConocimiento');
    
            return response()->json([
                'success' => true,
                'message' => 'Carrera actualizada exitosamente.',
                'data' => $carrera
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la carrera: ' . $e->getMessage()
            ], 500);
        }
    }

    public function EliminarCarreraAJAX($id)
    {
        try {
            $carrera = Carrera::findOrFail($id);
            $carrera->delete();

            return response()->json([
                'success' => true,
                'message' => 'Carrera eliminada exitosamente.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la carrera: ' . $e->getMessage()
            ], 500);
        }
    }

}
