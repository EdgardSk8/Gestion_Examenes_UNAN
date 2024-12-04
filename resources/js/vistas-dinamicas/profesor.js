document.addEventListener('DOMContentLoaded', function () {
    const profesorTableBody = document.querySelector('#profesorTable tbody');
    const table = $('#profesorTable').DataTable({ 
        "paging": true,  // Habilitar paginación
        "searching": true,  // Habilitar búsqueda
        "info": true,  // Mostrar información
    });

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
                            <td>${profesor.Nombre_Completo_P}</td>
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
                    console.log('No se pudieron cargar los profesores:', data.message);
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
                console.log(areaId);
                console.log(departamentoId);
                console.log(nombreprofesor);
                console.log(correo);
                console.log(contrasenia);
                console.log(perfil);
            },
            error: function (error) {
                console.error('Error al agregar Profesor:', error);
                alert('Ocurrió un error al agregar Profesor. Intenta nuevamente.');
                console.log(areaId);
                console.log(departamentoId);
                console.log(nombreprofesor);
                console.log(correo);
                console.log(contrasenia);
                console.log(perfil);
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






});