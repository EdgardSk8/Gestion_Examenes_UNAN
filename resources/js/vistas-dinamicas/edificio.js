document.addEventListener('DOMContentLoaded', function () {
    const edificioTableBody = document.querySelector('#edificioTable tbody');
    const table = $('#edificioTable').DataTable({
        "paging": true,   // Habilitar paginación
        "searching": true, // Habilitar búsqueda
        "info": true // Información de la tabla
    });
    const areaSelect = document.querySelector('.area-vista-edificio');
    const form = document.querySelector('#agregarEdificioForm');

    // Cargar las áreas de conocimiento al cargar la página
    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(area => {
                    let option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
                    areaSelect.appendChild(option);
                });
            } else {
                let option = document.createElement('option');
                option.textContent = 'No hay áreas disponibles';
                option.disabled = true;
                areaSelect.appendChild(option);
            }
        })
        .catch(error => console.error('Error al cargar las áreas:', error));

    // Función para obtener todos los edificios desde el backend
    function cargarEdificios() {
        fetch('/edificios/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    edificioTableBody.innerHTML = '';
                    table.clear(); // Limpiar DataTable antes de agregar los nuevos datos

                    data.data.forEach(edificio => {
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', edificio.ID_Edificio); // Añadir el data-id a la fila
                        row.innerHTML = `
                            <td>${edificio.ID_Edificio}</td>
                            <td class="nombre">${edificio.Nombre_Edificio}</td>
                            <td class="area">${edificio.area_conocimiento.Nombre}</td>
                            <td>
                                <button class="btn-editar" data-id="${edificio.ID_Edificio}">✏️Editar</button>
                                <button class="btn-eliminar" data-id="${edificio.ID_Edificio}">❌Eliminar</button>
                                <button class="btn-aceptar" data-id="${edificio.ID_Edificio}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        edificioTableBody.appendChild(row);

                        // Agregar la fila a DataTable
                        table.row.add($(row)).draw();

                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarEdificio(edificio.ID_Edificio);
                        });

                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarEdificio(edificio);
                        });

                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(edificio.ID_Edificio);
                        });
                    });

                    // Actualizar la paginación y el mensaje de la tabla
                    table.draw();
                } else {
                    console.log('No se pudieron cargar los edificios:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar los edificios:', error);
            });
    }

    // Función para eliminar un edificio
    function eliminarEdificio(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este edificio?')) {
            fetch(`/edificio/eliminar/ajax/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Edificio eliminado correctamente');
                    cargarEdificios();
                } else {
                    alert('Error al eliminar el edificio: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el edificio:', error);
            });
        }
    }

    // Función para editar un edificio
    function editarEdificio(edificio) {
        const row = document.querySelector(`tr[data-id="${edificio.ID_Edificio}"]`);
        const nombreCell = row.querySelector('.nombre');
        const areaCell = row.querySelector('.area');

        // Reemplazar el nombre por un input y enfocarlo automáticamente
        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${edificio.Nombre_Edificio}" />`;
        const inputNombre = nombreCell.querySelector('.input-nombre');
        inputNombre.focus();

        // Reemplazar el área por un selector con las áreas disponibles
        fetch('/area-conocimiento')
            .then(response => response.json())
            .then(data => {
                const select = document.createElement('select');
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
                    if (edificio.area_conocimiento.ID_Area === area.ID_Area) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                areaCell.innerHTML = '';
                areaCell.appendChild(select);
            })
            .catch(error => console.error('Error al cargar las áreas:', error));

        // Mostrar el botón de aceptar y ocultar los otros
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Detectar "Enter" en el input de nombre
        inputNombre.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                guardarCambios(edificio.ID_Edificio);
            }
        });
    }

    // Función para guardar los cambios realizados en el edificio
    function guardarCambios(id) {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        const newNombre = row.querySelector('.input-nombre').value;
        const newArea = row.querySelector('select').value;

        fetch(`/edificio/actualizar/ajax/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre_Edificio: newNombre,
                ID_Area: newArea
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Edificio actualizado correctamente');
                cargarEdificios(); // Recargar la lista de edificios
            } else {
                alert('Error al actualizar el edificio: ' + data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al actualizar el edificio:', error);
        });
    }

    // Función para agregar un nuevo edificio
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
                console.log('Edificio agregado exitosamente', data.message);
                cargarEdificios();
                alert('Edificio agregado exitosamente');
                form.reset();
            } else {
                console.log('Error al agregar el edificio', data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al agregar el edificio:', error);
        });
    });

    // Llamar la función para cargar los edificios al cargar la página
    cargarEdificios();
});
