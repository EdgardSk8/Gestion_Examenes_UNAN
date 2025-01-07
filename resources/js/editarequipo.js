const editButton = document.getElementById('editar-evento');

if (editButton) {
    editButton.addEventListener('click', function () {
        const eventId = editButton.getAttribute('data-event-id'); // Obtener el ID del evento asignado al botón
        if (!eventId) {
            console.error('No se ha seleccionado ningún evento para editar.');
        } else {
            //console.log("ID del evento: ", eventId);
            Verificador();
            EditarEquipo(eventId); // Pasar el eventId para cargar los datos específicos
        }
    });
}

function Verificador() {
    const elementos = [
        'editartitulo', 'editararea', 'editardepartamento', 'editarcarrera', 'editarintegrante1', 'editarintegrante2', 'editarintegrante3',
        'editarfecha_asignada', 'editarfecha_aprobada', 'editarhora_inicio', 'editarhora_fin', 'editarcalificacion', 'editaredificio',
        'editaraula', 'editartipo_examen', 'editartutor', 'editarjuez1', 'editarjuez2', 'editarjuez3', 'guardar-cambios', 'resultado',
        'aviso'
    ];

    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) {
            console.log(`El elemento con el ID '${id}' no existe.`);
        }
    });
}

function EditarEquipo(id) {
    fetch(`/equipo/editar/${id}`) // Endpoint actualizado para obtener los datos del equipo
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener los datos del equipo: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            //console.log("Datos del equipo:", data);
            cargarAreaSelect(data.data); //Carga las areas y selecciona el area del evento
        })
        .catch(error => console.error('Error al cargar los datos del equipo:', error));
}

/*-------------------------------------------------------------------------------------------------------------------------------------------*/

//Referencias de ID de los selectores
const areaSelectEditar = document.getElementById('editararea'); 
const departamentoSelectEditar = document.getElementById('editardepartamento');
const carreraSelectEditar = document.getElementById('editarcarrera');
const edificioSelectEditar = document.getElementById('editaredificio');
const aulaSelectEditar = document.getElementById('editaraula');
const tipoexamenSelectEditar = document.getElementById('editartipo_examen');

function cargarAreaSelect(data) {

    areaSelectEditar.innerHTML = '';

    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(areas => {
            areas.forEach(area => {
                let option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                areaSelectEditar.appendChild(option);
            });

            const areaSeleccionada = areas.find(area => area.Nombre === data.area_conocimiento); //Autoseleccion del area del evento

            if (areaSeleccionada) {areaSelectEditar.value = areaSeleccionada.ID_Area;}
            // console.log("Área de conocimiento del evento:", data.area_conocimiento);
            cargarDepartamentoSelect(data);
            cargarEdificioSelect(data);
            cargarInputs(data);
            cargarTipoExamenSelect(data);
            CargarEstudiantesSelect(data);
        })
        .catch(error => console.error('Error al cargar las áreas:', error));
}

//En caso de cambiar opcion del selector areaSelectEditar
areaSelectEditar.addEventListener('change', function () { 
    const areaId = areaSelectEditar.value; //Guardar el ID del selector de areaSelectEditar
    //console.log("ID del area Seleccionado:", areaSelectEditar.value);

    departamentoSelectEditar.innerHTML = ''; //Limpiar el Selector

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) { // Verificar si no hay carreras en el departamento
                let option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay departamentos disponibles';
                departamentoSelectEditar.appendChild(option);

                carreraSelectEditar.innerHTML = '';
                let opcionsincarreras = document.createElement('option');
                opcionsincarreras.textContent = 'Seleccione un departamento';
                carreraSelectEditar.appendChild(opcionsincarreras);
            } else {
            data.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });
            departamentoSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
            departamentoSelectEditar.dispatchEvent(new Event('change'));
        }
    })
    .catch(error => console.error('Error fetching departamentos:', error));

    edificioSelectEditar.innerHTML = '';

    fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(edificios => {
            if (edificios.length === 0) {
               
                let option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay edificios disponibles';
                edificioSelectEditar.appendChild(option);
            } else {
                edificios.forEach(edificio => {
                    let option = document.createElement('option');
                    option.value = edificio.ID_Edificio;
                    option.textContent = edificio.Nombre_Edificio;
                    edificioSelectEditar.appendChild(option);
                });
                edificioSelectEditar.selectedIndex = 0;// Autoseleccionar la primera opción
                edificioSelectEditar.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => console.error('Error fetching edificios:', error));
});

function cargarDepartamentoSelect(data) {

    const areaId = areaSelectEditar.value;
    departamentoSelectEditar.innerHTML = '';

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(departamentos => {
            departamentos.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el departamento asociado al evento
            const departamentoSeleccionado = departamentos.find(departamento => departamento.Nombre === data.departamento);
           
            if (departamentoSeleccionado) {departamentoSelectEditar.value = departamentoSeleccionado.ID_Departamento;
                //console.log("Departamento seleccionado automáticamente:", departamentoSeleccionado.Nombre);
            } else if (departamentos.length > 0) {departamentoSelectEditar.selectedIndex = 0;
                console.log("No se encontró el departamento del evento, se seleccionó el primero.");
            }
            cargarCarreraSelect(data);
        })
        .catch(error => console.error('Error al cargar los departamentos:', error));
}

function cargarCarreraSelect(data){

    const departamentoId = departamentoSelectEditar.value;
    carreraSelectEditar.innerHTML = '';

    fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
        .then(response => response.json())
        .then(carreras => {
            carreras.forEach(carrera => {
                let option = document.createElement('option');
                option.value = carrera.ID_Carrera;
                option.textContent = carrera.Nombre;
                carreraSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente la carrera asociada al evento
            const carreraSeleccionada = carreras.find(carrera => carrera.Nombre === data.carrera);

            if (carreraSeleccionada) {carreraSelectEditar.value = carreraSeleccionada.ID_Carrera;
                //console.log("Departamento seleccionado automáticamente:", carreraSeleccionada.Nombre);
            } else if (carreras.length > 0) {carreraSelectEditar.selectedIndex = 0;
                console.log("No se encontró el carrera del evento, se seleccionó el primero.");
            }
            carreraSelectEditar.dispatchEvent(new Event('change'));
            CargarEstudiantesSelect(data);
        })
        .catch(error => console.error('Error al cargar las carreras:', error));
}

//En caso de cambiar opcion del selector departamentoSelectEditar
departamentoSelectEditar.addEventListener('change', function () { 
    const departamentoId = departamentoSelectEditar.value; //Guardar el ID del selector de departamentoSelectEditar
    console.log("ID del Departamento Seleccionado:", departamentoSelectEditar.value);

    carreraSelectEditar.innerHTML = ''; //Limpiar el Selector

    if(departamentoId){
        fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) { // Verificar si no hay carreras en el departamento
                    let option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'Departamento sin carrera';
                    carreraSelectEditar.appendChild(option);
                } else {
                data.forEach(carrera => {
                    let option = document.createElement('option');
                    option.value = carrera.ID_Carrera;
                    option.textContent = carrera.Nombre;
                    carreraSelectEditar.appendChild(option);
                });
                carreraSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
            }
        })
        .catch(error => console.error('Error fetching departamentos:', error));
    }
});

function cargarEdificioSelect(data) {

    const areaId = areaSelectEditar.value;
    edificioSelectEditar.innerHTML = '';

    fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(edificios => {
            edificios.forEach(edificio => {
                let option = document.createElement('option');
                option.value = edificio.ID_Edificio;
                option.textContent = edificio.Nombre_Edificio;
                edificioSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el edificio asociado al evento
            const edificioSeleccionado = edificios.find(edificio => edificio.Nombre_Edificio === data.edificio);
           
            if (edificioSeleccionado) {edificioSelectEditar.value = edificioSeleccionado.ID_Edificio;
                //console.log("Edificio seleccionado automáticamente:", edificioSeleccionado.Nombre_Edificio);
            } else if (edificios.length > 0) {edificioSelectEditar.selectedIndex = 0;
                console.log("No se encontró el edificio del evento, se seleccionó el primero.");
            }
            cargarAulaSelect(data);
        })
        .catch(error => console.error('Error al cargar los edificios:', error));
}

function cargarAulaSelect(data) {

    const edificioId = edificioSelectEditar.value;
    aulaSelectEditar.innerHTML = '';

    fetch(`/aula?edificioId=${encodeURIComponent(edificioId)}`)
        .then(response => response.json())
        .then(aulas => {
            aulas.forEach(aula => {
                let option = document.createElement('option');
                option.value = aula.ID_Aula;
                option.textContent = aula.Nombre_Aula;
                aulaSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el aula asociado al evento
            const aulaSeleccionada = aulas.find(aula => aula.Nombre_Aula === data.aula);
           
            if (aulaSeleccionada) {aulaSelectEditar.value = aulaSeleccionada.ID_Aula;
                //console.log("Aula seleccionada automáticamente:", aulaSeleccionada.Nombre_Aula);
            } else if (aulas.length > 0) {aulaSelectEditar.selectedIndex = 0;
                console.log("No se encontró la aula del evento, se seleccionó el primero.");
            }
            aulaSelectEditar.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error al cargar los aula:', error));
}

edificioSelectEditar.addEventListener('change', function(){
    const edificioId = edificioSelectEditar.value; //Guardar el ID del selector de edificioSelectEditar

    aulaSelectEditar.innerHTML = ''; //Limpiar el Selector

    if(edificioId){
        fetch(`/aula?edificioId=${encodeURIComponent(edificioId)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) { // Verificar si no hay aulas en el edificio
                    let option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'Edificio sin aulas';
                    aulaSelectEditar.appendChild(option);
                } else {
                data.forEach(aula => {
                    let option = document.createElement('option');
                    option.value = aula.ID_Carrera;
                    option.textContent = aula.Nombre_Aula;
                    aulaSelectEditar.appendChild(option);
                });
                aulaSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
            }
        })
        .catch(error => console.error('Error fetching departamentos:', error));
    }
});

function cargarTipoExamenSelect(data) {

    tipoexamenSelectEditar.innerHTML = '';

    fetch('/tipoexamen')
        .then(response => response.json())
        .then(tipoexamenes => {
            tipoexamenes.forEach(tipoexamen => {
                let option = document.createElement('option');
                option.value = tipoexamen.ID_Tipo_Examen;
                option.textContent = tipoexamen.Nombre;
                tipoexamenSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el tipo de examen asociada al evento
            const tipoexamenSeleccionado = tipoexamenes.find(tipoexamen => tipoexamen.Nombre === data.tipo_examen);

            if (tipoexamenSeleccionado) {tipoexamenSelectEditar.value = tipoexamenSeleccionado.ID_Tipo_Examen;
                //console.log("Tipo Examen seleccionado automáticamente:", tipoexamenSeleccionado.Nombre);
            } else if (tipoexamen.length > 0) {tipoexamenSelectEditar.selectedIndex = 0;
                console.log("No se encontró el carrera del evento, se seleccionó el primero.");
            }
            tipoexamenSelectEditar.dispatchEvent(new Event('change')); 
        })
        .catch(error => {
            console.error('Error al obtener los tipos de examen:', error);
        });

        const examenDiv = document.getElementById('tipoexameneditar');

        tipoexamenSelectEditar.addEventListener('change', function () {

            const opcionSeleccionadaTE = tipoexamenSelectEditar.options[tipoexamenSelectEditar.selectedIndex];

                // Condición para ocultar o mostrar el div "tipoexameneditar"
                if (opcionSeleccionadaTE.text === 'Grado') {examenDiv.style.display = 'none'; // Oculta el formulario
                    const tutoreditar = document.getElementById('editartutor'); tutoreditar.innerHTML = ''; //Limpiar los Selectores
                    const juez1editar = document.getElementById('editarjuez1'); juez1editar.innerHTML = '';
                    const juez2editar = document.getElementById('editarjuez2'); juez2editar.innerHTML = '';
                    const juez3editar = document.getElementById('editarjuez3'); juez3editar.innerHTML = '';
                } else {examenDiv.style.display = 'block';} // Muestra el formulario
                //console.log(`Opción seleccionada: ${opcionSeleccionadaTE.text} (Valor: ${opcionSeleccionadaTE.value})`);
        });
}

function CargarEstudiantesSelect(data) {
    var integranteSelects = [
        document.getElementById('editarintegrante1'),
        document.getElementById('editarintegrante2'),
        document.getElementById('editarintegrante3'),
    ];

    var estudiantes = []; // Lista global de estudiantes disponibles

    // Función para llenar un select con opciones
    function llenarSelectEstudiante(selectElement, estudiantesDisponibles) {
        selectElement.innerHTML = '';

        if (estudiantesDisponibles.length > 0) {
            estudiantesDisponibles.forEach(estudiante => {
                let option = document.createElement('option');
                option.value = estudiante.ID_Estudiante;
                option.textContent = estudiante.Nombre_Completo;
                selectElement.appendChild(option);
            });
        }
    }

    // Función para cargar estudiantes según la carrera seleccionada
    function cargarEstudiantesPorCarrera(carreraId) {
        if (!carreraId) {
            console.error("Carrera no seleccionada");
            return;
        }

        fetch(`/estudiante?carreraId=${encodeURIComponent(carreraId)}`)
            .then(response => response.json())
            .then(dataEstudiantes => {
                estudiantes = dataEstudiantes;
                if (estudiantes.length > 0) {
                    integrarSelectsConEstudiantes(estudiantes, data); // Pasar también los datos para la selección automática
                } else {
                    console.warn("No hay estudiantes disponibles para esta carrera.");
                }
            })
            .catch(error => {
                console.error('Error al obtener los estudiantes:', error);
            });
    }

    // Función para integrar selects con la lista de estudiantes y autoseleccionarlos
    function integrarSelectsConEstudiantes(estudiantes, data) {
        integranteSelects.forEach((select, index) => {
            llenarSelectEstudiante(select, estudiantes);

            // Autoseleccionar si hay datos en `data`
            const estudianteSeleccionado = estudiantes.find(
                estudiante => estudiante.ID_Estudiante === data[`integrante${index + 1}`]
            );

            if (estudianteSeleccionado) {
                select.value = estudianteSeleccionado.ID_Estudiante;
            } else {
                console.warn(`No se encontró el estudiante para el integrante ${index + 1}`);
            }
        });

        // Actualizar para evitar duplicados
        actualizarSelects();
    }

    // Función para actualizar los selects y evitar duplicados
    function actualizarSelects() {
        const seleccionados = integranteSelects.map(select => select.value);

        integranteSelects.forEach(select => {
            Array.from(select.options).forEach(option => {
                if (seleccionados.includes(option.value) && option.value !== '') {
                    option.style.display = 'none'; // Ocultar opciones ya seleccionadas
                } else {
                    option.style.display = ''; // Mostrar opciones no seleccionadas
                }
            });
        });
    }

    // Event listener para cuando se cambie la carrera seleccionada
    carreraSelectEditar.addEventListener('change', function () {
        const carreraId = carreraSelectEditar.value;
        cargarEstudiantesPorCarrera(carreraId);
    });

    // Cargar estudiantes para la carrera seleccionada inicialmente
    const carreraIdInicial = carreraSelectEditar.value;
    if (carreraIdInicial) {
        cargarEstudiantesPorCarrera(carreraIdInicial);
    }

    // Event listeners para actualizar los selects al cambiar un integrante
    integranteSelects.forEach(select => {
        select.addEventListener('change', actualizarSelects);
    });
}



function cargarInputs(data){
    
    const inputTitulo = document.getElementById('editartitulo');
    if (inputTitulo) {inputTitulo.value = data.titulo;} else{console.error("No se encontró el input con ID 'editartitulo'.");}

    const inputFechaAsignada = document.getElementById('editarfecha_asignada');
    if (inputFechaAsignada) {inputFechaAsignada.value = data.fecha_asignada;} else{console.error("No se encontró el input con ID 'editarfecha_asignada'.");}

    const inputFechaAprobada = document.getElementById('editarfecha_aprobada');
    if (inputFechaAprobada) {inputFechaAprobada.value = data.fecha_aprobada;} else{console.error("No se encontró el input con ID 'editarfecha_aprobada'.");}

    const inputHoraInicio = document.getElementById('editarhora_inicio');
    if (inputHoraInicio) {inputHoraInicio.value = data.hora_inicio;} else {console.error("No se encontró el input con ID 'editarhora_inicio'.");}

    const inputHoraFin = document.getElementById('editarhora_fin');
    if (inputHoraFin) {inputHoraFin.value = data.hora_fin;} else {console.error("No se encontró el input con ID 'editarhora_fin'.");}

    const inputCalificacion = document.getElementById('editarcalificacion');
    if (inputCalificacion) {inputCalificacion.value = data.calificacion;} else {console.error("No se encontró el input con ID 'editarcalificacion'.");}

}
