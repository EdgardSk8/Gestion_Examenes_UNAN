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
        if($request->isMethod('post'))
        {

            $validatedData = $request->validate
            ([
                'Titulo' => 'required|string|max:255',
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
                'Juez3_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
                'ID_Carrera' => 'required|integer|exists:carreras,ID_Carrera'
            ]);
            $equipo = Equipo::create($validatedData);
            return redirect()->back()->with('success', 'Equipo Creado Correctamente');

        }
    }
    
}
