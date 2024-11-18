<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Tipo de Examen</h2>

    <!-- Formulario para agregar un nuevo tipo de examen -->
    <form id="agregarTipoExamenForm" action="{{ route('tipoexamen.agregar.ajax') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Tipo de Examen:</label>
            <input type="text" id="TipoExamen" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <!-- Tabla donde se mostrarán los tipos de examen -->
    <h2 style="text-align: center; margin-top: 20px;">Lista de Tipos de Examen</h2>
    <table id="tipoExamenTable" class="display">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Aquí se cargarán dinámicamente los tipos de examen -->
        </tbody>
    </table>

</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Función para cargar los tipos de examen
        function cargarTipoExamen() {
            $.ajax({
                url: '{{ route('tipoexamen.obtener.ajax') }}', // Ruta para obtener los tipos de examen
                method: 'GET',
                success: function (data) {
                    const table = $('#tipoExamenTable').DataTable();
                    table.clear(); // Limpiar la tabla

                    // Recorrer cada tipo de examen y agregarlo a la tabla
                    data.forEach(tipoexamen => {
                        table.row.add([
                            tipoexamen.ID_Tipo_Examen,
                            tipoexamen.Nombre,
                            `
                                <button class="btn-editar" data-id="${tipoexamen.ID_Tipo_Examen}" onclick="editarTipoExamen(this)">
                                    ✏️ Editar
                                </button>
                                <button class="btn-eliminar" data-id="${tipoexamen.ID_Tipo_Examen}" onclick="eliminarTipoExamen(${tipoexamen.ID_Tipo_Examen})">
                                    ❌ Eliminar
                                </button>
                                <button class="btn-aceptar" data-id="${tipoexamen.ID_Tipo_Examen}" style="display: none;" onclick="actualizarTipoExamen(${tipoexamen.ID_Tipo_Examen})">
                                    ✔️ Aceptar
                                </button>
                            `
                        ]).draw(false);
                    });
                },
                error: function (error) {
                    console.error('Error al cargar los tipos de examen:', error);
                    alert('Ocurrió un error al cargar los tipos de examen. Intenta nuevamente.');
                }
            });
        }

        // Función para eliminar un tipo de examen
        window.eliminarTipoExamen = function(id) {
            if (!confirm('¿Estás seguro de que deseas eliminar este tipo de examen?')) return;

            $.ajax({
                url: `/tipoexamen/eliminar/${id}`, // Ruta para eliminar tipo de examen
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                },
                success: function (response) {
                    cargarTipoExamen(); // Recargar la tabla de tipos de examen
                    console.log('¡Tipo de Examen eliminado correctamente!');
                },
                error: function (error) {
                    console.error('Error al eliminar el tipo de examen:', error);
                    alert('Ocurrió un error al eliminar el tipo de examen. Intenta nuevamente.');
                }
            });
        }

        // Función para agregar un nuevo tipo de examen
        document.getElementById("agregarTipoExamenForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar el envío tradicional del formulario

            const nombre = document.getElementById("TipoExamen").value;

            // Validación previa antes de hacer la solicitud
            if (!nombre.trim()) {
                alert('El nombre del tipo de examen no puede estar vacío.');
                return;
            }

            $.ajax({
                url: '{{ route('tipoexamen.agregar.ajax') }}', // Ruta para agregar tipo de examen
                method: 'POST',
                data: {
                    _token: document.querySelector('input[name="_token"]').value,
                    Nombre: nombre
                },
                success: function (response) {
                    alert('¡Tipo de Examen agregado correctamente!');
                    cargarTipoExamen(); // Recargar la tabla de tipos de examen
                    document.getElementById("TipoExamen").value = ''; // Limpiar el campo de entrada
                },
                error: function (error) {
                    console.error('Error al agregar el tipo de examen:', error);
                    alert('Ocurrió un error al agregar el tipo de examen. Intenta nuevamente.');
                }
            });
        });

        // Llamar la función cargarTipoExamen al cargar la página
        cargarTipoExamen();

        // Función para editar un tipo de examen
        window.editarTipoExamen = function(button) {
            const row = button.closest('tr'); // Seleccionar la fila correspondiente
            const ID_Tipo_Examen = button.getAttribute('data-id'); // Obtener ID desde el botón de edición
            const nombreCell = row.querySelector('td:nth-child(2)');
            const nombre = nombreCell.textContent;

            nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Tipo_Examen}" />`;

            // Ocultar los botones de editar y eliminar, y mostrar el botón de aceptar
            row.querySelector('.btn-editar').style.display = 'none';
            row.querySelector('.btn-eliminar').style.display = 'none';
            row.querySelector('.btn-aceptar').style.display = 'inline-block';

            document.querySelector(`#input-nombre-${ID_Tipo_Examen}`).focus();

            document.querySelector(`#input-nombre-${ID_Tipo_Examen}`).addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    actualizarTipoExamen(ID_Tipo_Examen); // Llamar a la función de actualizar al presionar Enter
                }
            });
        }

        // Función para actualizar un tipo de examen
        window.actualizarTipoExamen = function(ID_Tipo_Examen) {
            const inputNombre = document.querySelector(`#input-nombre-${ID_Tipo_Examen}`);

            if (inputNombre) {
                const nuevoNombre = inputNombre.value;

                if (!nuevoNombre.trim()) {
                    alert('El nombre no puede estar vacío.');
                    return;
                }

                $.ajax({
                    url: `/tipoexamen/actualizar/${ID_Tipo_Examen}`, // Ruta para actualizar tipo de examen
                    method: 'PUT',
                    data: {
                        _token: document.querySelector('input[name="_token"]').value, // CSRF token
                        Nombre: nuevoNombre
                    },
                    success: function (response) {
                        if (response.success) {
                            cargarTipoExamen(); // Recargar la tabla de tipos de examen
                            console.log('¡Tipo de Examen actualizado correctamente!');
                        } else {
                            alert(response.message || 'Ocurrió un error al actualizar el tipo de examen.');
                        }
                    },
                    error: function (error) {
                        console.error('Error al actualizar el tipo de examen:', error);
                        alert('Ocurrió un error al actualizar el tipo de examen. Intenta nuevamente.');
                    }
                });
            } else {
                alert("No se encontró el campo de nombre para el tipo de examen.");
            }
        }
    });
</script>
