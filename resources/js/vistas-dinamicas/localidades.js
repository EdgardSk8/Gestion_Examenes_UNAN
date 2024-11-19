document.addEventListener("DOMContentLoaded", function () {
    const table = $('#localidadTable').DataTable(); // Inicializamos DataTable

    // Función para cargar las localidades
    function cargarLocalidades() {
        $.ajax({
            url: '/localidad/ajax', // Ruta para obtener las localidades
            method: 'GET',
            success: function (data) {
                table.clear(); // Limpiar la tabla
                data.forEach(localidad => {
                    // Agregar cada localidad a la tabla
                    table.row.add([
                        localidad.ID_Localidad,
                        localidad.Nombre,
                        `
                            <button class="btn-editar" data-id="${localidad.ID_Localidad}">
                                ✏️ Editar
                            </button>
                            <button class="btn-eliminar" data-id="${localidad.ID_Localidad}">
                                ❌ Eliminar
                            </button>
                            <button class="btn-aceptar" data-id="${localidad.ID_Localidad}" style="display: none;">
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

    // Delegación de eventos para eliminar la localidad
    $('#localidadTable').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        eliminarLocalidad(id);
    });

    // Delegación de eventos para editar la localidad
    $('#localidadTable').on('click', '.btn-editar', function () {
        const button = this;
        editarLocalidad(button);
    });

    // Delegación de eventos para aceptar cambios en la edición
    $('#localidadTable').on('click', '.btn-aceptar', function () {
        const button = this;
        const id = $(this).data('id');
        actualizarLocalidad(id);
    });

    // Función para eliminar una localidad
    function eliminarLocalidad(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta localidad?')) return;

        $.ajax({
            url: `/localidad/eliminar/${id}`, // Ruta para eliminar la localidad
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            },
            success: function (response) {
                cargarLocalidades(); // Recargar la tabla
                console.log('¡Localidad eliminada correctamente!');
            },
            error: function (error) {
                console.error('Error al eliminar la localidad:', error);
                alert('Ocurrió un error al eliminar la localidad. Intenta nuevamente.');
            }
        });
    }

    // Función para editar la localidad
    function editarLocalidad(button) {
        const row = button.closest('tr'); // Seleccionar la fila correspondiente
        const ID_Localidad = button.getAttribute('data-id'); // Obtener el ID de la localidad
        const nombreCell = row.querySelector('td:nth-child(2)'); // Obtener la celda de nombre
        const nombre = nombreCell.textContent;

        // Cambiar la celda de nombre a un campo de texto editable
        nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Localidad}" />`;

        // Ocultar los botones de editar y eliminar, y mostrar el de aceptar
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Enfocar el campo de entrada
        document.querySelector(`#input-nombre-${ID_Localidad}`).focus();

        // Detectar la tecla Enter para guardar los cambios
        document.querySelector(`#input-nombre-${ID_Localidad}`).addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                actualizarLocalidad(ID_Localidad); // Llamar a la función de actualización al presionar Enter
            }
        });
    }

    // Función para actualizar la localidad
    function actualizarLocalidad(ID_Localidad) {
        const inputNombre = document.querySelector(`#input-nombre-${ID_Localidad}`);
        const nuevoNombre = inputNombre.value;

        if (!nuevoNombre.trim()) {
            alert('El nombre no puede estar vacío.');
            return;
        }

        $.ajax({
            url: `/localidad/actualizar/${ID_Localidad}`, // Ruta para actualizar la localidad
            method: 'PUT',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nuevoNombre
            },
            success: function (response) {
                if (response.success) {
                    // Recargar las localidades y actualizar la tabla
                    cargarLocalidades();
                    console.log('¡Localidad actualizada correctamente!');
                } else {
                    alert(response.message || 'Ocurrió un error al actualizar la localidad.');
                }
            },
            error: function (error) {
                console.error('Error al actualizar la localidad:', error);
                alert('Ocurrió un error al actualizar la localidad. Intenta nuevamente.');
            }
        });
    }

    // Cargar las localidades al inicio
    cargarLocalidades();

    // Función para agregar una nueva localidad
    document.getElementById("agregarLocalidadForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        const nombre = document.getElementById("Localidad").value;

        if (!nombre.trim()) {
            alert('El nombre de la localidad no puede estar vacío.');
            return;
        }

        $.ajax({
            url: '/localidad/agregar/ajax', // Ruta para agregar localidad
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
});
