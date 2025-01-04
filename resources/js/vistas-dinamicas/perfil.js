document.addEventListener("DOMContentLoaded", function () {
    const table = $('#perfilTable').DataTable({
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    }); // Inicializamos DataTable

    // Función para cargar los perfiles
    function cargarPerfiles() {
        $.ajax({
            url: '/perfil/obtener/ajax', // Ruta para obtener los perfiles
            method: 'GET',
            success: function (data) {
                table.clear(); // Limpiar la tabla
                data.forEach(perfil => {
                    // Agregar cada perfil a la tabla
                    table.row.add([
                        perfil.ID_Perfil,
                        perfil.Nombre,
                        `
                            <button class="btn-editar" data-id="${perfil.ID_Perfil}">
                                ✏️ Editar
                            </button>
                            <button class="btn-eliminar" data-id="${perfil.ID_Perfil}">
                                ❌ Eliminar
                            </button>
                            <button class="btn-aceptar" data-id="${perfil.ID_Perfil}" style="display: none;">
                                ✔️ Aceptar
                            </button>
                        `
                    ]).draw(false);
                });
            },
            error: function (error) {
                console.error('Error al cargar los perfiles:', error);
                alert('Ocurrió un error al cargar los perfiles. Intenta nuevamente.');
            }
        });
    }

    // Delegación de eventos para eliminar el perfil
    $('#perfilTable').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        eliminarPerfil(id);
    });

    // Delegación de eventos para editar el perfil
    $('#perfilTable').on('click', '.btn-editar', function () {
        const button = this;
        editarPerfil(button);
    });

    // Delegación de eventos para aceptar cambios en la edición
    $('#perfilTable').on('click', '.btn-aceptar', function () {
        const button = this;
        const id = $(this).data('id');
        actualizarPerfil(id);
    });

    // Función para eliminar un perfil
    function eliminarPerfil(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este perfil?')) return;

        $.ajax({
            url: `/perfil/eliminar/ajax/${id}`, // Ruta para eliminar el perfil
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            },
            success: function (response) {
                cargarPerfiles(); // Recargar la tabla
                console.log('¡Perfil eliminado correctamente!');
            },
            error: function (error) {
                console.error('Error al eliminar el perfil:', error);
                alert('Ocurrió un error al eliminar el perfil. Intenta nuevamente.');
            }
        });
    }

    // Función para editar el perfil
    function editarPerfil(button) {
        const row = button.closest('tr'); // Seleccionar la fila correspondiente
        const ID_Perfil = button.getAttribute('data-id'); // Obtener el ID del perfil
        const nombreCell = row.querySelector('td:nth-child(2)'); // Obtener la celda de nombre
        const nombre = nombreCell.textContent;

        // Cambiar la celda de nombre a un campo de texto editable
        nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Perfil}" />`;

        // Ocultar los botones de editar y eliminar, y mostrar el de aceptar
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Enfocar el campo de entrada
        document.querySelector(`#input-nombre-${ID_Perfil}`).focus();

        // Detectar la tecla Enter para guardar los cambios
        document.querySelector(`#input-nombre-${ID_Perfil}`).addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                actualizarPerfil(ID_Perfil); // Llamar a la función de actualización al presionar Enter
            }
        });
    }

    // Función para actualizar el perfil
    function actualizarPerfil(ID_Perfil) {
        const inputNombre = document.querySelector(`#input-nombre-${ID_Perfil}`);
        const nuevoNombre = inputNombre.value;

        if (!nuevoNombre.trim()) {
            alert('El nombre no puede estar vacío.');
            return;
        }

        $.ajax({
            url: `/perfil/actualizar/ajax/${ID_Perfil}`, // Ruta para actualizar el perfil
            method: 'PUT',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nuevoNombre
            },
            success: function (response) {
                if (response.success) {
                    // Recargar los perfiles y actualizar la tabla
                    cargarPerfiles();
                    console.log('¡Perfil actualizado correctamente!');
                } else {
                    alert(response.message || 'Ocurrió un error al actualizar el perfil.');
                }
            },
            error: function (error) {
                console.error('Error al actualizar el perfil:', error);
                alert('Ocurrió un error al actualizar el perfil. Intenta nuevamente.');
            }
        });
    }

    // Cargar los perfiles al inicio
    cargarPerfiles();

    // Función para agregar un nuevo perfil
    document.getElementById("agregarPerfilForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        const nombre = document.getElementById("Nombre").value;

        if (!nombre.trim()) {
            alert('El nombre del perfil no puede estar vacío.');
            return;
        }

        $.ajax({
            url: '/perfil/agregar/ajax', // Ruta para agregar perfil
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nombre
            },
            success: function (response) {
                alert('¡Perfil agregado correctamente!');
                cargarPerfiles(); // Recargar la tabla de perfiles
                document.getElementById("Nombre").value = ''; // Limpiar el campo de entrada
            },
            error: function (error) {
                console.error('Error al agregar el perfil:', error);
                alert('Ocurrió un error al agregar el perfil. Intenta nuevamente.');
            }
        });
    });
});
