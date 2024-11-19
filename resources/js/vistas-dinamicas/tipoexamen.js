document.addEventListener("DOMContentLoaded", function () {
    const table = $('#tipoExamenTable').DataTable(); // Inicializamos DataTable

    // Función para cargar los tipos de examen
    function cargarTipoExamenes() {
        $.ajax({
            url: '/tipoexamen/obtener/ajax', // Ruta para obtener los tipos de examen
            method: 'GET',
            success: function (data) {
                table.clear(); // Limpiar la tabla
                data.forEach(tipoexamen => {
                    // Agregar cada tipo de examen a la tabla
                    table.row.add([
                        tipoexamen.ID_Tipo_Examen,
                        tipoexamen.Nombre,
                        `
                            <button class="btn-editar" data-id="${tipoexamen.ID_Tipo_Examen}">
                                ✏️ Editar
                            </button>
                            <button class="btn-eliminar" data-id="${tipoexamen.ID_Tipo_Examen}">
                                ❌ Eliminar
                            </button>
                            <button class="btn-aceptar" data-id="${tipoexamen.ID_Tipo_Examen}" style="display: none;">
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

    // Delegación de eventos para eliminar el tipo de examen
    $('#tipoExamenTable').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        eliminarTipoExamen(id);
    });

    // Delegación de eventos para editar el tipo de examen
    $('#tipoExamenTable').on('click', '.btn-editar', function () {
        const button = this;
        editarTipoExamen(button);
    });

    // Delegación de eventos para aceptar cambios en la edición
    $('#tipoExamenTable').on('click', '.btn-aceptar', function () {
        const button = this;
        const id = $(this).data('id');
        actualizarTipoExamen(id);
    });

    // Función para eliminar un tipo de examen
    function eliminarTipoExamen(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este tipo de examen?')) return;

        $.ajax({
            url: `/tipoexamen/eliminar/${id}`, // Ruta para eliminar el tipo de examen
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            },
            success: function (response) {
                cargarTipoExamenes(); // Recargar la tabla
                console.log('¡Tipo de examen eliminado correctamente!');
            },
            error: function (error) {
                console.error('Error al eliminar el tipo de examen:', error);
                alert('Ocurrió un error al eliminar el tipo de examen. Intenta nuevamente.');
            }
        });
    }

    // Función para editar el tipo de examen
    function editarTipoExamen(button) {
        const row = button.closest('tr'); // Seleccionar la fila correspondiente
        const ID_Tipo_Examen = button.getAttribute('data-id'); // Obtener el ID del tipo de examen
        const nombreCell = row.querySelector('td:nth-child(2)'); // Obtener la celda de nombre
        const nombre = nombreCell.textContent;

        // Cambiar la celda de nombre a un campo de texto editable
        nombreCell.innerHTML = `<input type="text" value="${nombre}" id="input-nombre-${ID_Tipo_Examen}" />`;

        // Ocultar los botones de editar y eliminar, y mostrar el de aceptar
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Enfocar el campo de entrada
        document.querySelector(`#input-nombre-${ID_Tipo_Examen}`).focus();

        // Detectar la tecla Enter para guardar los cambios
        document.querySelector(`#input-nombre-${ID_Tipo_Examen}`).addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                actualizarTipoExamen(ID_Tipo_Examen); // Llamar a la función de actualización al presionar Enter
            }
        });
    }

    // Función para actualizar el tipo de examen
    function actualizarTipoExamen(ID_Tipo_Examen) {
        const inputNombre = document.querySelector(`#input-nombre-${ID_Tipo_Examen}`);
        const nuevoNombre = inputNombre.value;

        if (!nuevoNombre.trim()) {
            alert('El nombre no puede estar vacío.');
            return;
        }

        $.ajax({
            url: `/tipoexamen/actualizar/${ID_Tipo_Examen}`, // Ruta para actualizar el tipo de examen
            method: 'PUT',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nuevoNombre
            },
            success: function (response) {
                if (response.success) {
                    // Recargar los tipos de examen y actualizar la tabla
                    cargarTipoExamenes();
                    console.log('¡Tipo de examen actualizado correctamente!');
                } else {
                    alert(response.message || 'Ocurrió un error al actualizar el tipo de examen.');
                }
            },
            error: function (error) {
                console.error('Error al actualizar el tipo de examen:', error);
                alert('Ocurrió un error al actualizar el tipo de examen. Intenta nuevamente.');
            }
        });
    }

    // Cargar los tipos de examen al inicio
    cargarTipoExamenes();

    // Función para agregar un nuevo tipo de examen
    document.getElementById("agregarTipoExamenForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío tradicional del formulario

        const nombre = document.getElementById("TipoExamen").value;

        if (!nombre.trim()) {
            alert('El nombre del tipo de examen no puede estar vacío.');
            return;
        }

        $.ajax({
            url: '/tipoexamen/agregar/ajax', // Ruta para agregar tipo de examen
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nombre
            },
            success: function (response) {
                alert('¡Tipo de examen agregado correctamente!');
                cargarTipoExamenes(); // Recargar la tabla de tipos de examen
                document.getElementById("TipoExamen").value = ''; // Limpiar el campo de entrada
            },
            error: function (error) {
                console.error('Error al agregar el tipo de examen:', error);
                alert('Ocurrió un error al agregar el tipo de examen. Intenta nuevamente.');
            }
        });
    });
});
