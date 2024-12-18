document.addEventListener('DOMContentLoaded', function () {
    const profesorTableBody = document.querySelector('#profesorTable tbody');
    const table = $('#profesorTable').DataTable({ 
        "paging": true,  // Habilitar paginación
        "searching": true,  // Habilitar búsqueda
        "info": true,  // Mostrar información
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    });

    const areaSelect = document.getElementById('area-vista-profesor');
    const departamentoSelectP = document.getElementById('departamento-vista-profesor');
    const perfilSelect = document.getElementById('perfil-vista-profesor');

    // Cargar áreas de conocimiento
    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;
                    areaSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error al cargar áreas de conocimiento:", error));

    // Cargar departamentos según el área seleccionada
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;

        // Limpiar opciones previas y agregar placeholder
        departamentoSelectP.innerHTML = '<option value="" disabled selected>Seleccione un departamento</option>';

        fetch(`/departamentos?idArea=${areaId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(departamento => {
                        const option = document.createElement('option');
                        option.value = departamento.ID_Departamento;
                        option.textContent = departamento.Nombre;
                        departamentoSelectP.appendChild(option);
                    });
                } else {
                    const option = document.createElement('option');
                    option.value = "";
                    option.disabled = true;
                    option.selected = true;
                    option.textContent = "No hay departamentos disponibles";
                    departamentoSelectP.appendChild(option);
                }
            })
            .catch(error => console.error("Error al cargar departamentos:", error));
    });

    // Cargar perfiles
    fetch('/perfil')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                data.forEach(perfil => {
                    const option = document.createElement('option');
                    option.value = perfil.ID_Perfil;
                    option.textContent = perfil.Nombre;
                    perfilSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error al cargar perfiles:", error));

    cargarProfesores();

    // Función para obtener todas los profesores desde el backend
    function cargarProfesores() {
        fetch('/profesor/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    profesorTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
                    table.clear(); // Limpiar la tabla en DataTable
    
                    data.data.forEach(profesor => {
                        // Validar relaciones para evitar errores si no existen
                        const nombreDepartamento = profesor.departamento?.Nombre || 'Sin departamento';
                        const nombreArea = profesor.departamento?.area_conocimiento?.Nombre || 'Sin área';
                        const nombrePerfil = profesor.perfil?.Nombre || 'Sin perfiles';
                        const correoprofesor = profesor.Correo || 'Sin correo';
                        const contraseniaprofesor = profesor.Contrasenia || 'Sin contraseña';
    
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', profesor.ID_Profesor); // Añadir el ID_profesor a la fila
                        row.innerHTML = `
                            <td>${profesor.ID_Profesor}</td>
                            <td class="nombre">${profesor.Nombre_Completo_P}</td>
                            <td class="departamento">${nombreDepartamento}</td>
                            <td class="area">${nombreArea}</td>
                            <td class="perfil">${nombrePerfil}</td>
                            <td class="correo">${correoprofesor}</td>
                            <td class="contraseña">${contraseniaprofesor}</td>
                            <td>
                                <button class="btn-editar" data-id="${profesor.ID_Profesor}">✏️ Editar</button>
                                <button class="btn-eliminar" data-id="${profesor.ID_Profesor}">❌ Eliminar</button>
                                <button class="btn-aceptar" data-id="${profesor.ID_Profesor}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        profesorTableBody.appendChild(row);
    
                        // Agregar las filas a la tabla DataTable
                        table.row.add(row).draw();
    
                        // Event listeners para editar, eliminar y aceptar
                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarprofesor(profesor.ID_Profesor); // Usar ID_profesor
                        });
    
                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarprofesor(profesor); // Usar la información completa de la profesor
                        });
    
                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(profesor.ID_Profesor); // Usar ID_profesor
                        });
                    });
                } else {
                    //console.log('No se pudieron cargar los profesores:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar las profesores:', error);
                alert('Ocurrió un error al cargar las profesors, por favor intente nuevamente.');
            });
    }

    // Función para agregar una nuevo profesor
    document.getElementById("AgregarProfesorForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional
    
        // Obtener los valores del formulario
        const areaId = document.getElementById("area-vista-profesor").value;
        const departamentoId = document.getElementById("departamento-vista-profesor").value;
        const nombreprofesor = document.querySelector('input[name="Nombre_Completo_P"]').value;
        const correo = document.querySelector('input[name="Correo"]').value;
        const contrasenia = document.querySelector('input[name="Contrasenia"]').value;
        const perfil = document.getElementById("perfil-vista-profesor").value;

    
        // Validar campos
        if (!areaId) {
            alert('Por favor, seleccione un área de conocimiento.');
            return;
        }
        if (!departamentoId) {
            alert('Por favor, seleccione un departamento.');
            return;
        }
        if (!nombreprofesor.trim()) {
            alert('Por favor, ingrese un nombre del profesor');
            return;
        }
        if (!correo.trim()) {
            alert('Por favor, ingrese un correo');
            return;
        }
        if (!contrasenia.trim()) {
            alert('Por favor, ingrese una contrasenia.');
            return;
        }
        if (!perfil) {
            alert('Por favor, seleccione un perfil');
            return;
        }

        // Realizar la petición AJAX para agregar Profesor
        $.ajax({
            url: '/profesor/agregar/ajax',
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                ID_Area: areaId,
                ID_Departamento: departamentoId,
                Nombre_Completo_P: nombreprofesor,
                Correo: correo,
                Contrasenia: contrasenia,
                ID_Perfil: perfil
            },
            success: function (response) {
                alert('¡Profesor agregado correctamente!');
                cargarProfesores(); 
                document.getElementById("AgregarProfesorForm").reset();
            },
            error: function (error) {
                console.error('Error al agregar Profesor:', error);
                alert('Ocurrió un error al agregar Profesor. Intenta nuevamente.');
                /*console.log(areaId);
                console.log(departamentoId);
                console.log(nombreprofesor);
                console.log(correo);
                console.log(contrasenia);
                console.log(perfil);*/
            }
        });
    });
    
    function eliminarprofesor(profesorId) {
        if (confirm('¿Estás seguro de eliminar este profesor?')) {
            fetch(`/profesor/eliminar/ajax/${profesorId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('profesor eliminada exitosamente');
                    cargarProfesores();
                } else {
                    console.log('Error al eliminar el profesor:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al eliminar el profesor:', error);
            });
        }
    }

    function editarprofesor(profesor) {
        if (!profesor || !profesor.ID_Profesor) {
            console.error('El objeto profesor no tiene un ID válido:', profesor);
            return;
        }
    
        const row = document.querySelector(`tr[data-id="${profesor.ID_Profesor}"]`);

        if (!row) {
            console.error(`Fila con ID_Profesor ${profesor.ID_Profesor} no encontrada.`);
            return;
        }
    
        const nombreCell = row.querySelector(".nombre");
        const departamentoCell = row.querySelector('.departamento');
        const areaCell = row.querySelector('.area');
        const perfilCell = row.querySelector('.perfil');
        const correoCell = row.querySelector('.correo');
        const contraseniaCell = row.querySelector('.contraseña');
    
        if (!nombreCell || !departamentoCell || !areaCell || !perfilCell || !correoCell || !contraseniaCell) {
            console.error('No se encontraron algunas celdas en el DOM. Verifica las clases td.nombre, td.departamento, td.area, td.perfil, td.correo, td.contraseña.');
            console.log('ID: ', row);
            console.log('Nombre del profesor: ', nombreCell);
            console.log('Departamento del profesor: ', departamentoCell);
            console.log('Area del profesor: ', areaCell);
            console.log('perfil del profesor: ', perfilCell);
            console.log('Correo del profesor: ', correoCell);
            console.log('Contrasenia del profesor: ', contraseniaCell);
            return;
        }

        // Reemplazar los valores por inputs
        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${profesor.Nombre_Completo_P}" />`;
        correoCell.innerHTML = `<input type="text" class="input-correo" value="${profesor.Correo}" />`;
        contraseniaCell.innerHTML = `<input type="text" class="input-contrasenia" value="${profesor.Contrasenia}" />`;


        // Si no se pudo cargar el departamento, permitir que el usuario lo edite
        if (profesor.departamento && profesor.departamento.ID_Departamento) {
            departamentoCell.innerHTML = `<select class="select-departamento">
                <option value="${profesor.departamento.ID_Departamento}" selected>${profesor.departamento.Nombre}</option>
                <!-- Aquí puedes agregar más opciones de departamentos -->
            </select>`;
        } else {
            // Si no hay departamento, se permite seleccionar un valor predeterminado (ID 1)
            departamentoCell.innerHTML = `<select class="select-departamento">
                <option value="1" selected>Departamento no disponible</option>
            </select>`;
        }

        // Si no se pudo cargar el área, permitir que el usuario lo edite
        if (profesor.departamento && profesor.departamento.area_conocimiento) {
            areaCell.innerHTML = `<select class="select-area">
                <option value="${profesor.departamento.area_conocimiento.ID_Area}" selected>${profesor.departamento.area_conocimiento.Nombre}</option>
                <!-- Aquí puedes agregar más opciones de áreas -->
            </select>`;
        } else {
            // Si no hay área, se permite seleccionar el valor predeterminado (ID 1)
            areaCell.innerHTML = `<select class="select-area">
                <option value="1" selected>Área no disponible</option>
            </select>`;
        }

        // Reemplazar perfil por un selector (si no se cargó el perfil, permitir su edición)
        if (profesor.perfil && profesor.perfil.Nombre) {
            perfilCell.innerHTML = `<select class="select-perfil">
                <option value="${profesor.perfil.ID_Perfil}" selected>${profesor.perfil.Nombre}</option>
                <!-- Aquí puedes agregar más opciones de perfiles -->
            </select>`;
        } else {
            // Si no hay perfil, se permite seleccionar el valor predeterminado (ID 1)
            perfilCell.innerHTML = `<select class="select-perfil">
                <option value="1" selected>Perfil no disponible</option>
            </select>`;
        }

        nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${profesor.Nombre_Completo_P || 'Nombre no disponible'}" required />`;
        correoCell.innerHTML = `<input type="email" class="input-correo" value="${profesor.Correo || 'Correo no disponible'}" required />`;
        contraseniaCell.innerHTML = `<input type="text" class="input-contrasenia" value="${profesor.Contrasenia || 'Contraseña no disponible'}" required />`;

        if (profesor.departamento && profesor.departamento.ID_Departamento) {
            fetch(`/departamentos?idArea=${profesor.departamento.ID_Area}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error('La respuesta del servidor no contiene un array válido.');
                    }
    
                    const departamentoSelectP = document.createElement('select');
                    departamentoSelectP.setAttribute('name', 'departamento');
                    departamentoSelectP.classList.add('departamento-select');
    
                    data.forEach(departamento => {
                        const option = document.createElement('option');
                        option.value = departamento.ID_Departamento;
                        option.textContent = departamento.Nombre;
                        if (profesor.departamento.ID_Departamento === departamento.ID_Departamento) {
                            option.selected = true;
                        }
                        departamentoSelectP.appendChild(option);
                    });
    
                    if (data.length === 0) {
                        const noDepartamentos = document.createElement('span');
                        noDepartamentos.textContent = 'No hay departamentos disponibles para esta área.';
                        departamentoCell.innerHTML = ''; // Limpiar la celda
                        departamentoCell.appendChild(noDepartamentos);
                    } else {
                        departamentoCell.innerHTML = ''; // Limpiar la celda
                        departamentoCell.appendChild(departamentoSelectP);
                    } 
                })
                .catch(error => {
                    console.error('Error al cargar los departamentos:', error);
                });
        } else {
            console.error('No se pudo acceder al departamento de la profesor.');
        }
    
        fetch('/area-conocimiento')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar las áreas de conocimiento: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('La respuesta del servidor no contiene un array válido.');
                }

                const areaSelect = document.createElement('select');
                areaSelect.setAttribute('name', 'areaConocimiento');
                areaSelect.classList.add('area-select');

                // Asegurarse de que el área seleccionada sea la correcta
                data.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.ID_Area;
                    option.textContent = area.Nombre;

                    // Verificar si el área del departamento coincide con el área cargada
                    if (profesor.departamento && profesor.departamento.area_conocimiento && profesor.departamento.area_conocimiento.ID_Area === area.ID_Area) {
                        option.selected = true; // Seleccionar el área correspondiente
                    }

                    areaSelect.appendChild(option);
                });

                areaCell.innerHTML = ''; // Limpiar la celda
                areaCell.appendChild(areaSelect);

                // Escuchar el cambio del área para actualizar los departamentos
                areaSelect.addEventListener('change', function () {
                    const areaId = areaSelect.value;
                    fetch(`/departamentos?idArea=${areaId}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error al cargar los departamentos: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Departamentos para el área seleccionada:', data);

                            const departamentoSelectP = departamentoCell.querySelector('select');
                            if (departamentoSelectP) {
                                departamentoSelectP.innerHTML = ''; // Limpiar el selector de departamentos
                            }

                            if (data.length === 0) {
                                const noDepartamentos = document.createElement('select');
                                noDepartamentos.textContent = 'Sin Departamentos';
                                departamentoCell.innerHTML = ''; // Limpiar la celda
                                departamentoCell.appendChild(noDepartamentos);
                            } else {
                                const select = document.createElement('select');
                                select.setAttribute('name', 'departamento');
                                select.classList.add('departamento-select');

                                data.forEach(departamento => {
                                    const option = document.createElement('option');
                                    option.value = departamento.ID_Departamento;
                                    option.textContent = departamento.Nombre;
                                    select.appendChild(option);
                                });

                                departamentoCell.innerHTML = ''; // Limpiar la celda
                                departamentoCell.appendChild(select);
                            }
                        })
                        .catch(error => {
                            console.error('Error al cargar los departamentos:', error);
                        });
                });
            })
            .catch(error => {
                console.error('Error al cargar las áreas de conocimiento:', error);
                areaCell.textContent = 'Error al cargar áreas.';
            });
    
        // Reemplazar perfil por un selector
        fetch('/perfil')
            .then(response => response.json())
            .then(data => {
                const perfilSelect = document.createElement('select');
                perfilSelect.setAttribute('name', 'perfil');
                data.forEach(perfil => {
                    const option = document.createElement('option');
                    option.value = perfil.ID_Perfil;
                    option.textContent = perfil.Nombre;
                    if (profesor.perfil.ID_Perfil === perfil.ID_Perfil) {
                        option.selected = true;
                    }
                    perfilSelect.appendChild(option);
                });
                perfilCell.innerHTML = ''; // Limpiar la celda
                perfilCell.appendChild(perfilSelect);
            })
            .catch(error => console.error('Error al cargar los perfiles:', error));
    
        // Mostrar y ocultar botones
        const btnAceptar = row.querySelector('.btn-aceptar');
        const btnEditar = row.querySelector('.btn-editar');
        const btnEliminar = row.querySelector('.btn-eliminar');
    
        if (btnAceptar && btnEditar) {
            btnAceptar.style.display = 'inline';
            btnEditar.style.display = 'none';
            btnEliminar.style.display = 'none';
        } else {
            console.error('No se encontraron los botones aceptar o editar en la fila.');
        }
    }

    function guardarCambios(profesorId) {
        const row = document.querySelector(`tr[data-id="${profesorId}"]`);
        const nombreInput = row.querySelector('.input-nombre');
        const correoInput = row.querySelector('.input-correo');
        const contraseniaInput = row.querySelector('.input-contrasenia');
        const departamentoSelectP = row.querySelector('select[name="departamento"]');
        const perfilSelect = row.querySelector('select[name="perfil"]');
    
        // Crear el objeto con los datos actualizados
        const updatedProfesor = {
            ID_Profesor: profesorId,
            Nombre_Completo_P: nombreInput.value,
            Correo: correoInput.value,
            Contrasenia: contraseniaInput.value,
            ID_Departamento: departamentoSelectP.value,
            ID_Perfil: perfilSelect.value
        };
    
        // Enviar los cambios al servidor
        fetch(`/profesor/actualizar/ajax/${profesorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(updatedProfesor)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Profesor actualizado exitosamente');
                cargarProfesores(); // Recargar la lista de profesores
            } else {
                console.log('Error al actualizar el profesor:', data.message);
            }
        })
        .catch(error => {
            console.log('Ocurrió un error al actualizar el profesor:', error);
            alert('Ocurrió un error al actualizar el profesor, por favor intente nuevamente.');
        });
    }
    
});