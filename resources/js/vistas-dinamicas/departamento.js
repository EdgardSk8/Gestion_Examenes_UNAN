document.addEventListener('DOMContentLoaded', function () {
    const departamentoTableBody = document.querySelector('#departamentoTable tbody');
    const table = $('#departamentoTable').DataTable({
        "paging": true,   // Habilitar paginación
        "searching": true, // Habilitar búsqueda
        "info": true, // Información de la tabla
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    });
    const areaSelect = document.querySelector('#area-vista-departamento');
    const form = document.querySelector('form');

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

    // Función para obtener todos los departamentos desde el backend
    function cargarDepartamentos() {
        fetch('/departamento/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    departamentoTableBody.innerHTML = '';
                    table.clear(); // Limpiar DataTable antes de agregar los nuevos datos

                    data.data.forEach(departamento => {
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', departamento.ID_Departamento); // Añadir el data-id a la fila
                        row.innerHTML = `
                            <td>${departamento.ID_Departamento}</td>
                            <td class="nombre">${departamento.Nombre}</td>
                            <td class="area">${departamento.area_conocimiento ? departamento.area_conocimiento.Nombre : 'N/A'}</td>
                            <td>
                                <button class="btn-editar" data-id="${departamento.ID_Departamento}">✏️Editar</button>
                                <button class="btn-eliminar" data-id="${departamento.ID_Departamento}">❌Eliminar</button>
                                <button class="btn-aceptar" data-id="${departamento.ID_Departamento}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        departamentoTableBody.appendChild(row);

                        // Agregar la fila a DataTable
                        table.row.add($(row)).draw();

                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarDepartamento(departamento.ID_Departamento);
                        });

                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarDepartamento(departamento);
                        });

                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(departamento.ID_Departamento);
                        });
                    });

                    // Actualizar la paginación y el mensaje de la tabla
                    table.draw();
                } else {
                    console.log('No se pudieron cargar los departamentos:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar los departamentos:', error);
            });
    }

    // Función para eliminar un departamento
    function eliminarDepartamento(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
            fetch(`/departamento/eliminar/ajax/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Departamento eliminado correctamente');
                    cargarDepartamentos();
                } else {
                    alert('Error al eliminar el departamento: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el departamento:', error);
            });
        }
    }

    // Función para editar un departamento
    function editarDepartamento(departamento) {
        const row = document.querySelector(`tr[data-id="${departamento.ID_Departamento}"]`);
        const nombreCell = row.querySelector('.nombre');
        const areaCell = row.querySelector('.area');

        // Reemplazar el nombre por un input y enfocarlo automáticamente
        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${departamento.Nombre}" />`;
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
                    if (departamento.ID_Area === area.ID_Area) {
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
                guardarCambios(departamento.ID_Departamento);
            }
        });
    }

    // Función para guardar los cambios realizados en el departamento
    function guardarCambios(id) {
        const row = document.querySelector(`tr[data-id="${id}"]`);
        const newNombre = row.querySelector('.input-nombre').value;
        const newArea = row.querySelector('select').value;

        fetch(`/departamento/actualizar/ajax/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: newNombre,
                ID_Area: newArea
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Departamento actualizado correctamente');
                cargarDepartamentos(); // Recargar la lista de departamentos
            } else {
                alert('Error al actualizar el departamento: ' + data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al actualizar el departamento:', error);
        });
    }

    // Función para agregar un nuevo departamento (con AJAX usando jQuery)
    document.getElementById("agregarDepartamentoForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        const form = this; // Referencia al formulario
        const formData = {
            _token: document.querySelector('input[name="_token"]').value, // Token CSRF
            Nombre: form.querySelector('input[name="Nombre"]').value, // Valor del campo 'Nombre'
            ID_Area: form.querySelector('select[name="ID_Area"]').value // Valor del área seleccionada
        };

        $.ajax({
            url: '/departamento/agregar/ajax', // Ruta configurada en el atributo 'action' del formulario
            method: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    alert('¡Departamento agregado correctamente!');
                    cargarDepartamentos(); // Recargar la tabla con los nuevos datos
                    form.reset(); // Limpiar el formulario
                } else {
                    alert('Error al agregar el departamento: ' + response.message);
                }
            },
            error: function (error) {
                console.error('Error al agregar el departamento:', error);
                alert('Ocurrió un error al agregar el departamento. Intenta nuevamente.');
            }
        });
    });


    // Llamar la función para cargar los departamentos al cargar la página
    cargarDepartamentos();
});
