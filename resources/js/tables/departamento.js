document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-select'); // Selecciona el área por ID
    const departamentoSelect = document.getElementById('departamento-select'); // Selecciona el departamento por ID

    // Añade una opción de "Sin departamentos" al select inicialmente
    let noDepartmentsOption = document.createElement('option');
    noDepartmentsOption.textContent = 'Sin departamentos';
    noDepartmentsOption.disabled = true;
    noDepartmentsOption.selected = true;
    departamentoSelect.appendChild(noDepartmentsOption);

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
                        departamentoSelect.appendChild(noDepartmentsOption);
                    }
                })
                .catch(error => console.error('Error fetching departamentos:', error));
        } else {
            // Añade la opción "Sin departamentos" si no se ha seleccionado un área
            departamentoSelect.appendChild(noDepartmentsOption);
        }
    });

    // Inicializa el select de departamentos al cargar la página si ya hay un área seleccionada
    if (areaSelect.value) {
        areaSelect.dispatchEvent(new Event('change'));
    }
});
