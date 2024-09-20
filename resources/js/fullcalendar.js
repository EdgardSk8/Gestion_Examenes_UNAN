// resources/js/fullcalendar.js
import './bootstrap';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, { // Inicializa FullCalendar

        plugins: [dayGridPlugin, interactionPlugin],
        locales: [esLocale], // Configura el calendario para usar el idioma español
        locale: 'es', // Establece el idioma del calendario en español

        headerToolbar: {
            left: 'prev,next today', // Botones de navegación a la izquierda
            center: 'title', // El título (mes y año) en el centro
            right: 'dayGridYear,dayGridMonth,dayGridWeek,dayGridDay' // Vistas del calendario a la derecha
        },

        editable: true, // Permite arrastrar y soltar los eventos
        droppable: true, // Permite soltar elementos externos en el calendario
        events: '/events', // Ruta para obtener eventos del servidor
        
        eventClick: function(info) { //Evento Click

            var eventId = info.event.id;

            fetch(`/events/${eventId}`)
                .then(response => response.json())
                .then(data => {

                    // Mostrar datos en la tabla de #equipo-detalle

                    // tr:nth-of-type(1) Referencia a la fila
                    // td:nth-of-type(2) Referencia a la columna

                    // Muestra los datos en la vista equipodetalle.blade.php

                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(1) td:nth-of-type(2)').textContent = data.titulo;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(2) td:nth-of-type(2)').textContent = data.integrante1;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(3) td:nth-of-type(2)').textContent = data.integrante2;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(4) td:nth-of-type(2)').textContent = data.integrante3;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(5) td:nth-of-type(2)').textContent = data.fecha_asignada;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(6) td:nth-of-type(2)').textContent = data.fecha_aprobada;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(7) td:nth-of-type(2)').textContent = data.hora_inicio;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(8) td:nth-of-type(2)').textContent = data.hora_fin;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(9) td:nth-of-type(2)').textContent = data.aula;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(10) td:nth-of-type(2)').textContent = data.tipo_examen;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(11) td:nth-of-type(2)').textContent = data.tutor;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(12) td:nth-of-type(2)').textContent = data.calificacion;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(13) td:nth-of-type(2)').textContent = data.juez1;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(14) td:nth-of-type(2)').textContent = data.juez2;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(15) td:nth-of-type(2)').textContent = data.juez3;
                    document.querySelector('#equipo-detalle .equipos-table tr:nth-of-type(16) td:nth-of-type(2)').textContent = data.carrera;

                    // /views/equipodetalle.blade.php
                    document.getElementById('vista-inicio').style.display = 'none'; // Oculta la vista de inicio
                    document.querySelector('.equipos-table').style.display = 'table'; // Muestra la tabla

                })
                .catch(error => console.error('Error al obtener los detalles del evento:', error));
        
        },
        eventReceive: function (info) {
            console.log('Evento recibido:', info.event); //Muestra si se recibió el evento traido del exterior
        },
        eventDrop: function (info) {
            console.log('Evento movido:', info.event); //Muestra mensaje si se movió o arrastró un elemento del calendario

            const newStartDate = info.event.start.toISOString(); // Obtener la nueva fecha de inicio del evento

            // Envia solicitud al servidor para actualizar la fecha
            fetch(`/events/${info.event.id}`, {
                method: 'PUT', // Usar PUT para la actualización
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    start: newStartDate
                })
            })
            .then(response => response.json())
            .then(data => { console.log('Respuesta del servidor:', data);})
            .catch(error => { console.error('Error:', error); });
        }
    });

    if(calendar){
        calendar.render(); //Mostrar Calendario en la interfaz
    } else { console.log("Error al Mostrar el Calendario"); }

});
