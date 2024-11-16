document.addEventListener('DOMContentLoaded', function() {

    var tipoexamenSelect = document.getElementById('tipoexamen-select');

    // Crear y agregar la opción por defecto
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione Tipo de Examen';
    defaultOption.disabled = true; // Cambiado a 'disabled' en lugar de 'disable'
    defaultOption.selected = true;
    tipoexamenSelect.appendChild(defaultOption);

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
