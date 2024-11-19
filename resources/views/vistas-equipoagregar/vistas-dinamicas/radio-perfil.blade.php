<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-perfil.blade.php -->

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Perfil</h2>

    <!-- Formulario para agregar un nuevo perfil -->
    <form id="agregarPerfilForm" action="{{ route('perfil.agregar.ajax') }}" method="POST"> <!-- Acción para agregar el perfil con AJAX -->
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Perfil:</label>
            <input type="text" id="Nombre" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Perfiles</h2>

        <table id="perfilTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <!-- Aquí se cargarán dinámicamente los perfiles -->
            </tbody>
        </table>
    </div>
    
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Función para cargar los perfiles
        function cargarPerfiles() {
            $.ajax({
                url: '{{ route('perfil.obtener.ajax') }}', // Ruta para obtener los perfiles
                method: 'GET',
                success: function (data) {
                    const table = $('#perfilTable').DataTable();
                    table.clear(); // Limpiar la tabla

                    // Recorrer cada perfil y agregarlo a la tabla
                    data.forEach(perfil => {
                        table.row.add([
                            perfil.ID_Perfil,
                            perfil.Nombre,
                            ` 
                                <button class="btn-editar" data-id="${perfil.ID_Perfil}" onclick="editarPerfil(this)">
                                    ✏️ Editar
                                </button>
                                <button class="btn-eliminar" data-id="${perfil.ID_Perfil}" onclick="eliminarPerfil(${perfil.ID_Perfil})">
                                    ❌ Eliminar
                                </button>
                                <button class="btn-aceptar" data-id="${perfil.ID_Perfil}" style="display: none;" onclick="actualizarPerfil(${perfil.ID_Perfil})">
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

        // Función para eliminar un perfil
        window.eliminarPerfil = function(id) {
            if (!confirm('¿Estás seguro de que deseas eliminar este perfil?')) return;

            $.ajax({
                url: `/perfil/eliminar/ajax/${id}`, // Ruta para eliminar perfil
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                },
                success: function (response) {
                    cargarPerfiles(); // Recargar la tabla de perfiles
                    console.log('¡Perfil eliminado correctamente!');
                },
                error: function (error) {
                    console.error('Error al eliminar el perfil:', error);
                    alert('Ocurrió un error al eliminar el perfil. Intenta nuevamente.');
                }
            });
        }

        // Función para agregar un nuevo perfil
        document.getElementById("agregarPerfilForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar el envío tradicional del formulario

            const nombre = document.getElementById("Nombre").value;

            // Validación previa antes de hacer la solicitud
            if (!nombre.trim()) {
                alert('El nombre del perfil no puede estar vacío.');
                return;
            }

            $.ajax({
                url: '{{ route('perfil.agregar.ajax') }}', // Ruta para agregar perfil
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

        // Llamar la función cargarPerfiles al cargar la página
        cargarPerfiles();

        // Función para editar un perfil
        window.editarPerfil = function(button) {
            const row = button.closest('tr'); // Seleccionar la fila correspondiente
            const ID_Perfil = button.getAttribute('data-id'); // Obtener ID desde el botón de edición
            const nombreCell = row.querySelector('td:nth-child(2)');
            const nombre = nombreCell.textContent;

            // Generar un id único para el input
            nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Perfil}" />`;

            // Ocultar los botones de editar y eliminar, y mostrar el botón de aceptar
            row.querySelector('.btn-editar').style.display = 'none';
            row.querySelector('.btn-eliminar').style.display = 'none';
            row.querySelector('.btn-aceptar').style.display = 'inline-block';

            document.querySelector(`#input-nombre-${ID_Perfil}`).focus();

            document.querySelector(`#input-nombre-${ID_Perfil}`).addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    actualizarPerfil(ID_Perfil); // Llamar a la función de actualizar al presionar Enter
                }
            });
        }

        // Función para actualizar un perfil
        window.actualizarPerfil = function(ID_Perfil) {
            const inputNombre = document.querySelector(`#input-nombre-${ID_Perfil}`);

            if (inputNombre) {
                const nuevoNombre = inputNombre.value;

                if (!nuevoNombre.trim()) {
                    alert('El nombre no puede estar vacío.');
                    return;
                }

                $.ajax({
                    url: `/perfil/actualizar/ajax/${ID_Perfil}`, // Ruta para actualizar perfil
                    method: 'PUT',
                    data: {
                        _token: document.querySelector('input[name="_token"]').value, // CSRF token
                        Nombre: nuevoNombre
                    },
                    success: function (response) {
                        if (response.success) {
                            cargarPerfiles(); // Recargar la tabla de perfiles
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
            } else {
                alert("No se encontró el campo de nombre para el perfil.");
            }
        }
    });
</script>
