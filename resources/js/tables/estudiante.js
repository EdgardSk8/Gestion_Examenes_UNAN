document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los select
    var carreraSelect = document.getElementById('carrera-select');
    var integrante1Select = document.getElementById('integrante1');
    var integrante2Select = document.getElementById('integrante2');
    var integrante3Select = document.getElementById('integrante3');

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
            llenarSelectEstudiante(integrante1Select, [], 'Seleccione Carrera');
            llenarSelectEstudiante(integrante2Select, [], 'Seleccione Carrera');
            llenarSelectEstudiante(integrante3Select, [], 'Seleccione Carrera');
            return;
        }

        fetch(`/estudiante?carreraId=${encodeURIComponent(carreraId)}`)
            .then(response => response.json())
            .then(data => {
                estudiantes = data;
                if (estudiantes.length === 0) {
                    llenarSelectEstudiante(integrante1Select, [], 'Sin Estudiantes');
                    llenarSelectEstudiante(integrante2Select, [], 'Sin Estudiantes');
                    llenarSelectEstudiante(integrante3Select, [], 'Sin Estudiantes');
                } else {
                    llenarSelectEstudiante(integrante1Select, estudiantes, 'Integrante Numero 1');
                    llenarSelectEstudiante(integrante2Select, estudiantes, 'Integrante Numero 2');
                    llenarSelectEstudiante(integrante3Select, estudiantes, 'Integrante Numero 3');
                }
            })
            .catch(error => {
                console.error('Error al obtener los estudiantes:', error);
            });
    }

    // Función para actualizar los selects
    function actualizarSelects() {
        const seleccionados = [
            integrante1Select.value,
            integrante2Select.value,
            integrante3Select.value
        ];

        // Actualizamos las opciones en los selects de integrantes
        [integrante1Select, integrante2Select, integrante3Select].forEach(select => {
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
    llenarSelectEstudiante(integrante1Select, [], 'Seleccione Carrera');
    llenarSelectEstudiante(integrante2Select, [], 'Seleccione Carrera');
    llenarSelectEstudiante(integrante3Select, [], 'Seleccione Carrera');

    // Event listeners para mostrar selección y actualizar los selects
    integrante1Select.addEventListener('change', actualizarSelects);
    integrante2Select.addEventListener('change', actualizarSelects);
    integrante3Select.addEventListener('change', actualizarSelects);
});
