document.addEventListener('DOMContentLoaded', function() {
    var departamentoSelect = document.getElementById('departamento-select');
    var carreraSelect = document.getElementById('carrera-select');

    // Añade una opción de "Sin carreras" al select inicialmente
    var noCarrerasOption = document.createElement('option');
    noCarrerasOption.textContent = 'Sin carreras';
    noCarrerasOption.disabled = true;
    noCarrerasOption.selected = true;
    carreraSelect.appendChild(noCarrerasOption);

    // Event listener para cuando se cambie el departamento seleccionado
    departamentoSelect.addEventListener('change', function() {
        var departamentoId = departamentoSelect.value;

        // Limpia el select de carreras, pero mantiene la opción "Sin carreras"
        carreraSelect.innerHTML = '';
        carreraSelect.appendChild(noCarrerasOption);

        if (departamentoId) {
            // Obtén las carreras para el departamento seleccionado
            fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // Limpia el mensaje predeterminado si hay carreras
                        carreraSelect.innerHTML = '';

                        // Añade la opción "Seleccione carrera" si hay carreras
                        let selectCareerOption = document.createElement('option');
                        selectCareerOption.textContent = 'Seleccione carrera';
                        selectCareerOption.disabled = true;
                        selectCareerOption.selected = true;
                        carreraSelect.appendChild(selectCareerOption);

                        // Llena el select con las carreras
                        data.forEach(carrera => {
                            let option = document.createElement('option');
                            option.value = carrera.ID_Carrera;
                            option.textContent = carrera.Nombre;
                            carreraSelect.appendChild(option);
                        });
                    } else {
                        // La opción "Sin carreras" ya está añadida si no hay carreras
                        carreraSelect.innerHTML = '';
                        carreraSelect.appendChild(noCarrerasOption);
                    }
                })
                .catch(error => console.error('Error fetching carreras:', error));
        } else {
            // La opción "Sin carreras" ya está añadida si no se ha seleccionado un departamento
            carreraSelect.innerHTML = '';
            carreraSelect.appendChild(noCarrerasOption);
        }
    });

    // Inicializa el select de carreras al cargar la página si ya hay un departamento seleccionado
    if (departamentoSelect.value) {
        departamentoSelect.dispatchEvent(new Event('change'));
    }
});
