document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-vista-carrera');
    const departamentoSelect = document.getElementById('departamento-select');
    const carreraTableBody = document.querySelector('#carreraTable tbody');
    const table = $('#carreraTable').DataTable({ 
        "paging": true,  // Habilitar paginación
        "searching": true,  // Habilitar búsqueda
        "info": true,  // Mostrar información
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    });

    document.getElementById("agregarCarreraForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional
    
        // Obtener los valores del formulario
        const areaId = document.getElementById("area-vista-carrera").value;
        const departamentoId = document.getElementById("departamento-select").value;
        const nombreCarrera = document.querySelector('input[name="Nombre_carrera"]').value;
    
        // Validar campos
        if (!areaId) {
            alert('Por favor, seleccione un área de conocimiento.');
            return;
        }
        if (!departamentoId) {
            alert('Por favor, seleccione un departamento.');
            return;
        }
        if (!nombreCarrera.trim()) {
            alert('Por favor, ingrese un nombre para la carrera.');
            return;
        }
    
        // Realizar la petición AJAX para agregar la carrera
        $.ajax({
            url: '/carrera/agregar/ajax', // Ruta para agregar carrera
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                ID_Area: areaId,
                ID_Departamento: departamentoId,
                Nombre: nombreCarrera
            },
            success: function (response) {
                alert('¡Carrera agregada correctamente!');
                cargarCarreras(); // Recargar la tabla con las carreras actualizadas
                // Limpiar el formulario
                document.getElementById("agregarCarreraForm").reset();
            },
            error: function (error) {
                console.error('Error al agregar la carrera:', error);
                alert('Ocurrió un error al agregar la carrera. Intenta nuevamente.');
            }
        });
    });

    cargarCarreras();

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

    // Cargar los departamentos asociados cuando se selecciona un área
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;
        departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';

        if (areaId) {
            fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        data.forEach(departamento => {
                            const option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            departamentoSelect.appendChild(option);
                        });
                    } else {
                        const option = document.createElement('option');
                        option.textContent = 'No hay departamentos disponibles';
                        option.disabled = true;
                        departamentoSelect.appendChild(option);
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los departamentos:', error);
                    const option = document.createElement('option');
                    option.textContent = 'Error al cargar los departamentos';
                    option.disabled = true;
                    departamentoSelect.appendChild(option);
                });
        }
    });

    // Función para obtener todas las carreras desde el backend
    function cargarCarreras() {
        fetch('/carrera/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    carreraTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
                    table.clear(); // Limpiar la tabla en DataTable
    
                    data.data.forEach(carrera => {
                        // Validar relaciones para evitar errores si no existen
                        const nombreDepartamento = carrera.departamento?.Nombre || 'Sin departamento';
                        const nombreArea = carrera.departamento?.area_conocimiento?.Nombre || 'Sin área';

                        const row = document.createElement('tr');
                        row.setAttribute('data-id', carrera.ID_Carrera); // Añadir el ID_Carrera a la fila
                        row.innerHTML = `
                            <td>${carrera.ID_Carrera}</td>
                            <td class="nombre">${carrera.Nombre}</td>
                            <td class="departamento">${nombreDepartamento}</td>
                            <td class="area">${nombreArea}</td>
                            <td>
                                <button class="btn-editar" data-id="${carrera.ID_Carrera}">✏️ Editar</button>
                                <button class="btn-eliminar" data-id="${carrera.ID_Carrera}">❌ Eliminar</button>
                                <button class="btn-aceptar" data-id="${carrera.ID_Carrera}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        carreraTableBody.appendChild(row);
    
                        // Agregar las filas a la tabla DataTable
                        table.row.add(row).draw();
    
                        // Event listeners para editar, eliminar y aceptar
                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarCarrera(carrera.ID_Carrera); // Usar ID_Carrera
                        });
    
                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarCarrera(carrera); // Usar la información completa de la carrera
                        });
    
                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(carrera.ID_Carrera); // Usar ID_Carrera
                        });
                    });
                } else {
                    console.log('No se pudieron cargar las carreras:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar las carreras:', error);
                alert('Ocurrió un error al cargar las carreras, por favor intente nuevamente.');
            });
    }

    function editarCarrera(carrera) {
        if (!carrera || !carrera.ID_Carrera) {
            console.error('El objeto carrera no tiene un ID válido:', carrera);
            return;
        }

        const nombreDepartamento = carrera.departamento?.Nombre || 'Sin departamento';
        if (nombreDepartamento == "Sin departamento"){
            console.log("Arreglar carreras sin departamentos");
        }
    
        const table = document.getElementById('carreraTable'); // Especificar la tabla
        if (!table) {
            console.error('La tabla con ID "carreraTable" no se encontró en el DOM.');
            return;
        }
    
        const row = table.querySelector(`tr[data-id="${carrera.ID_Carrera}"]`);
        if (!row) {
            console.error(`Fila con ID_Carrera ${carrera.ID_Carrera} no encontrada en la tabla específica.`);
            return;
        }
    
        const nombreCell = row.querySelector('td.nombre');
        const departamentoCell = row.querySelector('td.departamento');
        const areaCell = row.querySelector('td.area');
    
        if (!nombreCell || !departamentoCell || !areaCell) {
            console.error('No se encontraron algunas celdas en el DOM. Verifica las clases td.nombre, td.departamento, td.area.');
            return;
        }
        
        // Reemplazar el nombre por un input
        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${carrera.Nombre || ''}" />`;
        const inputNombre = nombreCell.querySelector('.input-nombre');
        inputNombre.focus();
    
        // Reemplazar el departamento por un selector dinámico
        if (carrera.departamento && carrera.departamento.ID_Departamento) {
            // Cargar departamentos basados en el área seleccionada
            fetch(`/departamentos?idArea=${carrera.departamento.ID_Area}`)
                .then(response => response.json())
                .then(data => {
                    const departamentoSelect = document.createElement('select');
                    departamentoSelect.setAttribute('name', 'departamento');
                    departamentoSelect.classList.add('departamento-select');
    
                    data.forEach(departamento => {
                        const option = document.createElement('option');
                        option.value = departamento.ID_Departamento;
                        option.textContent = departamento.Nombre;
                        if (carrera.departamento.ID_Departamento === departamento.ID_Departamento) {
                            option.selected = true;
                        }
                        departamentoSelect.appendChild(option);
                    });
    
                    departamentoCell.innerHTML = ''; // Limpiar la celda
                    departamentoCell.appendChild(departamentoSelect);
                })
                .catch(error => console.error('Error al cargar los departamentos:', error));
        }else{
            console.log("Sin departamento");
        }
    
        // Reemplazar el área por un selector dinámico
        fetch('/area-conocimiento')
            .then(response => response.json())
            .then(data => {
                const areaSelect = document.createElement('select');
                areaSelect.setAttribute('name', 'areaConocimiento');
                areaSelect.classList.add('area-select');
    
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
    
                    if (carrera.departamento && carrera.departamento.area_conocimiento && carrera.departamento.area_conocimiento.ID_Area === area.ID_Area) {
                        option.selected = true;
                    }
    
                    areaSelect.appendChild(option);
                });
    
                areaCell.innerHTML = ''; // Limpiar la celda
                areaCell.appendChild(areaSelect);
    
                // Actualizar departamentos dinámicamente al cambiar el área
                areaSelect.addEventListener('change', function () {
                    const areaId = areaSelect.value;
                    fetch(`/departamentos?idArea=${areaId}`)
                        .then(response => response.json())
                        .then(data => {
                            const departamentoSelect = departamentoCell.querySelector('select');
                            departamentoSelect.innerHTML = ''; // Limpiar el selector
    
                            data.forEach(departamento => {
                                const option = document.createElement('option');
                                option.value = departamento.ID_Departamento;
                                option.textContent = departamento.Nombre;
                                departamentoSelect.appendChild(option);
                            });
    
                            // Seleccionar automáticamente el primer departamento de la lista
                            if (data.length > 0) {
                                departamentoSelect.value = data[0].ID_Departamento;
                            }
                        })
                        .catch(error => console.error('Error al cargar los departamentos:', error));
                });
            })
            .catch(error => console.error('Error al cargar las áreas de conocimiento:', error));
    
        // Mostrar y ocultar botones
        const btnAceptar = row.querySelector('.btn-aceptar');
        const btnEditar = row.querySelector('.btn-editar');
        const btnEliminar = row.querySelector('.btn-eliminar');
    
        if (btnAceptar && btnEditar && btnEliminar) {
            btnAceptar.style.display = 'inline';
            btnEditar.style.display = 'none';
            btnEliminar.style.display = 'none';
        } else {
            console.error('No se encontraron los botones en la fila.');
        }
    }
    

    // Función para guardar los cambios
    function guardarCambios(carreraId) {
        const table = document.getElementById('carreraTable'); // Especificar la tabla
        if (!table) {
            console.error('La tabla con ID "tabla-carreras" no se encontró en el DOM.');
            return;
        }

        const row = table.querySelector(`tr[data-id="${carreraId}"]`);
        const nombreInput = row.querySelector('.input-nombre');
        const departamentoSelect = row.querySelector('select[name="departamento"]');

        const updatedCarrera = {
            ID_Carrera: carreraId,
            Nombre: nombreInput.value,
            ID_Departamento: departamentoSelect.value
        };

        fetch(`/carrera/actualizar/ajax/${carreraId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(updatedCarrera)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Carrera actualizada exitosamente');
                cargarCarreras(); // Recargar la tabla
            } else {
                console.error('Error al actualizar la carrera:', data.message);
            }
        })
        .catch(error => {
            console.error('Ocurrió un error al actualizar la carrera:', error);
        });
    }
    
    // Función para eliminar la carrera
    function eliminarCarrera(carreraId) {
        if (confirm('¿Estás seguro de eliminar esta carrera?')) {
            fetch(`/carrera/eliminar/ajax/${carreraId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Carrera eliminada exitosamente');
                    cargarCarreras();
                } else {
                    console.log('Error al eliminar la carrera:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar la carrera:', error);
                alert('Ocurrió un error al eliminar la carrera, por favor intente nuevamente.');
            });
        }
    }

});
