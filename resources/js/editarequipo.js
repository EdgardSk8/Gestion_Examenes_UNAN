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
                     console.log('Area:', equipo.area_conocimiento || 'No'); //funciona

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

                    // Cargar las áreas de conocimiento
                    fetch('/area-conocimiento')
                        .then(response => response.json())
                        .then(areas => {
                            const areaSelect = document.getElementById('editararea');
                            areas.forEach(area => {
                                const option = document.createElement('option');
                                option.value = area.ID_Area;
                                option.textContent = area.Nombre;
                                areaSelect.appendChild(option);
                            });

                            console.log('Área seleccionada:', equipo.area_conocimiento);
                            areas.forEach(area => {
                                console.log('Option value:', area.ID_Area, 'Option text:', area.Nombre);
                            });


                            // Seleccionar el área de conocimiento
                            document.getElementById('editararea').value = equipo.area_conocimiento || '';
                            
                            // Cargar los departamentos correspondientes al área seleccionada
                            cargardepartamentos(equipo.area_conocimiento, equipo.departamento, equipo.carrera);
                        })
                        .catch(error => console.error('Error al cargar las áreas de conocimiento:', error));
                } else {
                    console.error('Error en la respuesta:', data.message);
                }
            })

            // Función para cargar los departamentos según el área seleccionada
            function cargardepartamentos(areaId, selectedDepartamentoId, selectedCarreraId) {
                fetch(`/departamentos?idArea=${areaId}`)
                    .then(response => response.json())
                    .then(departamentos => {
                        const departamentoSelect = document.getElementById('editardepartamento');
                        departamentoSelect.innerHTML = ''; // Limpiar el selector

                        departamentos.forEach(departamento => {
                            const option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            departamentoSelect.appendChild(option);
                        });

                        // Seleccionar el departamento correspondiente
                        document.getElementById('editardepartamento').value = selectedDepartamentoId || '';

                        // Cargar las carreras correspondientes al departamento seleccionado
                        cargarcarreras(selectedDepartamentoId, selectedCarreraId);
                    })
                    .catch(error => console.error('Error al cargar los departamentos:', error));
            }

            // Función para cargar las carreras correspondientes al departamento seleccionado
            function cargarcarreras(departamentoId, selectedCarreraId) {
                fetch(`/carreras?departamentoId=${departamentoId}`)
                    .then(response => response.json())
                    .then(carreras => {
                        const carreraSelect = document.getElementById('editarcarrera');
                        carreraSelect.innerHTML = ''; // Limpiar el selector

                        carreras.forEach(carrera => {
                            const option = document.createElement('option');
                            option.value = carrera.ID_Carrera;
                            option.textContent = carrera.Nombre;
                            carreraSelect.appendChild(option);
                        });

                        // Seleccionar la carrera correspondiente
                        document.getElementById('editarcarrera').value = selectedCarreraId || '';
                    })
                    .catch(error => console.error('Error al cargar las carreras:', error));
            }

});