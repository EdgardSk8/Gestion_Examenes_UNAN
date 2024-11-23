document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-select-aula');
    const edificioSelect = document.getElementById('edificio-vista-aula');
    const form = document.querySelector('#agregarAulaForm form'); // Corregido
    const aulaTableBody = document.querySelector('#aulaTable tbody');
    const table = $('#aulaTable').DataTable();

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
  /*---------------------------------------------------------------------------------------------------------------------------------*/

    // Función para obtener todas las aulas desde el backend
    function cargarAulas() {
        fetch('/aulas/ajax')
            .then(response => response.json())
            .then(data => {

                if (data.success) {

                    aulaTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

                    data.data.forEach(aula => {
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', aula.ID_Aula); // Añadir el ID_Aula a la fila
                        row.innerHTML = `
                            <td>${aula.ID_Aula}</td>
                            <td class="nombre">${aula.Nombre_Aula}</td>
                            <td class="nombre">${aula.edificio.Nombre_Edificio}</td>
                            <td class="area">${aula.edificio.area_conocimiento.Nombre}</td>
                            <td>
                                <button class="btn-editar" data-id="${aula.ID_Aula}">✏️ Editar</button>
                                <button class="btn-eliminar" data-id="${aula.ID_Aula}">❌ Eliminar</button>
                                <button class="btn-aceptar" data-id="${aula.ID_Aula}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        aulaTableBody.appendChild(row);

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

    function editarAula(aula) {

        const row = document.querySelector(`tr[data-id="${aula.ID_Aula}"]`);
        const nombreCell = row.querySelector('.nombre');
        const edificioCell = row.querySelector('.nombre:nth-child(3)'); // Ajusta según la posición
        const areaCell = row.querySelector('.area');
    
        if (!row || !nombreCell || !edificioCell || !areaCell) {
            console.error('Error: No se encontraron algunas celdas en el DOM.');
            return;
        }
    
        // Reemplazar el nombre por un input
        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${aula.Nombre_Aula}" />`;
        const inputNombre = nombreCell.querySelector('.input-nombre');
        inputNombre.focus();
    
        // Reemplazar el área por un selector
        fetch('/area-conocimiento')
            .then(response => response.json())
            .then(data => {
                const areaSelect = document.createElement('select');
                areaSelect.setAttribute('name', 'area'); // Asegurarte que tiene un nombre único
    
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
    
                    if (aula.edificio.area_conocimiento && aula.edificio.area_conocimiento.ID_Area === area.ID_Area) {
                        option.selected = true; // Marcar como seleccionado
                    }
    
                    areaSelect.appendChild(option);
                });
    
                areaCell.innerHTML = ''; // Limpiar la celda del área
                areaCell.appendChild(areaSelect); // Añadir el select
    
                // Filtrar edificios por área seleccionada
                areaSelect.addEventListener('change', function () {

                    const selectedAreaId = areaSelect.value;

                    // Filtrar los edificios relacionados con el área seleccionada
                    fetch(`/edificio/obtener-por-area/ajax/?areaId=${selectedAreaId}`)  // Asegúrate de incluir el signo de interrogación y el parámetro
                        .then(response => response.json())
                        .then(edificios => {
                            const edificioCell = row.querySelector('.nombre:nth-child(3)'); // Ajusta según la celda correspondiente
                            let edificioSelect = row.querySelector('select[name="edificio"]');

                            // Limpiar las opciones existentes en el select
                            if (edificioSelect) {
                                edificioSelect.innerHTML = '';
                            } else {
                                // Si el select no existe, crearlo
                                edificioSelect = document.createElement('select');
                                edificioSelect.setAttribute('name', 'edificio');
                            }

                            if (edificios.length > 0) {
                                // Si hay edificios, agregar las opciones
                                edificios.forEach(edificio => {
                                    const option = document.createElement('option');
                                    option.value = edificio.ID_Edificio;
                                    option.textContent = edificio.Nombre_Edificio;

                                    if (aula.ID_Edificio === edificio.ID_Edificio) {
                                        option.selected = true; // Marcar como seleccionado
                                    }

                                    edificioSelect.appendChild(option);
                                });

                                // Si se había mostrado el mensaje de "Sin edificios disponibles", eliminarlo
                                const mensajeSinEdificio = edificioCell.querySelector('.mensaje-sin-edificio');
                                if (mensajeSinEdificio) {
                                    mensajeSinEdificio.remove();
                                }
                            } else {
                                // Si no hay edificios, mostrar un option indicando que no hay edificios
                                const option = document.createElement('option');
                                option.textContent = 'Área sin edificios disponibles';
                                option.disabled = true; // Deshabilitar la opción para evitar que se seleccione
                                option.selected = true; // Marcar como seleccionado
                                edificioSelect.appendChild(option);
                            }

                            // Limpiar la celda antes de agregar el select (o el mensaje)
                            edificioCell.innerHTML = '';
                            edificioCell.appendChild(edificioSelect); // Añadir el select al DOM
                        })
                        .catch(error => console.error('Error al cargar los edificios:', error));
                });
    
            })
            .catch(error => console.error('Error al cargar las áreas:', error));
    
        // Reemplazar el edificio por un selector inicial, antes de seleccionar el área
        fetch('/edificios/ajax')
            .then(response => response.json())
            .then(data => {
                const edificioSelect = document.createElement('select');
                edificioSelect.setAttribute('name', 'edificio'); // Asegurarte que tiene un nombre único
    
                data.forEach(edificio => {
                    const option = document.createElement('option');
                    option.value = edificio.ID_Edificio;
                    option.textContent = edificio.Nombre_Edificio;
    
                    if (aula.ID_Edificio === edificio.ID_Edificio) {
                        option.selected = true; // Marcar como seleccionado
                    }
    
                    edificioSelect.appendChild(option);
                });

                
    
                edificioCell.innerHTML = ''; // Limpiar la celda del edificio
                edificioCell.appendChild(edificioSelect); // Añadir el select
            })
            .catch(error => console.error('Error al cargar los edificios:', error));
    
        // Mostrar el botón de aceptar y ocultar los otros
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';
    
        // Detectar "Enter" en el input de nombre
        inputNombre.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                guardarCambios(aula.ID_Aula);
            }
        });
    }
    
    function guardarCambios(id) {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        
        const nombreInput = row.querySelector('.input-nombre');
        const edificioSelect = row.querySelector('select[name="edificio"]');
        const areaSelect = row.querySelector('select[name="area"]');
    
        // Verificar que todos los elementos existan antes de usarlos
        if (!nombreInput || !edificioSelect || !areaSelect) {
            console.error('Error: No se encontraron todos los elementos requeridos en el DOM.');
            return;
        }

        const newNombre = nombreInput.value;
        const newEdificio = edificioSelect.value;
        const newArea = areaSelect.value;
    
        // Verificar si los campos están vacíos
        if (!newNombre || !newEdificio || !newArea) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        fetch(`/aulas/actualizar/ajax/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Nombre_Aula: newNombre,
                ID_Edificio: newEdificio,
                ID_Area: newArea,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Aula actualizada correctamente');
                    cargarAulas(); // Recargar la lista de aulas
                } else {
                    alert('Error al actualizar el aula: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ocurrió un error al actualizar el aula:', error);
            });
    }
    
    
    
    

    function eliminarAula(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este edificio?')) {
            fetch(`/aulas/eliminar/ajax/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Edificio eliminado correctamente');
                    cargarAulas();
                } else {
                    alert('Error al eliminar el edificio: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el edificio:', error);
            });
        }
    }

});
