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
}
