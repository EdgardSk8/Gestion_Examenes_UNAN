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
        event.preventDefault(); // Evitar envío tradicional del formulario

        const form = this;
    
        const formData = {
            _token: document.querySelector('input[name="_token"]').value,
            Nombre_Completo_P: document.getElementById("profesor").value,
            Correo: document.getElementById("Correo").value,
            Contrasenia: document.getElementById("Contrasenia").value,
            ID_Departamento: document.getElementById("departamento-vista-profesor").value,
            ID_Perfil: document.getElementById("perfil-vista-profesor").value,
            ID_Area: document.getElementById("area-vista-profesor").value
        };
    
        $.ajax({
            url: '/profesor/agregar/ajax', // Ruta del controlador
            method: 'POST',
            data: formData,
            success: function (response) {
                if (response.success) {
                    alert(response.message); // Mostrar mensaje de éxito
                    document.getElementById("AgregarProfesorForm").reset(); // Limpiar formulario
                    
                    cargarProfesores(); // Recargar tabla de profesores (asegúrate de tener esta función implementada)
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (error) {
                console.error('Error al agregar el profesor:', error);
                console.log(formData);

                alert('Ocurrió un error al agregar el profesor. Por favor, revisa los datos e inténtalo nuevamente.');
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