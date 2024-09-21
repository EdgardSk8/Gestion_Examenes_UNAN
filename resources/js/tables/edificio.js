document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los select
    var areaSelect = document.getElementById('area-select');
    var edificioSelect = document.getElementById('edificio');

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
            llenarSelectEdificio(edificioSelect, [], 'Seleccione Área');
            return;
        }

        fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    llenarSelectEdificio(edificioSelect, [], 'Sin Edificios');
                } else {
                    llenarSelectEdificio(edificioSelect, data, 'Seleccione Edificio');
                }
            })
            .catch(error => {
                console.error('Error al obtener los edificios:', error);
            });
    }

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        var areaId = areaSelect.value;
        cargarEdificiosPorArea(areaId);
    });

    // Inicializar el select de edificios al cargar la página
    llenarSelectEdificio(edificioSelect, [], 'Seleccione Área');
});
