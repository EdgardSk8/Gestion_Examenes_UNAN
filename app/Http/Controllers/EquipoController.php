<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
                'Tutor_ID' => 'nullable|integer|exists:profesores,ID_Profesor',
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
            // Buscar el equipo con las relaciones necesarias
            $equipo = Equipo::with([
                'carrera.departamento.areaConocimiento',
                'aula.edificio.areaConocimiento',
                'integrante1', // Relación con el primer integrante
                'integrante2', // Relación con el segundo integrante
                'integrante3', // Relación con el tercer integrante
                'tutor',
                'juez1',
                'juez2',
                'juez3',
                'tipoExamen'
            ])->findOrFail($id);
    
            // Preparar la respuesta con los datos de los integrantes (nombres)
            $equipoData = [
                'titulo' => $equipo->Titulo,
                'integrante1' => $equipo->integrante1 ? $equipo->integrante1->Nombre_Completo : '', // Nombre del primer integrante
                'integrante2' => $equipo->integrante2 ? $equipo->integrante2->Nombre_Completo : '', // Nombre del segundo integrante
                'integrante3' => $equipo->integrante3 ? $equipo->integrante3->Nombre_Completo : '', // Nombre del tercer integrante
                'fecha_asignada' => $equipo->Fecha_Asignada,
                'fecha_aprobada' => $equipo->Fecha_Aprobada,
                'hora_inicio' => $equipo->Hora_Inicio,
                'hora_fin' => $equipo->Hora_Fin,
                'aula' => $equipo->aula ? $equipo->aula->Nombre_Aula : '', // Nombre del aula
                'edificio' => $equipo->aula && $equipo->aula->edificio ? $equipo->aula->edificio->Nombre_Edificio : '', //Nombre Edificio
                'tipo_examen' => $equipo->tipoExamen ? $equipo->tipoExamen->Nombre : '', // Tipo de examen
                'tutor' => $equipo->tutor ? $equipo->tutor->Nombre_Completo_P : '', // Nombre del tutor
                'calificacion' => $equipo->Calificacion,
                'juez1' => $equipo->juez1 ? $equipo->juez1->Nombre_Completo_P : '', // Nombre del juez 1
                'juez2' => $equipo->juez2 ? $equipo->juez2->Nombre_Completo_P : '', // Nombre del juez 2
                'juez3' => $equipo->juez3 ? $equipo->juez3->Nombre_Completo_P : '', // Nombre del juez 3
                'tutorId' => $equipo->tutor ? $equipo->tutor->ID_Profesor : '',
                'juez1Id' => $equipo->juez1 ? $equipo->juez1->ID_Profesor : '',
                'juez2Id' => $equipo->juez2 ? $equipo->juez2->ID_Profesor : '',
                'juez3Id' => $equipo->juez3 ? $equipo->juez3->ID_Profesor : '',
                'carrera' => $equipo->carrera ? $equipo->carrera->Nombre : '', // Nombre de la carrera
                'departamento' => $equipo->carrera && $equipo->carrera->departamento
                ? $equipo->carrera->departamento->Nombre
                : '',
                'area_conocimiento' => $equipo->carrera->departamento->areaConocimiento->Nombre ?? '',
            ];

            // Retornar los datos del equipo y sus relaciones como JSON
            return response()->json(['success' => true, 'data' => $equipoData]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => 'Equipo no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
    public function ActualizarEquipo(Request $request, $id)
    {
        try {
            // Validar los datos recibidos
            $validatedData = $request->validate([
                'titulo' => 'nullable|string|max:255',
                'area' => 'nullable|integer|exists:area_conocimiento,ID_Area',
                'departamento' => 'nullable|integer|exists:departamento,ID_Departamento',
                'carrera' => 'nullable|integer|exists:carrera,ID_Carrera',
                'integrante1' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'integrante2' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'integrante3' => 'nullable|integer|exists:estudiantes,ID_Estudiante',
                'fechaAsignada' => 'nullable|date|',
                'fechaAprobada' => 'nullable|date|',
                'horaInicio' => 'nullable|date_format:H:i',
                'horaFin' => 'nullable|date_format:H:i',
                'aula' => 'nullable|integer|min:1|exists:aulas,ID_Aula',
                'tipoExamen' => 'nullable|integer|exists:tipo_examen,ID_Tipo_Examen',
                'calificacion' => 'nullable|numeric|min:0|max:100',
                'tutor' => 'nullable|integer|exists:profesores,ID_Profesor',
                'juez1' => 'nullable|integer|exists:profesores,ID_Profesor',
                'juez2' => 'nullable|integer|exists:profesores,ID_Profesor',
                'juez3' => 'nullable|integer|exists:profesores,ID_Profesor'
            ]);
    
            // Buscar el equipo por ID
            $equipo = Equipo::findOrFail($id);
    
            // Preparar los datos a actualizar
            $updateData = [
                'Titulo' => $validatedData['titulo'],
                'ID_Area' => $validatedData['area'],
                'ID_Departamento' => $validatedData['departamento'],
                'ID_Carrera' => $validatedData['carrera'],
                'Integrante1' => $validatedData['integrante1'],
                'Integrante2' => $validatedData['integrante2'] ?? null,
                'Integrante3' => $validatedData['integrante3'] ?? null,
                'Fecha_Asignada' => $validatedData['fechaAsignada'],
                'Fecha_Aprobada' => $validatedData['fechaAprobada'] ?? null,
                'Hora_Inicio' => $validatedData['horaInicio'],
                'Hora_Fin' => $validatedData['horaFin'],
                'Calificacion' => $validatedData['calificacion'] ?? null,
                'ID_Aula' => $validatedData['aula'],
                'ID_Tipo_Examen' => $validatedData['tipoExamen'],
                'Tutor_ID' => $validatedData['tutor'] ?? null,
                'Juez1_ID' => $validatedData['juez1'] ?? null,
                'Juez2_ID' => $validatedData['juez2'] ?? null,
                'Juez3_ID' => $validatedData['juez3'] ?? null
            ];
    
            // Actualizar los datos del equipo con los datos validados
            $equipo->update($updateData);
    
            // Retornar respuesta JSON de éxito
            return response()->json(['success' => true, 'message' => 'Equipo actualizado correctamente']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Manejar el caso en que el equipo no se encuentra
            return response()->json(['success' => false, 'message' => 'Equipo no encontrado'], 404);
        } catch (\Exception $e) {
            // Manejar errores generales
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    

    
    
}
