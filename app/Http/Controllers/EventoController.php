<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipo;

class EventoController extends Controller
{

    public function MostrarEquiposEnCalendario() // Muestra todos los equipos en formato adecuado para el calendario 'Eventos'
    {
        $equipos = Equipo::all()->map(function ($equipo) { // Obtiene todos los registros de la tabla 'equipos' y los mapea a un nuevo formato
            return [  // Para cada equipo, retorna un arreglo con los campos relevantes para el calendario
                'id' => $equipo->ID_Equipo,
                'title' => $equipo->Titulo,
                'start' => $equipo->Fecha_Asignada,
            ];
        });
        return response()->json($equipos); // Retorna la colección de equipos en formato JSON para que pueda ser utilizada en el calendario
    }

    public function ActualizarEventoEnCalendario(Request $request, $id)  // Funcion Actualizar Fecha Asignada
    {
        $equipo = Equipo::find($id);  // Encuentra el equipo por ID
        if ($equipo) {
            $startDate = $request->input(key: 'start'); // Obtiene la fecha del evento desde la solicitud HTTP
            $start = \Carbon\Carbon::parse($startDate); // Convierte la fecha de inicio a un objeto Carbon para manipulación de fechas
            $equipo->Fecha_Asignada = $start->format('Y-m-d'); // Actualiza la columna 'Fecha_Asignada' en la tabla 'equipos' con el nuevo valor
            $equipo->save();  // Guarda los cambios en la base de datos
            return response()->json(['message' => 'Evento actualizado correctamente']);
        }
        return response()->json(['message' => 'Evento no encontrado'], 404);
    }

    public function MostrarDetallesPorId($id) // Funcion show para mostrar los datos en los td y tr de la vista de detalles detalles-btn
    {
        $equipo = Equipo::find($id);
        if ($equipo) { 
            return response()->json([
                'id' => $equipo->ID_Equipo,
                'titulo' => $equipo->Titulo, // Obtiene valor de la BD y lo pasa a la variable 'titulo', y asi sucesivamente
                'integrante1' => $equipo->integrante1 ? $equipo->integrante1->Nombre_Completo : 'Sin integrante',
                'integrante2' => $equipo->integrante2 ? $equipo->integrante2->Nombre_Completo : 'Sin integrante',
                'integrante3' => $equipo->integrante3 ? $equipo->integrante3->Nombre_Completo : 'Sin integrante',
                'fecha_asignada' => $equipo->Fecha_Asignada ? $equipo->Fecha_Asignada : 'Sin hora de asignacion',
                'fecha_aprobada' => $equipo->Fecha_Aprobada ? $equipo->Fecha_Aprobada : 'Sin fecha de aprobacion',
                'hora_inicio' => $equipo->Hora_Inicio ? $equipo->Hora_Inicio : 'Sin hora de inicio',
                'hora_fin' => $equipo->Hora_Fin ? $equipo->Hora_Fin : 'Sin asignar hora final',
                'aula' => $equipo->aula ? $equipo->aula->Nombre_Aula : 'Aula no asignada',
                'tipo_examen' => $equipo->tipoExamen ? $equipo->tipoExamen->Nombre : 'Sin asignar tipo de examen',
                'tutor' => $equipo->tutor ? $equipo->tutor->Nombre_Completo : 'Sin asignar Tutor',
                'calificacion' => $equipo->Calificacion ? $equipo->Calificacion : 'Sin Calificar',
                'juez1' => $equipo->juez1 ? $equipo->juez1->Nombre_Completo : 'Sin asignar Juez',
                'juez2' => $equipo->juez2 ? $equipo->juez2->Nombre_Completo : 'Sin asignar Juez',
                'juez3' => $equipo->juez3 ? $equipo->juez3->Nombre_Completo : 'Sin asignar Juez',
                'carrera' => $equipo->carrera ? $equipo->carrera->Nombre: 'Sin asignar Tutor',
            ]);
        }
        return response()->json(['message' => 'Evento no encontrado'], 404);
    } // Referencia hacia fullcalendar.js al evento eventClick

}
