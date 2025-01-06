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

                        console.log("Equipo: ", equipo);
                        //Depurador(equipo);
                        AsignarInputs(equipo);
                        // RetornarTipoExamen(equipo);
                        // RetornarArea_Conocimiento(equipo);
                        // RetornarDepartamento(equipo);
                        // RetornarCarrera(equipo);
                        // RetornarEdificio(equipo);
                        //RetornarAula(equipo);
                        //RetornarEstudiantes(equipo);
                        //RetornarProfesores(equipo);

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

    function RetornarTipoExamen(equipo) {
        const editartipoexamenSelect = document.getElementById('editartipo_examen');
        const exameneditarDIV = document.getElementById('tipoexameneditar');
    
        let optiontipoexamen = document.createElement('option');
        optiontipoexamen.textContent = equipo.tipo_examen;
        editartipoexamenSelect.appendChild(optiontipoexamen);
    
        if (equipo.tipo_examen === "Grado") {exameneditarDIV.style.display = 'none';} else {exameneditarDIV.style.display = 'block';}
    
        editartipoexamenSelect.addEventListener('change', function () {
            if (editartipoexamenSelect.value === "Grado") {exameneditarDIV.style.display = 'none';} 
            else {exameneditarDIV.style.display = 'block';}
        });
    }
    
    function RetornarArea_Conocimiento(equipo){ //Funcion para mostrar mostrar en option el tipo de area retornado
        const editarArea_ConocimientoSelect = document.getElementById('editararea');
        let optionarea_conocimiento = document.createElement('option');
        optionarea_conocimiento.textContent = equipo.area_conocimiento;
        editarArea_ConocimientoSelect.appendChild(optionarea_conocimiento);
    }

    function RetornarDepartamento(equipo){ //Funcion para mostrar mostrar en option el tipo de departamento retornado
        const editarDepartamentoSelect = document.getElementById('editardepartamento');
        let optiondepartamento = document.createElement('option');
        optiondepartamento.textContent = equipo.departamento;
        editarDepartamentoSelect.appendChild(optiondepartamento);
    }

    function RetornarCarrera(equipo){ //Funcion para mostrar mostrar en option el tipo de carrera retornada
        const editarCarreraSelect = document.getElementById('editarcarrera');
        let optioncarrera = document.createElement('option');
        optioncarrera.textContent = equipo.carrera;
        editarCarreraSelect.appendChild(optioncarrera);
    }

    function RetornarEdificio(equipo){ //Funcion para mostrar mostrar en option el tipo de carrera retornada
        const editarEdificioSelect = document.getElementById('editaredificio');
        let optionedificio = document.createElement('option');
        optionedificio.textContent = equipo.edificio;
        editarEdificioSelect.appendChild(optionedificio);
    }

    function RetornarAula(equipo){ //Funcion para mostrar mostrar en option el tipo de carrera retornada
        const editarAulaSelect = document.getElementById('editaraula');
        let optionaula = document.createElement('option');
        optionaula.textContent = equipo.aula;
        editarAulaSelect.appendChild(optionaula);
    }

    function RetornarEstudiantes(equipo) {
        const integrante1Select = document.getElementById('editarintegrante1');
        const integrante2Select = document.getElementById('editarintegrante2');
        const integrante3Select = document.getElementById('editarintegrante3');
    
        // Estudiantes disponibles
        const estudiantes = [
            { id: 1, nombre: equipo.integrante1 }, // Usa un valor único o identifica a los estudiantes correctamente
            { id: 2, nombre: equipo.integrante2 },
            { id: 3, nombre: equipo.integrante3 }
        ];
    
        // Función para actualizar las opciones según la selección
        function actualizarOpciones(select, seleccionados, predeterminado) {
            select.innerHTML = '';
    
            estudiantes.forEach(estudiante => {
                if (!seleccionados.includes(estudiante.id) || estudiante.id === predeterminado) {
                    let option = document.createElement('option');
                    option.value = estudiante.id;
                    option.textContent = estudiante.nombre;
    
                    if (estudiante.id === predeterminado) {option.selected = true;}
                    select.appendChild(option);
                }
            });
        }
    
        // Obtener los IDs actuales de los integrantes
        const idIntegrante1 = 1; // Ajusta este valor según el ID real
        const idIntegrante2 = 2; // Ajusta este valor según el ID real
        const idIntegrante3 = 3; // Ajusta este valor según el ID real
    
        // Inicializar los selectores con los valores predeterminados
        actualizarOpciones(integrante1Select, [idIntegrante2, idIntegrante3], idIntegrante1);
        actualizarOpciones(integrante2Select, [idIntegrante1, idIntegrante3], idIntegrante2);
        actualizarOpciones(integrante3Select, [idIntegrante1, idIntegrante2], idIntegrante3);
    
        // Evento para actualizar los selectores al cambiar
        function asignarEventos(select, otrosSelects, propioId) {
            select.addEventListener('change', () => {
                const seleccionados = [
                    parseInt(integrante1Select.value),
                    parseInt(integrante2Select.value),
                    parseInt(integrante3Select.value)
                ].filter(id => id && id !== propioId); // Excluir valores vacíos y el propio ID
    
                otrosSelects.forEach(s => {
                    const predeterminado = parseInt(s.value); // Mantener el seleccionado actual
                    actualizarOpciones(s, seleccionados, predeterminado);
                });
            });
        }
    
        // Asignar eventos para la lógica de exclusión
        asignarEventos(integrante1Select, [integrante2Select, integrante3Select], idIntegrante1);
        asignarEventos(integrante2Select, [integrante1Select, integrante3Select], idIntegrante2);
        asignarEventos(integrante3Select, [integrante1Select, integrante2Select], idIntegrante3);
    }

    function RetornarProfesores(equipo) {
        const juez1Select = document.getElementById('editarjuez1');
        const juez2Select = document.getElementById('editarjuez2');
        const juez3Select = document.getElementById('editarjuez3');
        const tutorSelect = document.getElementById('editartutor');
    
        // Profesores disponibles
        const profesores = [
            { id: 1, nombre: equipo.juez1 }, // Usa un valor único o identifica a los profesores correctamente
            { id: 2, nombre: equipo.juez2 },
            { id: 3, nombre: equipo.juez3 },
            { id: 4, nombre: equipo.tutor }
        ];
    
        // Función para actualizar las opciones según la selección
        function actualizarOpciones(select, seleccionados, predeterminado) {
            select.innerHTML = '';
    
            profesores.forEach(profesor => {
                if (!seleccionados.includes(profesor.id) || profesor.id === predeterminado) {
                    let option = document.createElement('option');
                    option.value = profesor.id;
                    option.textContent = profesor.nombre;
    
                    if (profesor.id === predeterminado) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                }
            });
        }

        const idJuez1 = 1; 
        const idJuez2 = 2; 
        const idJuez3 = 3; 
        const idTutor = 4; 
    
        actualizarOpciones(juez1Select, [idJuez2, idJuez3, idTutor], idJuez1);
        actualizarOpciones(juez2Select, [idJuez1, idJuez3, idTutor], idJuez2);
        actualizarOpciones(juez3Select, [idJuez1, idJuez2, idTutor], idJuez3);
        actualizarOpciones(tutorSelect, [idJuez1, idJuez2, idJuez3], idTutor);
    
        function asignarEventos(select, otrosSelects, propioId) {
            select.addEventListener('change', () => {
                const seleccionados = [
                    parseInt(juez1Select.value),
                    parseInt(juez2Select.value),
                    parseInt(juez3Select.value),
                    parseInt(tutorSelect.value)
                ].filter(id => id && id !== propioId); // Excluir valores vacíos y el propio ID
    
                otrosSelects.forEach(s => {
                    const predeterminado = parseInt(s.value); // Mantener el seleccionado actual
                    actualizarOpciones(s, seleccionados, predeterminado);
                });
            });
        }
    
        asignarEventos(juez1Select, [juez2Select, juez3Select, tutorSelect], idJuez1);
        asignarEventos(juez2Select, [juez1Select, juez3Select, tutorSelect], idJuez2);
        asignarEventos(juez3Select, [juez1Select, juez2Select, tutorSelect], idJuez3);
        asignarEventos(tutorSelect, [juez1Select, juez2Select, juez3Select], idTutor);
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
        console.log('Edificio:', equipo.edificio || 'No especificado');
    }

}
