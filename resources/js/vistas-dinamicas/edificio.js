document.addEventListener('DOMContentLoaded', function () {
    const edificioTableBody = document.querySelector('#edificioTable tbody'); // Cuerpo de la tabla donde se cargarán los edificios
    const table = $('#edificioTable').DataTable();
    const areaSelect = document.querySelector('.area-vista-edificio');
    const form = document.querySelector('#agregarEdificioForm');

    // Función para obtener todos los edificios desde el backend
    function cargarEdificios() {
        fetch('/edificios/ajax') // Llamada al endpoint que devuelve todos los edificios
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Limpiar la tabla antes de agregar los nuevos datos
                    edificioTableBody.innerHTML = '';

                    // Iterar sobre cada edificio y agregar una fila a la tabla
                    data.data.forEach(edificio => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${edificio.ID_Edificio}</td>
                            <td>${edificio.Nombre_Edificio}</td>
                            <td>${edificio.area_conocimiento.Nombre}</td>
                            <td>
                                <button class="btn-editar" data-id="${edificio.ID_Edificio}">Editar</button>
                                <button class="btn-eliminar" data-id="${edificio.ID_Edificio}">Eliminar</button>
                            </td>
                        `;
                        // Agregar la fila a la tabla
                        edificioTableBody.appendChild(row);

                        // Agregar el evento de eliminación al botón
                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarEdificio(edificio.ID_Edificio);
                        });
                    });
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
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Asegúrate de que el token CSRF esté presente en el HTML
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Edificio eliminado correctamente');
                    cargarEdificios(); // Recargar la lista de edificios después de la eliminación
                } else {
                    alert('Error al eliminar el edificio: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el edificio:', error);
            });
        }
    }

    // Función para cargar las áreas de conocimiento al cargar la página
    function cargarAreas() {
        fetch('/area-conocimiento') // Cambia la URL si es necesario
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Añadir las opciones al select de área
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area; // Asignar el ID de la área
                        option.textContent = area.Nombre; // Mostrar el nombre de la área
                        areaSelect.appendChild(option); // Agregar la opción al select
                    });
                } else {
                    // Si no hay áreas disponibles
                    let option = document.createElement('option');
                    option.textContent = 'No hay áreas disponibles';
                    option.disabled = true;
                    areaSelect.appendChild(option);
                }
            })
            .catch(error => console.error('Error al cargar las áreas:', error)); // Manejo de errores
    }

    // Manejar el envío del formulario con AJAX
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el envío normal del formulario

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Agregar el token CSRF
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Edificio agregado exitosamente', data.message);
                cargarEdificios(); // Recargar la lista de edificios
                alert('Edificio agregado exitosamente');
                form.reset(); // Limpiar el formulario
            } else {
                console.log('Error al agregar el edificio', data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al agregar el edificio:', error);
        });
    });

    // Llamar a las funciones al cargar la página
    cargarEdificios();
    cargarAreas();
});
