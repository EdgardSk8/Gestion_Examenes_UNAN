import { upperFirst } from "lodash";

document.addEventListener('DOMContentLoaded', function () {
    const estudianteTableBody = document.querySelector('#estudianteTable tbody');
    const table = $('#estudianteTable').DataTable({ 
        "paging": true,  // Habilitar paginación
        "searching": true,  // Habilitar búsqueda
        "info": true,  // Mostrar información
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    });

    const areaSelect = document.getElementById('area-vista-estudiante');
    const departamentoSelect = document.getElementById('departamento-vista-estudiante');
    const carreraSelect = document.getElementById('carrera-vista-estudiante');
    const localidadSelect = document.getElementById('localidad-vista-estudiante');
    const carnetInput = document.getElementById('Carnet'); 
    const correoInput = document.getElementById('Correo_Institucional');
    const mensajeCarnet = document.getElementById('mensaje-carnet');
    const mensajeCorreo = document.getElementById('mensaje-correo');
    const carnetexistente = document.getElementById('carnet-existente'); // Mensaje de éxito para formato correcto del carnet

    // Añadir las opciones predeterminadas
    areaSelect.appendChild(createDefaultOption('Seleccione un área de conocimiento'));
    departamentoSelect.appendChild(createDefaultOption('Seleccione un departamento'));
    carreraSelect.appendChild(createDefaultOption('Seleccione una carrera'));
    localidadSelect.appendChild(createDefaultOption('Seleccione una localidad'));

    // Función para crear la opción predeterminada de "Seleccione..."
    function createDefaultOption(text) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = text;
        option.disabled = true;
        option.selected = true;
        return option;
    }

    carnetInput.addEventListener('input', async function(event) {await validateInput(event.target);});

    async function validateInput(target) {
        let value = target.value;
        
        value = value.replace(/[^0-9-]/g, '');// Remover cualquier carácter que no sea un número o guion
        
        // Validar el patrón y agregar los guiones donde corresponda
        if (value.length > 2 && value[2] !== '-') {value = value.slice(0, 2) + '-' + value.slice(2);}
        if (value.length > 8 && value[8] !== '-') {value = value.slice(0, 8) + '-' + value.slice(8);}
        
        if (value.length > 10) {value = value.slice(0, 10);} //limitar a 10 caracteres

        target.value = value;
    }

    carnetInput.addEventListener('blur', function() {
        const carnet = carnetInput.value.trim();
    
        if (carnet.length < 10) {
            mensajeCarnet.textContent = "Carnet Incompleto";
            mensajeCarnet.style.display = 'block';  // Muestra el mensaje de que faltan datos
        } else {
            mensajeCarnet.style.display = 'none';  // Ocultamos el mensaje si el carnet tiene 10 o más caracteres
        }
    });
    
    // Función para validar el carnet (en backend, para verificar si ya está registrado)
    async function validateCarnet() {
        const carnet = carnetInput.value.trim();

        try {
            const response = await fetch(`/validar-carnet?carnet=${carnet}`);
            const data = await response.json();
    
            if (data.exists) {
                carnetexistente.textContent = "El carnet ya está registrado.";
                carnetexistente.style.display = 'block';
            } else {
                carnetexistente.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al validar el carnet:', error);
        }
    }

    carnetInput.addEventListener('input', validateCarnet); 
    
    // Función para validar el correo
    async function validateCorreo() {
        const correo = correoInput.value.trim();

        if (correo === '') {
            mensajeCorreo.style.display = 'none';  // Si el campo está vacío, no mostramos el mensaje
            return;
        }

        try {
            const response = await fetch(`/validar-correo?correo=${correo}`);
            const data = await response.json();

            if (data.exists) {
                mensajeCorreo.textContent = "Este correo institucional ya está registrado.";
                mensajeCorreo.style.display = 'block';
            } else {
                mensajeCorreo.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al validar el correo:', error);
        }
    }
    // Detectar cuando el usuario termina de escribir en el correo
    correoInput.addEventListener('input', validateCorreo); 

    // Cargar las áreas de conocimiento
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
                areaSelect.appendChild(createDefaultOption('No hay áreas disponibles'));
            }
        })
        .catch(error => {
            console.error('Error al cargar las áreas:', error);
            areaSelect.appendChild(createDefaultOption('Error al cargar las áreas'));
        });

    // Cargar los departamentos según el área seleccionada
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;

        // Limpiar los departamentos previos
        departamentoSelect.innerHTML = '';
        departamentoSelect.appendChild(createDefaultOption('Seleccione un departamento'));

        if (areaId) {
            fetch(`/departamentos?idArea=${areaId}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        data.forEach(departamento => {
                            let option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            departamentoSelect.appendChild(option);
                        });
                    } else {
                        departamentoSelect.appendChild(createDefaultOption('No hay departamentos disponibles'));
                    }
                })
                .catch(error => {
                    console.error('Error al cargar los departamentos:', error);
                    departamentoSelect.appendChild(createDefaultOption('Error al cargar los departamentos'));
                });
        }
    });

    // Cargar las carreras según el departamento seleccionado
    departamentoSelect.addEventListener('change', function () {
        const departamentoId = departamentoSelect.value;

        // Limpiar las carreras previas
        carreraSelect.innerHTML = '';
        carreraSelect.appendChild(createDefaultOption('Seleccione una carrera'));

        if (departamentoId) {
            fetch(`/carreras?departamentoId=${departamentoId}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        data.forEach(carrera => {
                            let option = document.createElement('option');
                            option.value = carrera.ID_Carrera;
                            option.textContent = carrera.Nombre;
                            carreraSelect.appendChild(option);
                        });
                    } else {
                        carreraSelect.appendChild(createDefaultOption('No hay carreras disponibles'));
                    }
                })
                .catch(error => {
                    console.error('Error al cargar las carreras:', error);
                    carreraSelect.appendChild(createDefaultOption('Error al cargar las carreras'));
                });
        }
    });

    // Cargar las localidades
    fetch('/localidades')
        .then(response => response.json())
        .then(data => {
            localidadSelect.innerHTML = '';
            localidadSelect.appendChild(createDefaultOption('Seleccione una localidad'));

            if (data && data.length > 0) {
                data.forEach(localidad => {
                    let option = document.createElement('option');
                    option.value = localidad.ID_Localidad;
                    option.textContent = localidad.Nombre;
                    localidadSelect.appendChild(option);
                });
            } else {
                localidadSelect.appendChild(createDefaultOption('No hay localidades disponibles'));
            }
        })
        .catch(error => {
            console.error('Error al cargar localidades:', error);
            localidadSelect.appendChild(createDefaultOption('Error al cargar localidades'));
        });

    cargarEstudiantes();

    function cargarEstudiantes() {
        fetch('/estudiante/ajax')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    estudianteTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla
                    table.clear(); // Limpiar la tabla en DataTable
    
                    data.data.data.forEach(estudiante => { // 'data.data' para acceder a los datos paginados
                        // Validar relaciones para evitar errores si no existen
                        const nombreEstudiante = estudiante.Nombre_Completo || 'Sin nombre';
                        const correoEstudiante = estudiante.Correo_Institucional || 'Sin correo';
                        const carnetEstudiante = estudiante.Carnet || 'Sin carnet';
                        const generoEstudiante = estudiante.Genero || 'Sin género';
    
                        const localidadNombre = estudiante.localidad?.Nombre || 'Sin localidad';
                        const carreraNombre = estudiante.carrera?.Nombre || 'Sin carrera';
                        const departamentoNombre = estudiante.carrera?.departamento?.Nombre || 'Sin departamento';
                        const areaNombre = estudiante.carrera?.departamento?.area_conocimiento?.Nombre || 'Sin área';
    
                        // Crear una fila para la tabla
                        const row = document.createElement('tr');
                        row.setAttribute('data-id', estudiante.ID_Estudiante); // Añadir el ID_Estudiante a la fila
                        row.innerHTML = `
                            <td>${estudiante.ID_Estudiante}</td>
                            <td class="nombre">${nombreEstudiante}</td>
                            <td class="area">${areaNombre}</td>
                            <td class="departamento">${departamentoNombre}</td>
                            <td class="carrera">${carreraNombre}</td>
                            <td class="localidad">${localidadNombre}</td>
                            <td class="carnet">${carnetEstudiante}</td>
                            <td class="correo">${correoEstudiante}</td>
                            <td class="genero">${generoEstudiante}</td>
                            <td>
                                <button class="btn-editar" data-id="${estudiante.ID_Estudiante}">✏️ Editar</button>
                                <button class="btn-eliminar" data-id="${estudiante.ID_Estudiante}">❌ Eliminar</button>
                                <button class="btn-aceptar" data-id="${estudiante.ID_Estudiante}" style="display: none;">✔️ Aceptar</button>
                            </td>
                        `;
                        estudianteTableBody.appendChild(row);
    
                        // Agregar las filas a la tabla DataTable
                        table.row.add(row).draw();
    
                        // Event listeners para editar, eliminar y aceptar
                        row.querySelector('.btn-eliminar').addEventListener('click', function () {
                            eliminarestudiante(estudiante.ID_Estudiante); // Usar ID_Estudiante
                        });
    
                        row.querySelector('.btn-editar').addEventListener('click', function () {
                            editarestudiante(estudiante); // Usar la información completa del estudiante
                        });
    
                        row.querySelector('.btn-aceptar').addEventListener('click', function () {
                            guardarCambios(estudiante.ID_Estudiante); // Usar ID_Estudiante
                        });
                    });
    
                    // Mostrar información de paginación si es necesario
                    if (data.data.total > 10) {
                        console.log(`Mostrando página ${data.data.current_page} de ${data.data.last_page}`);
                    }
                } else {
                    console.log('No se pudieron cargar los estudiantes:', data.message);
                }
            })
            .catch(error => {
                console.log('Ocurrió un error al cargar los estudiantes:', error);
            });
    }

        // Función para agregar un nuevo estudiante
        document.getElementById("AgregarEstudianteForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional
    
            // Obtener los valores del formulario
            const localidadId = document.getElementById("localidad-vista-estudiante").value;
            const carreraId = document.getElementById("carrera-vista-estudiante").value;
            const nombreEstudiante = document.querySelector('input[name="Nombre_Completo"]').value;
            const correo = document.querySelector('input[name="Correo_Institucional"]').value;
            const carnet = document.querySelector('input[name="Carnet"]').value;
            const genero = document.getElementById("genero-vista-estudiante").value;
    
            // Validar campos
            if (!localidadId) {
                alert('Por favor, seleccione una localidad.');
                return;
            }
            if (!carreraId) {
                alert('Por favor, seleccione una carrera.');
                return;
            }
            if (!nombreEstudiante.trim()) {
                alert('Por favor, ingrese el nombre del estudiante.');
                return;
            }
            if (!correo.trim()) {
                alert('Por favor, ingrese un correo institucional.');
                return;
            }
            if (!carnet.trim()) {
                alert('Por favor, ingrese un carnet.');
                return;
            }
            if (!genero) {
                alert('Por favor, seleccione el género del estudiante.');
                return;
            }
    
            // Realizar la petición AJAX para agregar Estudiante
            $.ajax({
                url: '/estudiante/agregar/ajax',
                method: 'POST',
                data: {
                    _token: document.querySelector('input[name="_token"]').value,
                    ID_Localidad: localidadId,
                    ID_Carrera: carreraId,
                    Nombre_Completo: nombreEstudiante,
                    Correo_Institucional: correo,
                    Carnet: carnet,
                    Genero: genero
                },
                success: function (response) {
                    alert('¡Estudiante agregado correctamente!');
                    cargarEstudiantes(); // Recargar la lista de estudiantes
                    document.getElementById("AgregarEstudianteForm").reset();
                    mensajeExito.style.display = 'none';
                    areaSelect.value = '';
                    departamentoSelect.value = '';
                    carreraSelect.value = '';
                    localidadSelect.value = '';
                },
                error: function (error) {
                    console.error('Error al agregar Estudiante:', error);
                    alert('Ocurrió un error al agregar el estudiante. Intenta nuevamente.');
                }
            });
        });

        function eliminarestudiante(estudianteId) {
            if (confirm('¿Estás seguro de eliminar este estudiante?')) {
                fetch(`/estudiante/eliminar/ajax/${estudianteId}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('estudiante eliminada exitosamente');
                        cargarEstudiantes();
                    } else {
                        console.log('Error al eliminar el estudiante:', data.message);
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error al eliminar el estudiante:', error);
                });
            }
        }

        function editarestudiante(estudiante) {
            if (!estudiante || !estudiante.ID_Estudiante) {
                console.error('El objeto estudiante no tiene un ID válido:', estudiante);
                return;
            }
            const table = document.getElementById('estudianteTable');
            //const row = table.querySelector(`tr[data-id="${edificio.ID_Edificio}"]`);
        
            //const row = document.querySelector(`tr[data-id="${estudiante.ID_Estudiante}"]`);
            const row = table.querySelector(`tr[data-id="${estudiante.ID_Estudiante}"]`);
            console.log(row);
        
            if (!row) {
                console.error(`Fila con ID_Estudiante ${estudiante.ID_Estudiante} no encontrada.`);
                return;
            }
        
            const nombreCell = row.querySelector(".nombre");
            const carnetCell = row.querySelector('.carnet');
            const generoCell = row.querySelector('.genero');
            const localidadCell = row.querySelector('.localidad');
            const carreraCell = row.querySelector('.carrera');
            const correoCell = row.querySelector('.correo');
            const areaCell = row.querySelector('.area');
            const departamentoCell = row.querySelector('.departamento');
        
            if (!nombreCell || !carnetCell || !generoCell || !localidadCell || !carreraCell || !correoCell || !areaCell || !departamentoCell) {
                console.error('No se encontraron algunas celdas en el DOM. Verifica las clases td.nombre, td.carnet, td.genero, td.localidad, td.carrera, td.correo, td.area, td.departamento.');
                return;
            }
        
            // Reemplazar los valores por inputs
            nombreCell.innerHTML = `<input type="text" class="input-nombre" value="${estudiante.Nombre_Completo}" />`;
            carnetCell.innerHTML = `<input type="text" class="input-carnet" value="${estudiante.Carnet}" />`;
            correoCell.innerHTML = `<input type="email" class="input-correo" value="${estudiante.Correo_Institucional}" />`;
        
            // Genero select
            generoCell.innerHTML = `<select class="select-genero">
                <option value="Masculino" ${estudiante.Genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
                <option value="Femenino" ${estudiante.Genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
            </select>`;
        
            // Localidad fetch
            fetch('/localidades') // Asume que tienes un endpoint que devuelve las localidades
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al cargar las localidades: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (!Array.isArray(data)) {
                        throw new Error('La respuesta del servidor no contiene un array válido.');
                    }
        
                    const localidadSelect = document.createElement('select');
                    localidadSelect.setAttribute('name', 'localidad');
                    localidadSelect.classList.add('localidad-select');
        
                    data.forEach(localidad => {
                        const option = document.createElement('option');
                        option.value = localidad.ID_Localidad;
                        option.textContent = localidad.Nombre;
        
                        if (estudiante.localidad && estudiante.localidad.ID_Localidad === localidad.ID_Localidad) {
                            option.selected = true; // Preseleccionar la localidad del estudiante
                        }
        
                        localidadSelect.appendChild(option);
                    });
        
                    localidadCell.innerHTML = ''; // Limpiar la celda
                    localidadCell.appendChild(localidadSelect);
                })
                .catch(error => {
                    console.error('Error al cargar las localidades:', error);
                    localidadCell.innerHTML = 'Error al cargar localidades.';
                });

                // Área de conocimiento fetch
                fetch('/area-conocimiento') // Asume que tienes un endpoint que devuelve las áreas de conocimiento
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
                
                        let areaSeleccionada = null; // Variable para controlar el área seleccionada
                
                        data.forEach(area => {
                            const option = document.createElement('option');
                            option.value = area.ID_Area;
                            option.textContent = area.Nombre;
                
                            // Si la carrera del estudiante tiene un área de conocimiento que coincide con el área actual de la lista
                            if (estudiante.carrera && estudiante.carrera.departamento && estudiante.carrera.departamento.area_conocimiento &&
                                estudiante.carrera.departamento.area_conocimiento.ID_Area === area.ID_Area) {
                                option.selected = true; // Preseleccionar el área del estudiante
                                areaSeleccionada = area.ID_Area; // Guardar el área seleccionada
                            }
                            areaSelect.appendChild(option);
                        });
                
                        // Si no se ha encontrado un área seleccionada, asignar el valor por defecto
                        if (!areaSeleccionada && data.length > 0) {
                            areaSeleccionada = data[0].ID_Area; // Si no se seleccionó nada, seleccionar el primer área
                            areaSelect.querySelector(`option[value="${areaSeleccionada}"]`).selected = true;
                        }
                
                        areaCell.innerHTML = ''; // Limpiar la celda
                        areaCell.appendChild(areaSelect);
                
                        // Cargar departamentos según área seleccionada
                        areaSelect.addEventListener('change', (e) => {
                            const areaId = e.target.value;
                            cargarDepartamentos(areaId);
                        });
                
                        // Cargar departamentos inicialmente
                        if (areaSeleccionada) {
                            cargarDepartamentos(areaSeleccionada);
                        }
                    })
                    .catch(error => {
                        console.error('Error al cargar las áreas de conocimiento:', error);
                        areaCell.innerHTML = 'Error al cargar áreas.';
                    });
            
                // Función para cargar los departamentos según el área seleccionada
                function cargarDepartamentos(areaId) {
                    fetch(`/departamentos?idArea=${areaId}`) // Endpoint para obtener departamentos por área
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error al cargar los departamentos: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            const departamentoSelect = document.createElement('select');
                            departamentoSelect.setAttribute('name', 'departamento');
                            departamentoSelect.classList.add('departamento-select');
                
                            // Si no hay departamentos, agregar una opción que diga "Sin departamentos"
                            if (Array.isArray(data) && data.length === 0) {
                                const noDepartamentosOption = document.createElement('option');
                                noDepartamentosOption.textContent = 'Sin departamentos';
                                noDepartamentosOption.disabled = true; // No seleccionable
                                noDepartamentosOption.selected = true; // Para que aparezca seleccionada por defecto
                                departamentoSelect.appendChild(noDepartamentosOption);
                            } else {
                                // Si hay departamentos, agregarlos
                                data.forEach(departamento => {
                                    const option = document.createElement('option');
                                    option.value = departamento.ID_Departamento;
                                    option.textContent = departamento.Nombre;
                
                                    if (estudiante.departamento && estudiante.departamento.ID_Departamento === departamento.ID_Departamento) {
                                        option.selected = true; // Preseleccionar el departamento del estudiante
                                    }
                
                                    departamentoSelect.appendChild(option);
                                });
                            }
                
                            departamentoCell.innerHTML = ''; // Limpiar la celda
                            departamentoCell.appendChild(departamentoSelect);
                
                            // Cargar carreras según departamento seleccionado
                            departamentoSelect.addEventListener('change', (e) => {
                                const departamentoId = e.target.value;
                                cargarCarreras(departamentoId);
                            });
                
                            // Cargar carreras inicialmente
                            const selectedDepartamentoId = departamentoSelect.value;
                            if (selectedDepartamentoId) {
                                cargarCarreras(selectedDepartamentoId);
                            }
                        })
                        .catch(error => {
                            console.error('Error al cargar los departamentos:', error);
                            departamentoCell.innerHTML = 'Error al cargar departamentos.';
                        });
                }
                
                // Función para cargar las carreras según el departamento seleccionado
                function cargarCarreras(departamentoId) {
                    fetch(`/carreras?departamentoId=${departamentoId}`) // Endpoint para obtener las carreras por departamento
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error al cargar las carreras: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            const carreraSelect = document.createElement('select');
                            carreraSelect.setAttribute('name', 'carrera');
                            carreraSelect.classList.add('carrera-select');
                
                            // Si no hay carreras, agregar una opción que diga "Sin carreras"
                            if (Array.isArray(data) && data.length === 0) {
                                const noCarrerasOption = document.createElement('option');
                                noCarrerasOption.textContent = 'Sin carreras';
                                noCarrerasOption.disabled = true; // No seleccionable
                                noCarrerasOption.selected = true; // Para que aparezca seleccionada por defecto
                                carreraSelect.appendChild(noCarrerasOption);
                            } else {
                                // Si hay carreras, agregarlas
                                data.forEach(carrera => {
                                    const option = document.createElement('option');
                                    option.value = carrera.ID_Carrera;
                                    option.textContent = carrera.Nombre;
                
                                    if (estudiante.carrera && estudiante.carrera.ID_Carrera === carrera.ID_Carrera) {
                                        option.selected = true; // Preseleccionar la carrera del estudiante
                                    }
                
                                    carreraSelect.appendChild(option);
                                });
                            }
                
                            carreraCell.innerHTML = ''; // Limpiar la celda
                            carreraCell.appendChild(carreraSelect);
                        })
                        .catch(error => {
                            console.error('Error al cargar las carreras:', error);
                            carreraCell.innerHTML = 'Error al cargar carreras.';
                        });
                }
        
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

        function guardarCambios(estudianteId) {
            // Obtener los nuevos valores de los campos
            const table = document.getElementById('estudianteTable');
            const row = table.querySelector(`tr[data-id="${estudianteId}"]`);
            //const row = document.querySelector(`tr[data-id="${estudianteId}"]`);
        
            if (!row) {
                console.error(`Fila con ID_Estudiante ${estudianteId} no encontrada.`);
                return;
            }
        
            const nombre = row.querySelector('.input-nombre').value;
            const areaId = row.querySelector('.area-select').value;
            const departamentoId = row.querySelector('.departamento-select').value;
            const carreraId = row.querySelector('.carrera-select').value;
            const localidadId = row.querySelector('.localidad-select').value;
            const carnetbackend = row.querySelector('.input-carnet').value;
            const correobackend = row.querySelector('.input-correo').value;
            const genero = row.querySelector('.select-genero').value;


        // Crear un objeto con los nuevos datos
        const datosEstudiante = {
            ID_Estudiante: estudianteId,
            Nombre_Completo: nombre,
            Carnet: carnetbackend,
            Correo_Institucional: correobackend,
            Genero: genero,
            ID_Localidad: localidadId,
            ID_Carrera: carreraId,
            ID_Departamento: departamentoId,
            ID_Area: areaId
        };
    
        // Enviar los datos al servidor para actualizar el estudiante
        fetch(`/estudiante/actualizar/ajax/${estudianteId}`, {
            method: 'PUT', // Asumimos que se usa PUT para actualizar
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(datosEstudiante)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si la actualización es exitosa, actualizamos la tabla
                row.querySelector('.nombre').textContent = nombre;
                row.querySelector('.carnet').textContent = carnetbackend;
                row.querySelector('.genero').textContent = genero;
                row.querySelector('.correo').textContent = correobackend;
                row.querySelector('.localidad').textContent = row.querySelector('.localidad-select').selectedOptions[0].textContent;
                row.querySelector('.area').textContent = row.querySelector('.area-select').selectedOptions[0].textContent;
                row.querySelector('.departamento').textContent = row.querySelector('.departamento-select').selectedOptions[0].textContent;
                row.querySelector('.carrera').textContent = row.querySelector('.carrera-select').selectedOptions[0].textContent;
    
                // Mostrar los botones de edición
                const btnAceptar = row.querySelector('.btn-aceptar');
                const btnEditar = row.querySelector('.btn-editar');
                const btnEliminar = row.querySelector('.btn-eliminar');
                
                if (btnAceptar && btnEditar) {
                    btnAceptar.style.display = 'none';
                    btnEditar.style.display = 'inline';
                    btnEliminar.style.display = 'inline';
                }
                // Informar al usuario que la actualización fue exitosa
                //alert('Estudiante actualizado correctamente');
            } else {
                // Si la actualización falla, mostrar un error
                alert('Error al actualizar el estudiante');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el estudiante:', error);
            alert('Hubo un error al intentar guardar los cambios.');
        });
    }
        
});