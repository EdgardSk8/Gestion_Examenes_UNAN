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

    // Con AJAX
    public function AgregarPerfilAJAX(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva instancia del modelo Perfil
        $perfil = new Perfil();
        $perfil->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $perfil->save(); // Guardar el nuevo registro en la base de datos

        // Retornar la respuesta en formato JSON
        return response()->json([
            'success' => true,
            'message' => 'Perfil agregado exitosamente.',
            'data' => $perfil
        ]);
    }

    public function ObtenerPerfilAJAX()
    {
        $perfiles = Perfil::all();  // Obtiene todos los perfiles de la base de datos
        return response()->json($perfiles);  // Retorna los perfiles en formato JSON
    }

    public function EditarPerfilAJAX($id)
    {
        $perfil = Perfil::find($id);  // Buscar el perfil por su ID

        if (!$perfil) {
            return response()->json(['error' => 'Perfil no encontrado.'], 404);
        }

        return response()->json($perfil);  // Retorna el perfil en formato JSON
    }

    // Método para actualizar un perfil
    public function ActualizarPerfilAJAX(Request $request, $id)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        $perfil = Perfil::find($id);  // Buscar el perfil por su ID

        if (!$perfil) {
            return response()->json(['error' => 'Perfil no encontrado.'], 404);
        }

        // Actualizar el perfil
        $perfil->Nombre = $request->Nombre;
        $perfil->save();

        // Retornar la respuesta con el perfil actualizado
        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado exitosamente.',
            'data' => $perfil
        ]);
    }

    // Método para eliminar un perfil
    public function EliminarPerfilAJAX($id)
    {
        $perfil = Perfil::find($id);  // Buscar el perfil por su ID

        if (!$perfil) {
            return response()->json(['error' => 'Perfil no encontrado.'], 404);
        }

        // Eliminar el perfil
        $perfil->delete();

        // Retornar la respuesta indicando que el perfil fue eliminado
        return response()->json([
            'success' => true,
            'message' => 'Perfil eliminado exitosamente.'
        ]);
    }
}
