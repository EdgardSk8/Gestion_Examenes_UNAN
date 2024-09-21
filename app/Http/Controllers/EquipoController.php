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
                'ID_Area_Conocimiento' => 'required|integer|exists:area_conocimiento,ID_Area_Conocimiento',
                'ID_Departamento' => 'required|integer|exists:departamento,ID_Departamento',
                'ID_Carrera' => 'required|integer|exists:carrera,ID_Carrera',
                'Integrante1' => 'required|integer|exists:estudiantes,ID_Estudiante',
                'Integrante2' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Integrante3' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'Fecha_Asignada' => 'required|date',
                'Fecha_Aprobada' => 'nullable|date',
                'Hora_Inicio' => 'required|date_format:H:i',
                'Hora_Fin' => 'required|date_format:H:i',
                'ID_Aula' => 'required|integer|exists:aulas,ID_Aula',
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
            return response()->json(['message' => 'Equipo creado correctamente', 'equipo' => $equipo], 201);
        } catch (\Exception $e) {
            // Manejar errores y devolver un mensaje adecuado
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
}
