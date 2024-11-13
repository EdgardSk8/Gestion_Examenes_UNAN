<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Perfil;

class PerfilController extends Controller
{
    public function AgregarPerfil(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva área de conocimiento
        $perfil = new Perfil();
        $perfil->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $perfil->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Perfil '.$perfil->Nombre.' agregado exitosamente.');
    }

    public function ObtenerPerfil()
    {
        $perfiles = Perfil::all();  // Obtiene todos los perfiles de la base de datos
        return response()->json($perfiles);  // Retorna los perfiles en formato JSON
    }
}
