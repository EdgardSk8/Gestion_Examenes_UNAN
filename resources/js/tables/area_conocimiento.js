document.addEventListener('DOMContentLoaded', function() {
    var areaSelect = document.getElementById('area-select');
    var carreraSelect = document.getElementById('carrera-select');

    // Agrega la opción "Seleccionar área" al principio
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
    areaSelect.addEventListener('change', function() {
        // Limpia el select de carreras y añade la opción "Sin carreras"
        carreraSelect.innerHTML = '';
        let noCarrerasOption = document.createElement('option');
        noCarrerasOption.textContent = 'Sin carreras';
        noCarrerasOption.disabled = true;
        noCarrerasOption.selected = true;
        carreraSelect.appendChild(noCarrerasOption);
    });
});

document.addEventListener('DOMContentLoaded', function() {

    var areaEquipo = document.getElementById('area-equipo');
    var carreraEquipo = document.getElementById('carrera-equipo');

    // Agrega la opción "Seleccionar área" al principio
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccionar área';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    areaEquipo.appendChild(defaultOption);

    // Obtén las áreas de conocimiento
    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(data => {
            // Llena el select con las áreas de conocimiento
            data.forEach(area => {
                let option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                areaEquipo.appendChild(option);
            });
        });
});
