document.addEventListener('DOMContentLoaded', function () {
    var edificioSelect = document.getElementById('edificio-select');
    var aulaSelect = document.getElementById('aula-select');

    // Función para llenar el select de aulas
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
});
