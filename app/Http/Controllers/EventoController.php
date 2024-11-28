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
                'start' => $equipo->Fecha_Asignada . 'T' . $equipo->Hora_Inicio, // Combina fecha y hora de inicio
                'end' => $equipo->Fecha_Asignada . 'T' . $equipo->Hora_Fin, // Combina fecha y hora de fin
            ];
        });
        return response()->json(data: $equipos); // Retorna la colección de equipos en formato JSON para que pueda ser utilizada en el calendario
    }


    public function ActualizarEventoEnCalendario(Request $request, $id) { // Funcion Actualizar Fecha Asignada
        $equipo = Equipo::find($id); // Encuentra el equipo por ID
        if ($equipo) {

            $startDate = $request->input('start'); // Obtiene la fecha y hora Inicio del evento desde la solicitud HTTP
            $endDate = $request->input('end'); // Obtiene la nueva fecha y hora de fin del evento, si está disponible
    
            $equipo->Fecha_Asignada = \Carbon\Carbon::parse($startDate)->format('Y-m-d'); // Convierte la fecha de inicio a un objeto Carbon para manipulación de fechas
            $equipo->Hora_Inicio = \Carbon\Carbon::parse($startDate)->format('H:i'); // Convierte la fecha y hora de inicio en un objeto de tipo Carbon y actualiza solo la hora de inicio (formato 'H:i')
    
            if ($endDate) { // Si se proporciona la fecha y hora de fin
                $equipo->Hora_Fin = \Carbon\Carbon::parse($endDate)->format('H:i');  // Convierte la fecha y hora de fin en un objeto de tipo Carbon y actualiza la hora de fin (formato 'H:i')
            }
    
            $equipo->save();// Guarda los cambios en la base de datos
            return response()->json(['message' => 'Evento actualizado correctamente']);  // Retorna una respuesta JSON indicando que el evento fue actualizado con éxito
        }
        return response()->json(['message' => 'Evento no encontrado'], 404); // Si el equipo no fue encontrado, retorna un mensaje de error con código 404
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
                'tutor' => $equipo->tutor ? $equipo->tutor->Nombre_Completo_P : 'Sin asignar Tutor',
                'calificacion' => $equipo->Calificacion ? $equipo->Calificacion : 'Sin Calificar',
                'juez1' => $equipo->juez1 ? $equipo->juez1->Nombre_Completo_P : 'Sin asignar Juez',
                'juez2' => $equipo->juez2 ? $equipo->juez2->Nombre_Completo_P : 'Sin asignar Juez',
                'juez3' => $equipo->juez3 ? $equipo->juez3->Nombre_Completo_P : 'Sin asignar Juez',
                'carrera' => $equipo->carrera ? $equipo->carrera->Nombre: 'Sin asignar Carrera',
            ]);
        }
        return response()->json(['message' => 'Evento no encontrado'], 404);
    } // Referencia hacia fullcalendar.js al evento eventClick

}
