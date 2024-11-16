document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los select
    var carreraSelect = document.getElementById('carrera-select');
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
    function integrarSelectsConMensaje(mensaje) {
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
    integrarSelectsConMensaje('Seleccione Carrera');

    // Event listeners para mostrar selección y actualizar los selects
    integranteSelects.forEach(select => {
        select.addEventListener('change', actualizarSelects);
    });
});
