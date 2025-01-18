<?php

namespace App\Http\Controllers;
use App\Models\AreaConocimiento;

use Illuminate\Http\Request;

class AreaConocimientoController extends Controller
{

    // Mostrar todos los datos de la tabla Area_Conocimiento
    public function ObtenerAreaConocimiento()
    {
        $areas = AreaConocimiento::all(); // Obtener todas las areas de conocimiento
        return response()->json($areas);// Retorna los datos en formato JSON
    }

    // Función para agregar una nueva área de conocimiento
    public function AgregarAreaConocimiento(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva área de conocimiento
        $area = new AreaConocimiento();
        $area->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $area->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->route('VistaAgregarDatos')->with('success', 'Área '. $area->Nombre. ' agregada exitosamente: ' );
    }

    //Metodo para subir los datos por ajax
    public function AgregarAreaConocimientoAJAX(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Validación del campo Nombre
        ]);

        // Crear una nueva área de conocimiento
        $area = new AreaConocimiento();
        $area->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $area->save(); // Guardar el nuevo registro en la base de datos

        // Retornar una respuesta JSON con los datos del nuevo área
        return response()->json([
            'ID_Area' => $area->id, // Ajusta según el nombre del campo ID en tu modelo
            'Nombre' => $area->Nombre,
            'message' => 'Área de conocimiento agregada exitosamente',
        ]);
    }
    //Metodo para elimnar los datos por ajax
    public function EliminarAreaConocimientoAJAX($id)
    {
        // Buscar el área por su ID
        $area = AreaConocimiento::find($id);

        if (!$area) {
            return response()->json(['message' => 'Área no encontrada'], 404);
        }

        // Eliminar el área
        $area->delete();

        return response()->json(['message' => 'Área eliminada correctamente'], 200);
    }

    // Método para mostrar el área seleccionada para editar (AJAX)
    public function mostrarAreaParaEditarAJAX($ID_Area)
    {
        // Buscar el área por ID_Area
        $area = AreaConocimiento::find($ID_Area);
        
        // Verificar si el área existe
        if ($area) {
            return response()->json([
                'success' => true,
                'area' => $area
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Área no encontrada.'
            ]);
        }
    }

    // Método para actualizar el área de conocimiento (AJAX)
    public function actualizarAreaConocimientoAJAX(Request $request, $ID_Area)
    {
        // Validar los datos recibidos
        $request->validate([
            'Nombre' => 'required|string|max:255',  // Asegúrate de que el nombre no esté vacío
        ]);
        
        // Buscar el área por ID_Area
        $area = AreaConocimiento::find($ID_Area);
        
        // Verificar si el área existe
        if ($area) {
            // Actualizar el nombre del área
            $area->Nombre = $request->input('Nombre');
            $area->save(); // Guardar los cambios
            
            return response()->json([
                'success' => true,
                'message' => 'Área actualizada correctamente.'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Área no encontrada.'
            ]);
        }
    }
}
