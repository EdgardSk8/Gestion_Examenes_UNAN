document.addEventListener("DOMContentLoaded", function () {
    const table = $('#rolTable').DataTable(); // Inicializamos DataTable

    // Función para cargar los roles
    function cargarRoles() {
        $.ajax({
            url: '/rol/obtener/ajax', // Ruta para obtener los roles
            method: 'GET',
            success: function (data) {
                table.clear(); // Limpiar la tabla
                data.forEach(rol => {
                    // Agregar cada rol a la tabla
                    table.row.add([
                        rol.ID_Rol,
                        rol.Nombre,
                        `
                            <button class="btn-editar" data-id="${rol.ID_Rol}">
                                ✏️ Editar
                            </button>
                            <button class="btn-eliminar" data-id="${rol.ID_Rol}">
                                ❌ Eliminar
                            </button>
                            <button class="btn-aceptar" data-id="${rol.ID_Rol}" style="display: none;">
                                ✔️ Aceptar
                            </button>
                        `
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al cargar los roles:', error);
                alert('Ocurrió un error al cargar los roles. Intenta nuevamente.');
            }
        });
    }

    // Delegación de eventos para eliminar el rol
    $('#rolTable').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        eliminarRol(id);
    });

    // Delegación de eventos para editar el rol
    $('#rolTable').on('click', '.btn-editar', function () {
        const button = this;
        editarRol(button);
    });

    // Delegación de eventos para aceptar cambios en la edición
    $('#rolTable').on('click', '.btn-aceptar', function () {
        const button = this;
        const id = $(this).data('id');
        actualizarRol(id);
    });

    // Función para eliminar un rol
    function eliminarRol(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) return;

        $.ajax({
            url: `/rol/eliminar/ajax/${id}`, // Ruta para eliminar el rol
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            },
            success: function (response) {
                cargarRoles(); // Recargar la tabla
                console.log('¡Rol eliminado correctamente!');
            },
            error: function (error) {
                console.error('Error al eliminar el rol:', error);
                alert('Ocurrió un error al eliminar el rol. Intenta nuevamente.');
            }
        });
    }

    // Función para editar el rol
    function editarRol(button) {
        const row = button.closest('tr'); // Seleccionar la fila correspondiente
        const ID_Rol = button.getAttribute('data-id'); // Obtener el ID del rol
        const nombreCell = row.querySelector('td:nth-child(2)'); // Obtener la celda de nombre
        const nombre = nombreCell.textContent;

        // Cambiar la celda de nombre a un campo de texto editable
        nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Rol}" />`;

        // Ocultar los botones de editar y eliminar, y mostrar el de aceptar
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Enfocar el campo de entrada
        document.querySelector(`#input-nombre-${ID_Rol}`).focus();

        // Detectar la tecla Enter para guardar los cambios
        document.querySelector(`#input-nombre-${ID_Rol}`).addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                actualizarRol(ID_Rol); // Llamar a la función de actualización al presionar Enter
            }
        });
    }

    // Función para actualizar el rol
    function actualizarRol(ID_Rol) {
        const inputNombre = document.querySelector(`#input-nombre-${ID_Rol}`);
        const nuevoNombre = inputNombre.value;

        if (!nuevoNombre.trim()) {
            alert('El nombre no puede estar vacío.');
            return;
        }

        $.ajax({
            url: `/rol/actualizar/ajax/${ID_Rol}`, // Ruta para actualizar el rol
            method: 'PUT',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nuevoNombre
            },
            success: function (response) {
                if (response.success) {
                    // Recargar los roles y actualizar la tabla
                    cargarRoles();
                    console.log('¡Rol actualizado correctamente!');
                } else {
                    alert(response.message || 'Ocurrió un error al actualizar el rol.');
                }
            },
            error: function (error) {
                console.error('Error al actualizar el rol:', error);
                alert('Ocurrió un error al actualizar el rol. Intenta nuevamente.');
            }
        });
    }

    // Cargar los roles al inicio
    cargarRoles();

    // Función para agregar un nuevo rol
    document.getElementById("agregarRolForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        const nombre = document.getElementById("NombreRol").value;

        if (!nombre.trim()) {
            alert('El nombre del rol no puede estar vacío.');
            return;
        }

        $.ajax({
            url: '/rol/agregar', // Ruta para agregar rol
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nombre
            },
            success: function (response) {
                alert('¡Rol agregado correctamente!');
                cargarRoles(); // Recargar la tabla de roles
                document.getElementById("NombreRol").value = ''; // Limpiar el campo de entrada
            },
            error: function (error) {
                console.error('Error al agregar el rol:', error);
                alert('Ocurrió un error al agregar el rol. Intenta nuevamente.');
            }
        });
    });
});
