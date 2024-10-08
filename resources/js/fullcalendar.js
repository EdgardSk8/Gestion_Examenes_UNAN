// resources/js/fullcalendar.js

import './bootstrap'; 
import { Calendar } from '@fullcalendar/core'; // Importa el componente Calendar de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa el plugin para vista de cuadrícula de días
import interactionPlugin from '@fullcalendar/interaction'; // Importa el plugin para interacciones
import timeGridPlugin from '@fullcalendar/timegrid'; // Importa el plugin para vista de cuadrícula de tiempo
import esLocale from '@fullcalendar/core/locales/es'; // Importa la localización en español

document.addEventListener('DOMContentLoaded', function () { //ARREGLAR VISTA DEL CALENDARIO, QUE SOLO MUESTRE TITULO Y NO HORA, ADEMAS DE CAMBIAR EL COLOR DE LOS EVENTOS

    var calendarEl = document.getElementById('calendar'); // Selecciona el elemento donde se renderiza el calendario

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
        events: '/events', // Ruta para obtener eventos del servidor

        eventClick: function(info) { // Evento cuando se hace clic en un evento del calendario
            var eventId = info.event.id; // Obtiene el ID del evento clicado

            fetch(`/events/${eventId}`) // Realiza una solicitud para obtener detalles del evento
                .then(response => response.json())
                .then(data => {

                    // Procesa la fecha y horas del evento
                    const dateAssigned = new Date(data.fecha_asignada); // Crea un objeto de fecha a partir de la fecha asignada
                    const startHour = new Date(dateAssigned.getFullYear(), dateAssigned.getMonth(), dateAssigned.getDate(), ...data.hora_inicio.split(':')); // Crea un objeto de fecha para la hora de inicio
                    const endHour = new Date(dateAssigned.getFullYear(), dateAssigned.getMonth(), dateAssigned.getDate(), ...data.hora_fin.split(':')); // Crea un objeto de fecha para la hora de fin

                    // Formatear las horas para mostrar en la interfaz
                    const formattedStartHour = startHour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
                    const formattedEndHour = endHour.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

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
                })
                .catch(error => console.error('Error al obtener los detalles del evento:', error)); // Manejo de errores en la solicitud
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
        }
    });

    if(calendar){
        calendar.render(); //Mostrar Calendario en la interfaz
    } else { console.log("Error al Mostrar el Calendario"); }
});
