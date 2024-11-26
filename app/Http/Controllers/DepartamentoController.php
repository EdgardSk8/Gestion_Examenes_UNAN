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

    public function ObtenerDepartamentoPorAreaAJAX(Request $request)
{
    $areaId = $request->input('idArea'); // Obtiene el ID del área de conocimiento

    // Validar que el parámetro es válido
    if (!is_numeric($areaId)) {
        return response()->json([
            'success' => false,
            'message' => 'El ID del área debe ser un número válido.'
        ], 400); // Código de error 400: Solicitud incorrecta
    }

    try {
        // Obtener los departamentos asociados al área
        $departamentos = Departamento::where('ID_Area', $areaId)->get();

        if ($departamentos->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No se encontraron departamentos para el área proporcionada.',
                'data' => []
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $departamentos
        ]);
    } catch (\Exception $e) {
        // Manejar errores inesperados
        return response()->json([
            'success' => false,
            'message' => 'Ocurrió un error al obtener los departamentos.',
            'error' => $e->getMessage()
        ], 500); // Código de error 500: Error interno del servidor
    }
}


    // Método AgregarDepartamento
    public function AgregarDepartamento(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Aquí debe ser ID_Area, no ID_Area_Conocimiento
        ]);

        try {
            // Crear el nuevo departamento usando los datos validados
            $departamento = new Departamento();
            $departamento->Nombre = $validatedData['Nombre'];
            $departamento->ID_Area = $validatedData['ID_Area']; // Relación con el área de conocimiento

            // Guardar el departamento en la base de datos
            $departamento->save();

            // Retornar una respuesta de éxito
            return redirect()->back()->with('success', 'Departamento agregado exitosamente.');
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de fallar la inserción
            return redirect()->back()->with('error', 'Ocurrió un error al agregar el departamento: ' . $e->getMessage());
        }
    }

    public function ObtenerTodosDepartamentosAJAX()
    {
        try {
            // Obtener todos los departamentos con su área de conocimiento asociada
            $departamentos = Departamento::with('areaConocimiento')->get();

            if ($departamentos->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay departamentos disponibles',
                    'data' => []
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $departamentos
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener departamentos.',
            ], 500);
        }
    }

    public function AgregarDepartamentoAJAX(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Verifica que el área exista
        ]);
    
        try {
            // Crear el departamento con los datos validados
            $departamento = Departamento::create($validatedData);
    
            return response()->json([
                'success' => true,
                'message' => 'Departamento agregado exitosamente.',
                'data' => $departamento
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el departamento: ' . $e->getMessage()
            ]);
        }
    }
    
    public function EditarDepartamentoAJAX($id)
    {
        $departamento = Departamento::find($id);
    
        if (!$departamento) {
            return response()->json([
                'success' => false,
                'message' => 'Departamento no encontrado'
            ]);
        }
    
        return response()->json([
            'success' => true,
            'data' => $departamento
        ]);
    }
    
    public function ActualizarDepartamentoAJAX(Request $request, $id)
    {
        $departamento = Departamento::find($id);
    
        if (!$departamento) {
            return response()->json([
                'success' => false,
                'message' => 'Departamento no encontrado'
            ]);
        }
    
        // Validar los datos recibidos
        $validated = $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Verifica que el área exista
        ]);
    
        // Actualizar los datos del departamento
        $departamento->Nombre = $validated['Nombre'];
        $departamento->ID_Area = $validated['ID_Area'];
        $departamento->save();
    
        return response()->json([
            'success' => true,
            'message' => 'Departamento actualizado correctamente',
            'data' => $departamento
        ]);
    }
    
    public function EliminarDepartamentoAJAX($id)
    {
        try {
            $departamento = Departamento::findOrFail($id);
    
            // Eliminar el departamento
            $departamento->delete();
    
            return response()->json([
                'success' => true,
                'message' => 'Departamento eliminado correctamente.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al eliminar el departamento: ' . $e->getMessage()
            ]);
        }
    }
    
    
}
