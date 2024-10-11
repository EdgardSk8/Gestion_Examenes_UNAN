<!-- equipodetalle.blade.php -->

@vite(['resources/css/Vista_Principal/equipodetalle.css']) <!-- Integracion de archivo de estilo css-->
@vite(['resources/js/tables/equipodetalle.js'])<!-- Integracion de la logica JS -->

<label>Detalles de Equipos</label>

<!-- Botón para eliminar el evento -->
<button id="eliminar-evento" style="width: 30px; height: 30px;">
    <img src="/imagenes/papelera.png" alt="papelera" style="width: 100%; height: 100%;">
</button>

<script>
    // Suponiendo que estás usando FullCalendar y ya tienes el evento seleccionado

document.getElementById('eliminar-evento').addEventListener('click', function() {
    // Verificar si hay un evento seleccionado
    if (selectedEvent) { // 'selectedEvent' debe ser la variable donde guardas el evento seleccionado
        // Realizar la petición AJAX para eliminar el evento
        fetch(`/eventos/${selectedEvent.id}`, { // Asegúrate de tener la ruta correcta
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Si usas CSRF
            }
        })
        .then(response => {
            if (response.ok) {
                // Eliminar el evento del calendario
                calendar.refetchEvents(); // O usa calendar.removeEvent(selectedEvent.id); para eliminarlo del calendario
                alert('Evento eliminado correctamente.');
            } else {
                alert('Error al eliminar el evento.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el evento.');
        });
    } else {
        alert('No hay un evento seleccionado para eliminar.');
    }
});

</script>

<div id="equipo-detalle">

    <div style="display: flex; justify-content: center; align-items: center; height: 100%;" id="vista-inicio">
        <p style="text-align: center;">Presione un evento para mostrar su información</p>
    </div>

    <table class="equipos-table" style="display: none"> <!-- Tabla de detalles del evento en Calendario -->

        <thead>
            <tr>
                <th>Descripción</th>
                <th>Detalles</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Titulo</td>
                <td></td>
            </tr>
            <tr>
                <td>Integrante 1</td>
                <td></td>
            </tr>
            <tr>
                <td>Integrante 2</td>
                <td></td>
            </tr>
            <tr>
                <td>Integrante 3</td>
                <td></td>
            </tr>
            <tr>
                <td>Fecha Asignada</td>
                <td></td>
            </tr>
            <tr>
                <td>Fecha Aprobada</td>
                <td></td>
            </tr>
            <tr>
                <td>Hora Inicio</td>
                <td></td>
            </tr>
            <tr>
                <td>Hora Fin</td>
                <td></td>
            </tr>
            
            <tr>
                <td>Aula</td>
                <td></td>
            </tr>
            <tr>
                <td>Tipo de Examen</td>
                <td></td>
            </tr>
            <tr>
                <td>Tutor</td>
                <td></td>
            </tr>
            <tr>
                <td>Calificación</td>
                <td></td>
            </tr>
            <tr>
                <td>Juez 1</td>
                <td></td>
            </tr>
            <tr>
                <td>Juez 2</td>
                <td></td>
            </tr>
            <tr>
                <td>Juez 3</td>
                <td></td>
            </tr>
            <tr>
                <td>Carrera</td>
                <td></td>
            </tr>

        </tbody>
        
    </table>
</div>

