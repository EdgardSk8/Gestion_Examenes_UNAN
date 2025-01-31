<?php

namespace App\Http\Controllers;
use App\Models\Profesor;

use Illuminate\Http\Request;

class ProfesorController extends Controller
{
  
    public function ObtenerProfesor()
    {
        $profesor = Profesor::all();
        return response()->json($profesor);
    }

    public function ObtenerProfesorPorDepartamento(Request $request)
    {
        $departamentoId = $request->input('DepartamentoId');

        if ($departamentoId) {
            $profesores = Profesor::where('ID_Departamento', $departamentoId)->get();
            return response()->json($profesores);
        }
        return response()->json([]);
    }

    public function AgregarProfesor(Request $request)
    {
        // Validar la entrada del usuario
        $validated = $request->validate([
            'Nombre_Completo_P' => 'required|string|max:255',
            'Correo' => 'required|email|unique:profesores,Correo',
            'Contrasenia' => 'required|string|min:1',
            'ID_Departamento' => 'required|integer',
            'ID_Perfil' => 'required|integer',
        ]);

        // Crear un nuevo profesor
        $profesor = Profesor::create([
            'Nombre_Completo_P' => $validated['Nombre_Completo_P'],
            'Correo' => $validated['Correo'],
            'Contrasenia' => ($validated['Contrasenia']),
            'ID_Departamento' => $validated['ID_Departamento'],
            'ID_Perfil' => $validated['ID_Perfil'],
        ]);

        // Retornar respuesta
        return redirect()->route('VistaAgregarDatos')->with('success', 'Profesor ' . $profesor->Nombre_Completo_P . ' agregado exitosamente.');
    }

    //Metodos AJAX
    public function ObtenerTodosLosProfesoresAJAX()
    {
        try {
            // Obtener todos los profesores con sus llaves relacionadas
            $profesor = Profesor::with('departamento.areaConocimiento', 'perfil')->get();

            if ($profesor->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay profesores disponibles',
                    'data' => []
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $profesor
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener profesor.',
            ], 500);
        }
        
    }

    public function AgregarProfesorAJAX(Request $request)
    {
        // Validar la entrada del usuario
        $validated = $request->validate([
            'Nombre_Completo_P' => 'required|string|max:255',
            'Correo' => 'required|email|unique:profesores,Correo',
            'Contrasenia' => 'required|string|min:0',
            'ID_Departamento' => 'required|integer|exists:departamento,ID_Departamento',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area',
            'ID_Perfil' => 'required|integer|exists:perfil,ID_Perfil',
        ]);
        
        try {
            // Crear un nuevo profesor con la contraseña encriptada
            $profesor = Profesor::create([
                'Nombre_Completo_P' => $validated['Nombre_Completo_P'],
                'Correo' => $validated['Correo'],
                'Contrasenia' => ($validated['Contrasenia']), // Encriptar contraseña
                'ID_Departamento' => $validated['ID_Departamento'],
                'ID_Area' => $validated['ID_Area'],
                'ID_Perfil' => $validated['ID_Perfil'],
            ]);
        
            // Retornar una respuesta JSON de éxito
            return response()->json([
                'success' => true,
                'message' => 'Profesor agregado exitosamente.',
                'data' => $profesor // Devolver el profesor creado
            ]);
        } catch (\Exception $e) {
            // Retornar una respuesta JSON de error
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el profesor: ' . $e->getMessage()
            ], 500); // 500 indica un error interno del servidor
        }
    }
    
        // Eliminar un profesor
    public function EliminarProfesorAJAX($id)
    {
        $profesor = Profesor::find($id);

        if ($profesor) {
            try {
                // Eliminar el profesor
                $profesor->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'profesor eliminada exitosamente.',
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al eliminar el profesor: ' . $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'profesor no encontrada.'
        ], 404);
    }

    public function EditarProfesorAJAX($id)
    {
        try {
            // Cargar el profesor con su departamento y perfil asociado
            $profesor = Profesor::with('departamento.areaConocimiento', 'perfil')->findOrFail($id);

            // Verificar si el departamento tiene un área de conocimiento
            $areaConocimiento = $profesor->departamento && $profesor->departamento->areaConocimiento
                ? $profesor->departamento->areaConocimiento
                : null;

            return response()->json([
                'success' => true,
                'data' => [
                    'ID_Profesor' => $profesor->ID_Profesor,
                    'Nombre_Completo_P' => $profesor->Nombre_Completo_P,
                    'Correo' => $profesor->Correo,
                    'ID_Departamento' => $profesor->ID_Departamento,
                    'Departamento' => $profesor->departamento,
                    'Contrasenia' => $profesor->Contrasenia,
                    'ID_Area' => $areaConocimiento ? $areaConocimiento->ID_Area : null, // Solo devolver el ID_Area si existe
                    'Perfil' => $profesor->perfil,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el profesor: ' . $e->getMessage()
            ], 500);
        }
    }

    public function ActualizarProfesorAJAX(Request $request, $id)
    {
        $request->validate([
            'Nombre_Completo_P' => 'required|string|max:255',
            'Correo' => 'required|email|max:255',
            'ID_Departamento' => 'required|exists:departamento,ID_Departamento',
            'ID_Perfil' => 'required|exists:perfil,ID_Perfil',
        ]);

        try {
            $profesor = Profesor::findOrFail($id);
            $profesor->update($request->only(['Nombre_Completo_P', 'Correo', 'Contrasenia', 'ID_Departamento', 'ID_Perfil']));

            // Cargar el departamento, área de conocimiento y perfil después de la actualización
            $profesor->load('departamento', 'departamento.areaConocimiento', 'perfil');

            return response()->json([
                'success' => true,
                'message' => 'Profesor actualizado exitosamente.',
                'data' => $profesor
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el profesor: ' . $e->getMessage()
            ], 500);
        }
    }
}
