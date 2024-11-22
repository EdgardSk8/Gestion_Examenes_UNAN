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
