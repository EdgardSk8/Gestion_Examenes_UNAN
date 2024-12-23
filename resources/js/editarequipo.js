const editButton = document.getElementById('editar-evento');

if (editButton) {
    editButton.addEventListener('click', function () {
        const eventId = editButton.getAttribute('data-event-id'); // Obtener el ID del evento asignado al botón

        if (!eventId) {console.error('No se ha seleccionado ningún evento para editar.');
            return;
        }

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
                    
                        //Depurador(equipo);
                        AsignarInputs(equipo);
                        RetornarTipoExamen(equipo);
                        RetornarArea_Conocimiento(equipo);

                    }
            });
    });

    function AsignarInputs(equipo){ //Funcion para mostrar los datos retornados en inputs
        document.getElementById('editartitulo').value = equipo.titulo || 'No especificado';
        document.getElementById('editarfecha_asignada').value = equipo.fecha_asignada || 'Sin Fecha Asignada';
        document.getElementById('editarfecha_aprobada').value = equipo.fecha_aprobada || 'Asignar Fecha Aprobada';
        document.getElementById('editarhora_inicio').value = equipo.hora_inicio || 'Sin Hora de Inicio';
        document.getElementById('editarhora_fin').value = equipo.hora_fin || 'Sin Hora de Fin';
        document.getElementById('editarcalificacion').value = equipo.calificacion || '0';
    }

    function RetornarTipoExamen(equipo){ //Funcion para mostrar mostrar en option el tipo de examen retornado
        const editartipoexamenSelect = document.getElementById('editartipo_examen');
        let optiontipoexamen = document.createElement('option');
        optiontipoexamen.textContent = equipo.tipo_examen;
        editartipoexamenSelect.appendChild(optiontipoexamen);

        const exameneditarDIV = document.getElementById('tipoexameneditar');
        if(editartipoexamenSelect.textContent === "Grado"){ exameneditarDIV.style.display = 'none';}
        else{exameneditarDIV.style.display = 'block';}
    }

    function RetornarArea_Conocimiento(equipo){ //Funcion para mostrar mostrar en option el tipo de area retornado
        const editarArea_ConocimientoSelect = document.getElementById('editararea');
        let optionarea_conocimiento = document.createElement('option');
        optionarea_conocimiento.textContent = equipo.area_conocimiento;
        editarArea_ConocimientoSelect.appendChild(optionarea_conocimiento);
    }

    function Depurador(equipo) { // Función para depurar los datos
        console.log('Título del equipo:', equipo.titulo || 'No especificado');
        console.log('Integrante 1:', equipo.integrante1 || 'No especificado');
        console.log('Integrante 2:', equipo.integrante2 || 'No especificado');
        console.log('Integrante 3:', equipo.integrante3 || 'No especificado');
        console.log('Fecha asignada:', equipo.fecha_asignada || 'No especificada');
        console.log('Fecha aprobada:', equipo.fecha_aprobada || 'No especificada');
        console.log('Hora de inicio:', equipo.hora_inicio || 'No especificada');
        console.log('Hora de fin:', equipo.hora_fin || 'No especificada');
        console.log('Aula:', equipo.aula || 'No especificada');
        console.log('Tipo de examen:', equipo.tipo_examen || 'No especificado');
        console.log('Tutor:', equipo.tutor || 'No especificado');
        console.log('Calificación:', equipo.calificacion || 'No especificada');
        console.log('Juez 1:', equipo.juez1 || 'No especificado');
        console.log('Juez 2:', equipo.juez2 || 'No especificado');
        console.log('Juez 3:', equipo.juez3 || 'No especificado');
        console.log('Carrera:', equipo.carrera || 'No especificada');
        console.log('Departamento:', equipo.departamento || 'No especificado');
        console.log('Área:', equipo.area_conocimiento || 'No especificado');
    }

}
