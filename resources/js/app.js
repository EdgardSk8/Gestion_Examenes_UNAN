//Script para mostrar las vistas de los botones en calendar.blade.php

document.addEventListener('DOMContentLoaded', function() {

    // Asignar eventos a los botones
    document.getElementById('equipos-btn').addEventListener('click', function() {
        mostrarVista('vista-equipos');
        mostrarCalendar();
        ocultarlogin();
    });

    document.getElementById('detalles-btn').addEventListener('click', function() {
        mostrarVista('vista-detalles');
        mostrarCalendar();
        ocultarlogin();
    });

    document.getElementById('agregar-btn').addEventListener('click', function() {
        mostrarVista('vista-agregar');
        ocultarCalendar();
        mostrarlogin();
    });

    document.getElementById('editar-evento').addEventListener('click', function() {
        mostrarVista('vista-editar-equipo');
        ocultarCalendar();
        mostrarlogin();
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

    function ocultarlogin() { 
        document.getElementById('login').style.display = 'none';
    }

    function mostrarlogin() { 
        document.getElementById('login').style.display = 'block';
    }

});



