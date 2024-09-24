//Script para mostrar las vistas de los botones en calendar.blade.php

document.addEventListener('DOMContentLoaded', function() {

    // Asignar eventos a los botones
    document.getElementById('equipos-btn').addEventListener('click', function() {
        mostrarVista('vista-equipos');
        mostrarCalendar();
        ocultarBotones();
    });

    document.getElementById('detalles-btn').addEventListener('click', function() {
        mostrarVista('vista-detalles');
        mostrarCalendar();
        ocultarBotones();
    });

    document.getElementById('agregar-btn').addEventListener('click', function() {
        mostrarVista('vista-agregar');
        ocultarCalendar();
        mostrarBotones();
    });


    // Función para mostrar la vista seleccionada y ocultar las demás
    function mostrarVista(vistaId) {
        document.querySelectorAll('.vista').forEach(function(vista) {
            vista.style.display = 'none'; // Ocultar todas las vistas
        });
        document.getElementById(vistaId).style.display = 'block'; // Mostrar la vista seleccionada
    }

    function ocultarCalendar() { // Función para ocultar el calendario
        document.getElementById('calendar').style.display = 'none';
    }

    function mostrarCalendar() { // Función para mostrar el calendario
        document.getElementById('calendar').style.display = 'block';
    }

    // Función para mostrar los botones de "Agregar" (solo cuando se presiona "Agregar")
    function mostrarBotones() {
        document.querySelector('.botones-agregar').style.display = 'block'; // Mostrar los "botones" de agregar
    }

    // Función para ocultar los botones (cuando se presiona "Equipos" o "Detalles")
    function ocultarBotones() {
        document.querySelector('.botones-agregar').style.display = 'none';  // Ocultar los "botones" de agregar
    }
});
