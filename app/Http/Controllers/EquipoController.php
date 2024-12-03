<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;

class EquipoController extends Controller
{

    public function ObtenerTodosLosEquipos() // Método para obtener todos los equipos
    {
        $equipos = Equipo::all();  // Obtiene todos los registros de la tabla 'equipos'
        return response()->json($equipos); // Retorna la colección de equipos en formato JSON
    }

    public function CrearNuevoEquipo(Request $request)
    {
        try {
            // Validar los datos recibidos
            $validatedData = $request->validate([
                'Titulo' => 'required|string|max:255',
                'ID_Area_Conocimiento' => 'required|integer|exists:area_conocimiento,ID_Area',
                'ID_Departamento' => 'required|integer|exists:departamento,ID_Departamento',
                'ID_Carrera' => 'required|integer|exists:carrera,ID_Carrera',
                'Integrante1' => 'required|integer|exists:estudiantes,ID_Estudiante',
                'Integrante2' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Integrante3' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Fecha_Asignada' => 'required|date|after:Fecha_Aprobada',
                'Fecha_Aprobada' => 'nullable|date|after_or_equal:Fecha_Asignada',
                'Hora_Inicio' => 'required|date_format:H:i',
                'Hora_Fin' => 'required|date_format:H:i',
                'ID_Aula' => 'required|integer|min:1|exists:aulas,ID_Aula',
                'ID_Tipo_Examen' => 'required|integer|exists:tipo_examen,ID_Tipo_Examen',
                'Calificacion' => 'nullable|numeric|min:0|max:100',
                'Tutor_ID' => 'required|integer|exists:profesores,ID_Profesor',
                'Juez1_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
                'Juez2_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
                'Juez3_ID' => 'nullable|integer|exists:profesores,ID_Profesor'
                
            ]);

            // Crear el equipo en la base de datos
            $equipo = Equipo::create($validatedData);

            // Retornar respuesta JSON
            return redirect()->back()->with('success', 'Equipo creado correctamente');
        } catch (\Exception $e) {
            // Manejar errores y devolver un mensaje adecuado
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function EliminarEquipo(Request $request, $id)
    {
        try {
            $equipo = Equipo::findOrFail($id);// Buscar el equipo por ID
            $equipo->delete(); // Eliminar el equipo
            // Retornar respuesta JSON de éxito
            return response()->json(['success' => true, 'message' => 'Equipo eliminado correctamente']);
        } catch (\Exception $e) {
            // Manejar errores y devolver un mensaje adecuado
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Método para obtener los datos de un equipo específico
    public function EditarEquipo($id)
    {
        try {
            // Buscar el equipo por ID
            $equipo = Equipo::findOrFail($id);

            // Retornar los datos del equipo como JSON
            return response()->json(['success' => true, 'data' => $equipo]);
        } catch (\Exception $e) {
            // Manejar errores y devolver un mensaje adecuado
            return response()->json(['success' => false, 'message' => $e->getMessage()], 404);
        }
    }

    // Método para actualizar los datos de un equipo en la base de datos
    public function ActualizarEquipo(Request $request, $id)
    {
        try {
            // Validar los datos recibidos
            $validatedData = $request->validate([
                'Titulo' => 'required|string|max:255',
                'ID_Area_Conocimiento' => 'required|integer|exists:area_conocimiento,ID_Area',
                'ID_Departamento' => 'required|integer|exists:departamento,ID_Departamento',
                'ID_Carrera' => 'required|integer|exists:carrera,ID_Carrera',
                'Integrante1' => 'required|integer|exists:estudiantes,ID_Estudiante',
                'Integrante2' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Integrante3' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Fecha_Asignada' => 'required|date|after:Fecha_Aprobada',
                'Fecha_Aprobada' => 'nullable|date|after_or_equal:Fecha_Asignada',
                'Hora_Inicio' => 'required|date_format:H:i',
                'Hora_Fin' => 'required|date_format:H:i',
                'ID_Aula' => 'required|integer|min:1|exists:aulas,ID_Aula',
                'ID_Tipo_Examen' => 'required|integer|exists:tipo_examen,ID_Tipo_Examen',
                'Calificacion' => 'nullable|numeric|min:0|max:100',
                'Tutor_ID' => 'required|integer|exists:profesores,ID_Profesor',
                'Juez1_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
                'Juez2_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
                'Juez3_ID' => 'nullable|integer|exists:profesores,ID_Profesor'
            ]);

            // Buscar el equipo por ID
            $equipo = Equipo::findOrFail($id);

            // Actualizar los datos del equipo
            $equipo->update($validatedData);

            // Retornar respuesta JSON de éxito
            return response()->json(['success' => true, 'message' => 'Equipo actualizado correctamente']);
        } catch (\Exception $e) {
            // Manejar errores y devolver un mensaje adecuado
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
}
