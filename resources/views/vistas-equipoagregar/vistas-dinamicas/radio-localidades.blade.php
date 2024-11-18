<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Localidad</h2>

    <!-- Formulario para agregar una nueva localidad -->
    <form id="agregarLocalidadForm" action="{{ route('localidad.agregar.ajax') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre de la localidad:</label>
            <input type="text" id="Localidad" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <!-- Tabla donde se mostrarán las localidades -->
    <h2 style="text-align: center; margin-top: 20px;">Lista de Localidades</h2>
    <table id="localidadTable" class="display">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Aquí se cargarán dinámicamente las localidades -->
        </tbody>
    </table>

</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        // Función para cargar las localidades
        function cargarLocalidades() {
            $.ajax({
                url: '{{ route('localidad.obtener.ajax') }}', // Ruta para obtener las localidades
                method: 'GET',
                success: function (data) {
                    const table = $('#localidadTable').DataTable();
                    table.clear(); // Limpiar la tabla

                    // Recorrer cada localidad y agregarla a la tabla
                    data.forEach(localidad => {
                        table.row.add([
                            localidad.ID_Localidad,
                            localidad.Nombre,
                            `
                                <button class="btn-editar" data-id="${localidad.ID_Localidad}" onclick="editarLocalidad(this)">
                                    ✏️ Editar
                                </button>
                                <button class="btn-eliminar" data-id="${localidad.ID_Localidad}" onclick="eliminarLocalidad(${localidad.ID_Localidad})">
                                    ❌ Eliminar
                                </button>
                                <button class="btn-aceptar" data-id="${localidad.ID_Localidad}" style="display: none;" onclick="actualizarLocalidad(${localidad.ID_Localidad})">
                                    ✔️ Aceptar
                                </button>
                            `
                        ]).draw(false);
                    });
                },
                error: function (error) {
                    console.error('Error al cargar las localidades:', error);
                    alert('Ocurrió un error al cargar las localidades. Intenta nuevamente.');
                }
            });
        }

        // Función para eliminar una localidad
        window.eliminarLocalidad = function(id) {
            if (!confirm('¿Estás seguro de que deseas eliminar esta localidad?')) return;

            $.ajax({
                url: `/localidad/eliminar/${id}`, // Ruta para eliminar localidad
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                },
                success: function (response) {
                    cargarLocalidades(); // Recargar la tabla de localidades
                    console.log('¡Localidad eliminada correctamente!');
                },
                error: function (error) {
                    console.error('Error al eliminar la localidad:', error);
                    alert('Ocurrió un error al eliminar. Por favor, intenta nuevamente.');
                }
            });
        }

        // Función para agregar una nueva localidad
        document.getElementById("agregarLocalidadForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar el envío tradicional del formulario

            const nombre = document.getElementById("Localidad").value;

            // Validación previa antes de hacer la solicitud
            if (!nombre.trim()) {
                alert('El nombre de la localidad no puede estar vacío.');
                return;
            }

            $.ajax({
                url: '{{ route('localidad.agregar') }}', // Ruta para agregar localidad
                method: 'POST',
                data: {
                    _token: document.querySelector('input[name="_token"]').value,
                    Nombre: nombre
                },
                success: function (response) {
                    alert('¡Localidad agregada correctamente!');
                    cargarLocalidades(); // Recargar la tabla de localidades
                    document.getElementById("Localidad").value = ''; // Limpiar el campo de entrada
                },
                error: function (error) {
                    console.error('Error al agregar la localidad:', error);
                    alert('Ocurrió un error al agregar la localidad. Intenta nuevamente.');
                }
            });
        });

        // Llamar la función cargarLocalidades al cargar la página
        cargarLocalidades();

        // Función para editar una localidad
        window.editarLocalidad = function(button) {
            const row = button.closest('tr'); // Seleccionar la fila correspondiente
            const ID_Localidad = button.getAttribute('data-id'); // Obtener ID desde el botón de edición
            const nombreCell = row.querySelector('td:nth-child(2)');
            const nombre = nombreCell.textContent;

            nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Localidad}" />`;

            // Ocultar los botones de editar y eliminar, y mostrar el botón de aceptar
            row.querySelector('.btn-editar').style.display = 'none';
            row.querySelector('.btn-eliminar').style.display = 'none';
            row.querySelector('.btn-aceptar').style.display = 'inline-block';

            document.querySelector(`#input-nombre-${ID_Localidad}`).focus();

            document.querySelector(`#input-nombre-${ID_Localidad}`).addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    actualizarLocalidad(ID_Localidad); // Llamar a la función de actualizar al presionar Enter
                }
            });
        }

        // Función para actualizar una localidad
        window.actualizarLocalidad = function(ID_Localidad) {
            const inputNombre = document.querySelector(`#input-nombre-${ID_Localidad}`);

            if (inputNombre) {
                const nuevoNombre = inputNombre.value;

                if (!nuevoNombre.trim()) {
                    alert('El nombre no puede estar vacío.');
                    return;
                }

                $.ajax({
                    url: `/localidad/actualizar/${ID_Localidad}`, // Ruta para actualizar localidad
                    method: 'PUT',
                    data: {
                        _token: document.querySelector('input[name="_token"]').value, // CSRF token
                        Nombre: nuevoNombre
                    },
                    success: function (response) {
                        if (response.success) {
                            cargarLocalidades(); // Recargar la tabla de localidades
                            console.log('¡Localidad actualizada correctamente!');
                        } else {
                            alert(response.message || 'Ocurrió un error al actualizar la localidad.');
                        }
                    },
                    error: function (error) {
                        console.error('Error al actualizar la localidad:', error);
                        alert('Ocurrió un error al actualizar. Intenta nuevamente.');
                    }
                });
            } else {
                alert("No se encontró el campo de nombre para la localidad.");
            }
        }
    });
</script>

