document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-select');
    const departamentoSelect = document.getElementById('departamento-select');

    // Función para añadir la opción "Seleccione un área de conocimiento" por defecto
    function addDefaultOption() {
        let defaultOption = document.createElement('option');
        defaultOption.textContent = 'Seleccione un área de conocimiento';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        departamentoSelect.appendChild(defaultOption);
    }

    // Función para añadir la opción "Sin departamentos"
    function addNoDepartmentsOption() {
        let noDepartmentsOption = document.createElement('option');
        noDepartmentsOption.textContent = 'Sin departamentos';
        noDepartmentsOption.disabled = true;
        noDepartmentsOption.selected = true;
        departamentoSelect.appendChild(noDepartmentsOption);
    }

    // Añadir la opción "Seleccione un área de conocimiento" inicialmente
    addDefaultOption();

    // Event listener para cuando se cambie el área seleccionada
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;

        // Limpia el select de departamentos
        departamentoSelect.innerHTML = '';

        if (areaId) {
            // Obtén los departamentos para el área seleccionada
            fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        // Añade la opción "Seleccione Departamento" si hay departamentos
                        let selectDepartmentOption = document.createElement('option');
                        selectDepartmentOption.textContent = 'Seleccione Departamento';
                        selectDepartmentOption.disabled = true;
                        selectDepartmentOption.selected = true;
                        departamentoSelect.appendChild(selectDepartmentOption);

                        // Llena el select con los departamentos
                        data.forEach(departamento => {
                            let option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            departamentoSelect.appendChild(option);
                        });
                    } else {
                        // Añade la opción "Sin departamentos" si no hay departamentos
                        addNoDepartmentsOption();
                    }
                })
                .catch(error => console.error('Error fetching departamentos:', error));
        } else {
            // Añade la opción "Seleccione un área de conocimiento" si no se ha seleccionado un área
            addDefaultOption();
        }
    });

    // Inicializa el select de departamentos al cargar la página si ya hay un área seleccionada
    if (areaSelect.value) {
        areaSelect.dispatchEvent(new Event('change'));
    }
});
