<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;

class RolController extends Controller
{
    public function AgregarRol(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva área de conocimiento
        $rol = new Rol();
        $rol->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $rol->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Rol agregado exitosamente.');
    }

    //Con AJAX
    public function AgregarRolAJAX(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva área de conocimiento
        $rol = new Rol();
        $rol->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $rol->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Rol agregado exitosamente.');
    }

     // Método para obtener todos los roles (por ejemplo, para una vista de listado)
    public function ObtenerRolAJAX(Request $request)
    {
        $roles = Rol::all(); // Obtener todos los roles
        return response()->json($roles); // Devolver los roles como JSON
    }
 
     // Método para obtener un Rol por su ID (para editar)
    public function EditarRolAJAX($id)
    {
        $rol = Rol::find($id); // Buscar el Rol por su ID

        if ($rol) {
            return response()->json([
                'success' => true,
                'rol' => $rol
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Rol no encontrado.'
        ]);
    }
 
     // Método para actualizar un Rol
    public function ActualizarRolAJAX(Request $request, $id)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Validación del campo Nombre
        ]);

        // Buscar el Rol por su ID
        $rol = Rol::find($id);

        if ($rol) {
            $rol->Nombre = $request->Nombre; // Actualizar el nombre
            $rol->save(); // Guardar los cambios

            return response()->json([
                'success' => true,
                'message' => 'Rol actualizado exitosamente.',
                'rol' => $rol
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Rol no encontrado.'
        ]);
    }
 
     // Método para eliminar un Rol
    public function EliminarRolAJAX($id)
    {
        // Buscar el Rol por su ID
        $rol = Rol::find($id);
 
        if ($rol) {
            $rol->delete(); // Eliminar el Rol
            return response()->json([
                'success' => true,
                'message' => 'Rol eliminado exitosamente.'
            ]);
        }
 
        return response()->json([
            'success' => false,
            'message' => 'Rol no encontrado.'
        ]);
    }

}
