<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Localidad;

class LocalidadController extends Controller
{
    public function AgregarLocalidad(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva localidad
        $localidad = new Localidad();
        $localidad->Nombre = $request->Nombre; // Asignar el nombre desde el formulario al campo 'Nombre'
        $localidad->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Localidad '.$localidad->Nombre.' agregada exitosamente.');
    }

    public function obtenerLocalidad()
    {
        $localidades = Localidad::all();// Obtener todas las localidades de la base de datos
        return response()->json($localidades); // Devolver las localidades como respuesta JSON
    }

    public function obtenerLocalidadAJAX()
    {
        $localidades = Localidad::all();// Obtener todas las localidades de la base de datos
        return response()->json($localidades); // Devolver las localidades como respuesta JSON
    }

    // Función para agregar una localidad
    public function AgregarLocalidadAJAX(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255',
        ]);

        // Crear una nueva localidad
        $localidad = new Localidad();
        $localidad->Nombre = $request->Nombre;
        $localidad->save();

        // Devolver respuesta como JSON
        return response()->json([
            'success' => true,
            'message' => '¡Localidad agregada correctamente!',
            'localidad' => $localidad
        ]);
    }

    // Función para eliminar una localidad
    public function EliminarLocalidadAJAX($id)
    {
        $localidad = Localidad::find($id);
        if ($localidad) {
            $localidad->delete(); // Eliminar la localidad
            return response()->json([
                'success' => true,
                'message' => 'Localidad eliminada correctamente.'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Localidad no encontrada.'
            ]);
        }
    }

    // Función para actualizar una localidad
    public function ActualizarLocalidadAJAX(Request $request, $id)
    {
        $request->validate([
            'Nombre' => 'required|string|max:255',
        ]);

        $localidad = Localidad::find($id);
        if ($localidad) {
            $localidad->Nombre = $request->Nombre;
            $localidad->save();

            return response()->json([
                'success' => true,
                'message' => '¡Localidad actualizada correctamente!',
                'localidad' => $localidad
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Localidad no encontrada.'
            ]);
        }
    }
    
}
