document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los select para los profesores
    var departamentoSelect = document.getElementById('departamento-select');
    var areaSelect = document.getElementById('area-select'); // Agregar el select de área
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
                option.textContent = profesor.Nombre_Completo;
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
});
