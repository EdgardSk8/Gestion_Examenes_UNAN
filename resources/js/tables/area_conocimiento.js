//resources/js/area_conocimiento.js
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los elementos que tengan una clase específica
    const areaSelects = document.querySelectorAll('.area-select');
    const carreraSelects = document.querySelectorAll('.carrera-select');

    areaSelects.forEach((areaSelect, index) => {
        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccionar área';
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
            // Limpia el select de carreras correspondiente y añade la opción "Sin carreras"
            const carreraSelect = carreraSelects[index];
            carreraSelect.innerHTML = '';
            let noCarrerasOption = document.createElement('option');
            noCarrerasOption.textContent = 'Sin carreras';
            noCarrerasOption.disabled = true;
            noCarrerasOption.selected = true;
            carreraSelect.appendChild(noCarrerasOption);
        });
    });
});
