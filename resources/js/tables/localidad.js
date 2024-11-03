document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el select con el ID 'localidad-select'
    const localidadSelect = document.getElementById('localidad-select');

    // Función para llenar un select con localidades
    function llenarSelectLocalidad(selectElement, localidadesDisponibles, mensaje) {
        selectElement.innerHTML = '';

        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = mensaje;
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        if (localidadesDisponibles.length > 0) {
            localidadesDisponibles.forEach(localidad => {
                let option = document.createElement('option');
                option.value = localidad.ID_Localidad; // Llave primaria de la localidad
                option.textContent = localidad.Nombre; // Nombre de la localidad
                selectElement.appendChild(option);
            });
        }
    }

    // Función para cargar localidades desde el servidor
    function cargarLocalidades() {
        fetch('/localidades') // Cambia la URL si es necesario
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    integrarSelectConMensaje('Sin Localidades');
                } else {
                    integrarSelectConLocalidades(data);
                }
            })
            .catch(error => {
                console.error('Error al obtener las localidades:', error);
            });
    }

    // Función para integrar el select con el mensaje correspondiente
    function integrarSelectConMensaje(mensaje) {
        llenarSelectLocalidad(localidadSelect, [], mensaje);
    }

    // Función para integrar el select con localidades
    function integrarSelectConLocalidades(localidades) {
        llenarSelectLocalidad(localidadSelect, localidades, 'Seleccione Localidad');
    }

    // Cargar localidades al inicio
    cargarLocalidades();
});
