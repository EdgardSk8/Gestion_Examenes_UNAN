//Script para mostrar las vistas de los botones en calendar.blade.php

document.addEventListener('DOMContentLoaded', function() {

    // Asignar eventos a los botones

    document.getElementById('equipos-btn').addEventListener('click', function() {
        mostrarVista('vista-equipos');
    });

    document.getElementById('detalles-btn').addEventListener('click', function() {
        mostrarVista('vista-detalles');
    });

    document.getElementById('agregar-btn').addEventListener('click', function() {
        mostrarVista('vista-agregar');
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
});
