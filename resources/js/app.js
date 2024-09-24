//Script para mostrar las vistas de los botones en calendar.blade.php
document.addEventListener('DOMContentLoaded', function() {

    // Asignar eventos a los botones
    document.getElementById('equipos-btn').addEventListener('click', function() {
        mostrarVista('vista-equipos');
        mostrarCalendar();    // Mostrar el calendario al presionar "Equipos"
        ocultarBotones();     // Ocultar los "botones" al presionar "Equipos"
    });

    document.getElementById('detalles-btn').addEventListener('click', function() {
        mostrarVista('vista-detalles');
        mostrarCalendar();    // Mostrar el calendario al presionar "Detalles"
        ocultarBotones();     // Ocultar los "botones" al presionar "Detalles"
    });

    document.getElementById('agregar-btn').addEventListener('click', function() {
        mostrarVista('vista-agregar');
        ocultarCalendar();    // Ocultar el calendario al presionar "Agregar"
        mostrarBotones();     // Mostrar los "botones" al presionar "Agregar"
    });

    // Función para mostrar la vista seleccionada y ocultar las demás
    function mostrarVista(vistaId) {
        // Ocultar todas las vistas
        document.querySelectorAll('.vista').forEach(function(vista) {
            vista.style.display = 'none';
        });

        // Mostrar la vista seleccionada
        document.getElementById(vistaId).style.display = 'block';
    }

    // Función para ocultar el calendario
    function ocultarCalendar() {
        document.getElementById('calendar').style.display = 'none';
    }

    // Función para mostrar el calendario
    function mostrarCalendar() {
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
