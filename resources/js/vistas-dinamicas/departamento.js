console.log(Nombre);
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
    const areaSelect = document.querySelector('#area-vista-departamento');``

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
    function cargar_departamentos() {
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
                            <td class="nombre_departamento">${departamento.Nombre}</td>
                            <td class="area_departamento">${departamento.area_conocimiento ? departamento.area_conocimiento.Nombre : 'Sin Area de Conocimiento'}</td>
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
                            eliminar_departamento(departamento.ID_Departamento);
                        });

                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editar_departamento(departamento);
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

    function editar_departamento(departamento) {
        // Limitar la búsqueda de filas a la tabla específica
        const table = document.querySelector('#departamentoTable');
        if (!table) {
            console.error('Tabla no encontrada');
            return;
        }
    
        const row = table.querySelector(`tr[data-id="${departamento.ID_Departamento}"]`);
        if (!row) {
            console.error('Fila no encontrada');
            return;
        }
    
        const nombreCell_Departamento = row.querySelector('td:nth-child(2)');
        const areaCell_Departamento = row.querySelector('td:nth-child(3)');
    
        // Reemplazar el nombre por un input y enfocarlo automáticamente
        const inputNombre = crearCamposInput(nombreCell_Departamento, departamento.Nombre);
    
        // Reemplazar el área por un selector con las áreas disponibles
        actualizarAreaSelect(areaCell_Departamento, departamento.ID_Area);
    
        // Mostrar el botón de aceptar y ocultar los otros
        botonesAlternar(row, 'none', 'inline-block');
    
        // Detectar "Enter" en el input de nombre
        inputNombre.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                guardarCambios(departamento.ID_Departamento);
            }
        });
    }
    
    // Crear un input para el nombre del departamento
    function crearCamposInput(cell, value) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        cell.innerHTML = ''; // Limpiar el contenido de la celda
        cell.appendChild(input);
        input.focus();
        return input;
    }
    
    // Actualizar la celda de área con un selector de áreas
    function actualizarAreaSelect(cell, selectedID_Area) {
        fetch('/area-conocimiento')
            .then(response => response.json())
            .then(data => {
                const select = document.createElement('select');
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
                    if (selectedID_Area === area.ID_Area) {
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
                cell.innerHTML = ''; // Limpiar la celda
                cell.appendChild(select);
            })
            .catch(error => console.error('Error al cargar las áreas:', error));
    }
    
    // Alternar visibilidad de los botones de editar/eliminar/aceptar
    function botonesAlternar(row, editarEliminarDisplay, aceptarDisplay) {
        row.querySelector('.btn-editar').style.display = editarEliminarDisplay;
        row.querySelector('.btn-eliminar').style.display = editarEliminarDisplay;
        row.querySelector('.btn-aceptar').style.display = aceptarDisplay;
    }
    
    // Función para guardar los cambios realizados en el departamento
    function guardarCambios(id) {
        // Limitar la búsqueda de filas a la tabla específica
        const table = document.querySelector('#departamentoTable');
        if (!table) {
            console.error('Tabla no encontrada');
            return;
        }
    
        const row = table.querySelector(`tr[data-id="${id}"]`);
        if (!row) {
            console.error('Fila no encontrada');
            return;
        }
    
        const NuevoNombre_Departamento = row.querySelector('td:nth-child(2) input').value;
        const NuevaArea_Departamento = row.querySelector('td:nth-child(3) select').value;
    
        fetch(`/departamento/actualizar/ajax/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: NuevoNombre_Departamento,
                ID_Area: NuevaArea_Departamento
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Departamento actualizado correctamente');
                    cargar_departamentos(); // Recargar la lista de departamentos
                } else {
                    alert('Error al actualizar el departamento: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al actualizar el departamento:', error);
            });
    }
    

    // Función para eliminar un departamento
    function eliminar_departamento(id) {
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
                    cargar_departamentos();
                } else {
                    alert('Error al eliminar el departamento: ' + data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el departamento:', error);
            });
        }
    }

    // Función para agregar un nuevo departamento (con AJAX usando jQuery)
    document.getElementById("agregarDepartamentoForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        const form = this; // Referencia al formulario
        const formData = {
            _token: document.querySelector('input[name="_token"]').value, // Token CSRF
            Nombre: form.querySelector('input[name="Nombre_Departamento"]').value, // Valor del campo 'Nombre'
            ID_Area: form.querySelector('select[name="ID_Area"]').value // Valor del área seleccionada
        };

        $.ajax({
            url: '/departamento/agregar/ajax', // Ruta configurada en el atributo 'action' del formulario
            method: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    alert('¡Departamento agregado correctamente!');
                    cargar_departamentos(); // Recargar la tabla con los nuevos datos
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

    // Inicializar los departamentos al cargar la página
    cargar_departamentos();
});
