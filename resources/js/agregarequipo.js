document.addEventListener('DOMContentLoaded', function () {

    // Selecciona los elementos por ID
    
    const areaSelect = document.getElementById('area-select'); 
    const departamentoSelect = document.getElementById('departamento-select');
    const carreraSelect = document.getElementById('carrera-select'); 
    var edificioSelects = document.querySelectorAll('.edificio-select');
    var edificioSelect = document.getElementById('edificio-select');
    var aulaSelect = document.getElementById('aula-select');
    var tipoexamenSelect = document.getElementById('tipoexamen-select');


    // Añade la opción por defecto al área de conocimiento
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccionar área de conocimiento';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    areaSelect.appendChild(defaultOption);

    // Obtén las áreas de conocimiento
    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(data => {
            // Llena el select con las áreas de conocimiento
            data.forEach(area => {
                let option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                areaSelect.appendChild(option);
            });
        });

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        // Limpia el select de carreras y añade la opción "Sin carreras"
        carreraSelect.innerHTML = '';
        let noCarrerasOption = document.createElement('option');
        noCarrerasOption.textContent = 'Sin carreras';
        noCarrerasOption.disabled = true;
        noCarrerasOption.selected = true;
        carreraSelect.appendChild(noCarrerasOption);
    });


    // Función para añadir la opción "Seleccione un área de conocimiento" por defecto
    function addDefaultOption() {
        let defaultOption = document.createElement('option');
        defaultOption.textContent = 'Seleccione un área de conocimiento';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        departamentoSelect.appendChild(defaultOption);
    }

    // Función para añadir la opción "Sin departamentos"
    function addNoDepartmentsOption() {
        let noDepartmentsOption = document.createElement('option');
        noDepartmentsOption.textContent = 'Sin departamentos';
        noDepartmentsOption.disabled = true;
        noDepartmentsOption.selected = true;
        departamentoSelect.appendChild(noDepartmentsOption);
    }

    // Añadir la opción "Seleccione un área de conocimiento" inicialmente
    addDefaultOption();

    //SELECTOR DE DEPARTAMENTO

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;

        // Limpia el select de departamentos
        departamentoSelect.innerHTML = '';

        if (areaId) {
            // Obtén los departamentos para el área seleccionada
            fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // Añade la opción "Seleccione Departamento" si hay departamentos
                        let selectDepartmentOption = document.createElement('option');
                        selectDepartmentOption.textContent = 'Seleccione Departamento';
                        selectDepartmentOption.disabled = true;
                        selectDepartmentOption.selected = true;
                        departamentoSelect.appendChild(selectDepartmentOption);

                        // Llena el select con los departamentos
                        data.forEach(departamento => {
                            let option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            departamentoSelect.appendChild(option);
                        });
                    } else {
                        // Añade la opción "Sin departamentos" si no hay departamentos
                        addNoDepartmentsOption();
                    }
                })
                .catch(error => console.error('Error fetching departamentos:', error));
        } else {
            // Añade la opción "Seleccione un área de conocimiento" si no se ha seleccionado un área
            addDefaultOption();
        }
    });

    //SELECTOR DE CARRERA

    // Inicializa el select de departamentos al cargar la página si ya hay un área seleccionada
    if (areaSelect.value) {
        areaSelect.dispatchEvent(new Event('change'));
    }

    // Añade una opción de "Sin carreras" al select inicialmente
    let noCarrerasOption = document.createElement('option');
    noCarrerasOption.textContent = 'Sin carreras';
    noCarrerasOption.disabled = true;
    noCarrerasOption.selected = true;
    carreraSelect.appendChild(noCarrerasOption);

    // Event listener para cuando se cambie el departamento seleccionado
    departamentoSelect.addEventListener('change', function () {
        const departamentoId = departamentoSelect.value;

        // Limpia el select de carreras y añade la opción "Sin carreras"
        carreraSelect.innerHTML = '';
        carreraSelect.appendChild(noCarrerasOption);

        if (departamentoId) {
            // Obtén las carreras para el departamento seleccionado
            fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // Limpia el select de carreras
                        carreraSelect.innerHTML = '';

                        // Añade la opción "Seleccione carrera" si hay carreras
                        let selectCareerOption = document.createElement('option');
                        selectCareerOption.textContent = 'Seleccione carrera';
                        selectCareerOption.disabled = true;
                        selectCareerOption.selected = true;
                        carreraSelect.appendChild(selectCareerOption);

                        // Llena el select con las carreras
                        data.forEach(carrera => {
                            let option = document.createElement('option');
                            option.value = carrera.ID_Carrera;
                            option.textContent = carrera.Nombre;
                            carreraSelect.appendChild(option);
                        });
                    } else {
                        // La opción "Sin carreras" ya está añadida si no hay carreras
                        carreraSelect.innerHTML = '';
                        carreraSelect.appendChild(noCarrerasOption);
                    }
                })
                .catch(error => console.error('Error fetching carreras:', error));
        } else {
            // Añade la opción "Sin carreras" si no se ha seleccionado un departamento
            carreraSelect.innerHTML = '';
            carreraSelect.appendChild(noCarrerasOption);
        }
    });

    // Inicializa el select de carreras al cargar la página si ya hay un departamento seleccionado
    if (departamentoSelect.value) {
        departamentoSelect.dispatchEvent(new Event('change'));
    }

    //SELECTOR DE PROFESORES

    var tutorSelect = document.getElementById('tutor');
    var juez1Select = document.getElementById('juez1');
    var juez2Select = document.getElementById('juez2');
    var juez3Select = document.getElementById('juez3');

    var profesores = [];

    // Función para llenar un select con opciones
    function llenarSelectProfesor(selectElement, profesoresDisponibles, mensaje) {
        selectElement.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = mensaje;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        if (profesoresDisponibles.length > 0) {
            profesoresDisponibles.forEach(profesor => {
                let option = document.createElement('option');
                option.value = profesor.ID_Profesor;
                option.textContent = profesor.Nombre_Completo_P;
                selectElement.appendChild(option);
            });
        }
    }

    // Función para cargar los profesores según el departamento seleccionado
    function cargarProfesoresPorDepartamento(departamentoId) {
        if (!departamentoId) {
            // Mostrar mensaje de "Seleccione Departamento" si no hay departamento seleccionado
            llenarSelectProfesor(tutorSelect, [], 'Seleccione Departamento');
            llenarSelectProfesor(juez1Select, [], 'Seleccione Departamento');
            llenarSelectProfesor(juez2Select, [], 'Seleccione Departamento');
            llenarSelectProfesor(juez3Select, [], 'Seleccione Departamento');
            return;
        }

        fetch(`/profesorPorDepartamento?DepartamentoId=${encodeURIComponent(departamentoId)}`)
            .then(response => response.json())
            .then(data => {
                profesores = data; // Guardar los datos de los profesores
                if (profesores.length === 0) {
                    llenarSelectProfesor(tutorSelect, [], 'Sin Profesores');
                    llenarSelectProfesor(juez1Select, [], 'Sin Profesores');
                    llenarSelectProfesor(juez2Select, [], 'Sin Profesores');
                    llenarSelectProfesor(juez3Select, [], 'Sin Profesores');
                } else {
                    llenarSelectProfesor(tutorSelect, profesores, 'Seleccione Tutor');
                    llenarSelectProfesor(juez1Select, profesores, 'Seleccione Juez 1');
                    llenarSelectProfesor(juez2Select, profesores, 'Seleccione Juez 2');
                    llenarSelectProfesor(juez3Select, profesores, 'Seleccione Juez 3');
                }
            })
            .catch(error => {
                console.error('Error al obtener los profesores:', error);
            });
    }

    // Inicializar los selects al cargar la página
    llenarSelectProfesor(tutorSelect, [], 'Seleccione un Departamento');
    llenarSelectProfesor(juez1Select, [], 'Seleccione un Departamento');
    llenarSelectProfesor(juez2Select, [], 'Seleccione un Departamento');
    llenarSelectProfesor(juez3Select, [], 'Seleccione un Departamento');

    // Event listener para cuando se cambie el departamento seleccionado
    departamentoSelect.addEventListener('change', function () {
        var departamentoId = departamentoSelect.value;
        cargarProfesoresPorDepartamento(departamentoId);
    });

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        // Restablecer los selects de profesores a su mensaje por defecto
        llenarSelectProfesor(tutorSelect, [], 'Seleccione Departamento');
        llenarSelectProfesor(juez1Select, [], 'Seleccione Departamento');
        llenarSelectProfesor(juez2Select, [], 'Seleccione Departamento');
        llenarSelectProfesor(juez3Select, [], 'Seleccione Departamento');
    });

    // Función para actualizar los selects
    function actualizarSelects() {
        const seleccionados = [
            tutorSelect.value,
            juez1Select.value,
            juez2Select.value,
            juez3Select.value
        ];

        // Actualizamos las opciones en los selects de jueces
        [juez1Select, juez2Select, juez3Select].forEach(select => {
            Array.from(select.options).forEach(option => {
                if (seleccionados.includes(option.value) && option.value !== '') {
                    option.style.display = 'none'; // Ocultar opciones seleccionadas
                } else {
                    option.style.display = ''; // Mostrar opciones no seleccionadas
                }
            });
        });
    }

    // Event listeners para mostrar selección y actualizar los selects
    tutorSelect.addEventListener('change', function () {
        actualizarSelects();
        console.log('Has seleccionado al tutor:', tutorSelect.options[tutorSelect.selectedIndex].text);
    });

    juez1Select.addEventListener('change', function () {
        actualizarSelects();
        console.log('Has seleccionado al Juez 1:', juez1Select.options[juez1Select.selectedIndex].text);
    });

    juez2Select.addEventListener('change', function () {
        actualizarSelects();
        console.log('Has seleccionado al Juez 2:', juez2Select.options[juez2Select.selectedIndex].text);
    });

    juez3Select.addEventListener('change', function () {
        actualizarSelects();
        console.log('Has seleccionado al Juez 3:', juez3Select.options[juez3Select.selectedIndex].text);
    });

    //SELECTOR DE AULA

    //Función para llenar el select de aulas
    function llenarSelectAula(selectElement, aulasDisponibles, mensaje) {
        selectElement.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = mensaje;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        if (aulasDisponibles.length > 0) {
            aulasDisponibles.forEach(aula => {
                let option = document.createElement('option');
                option.value = aula.ID_Aula;
                option.textContent = aula.Nombre_Aula;
                selectElement.appendChild(option);
            });
        }
    }

    // Función para cargar aulas según el edificio seleccionado
    function cargarAulasPorEdificio(edificioId) {
        if (!edificioId) {
            llenarSelectAula(aulaSelect, [], 'Seleccione Aula');
            return;
        }

        fetch(`/aula?edificioId=${encodeURIComponent(edificioId)}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        llenarSelectAula(aulaSelect, [], 'Sin Aulas');
                    } else {
                        llenarSelectAula(aulaSelect, data, 'Seleccione Aula');
                    }
                } else {
                    console.error('Error: La respuesta no es un array', data);
                    llenarSelectAula(aulaSelect, [], 'Sin Aulas');
                }
            })
            .catch(error => {
                console.error('Error al obtener las aulas:', error);
                llenarSelectAula(aulaSelect, [], 'Error al cargar aulas');
            });
    }

    // Event listener para cuando se cambie el edificio seleccionado
    edificioSelect.addEventListener('change', function () {
        var edificioId = edificioSelect.value;
        cargarAulasPorEdificio(edificioId);
    });

    // Inicializar el select de aulas al cargar la página
    llenarSelectAula(aulaSelect, [], 'Seleccione Edificio');

    //SELECTOR DE EDIFICIOS

     // Función para llenar un select con opciones
     function llenarSelectEdificio(selectElement, edificiosDisponibles, mensaje) {
        selectElement.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = mensaje;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        if (edificiosDisponibles.length > 0) {
            edificiosDisponibles.forEach(edificio => {
                let option = document.createElement('option');
                option.value = edificio.ID_Edificio; // Llave primaria del edificio
                option.textContent = edificio.Nombre_Edificio; // Nombre del edificio
                selectElement.appendChild(option);
            });
        }
    }

    // Función para cargar edificios según el área seleccionada
    function cargarEdificiosPorArea(areaId) {
        if (!areaId) {
            // Mostrar mensaje de "Seleccione Área" si no hay área seleccionada
            integrarSelectsConMensaje('Seleccione Área de conocimiento');
            return;
        }

        fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    integrarSelectsConMensaje('Sin Edificios');
                } else {
                    integrarSelectsConEdificios(data);
                }
            })
            .catch(error => {
                console.error('Error al obtener los edificios:', error);
            });
    }

    // Función para integrar selects con el mensaje correspondiente
    function integrarSelectsConMensaje(mensaje) {
        edificioSelects.forEach(select => {
            llenarSelectEdificio(select, [], mensaje);
        });
    }

    // Función para integrar selects con edificios
    function integrarSelectsConEdificios(edificios) {
        edificioSelects.forEach(select => {
            llenarSelectEdificio(select, edificios, 'Seleccione Edificio');
        });
    }

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        var areaId = areaSelect.value;
        cargarEdificiosPorArea(areaId);
    });

    // Inicializar los selects de edificios al cargar la página
    integrarSelectsConMensaje('Seleccione Área');

    //SELECTOR INTEGRANTES

    var integranteSelects = [
        document.getElementById('integrante1'),
        document.getElementById('integrante2'),
        document.getElementById('integrante3'),
    ];

    var estudiantes = [];

    // Función para llenar un select con opciones
    function llenarSelectEstudiante(selectElement, estudiantesDisponibles, mensaje) {
        selectElement.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = mensaje;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

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
            integrarSelectsConMensaje('Seleccione Carrera');
            return;
        }

        fetch(`/estudiante?carreraId=${encodeURIComponent(carreraId)}`)
            .then(response => response.json())
            .then(data => {
                estudiantes = data;
                if (estudiantes.length === 0) {
                    integrarSelectsConMensaje('Sin Estudiantes');
                } else {
                    integrarSelectsConEstudiantes(estudiantes);
                }
            })
            .catch(error => {
                console.error('Error al obtener los estudiantes:', error);
            });
    }

    // Función para integrar selects con el mensaje correspondiente
    function integrarSelectsConMensajeEst(mensaje) {
        integranteSelects.forEach(select => {
            llenarSelectEstudiante(select, [], mensaje);
        });
    }

    // Función para integrar selects con estudiantes
    function integrarSelectsConEstudiantes(estudiantes) {
        integranteSelects.forEach(select => {
            llenarSelectEstudiante(select, estudiantes, `Integrante de ${select.id.charAt(select.id.length - 1)}`);
        });
    }

    // Función para actualizar los selects
    function actualizarSelects() {
        const seleccionados = integranteSelects.map(select => select.value);

        // Actualizamos las opciones en los selects de integrantes
        integranteSelects.forEach(select => {
            Array.from(select.options).forEach(option => {
                if (seleccionados.includes(option.value) && option.value !== '') {
                    option.style.display = 'none'; // Ocultar opciones seleccionadas
                } else {
                    option.style.display = ''; // Mostrar opciones no seleccionadas
                }
            });
        });
    }

    // Event listener para cuando se cambie la carrera seleccionada
    carreraSelect.addEventListener('change', function () {
        var carreraId = carreraSelect.value;
        cargarEstudiantesPorCarrera(carreraId);
    });

    // Inicializar los selects al cargar la página
    integrarSelectsConMensajeEst('Seleccione Carrera');

    // Event listeners para mostrar selección y actualizar los selects
    integranteSelects.forEach(select => {
        select.addEventListener('change', actualizarSelects);
    });

    //SELECTOR DE TIPOEXAMEN

    let defaultOptionTE = document.createElement('option');
    defaultOptionTE.value = '';
    defaultOptionTE.textContent = 'Seleccione Tipo de Examen';
    defaultOptionTE.disabled = true; // Cambiado a 'disabled' en lugar de 'disable'
    defaultOptionTE.selected = true;
    tipoexamenSelect.appendChild(defaultOptionTE);

    // Hacer la solicitud fetch correctamente
    fetch('/tipoexamen')
        .then(response => response.json()) // Cambiado 'Response = Response.json()' a 'response => response.json()'
        .then(data => {
            data.forEach(tipoexamen => {
                let option = document.createElement('option');
                option.value = tipoexamen.ID_Tipo_Examen;
                option.textContent = tipoexamen.Nombre;
                tipoexamenSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener los tipos de examen:', error);
        });

});
