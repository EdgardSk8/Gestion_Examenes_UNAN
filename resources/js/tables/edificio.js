document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los selects
    var areaSelect = document.querySelector('.area-select'); // Usar clase para seleccionar el área
    var edificioSelects = document.querySelectorAll('.edificio-select'); // Asumiendo que tienes una clase para los selects

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
            integrarSelectsConMensaje('Seleccione Área');
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
});
