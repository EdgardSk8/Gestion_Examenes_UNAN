<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-rol.blade.php -->

<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Perfil</h2>

    <!-- Formulario para agregar un nuevo perfil (rol) -->
    <form id="agregarRolForm" action="{{ route('rol.agregar.ajax') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Perfil (Rol):</label>
            <input type="text" id="NombreRol" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">
        
        <h2 style="text-align: center; margin-top: 20px;">Lista de Perfiles</h2>

            <table id="rolTable" class="display">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Aquí se cargarán dinámicamente los roles -->
                </tbody>
            </table>
    </div>
    

</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Función para cargar los roles
        function cargarRoles() {
            $.ajax({
                url: '{{ route('rol.obtener.ajax') }}', // Ruta para obtener los roles
                method: 'GET',
                success: function (data) {
                    const table = $('#rolTable').DataTable();
                    table.clear(); // Limpiar la tabla

                    // Recorrer cada rol y agregarlo a la tabla
                    data.forEach(rol => {
                        table.row.add([
                            rol.ID_Rol,
                            rol.Nombre,
                            ` 
                                <button class="btn-editar" data-id="${rol.ID_Rol}" onclick="editarRol(this)">
                                    ✏️ Editar
                                </button>
                                <button class="btn-eliminar" data-id="${rol.ID_Rol}" onclick="eliminarRol(${rol.ID_Rol})">
                                    ❌ Eliminar
                                </button>
                                <button class="btn-aceptar" data-id="${rol.ID_Rol}" style="display: none;" onclick="actualizarRol(${rol.ID_Rol})">
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

        // Función para eliminar un rol
        window.eliminarRol = function(id) {
            if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) return;

            $.ajax({
                url: `/rol/eliminar/ajax/${id}`, // Ruta para eliminar rol
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                },
                success: function (response) {
                    cargarRoles(); // Recargar la tabla de roles
                    console.log('¡Rol eliminado correctamente!');
                },
                error: function (error) {
                    console.error('Error al eliminar el rol:', error);
                    alert('Ocurrió un error al eliminar el rol. Intenta nuevamente.');
                }
            });
        }

        // Función para agregar un nuevo rol
        document.getElementById("agregarRolForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar el envío tradicional del formulario

            const nombre = document.getElementById("NombreRol").value;

            // Validación previa antes de hacer la solicitud
            if (!nombre.trim()) {
                alert('El nombre del rol no puede estar vacío.');
                return;
            }

            $.ajax({
                url: '{{ route('rol.agregar.ajax') }}', // Ruta para agregar rol
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

        // Llamar la función cargarRoles al cargar la página
        cargarRoles();

        // Función para editar un rol
        window.editarRol = function(button) {
            const row = button.closest('tr'); // Seleccionar la fila correspondiente
            const ID_Rol = button.getAttribute('data-id'); // Obtener ID desde el botón de edición
            const nombreCell = row.querySelector('td:nth-child(2)');
            const nombre = nombreCell.textContent;

            // Generar un id único para el input
            nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Rol}" />`;

            // Ocultar los botones de editar y eliminar, y mostrar el botón de aceptar
            row.querySelector('.btn-editar').style.display = 'none';
            row.querySelector('.btn-eliminar').style.display = 'none';
            row.querySelector('.btn-aceptar').style.display = 'inline-block';

            document.querySelector(`#input-nombre-${ID_Rol}`).focus();

            document.querySelector(`#input-nombre-${ID_Rol}`).addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    actualizarRol(ID_Rol); // Llamar a la función de actualizar al presionar Enter
                }
            });
        }

        // Función para actualizar un rol
        window.actualizarRol = function(ID_Rol) {
            const inputNombre = document.querySelector(`#input-nombre-${ID_Rol}`);

            if (inputNombre) {
                const nuevoNombre = inputNombre.value;

                if (!nuevoNombre.trim()) {
                    alert('El nombre no puede estar vacío.');
                    return;
                }

                $.ajax({
                    url: `/rol/actualizar/ajax/${ID_Rol}`, // Ruta para actualizar rol
                    method: 'PUT',
                    data: {
                        _token: document.querySelector('input[name="_token"]').value, // CSRF token
                        Nombre: nuevoNombre
                    },
                    success: function (response) {
                        if (response.success) {
                            cargarRoles(); // Recargar la tabla de roles
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
            } else {
                alert("No se encontró el campo de nombre para el rol.");
            }
        }
    });
</script>
