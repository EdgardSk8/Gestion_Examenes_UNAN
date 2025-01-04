document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-select-aula');
    const edificioSelect = document.getElementById('edificio-vista-aula');
    const form = document.querySelector('#agregarAulaForm form'); // Corregido
    const aulaTableBody = document.querySelector('#aulaTable tbody');
    const table = $('#aulaTable').DataTable({ 
        "paging": true,  // Habilitar paginación
        "searching": true,  // Habilitar búsqueda
        "info": true,  // Mostrar información
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    });

    cargarAulas();

    // Cargar las áreas de conocimiento
    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(data => {
            areaSelect.innerHTML = '<option value="">Seleccione un área de conocimiento</option>';
            if (data && data.length > 0) {
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
                    areaSelect.appendChild(option);
                });
            } else {
                const option = document.createElement('option');
                option.textContent = 'No hay áreas disponibles';
                option.disabled = true;
                areaSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar las áreas:', error));

    // Cargar los edificios asociados cuando se selecciona un área
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;
        edificioSelect.innerHTML = '<option value="">Seleccione un edificio</option>';

        if (areaId) {
            fetch(`/edificio?areaId=${areaId}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        data.forEach(edificio => {
                            const option = document.createElement('option');
                            option.value = edificio.ID_Edificio;
                            option.textContent = edificio.Nombre_Edificio;
                            edificioSelect.appendChild(option);
                        });
                    } else {
                        const option = document.createElement('option');
                        option.textContent = 'No hay edificios disponibles';
                        option.disabled = true;
                        edificioSelect.appendChild(option);
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los edificios:', error);
                    const option = document.createElement('option');
                    option.textContent = 'Error al cargar los edificios';
                    option.disabled = true;
                    edificioSelect.appendChild(option);
                });
        }
    });

    // Función para agregar un nuevo aula
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Aula agregada exitosamente', data.message);
                cargarAulas();
                alert('Aula agregado exitosamente');
                form.reset();
            } else {
                console.log('Error al agregar el aula', data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al agregar el aula:', error);
        });
    });

    // Función para obtener todas las aulas desde el backend
    function cargarAulas() {
        fetch('/aulas/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    aulaTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
                    table.clear(); // Limpiar la tabla en DataTable

                    data.data.forEach(aula => {
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', aula.ID_Aula); // Añadir el ID_Aula a la fila

                        // Usar valores por defecto en caso de datos nulos o indefinidos
                        const nombreAula = aula.Nombre_Aula || 'Sin nombre';
                        const edificio = aula.edificio ? aula.edificio.Nombre_Edificio : 'Sin edificio';
                        const area = aula.edificio && aula.edificio.area_conocimiento ? aula.edificio.area_conocimiento.Nombre : 'Sin área';

                        row.innerHTML = `
                            <td>${aula.ID_Aula}</td>
                            <td class="nombre_aula">${nombreAula}</td>
                            <td class="nombre_edificio">${edificio}</td>
                            <td class="area_aula">${area}</td>
                            <td>
                                <button class="btn-editar" data-id="${aula.ID_Aula}">✏️ Editar</button>
                                <button class="btn-eliminar" data-id="${aula.ID_Aula}">❌ Eliminar</button>
                                <button class="btn-aceptar" data-id="${aula.ID_Aula}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        aulaTableBody.appendChild(row);

                        // Agregar las filas a la tabla DataTable
                        table.row.add(row).draw();

                        // Event listeners para editar, eliminar y aceptar
                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarAula(aula.ID_Aula); // Usar ID_Aula
                        });

                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarAula(aula); // Usar la información completa del aula
                        });

                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(aula.ID_Aula); // Usar ID_Aula
                        });
                    });
                } else {
                    console.log('No se pudieron cargar las aulas:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar las aulas:', error);
            });
    }


    // Función para eliminar el aula
    function eliminarAula(aulaId) {
        if (confirm('¿Estás seguro de eliminar esta aula?')) {
            fetch(`/aulas/eliminar/ajax/${aulaId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Aula eliminada exitosamente');
                    cargarAulas();
                } else {
                    console.log('Error al eliminar el aula:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el aula:', error);
            });
        }
    }

        // Función para editar el aula
        function editarAula(aula) {
            const table = document.getElementById('aulaTable');
            const row = table.querySelector(`tr[data-id="${aula.ID_Aula}"]`);
            const nombreaulaCell = row.querySelector('.nombre_aula');
            const edificioCell = row.querySelector('.nombre_edificio'); // Cambiar por la clase correcta
            const areaCell = row.querySelector('.area_aula'); // Cambiar por la clase correcta

            if (!row || !nombreaulaCell || !edificioCell || !areaCell) {
                console.error('Error: No se encontraron algunas celdas en el DOM.');
                return;
            }

            // Reemplazar el nombre por un input
            nombreaulaCell.innerHTML = `<input type="text" class="input-nombre_aula" value="${aula.Nombre_Aula}" />`;
            const inputNombre = nombreaulaCell.querySelector('.input-nombre_aula');
            inputNombre.focus();

            // Reemplazar el área por un selector
            fetch('/area-conocimiento')
                .then(response => response.json())
                .then(data => {
                    const areaSelect = document.createElement('select');
                    areaSelect.setAttribute('name', 'area_aula');
                    areaSelect.classList.add('area-select');

                    data.forEach(area => {
                        const option = document.createElement('option');
                        option.value = area.ID_Area;
                        option.textContent = area.Nombre;

                        if (aula.edificio && aula.edificio.area_conocimiento.ID_Area === area.ID_Area) {
                            option.selected = true; // Marcar como seleccionado
                        }

                        areaSelect.appendChild(option);
                    });

                    areaCell.innerHTML = ''; // Limpiar la celda del área
                    areaCell.appendChild(areaSelect);

                    // Añadir listener para cargar edificios al cambiar el área
                    areaSelect.addEventListener('change', function () {
                        const selectedAreaId = areaSelect.value;

                        // Filtrar los edificios relacionados con el área seleccionada
                        fetch(`/edificio/obtener-por-area/ajax/?areaId=${selectedAreaId}`)
                            .then(response => response.json())
                            .then(edificios => {
                                let edificioSelect = row.querySelector('select[name="edificio"]');

                                // Limpiar las opciones existentes en el select
                                if (!edificioSelect) {
                                    edificioSelect = document.createElement('select');
                                    edificioSelect.setAttribute('name', 'edificio');
                                    edificioSelect.classList.add('edificio-select');
                                } else {
                                    edificioSelect.innerHTML = '';
                                }

                                if (edificios.length > 0) {
                                    edificios.forEach(edificio => {
                                        const option = document.createElement('option');
                                        option.value = edificio.ID_Edificio;
                                        option.textContent = edificio.Nombre_Edificio;

                                        if (aula.ID_Edificio === edificio.ID_Edificio) {
                                            option.selected = true; // Marcar como seleccionado
                                        }

                                        edificioSelect.appendChild(option);
                                    });
                                } else {
                                    edificioSelect.innerHTML = '<option value="">Área sin edificios</option>';
                                }

                                edificioCell.innerHTML = ''; // Limpiar la celda
                                edificioCell.appendChild(edificioSelect); // Añadir el select
                            })
                            .catch(error => {
                                console.error('Error al cargar los edificios:', error);
                            });
                    });

                    // Disparar el evento 'change' para cargar edificios del área seleccionada por defecto
                    areaSelect.dispatchEvent(new Event('change'));
                })
                .catch(error => {
                    console.error('Error al cargar las áreas:', error);
                });

            // Mostrar botón de aceptar
            row.querySelector('.btn-aceptar').style.display = 'inline';
            row.querySelector('.btn-editar').style.display = 'none';
            row.querySelector('.btn-eliminar').style.display = 'none';
        }

        // Función para guardar los cambios
        function guardarCambios(aulaId) {
            const table = document.getElementById('aulaTable');
            const row = table.querySelector(`tr[data-id="${aulaId}"]`);
            const nombreInput = row.querySelector('.input-nombre_aula');
            const areaSelect = row.querySelector('select[name="area_aula"]');
            const edificioSelect = row.querySelector('select[name="edificio"]');

            const updatedAula = {
                ID_Aula: aulaId,
                Nombre_Aula: nombreInput.value,
                ID_Area: areaSelect.value,
                ID_Edificio: edificioSelect.value
            };

            fetch(`/aulas/actualizar/ajax/${aulaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(updatedAula)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Aula actualizada exitosamente');
                    cargarAulas();
                } else {
                    console.error('Error al actualizar el aula:', data.message);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al actualizar el aula:', error);
            });
        }


});
