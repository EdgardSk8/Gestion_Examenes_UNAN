<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoExamen;

class TipoExamenController extends Controller
{
    public function ObtenerTipoExamen(Request $request)
    {
        $tipoexamen = TipoExamen::all();
        return response()->json($tipoexamen);
    }

    public function ObtenerTipoExamenAJAX(Request $request)
    {
        $tipoexamen = TipoExamen::all();
        return response()->json($tipoexamen);
    }

    public function AgregarTipoExamen(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nuevo Tipo de Examen
        $tipoexamen = new TipoExamen();
        $tipoexamen->Nombre = $request->Nombre;// Asignar el nombre desde el formulario
        $tipoexamen->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Tipo de Examen: '.$tipoexamen->Nombre.' agregada exitosamente.');
    }

    public function AgregarTipoExamenAJAX(Request $request)
    {
        $request->validate([
            'Nombre' => 'required|string|max:255', // Validación del campo Nombre
        ]);

        $tipoexamen = new TipoExamen();
        $tipoexamen->Nombre = $request->Nombre;
        $tipoexamen->save();

        return response()->json([
            'success' => true,
            'message' => 'Tipo de Examen agregado exitosamente.',
            'tipoExamen' => $tipoexamen
        ]);
    }

    // Función para eliminar un tipo de examen mediante AJAX
    public function EliminarTipoExamenAJAX($id)
    {
        $tipoexamen = TipoExamen::find($id);

        if ($tipoexamen) {
            $tipoexamen->delete();
            return response()->json([
                'success' => true,
                'message' => 'Tipo de Examen eliminado exitosamente.'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Tipo de Examen no encontrado.'
        ]);
    }

    // Función para obtener datos de un tipo de examen específico para edición
    public function EditarTipoExamenAJAX($id)
    {
        $tipoexamen = TipoExamen::find($id);

        if ($tipoexamen) {
            return response()->json([
                'success' => true,
                'tipoExamen' => $tipoexamen
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Tipo de Examen no encontrado.'
        ]);
    }

    // Función para actualizar un tipo de examen mediante AJAX
    public function ActualizarTipoExamenAJAX(Request $request, $id)
    {
        $request->validate([
            'Nombre' => 'required|string|max:255', // Validación del campo Nombre
        ]);

        $tipoexamen = TipoExamen::find($id);

        if ($tipoexamen) {
            $tipoexamen->Nombre = $request->Nombre;
            $tipoexamen->save();

            return response()->json([
                'success' => true,
                'message' => 'Tipo de Examen actualizado exitosamente.',
                'tipoExamen' => $tipoexamen
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Tipo de Examen no encontrado.'
        ]);
    }
    
}



