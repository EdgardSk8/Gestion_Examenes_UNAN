// resources/js/fullcalendar.js

//Error de fecha, linea 167 y 175, editar segun corresponda

import './bootstrap'; 
import { Calendar } from '@fullcalendar/core'; // Importa el componente Calendar de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa el plugin para vista de cuadrícula de días
import interactionPlugin from '@fullcalendar/interaction'; // Importa el plugin para interacciones
import timeGridPlugin from '@fullcalendar/timegrid'; // Importa el plugin para vista de cuadrícula de tiempo
import esLocale from '@fullcalendar/core/locales/es'; // Importa la localización en español

document.addEventListener('DOMContentLoaded', function () { 

    var calendarEl = document.getElementById('calendar'); // Selecciona el elemento donde se renderiza el calendario

    const ID_Departamento = localStorage.getItem('departamentoId');

    console.log(ID_Departamento);

    var calendar = new Calendar(calendarEl, { // Inicializa FullCalendar
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], // Configura los plugins a usar
        locales: [esLocale], // Configura el calendario para usar el idioma español
        locale: 'es', // Establece el idioma del calendario en español
        timeZone: 'America/Managua', // Establece la zona horaria del calendario
        headerToolbar: { // Configura la barra de herramientas del encabezado
            left: 'prev,next today', // Botones de navegación a la izquierda
            center: 'title', // Título (mes y año) en el centro
            right: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay' // Vistas del calendario a la derecha
        },
        editable: true, // Permite arrastrar y soltar los eventos
        droppable: true, // Permite soltar elementos externos en el calendario
        events: '/departamento_evento/' + ID_Departamento, // Ruta para obtener eventos del servidor
        views: {
            timeGridDay: {
                slotMinTime: '08:00:00', // Hora mínima (8:00 AM)
                slotMaxTime: '18:00:00', // Hora máxima (6:00 PM)
                slotDuration: '00:30:00', // Intervalo de 30 minutos
                slotLabelFormat: { // Formato de la etiqueta de la hora
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true // Muestra AM/PM
                },
                // Permitir que los eventos se deslicen hasta la hora máxima
                eventDurationEditable: true, // Permite que la duración de los eventos se pueda editar
                selectable: true // Permite seleccionar horas para crear eventos
            },
            timeGridWeek: { // Configuración para la vista de semana
                slotMinTime: '08:00:00', // Hora mínima (8:00 AM)
                slotMaxTime: '18:00:00', // Hora máxima (6:00 PM)
                slotDuration: '00:30:00', // Intervalo de 30 minutos
                slotLabelFormat: { // Formato de la etiqueta de la hora
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true // Muestra AM/PM
                },
                eventDurationEditable: true, // Permite que la duración de los eventos se pueda editar
                selectable: true // Permite seleccionar horas para crear eventos
            }
        },
        eventClick: function(info) { // Evento cuando se hace clic en un evento del calendario
            var eventId = info.event.id; // Obtiene el ID del evento clicado
            //console.log('Evento seleccionado con ID:', eventId);

            fetch(`/events/${eventId}`) // Realiza una solicitud para obtener detalles del evento
                .then(response => response.json())
                .then(data => {

                    // Procesa la fecha y horas del evento
                    const dateAssigned = new Date(data.fecha_asignada); // Crea un objeto de fecha a partir de la fecha asignada
                    const startHour = new Date(dateAssigned.getFullYear(), dateAssigned.getMonth(), dateAssigned.getDate(), ...data.hora_inicio.split(':')); // Crea un objeto de fecha para la hora de inicio
                    const endHour = new Date(dateAssigned.getFullYear(), dateAssigned.getMonth(), dateAssigned.getDate(), ...data.hora_fin.split(':')); // Crea un objeto de fecha para la hora de fin

                    // Formatear las horas para mostrar en la interfaz
                    const formattedStartHour = startHour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
                    const formattedEndHour = endHour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true});

                    // Mostrar datos en la tabla de #equipo-detalle

                    // tr:nth-of-type(1) Referencia a la fila
                    // td:nth-of-type(2) Referencia a la columna

                    // Muestra los datos en la vista equipodetalle.blade.php

                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(1) td:nth-of-type(2)').textContent = data.titulo; // Muestra el título
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(2) td:nth-of-type(2)').textContent = data.integrante1; // Muestra el primer integrante
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(3) td:nth-of-type(2)').textContent = data.integrante2; // Muestra el segundo integrante
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(4) td:nth-of-type(2)').textContent = data.integrante3; // Muestra el tercer integrante
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(5) td:nth-of-type(2)').textContent = data.fecha_asignada; // Muestra la fecha asignada
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(6) td:nth-of-type(2)').textContent = data.fecha_aprobada; // Muestra la fecha aprobada
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(7) td:nth-of-type(2)').textContent = formattedStartHour; // Muestra la hora de inicio formateada
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(8) td:nth-of-type(2)').textContent = formattedEndHour; // Muestra la hora de fin formateada
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(9) td:nth-of-type(2)').textContent = data.aula; // Muestra el aula
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(10) td:nth-of-type(2)').textContent = data.tipo_examen; // Muestra el tipo de examen
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(11) td:nth-of-type(2)').textContent = data.tutor; // Muestra el tutor
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(12) td:nth-of-type(2)').textContent = data.calificacion; // Muestra la calificación
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(13) td:nth-of-type(2)').textContent = data.juez1; // Muestra el juez 1
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(14) td:nth-of-type(2)').textContent = data.juez2; // Muestra el juez 2
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(15) td:nth-of-type(2)').textContent = data.juez3; // Muestra el juez 3
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(16) td:nth-of-type(2)').textContent = data.carrera; // Muestra la carrera


                    // Actualiza la interfaz de usuario
                    document.getElementById('vista-inicio').style.display = 'none'; // Oculta la vista de inicio
                    document.querySelector('.equipos-table').style.display = 'table'; // Muestra la tabla de detalles
                    document.getElementById('vista-equipos').style.display = 'none'; // Oculta la vista de equipos
                    document.getElementById('vista-detalles').style.display = 'block'; // Muestra la vista de detalles

                    // Asignar el ID del evento al botón de eliminación
                    const deleteButton = document.getElementById('eliminar-evento');
                    deleteButton.setAttribute('data-event-id', eventId);

                    const editButton = document.getElementById('editar-evento');
                    editButton.setAttribute('data-event-id', eventId);

                    if(eventId){
                        //console.log('ID del evento clickeado: ', eventId);
                        document.getElementById('editar-evento').disabled = false;
                        document.getElementById('eliminar-evento').disabled = false;
                    } else {
                        console.error('Error al buscar el ID del evento', Error);
                    }

                })
                .catch(error => console.error('Error al obtener los detalles del evento:', error));
        },
        eventDrop: function (info) { // Evento cuando se arrastra un evento a una nueva posición
            console.log('Evento movido:', info.event); // Muestra el evento que ha sido movido
            
            const newStartDate = info.event.start.toISOString(); // Obtener la nueva fecha de inicio del evento
            const newEndDate = info.event.end ? info.event.end.toISOString() : null; // Obtener la nueva fecha de fin del evento

            // Envía solicitud al servidor para actualizar la fecha
            fetch(`/events/${info.event.id}`, {
                method: 'PUT', // Usar PUT para la actualización
                headers: {
                    'Content-Type': 'application/json', // Especifica el tipo de contenido
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Incluye el token CSRF para protección
                },
                body: JSON.stringify({ // Envía la nueva fecha en el cuerpo de la solicitud
                    start: newStartDate,
                    end: newEndDate
                })
            })
            .then(response => response.json())
            .then(data => { 
                console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor
            })
            .catch(error => { 
                console.error('Error:', error); // Manejo de errores en la solicitud
            });
        },
        eventResize: function (info) { // Evento cuando se redimensiona un evento
            console.log('Evento redimensionado:', info.event); // Muestra el evento que ha sido redimensionado

            const newStartDate = info.event.start.toISOString(); // Obtener la nueva fecha de inicio del evento
            const newEndDate = info.event.end ? info.event.end.toISOString() : null; // Obtener la nueva fecha de fin del evento

            // Envía solicitud al servidor para actualizar la fecha
            fetch(`/events/${info.event.id}`, {
                method: 'PUT', // Usar PUT para la actualización
                headers: {
                    'Content-Type': 'application/json', // Especifica el tipo de contenido
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Incluye el token CSRF para protección
                },
                body: JSON.stringify({ // Envía la nueva fecha en el cuerpo de la solicitud
                    start: newStartDate,
                    end: newEndDate
                })
            })
            .then(response => response.json())
            .then(data => { 
                console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor
            })
            .catch(error => { 
                console.error('Error:', error); // Manejo de errores en la solicitud
            });
        },
        eventContent: function(info) {
            // Obtener la hora de inicio del evento y ajustar la hora sumando 7 horas
            var startTimeDate = new Date(info.event.start);
            startTimeDate.setHours(startTimeDate.getHours() + 6); // Sumar 7 horas
        
            // Convertir la hora de inicio a formato de 12 horas (AM/PM)
            var startTime = startTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        
            // Hacer lo mismo para la hora de fin, si el evento tiene una hora de fin.
            var endTime = info.event.end ? new Date(info.event.end) : null; 
            if (endTime) {
                endTime.setHours(endTime.getHours() + 6); // Sumar 5 horas
                endTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Convertir a formato de 12 horas
            } else {
                endTime = 'Sin hora de fin'; // Si no hay hora de fin, mostrar este texto.
            }
        
            // Devuelve el HTML que mostrará el título del evento, la hora de inicio y la hora de fin (si existe).
            return {
                html: '<b>' + info.event.title + '</b><br>' + // Título del evento en negrita.
                      '<span style="display: flex; align-items: center;">' + // Alineación a la izquierda por defecto
                      '<img src="/imagenes/punto-rojo.png" alt="Inicio" style="width:13px; height:10px; margin-right:5px;">' + 
                      'Inicio: ' + startTime + '</span>' + // Hora de inicio con un ícono rojo.
                      '<span style="display: flex; align-items: center;">' + // Alineación a la izquierda por defecto
                      '<img src="/imagenes/punto-verde.png" alt="Fin" style="width:13px; height:10px; margin-right:5px;">' + 
                      'Fin: ' + endTime + '</span>' // Hora de fin (o "Sin hora de fin") con un ícono verde.
            };  
        },
        eventDidMount: function(info) {// Al dar doble click mostrará la interfaz del dia de ese evento
            info.el.addEventListener('dblclick', function() {
                calendar.changeView('timeGridDay', info.event.start); // Cambia a la vista de 'Día' en la fecha del evento
            });
        }
    });

    document.getElementById('eliminar-evento').addEventListener('click', function() {// Manejar el clic del botón de eliminación
        const eventId = this.getAttribute('data-event-id'); // Obtiene el ID del evento desde el botón
    
        if (confirm('¿Estás seguro de que deseas eliminar este evento?')) { // Confirmar la eliminación del evento
            
            fetch(`/equipos/${eventId}`, {// Realiza la solicitud para eliminar el evento
                method: 'DELETE', // Usar DELETE para eliminar el equipo
                headers: {
                    'Content-Type': 'application/json', // Especifica el tipo de contenido
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Incluye el token CSRF
                }
            })
            .then(response => {
                if (!response.ok) {throw new Error('Error al eliminar el evento');}
                return response.json();
            })
            .then(data => {
                console.log('Evento eliminado:', data); // Muestra la respuesta del servidor
                console.log(`Eliminando evento con ID: ${eventId}`);
    
                calendar.getEventById(eventId)?.remove(); // Elimina el evento del calendario
                alert('Evento eliminado correctamente');// Muestra un mensaje de éxito al usuario (Opcional)
                location.reload(); //recargar a pagina al eliminar un evento
            })
            .catch(error => {
                console.error('Error:', error); // Manejo de errores
            });
        }
    });
    
    

    if(calendar){
        calendar.render(); //Mostrar Calendario en la interfaz
    } else { console.log("Error al Mostrar el Calendario"); }

    

});

