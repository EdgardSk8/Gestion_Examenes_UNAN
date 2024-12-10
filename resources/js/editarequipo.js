// Asociar el evento de clic al botón "Editar"
const editButton = document.getElementById('editar-evento');

editButton.addEventListener('click', function () {
    const eventId = editButton.getAttribute('data-event-id'); // Obtener el ID del evento asignado al botón

    if (!eventId) {
        console.error('No se ha seleccionado ningún evento para editar.');
        return;
    }

    // Realizar la solicitud para obtener los detalles del evento
    fetch(`/equipo/editar/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener los datos del evento: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            
            if (data.success) {
                const equipo = data.data;

                // console.log('Título del equipo:', equipo.titulo || 'No especificado'); //funciona
                // console.log('Integrante 1:', equipo.integrante1 || 'No especificado'); //funciona
                // console.log('Integrante 2:', equipo.integrante2 || 'No especificado'); //funciona
                // console.log('Integrante 3:', equipo.integrante3 || 'No especificado'); //funciona
                // console.log('Fecha asignada:', equipo.fecha_asignada || 'No especificada'); //funciona
                // console.log('Fecha aprobada:', equipo.fecha_aprobada || 'No especificada'); //funciona
                // console.log('Hora de inicio:', equipo.hora_inicio || 'No especificada'); //funciona
                // console.log('Hora de fin:', equipo.hora_fin || 'No especificada'); //funciona
                // console.log('Aula:', equipo.aula || 'No especificada'); //funciona
                // console.log('Tipo de examen:', equipo.tipo_examen || 'No especificado'); //funciona
                // console.log('Tutor:', equipo.tutor || 'No especificado'); //funciona 
                // console.log('Calificación:', equipo.calificacion || 'No especificada'); //funciona
                // console.log('Juez 1:', equipo.juez1 || 'No especificado'); //funciona 
                // console.log('Juez 2:', equipo.juez2 || 'No especificado'); //funciona
                // console.log('Juez 3:', equipo.juez3 || 'No especificado'); //funciona
                // console.log('Carrera:', equipo.carrera || 'No especificada'); //funciona
                // console.log('Departamento:', equipo.departamento || 'No'); //funciona
                // console.log('Area:', equipo.area_conocimiento || 'No'); //funciona

                // Asignar los valores de los integrantes (nombres de estudiantes)
                document.getElementById('editarintegrante1').value = equipo.integrante1 || '';
                document.getElementById('editarintegrante2').value = equipo.integrante2 || '';
                document.getElementById('editarintegrante3').value = equipo.integrante3 || '';
        
                // Rellenar otros campos de equipo, si es necesario
                document.getElementById('editartitulo').value = equipo.titulo || '';
                document.getElementById('editarfecha_asignada').value = equipo.fecha_asignada || '';
                document.getElementById('editarfecha_aprobada').value = equipo.fecha_aprobada || '';
                document.getElementById('editarhora_inicio').value = equipo.hora_inicio || '';
                document.getElementById('editarhora_fin').value = equipo.hora_fin || '';
                document.getElementById('editaraula').value = equipo.aula || '';
                document.getElementById('editartipo_examen').value = equipo.tipo_examen || '';
                document.getElementById('editartutor').value = equipo.tutor || '';
                document.getElementById('editarcalificacion').value = equipo.calificacion || '';
                document.getElementById('editarjuez1').value = equipo.juez1 || '';
                document.getElementById('editarjuez2').value = equipo.juez2 || '';
                document.getElementById('editarjuez3').value = equipo.juez3 || '';
                document.getElementById('editarcarrera').value = equipo.carrera || '';
        
                // Hacer visible el formulario de edición
                document.querySelector('.contenedor-editar').style.display = 'block';
            } else {
                console.error('Error en la respuesta:', data.message);
            }
        })

    });