document.addEventListener("DOMContentLoaded", function () {
    const table = $('#areaConocimientoTable').DataTable({
        language: {
            emptyTable: "No hay datos disponibles en esta tabla." // Mensaje personalizado
        }
    }); // Inicializar DataTable

    // Función para cargar los datos
    function cargar_area_conocimiento() {
        $.ajax({
            url: '/area-conocimiento', // La ruta de tu API Laravel para obtener datos
            method: 'GET',
            success: function (data) {
                table.clear(); // Limpiar la tabla
                data.forEach(area => {
                    // Agregar fila con botón de eliminar y editar
                    table.row.add([ 
                        area.ID_Area,
                        area.Nombre,
                        `
                            <button class="btn-editar" data-id="${area.ID_Area}">
                                ✏️ Editar
                            </button>
                            <button class="btn-eliminar" data-id="${area.ID_Area}">
                                ❌ Eliminar
                            </button>
                            <button class="btn-aceptar" data-id="${area.ID_Area}" style="display: none;">
                                ✔️ Aceptar
                            </button>
                        ` // Botones de editar, eliminar y aceptar
                    ]).draw(false);

                    // Añadir data-id a la fila de la tabla
                    const row = table.row(table.rows().count() - 1).node();
                    row.setAttribute('data-id', area.ID_Area);
                });
            },
            error: function (error) {
                console.error('Error al cargar los datos:', error);
            }
        });
    }

    // Delegar el evento de eliminación al contenedor de la tabla
    $('#areaConocimientoTable').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        console.log('ID a eliminar:', id); // Verificar que el ID es correcto
        eliminar_area_conocimiento(id);
    });

    // Delegar el evento de edición al contenedor de la tabla
    $('#areaConocimientoTable').on('click', '.btn-editar', function () {
        editar_area_conocimiento(this); // Llamar a la función editar_area_conocimiento cuando se haga clic en editar
    });

    $('#areaConocimientoTable').on('click', '.btn-aceptar', function () {
        const row = $(this).closest('tr'); // Obtener la fila correspondiente
        const ID_Area = row.attr('data-id'); // Obtener el data-id de la fila
        actualizarArea(ID_Area); // Llamar a la función de actualizar el área
    });

    // Función para eliminar un área
    function eliminar_area_conocimiento(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta área?')) return;

        $.ajax({
            url: `/area-conocimiento/eliminar/${id}`, // Ruta de tu API Laravel para eliminar
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
            },
            success: function (response) {
                cargar_area_conocimiento(); // Recargar la tabla
                console.log("Area eliminada con exito");
            },
            error: function (error) {
                console.error('Error al eliminar el área:', error);
                alert('Ocurrió un error al eliminar. Por favor, intenta nuevamente.');
            }
        });
    }

    // Función para agregar una nueva área
    document.getElementById("agregarAreaForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

        const nombre_area = document.getElementById("nombre").value;

        $.ajax({
            url: '/area-conocimiento/agregar', // Ruta para agregar área
            method: 'POST',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: nombre_area
            },
            success: function (response) {
                alert('¡Área agregada correctamente!');
                cargar_area_conocimiento(); // Recargar la tabla
                document.getElementById("nombre").value = ''; // Limpiar el campo de entrada
            },
            error: function (error) {
                console.error('Error al agregar el área:', error);
                alert('Ocurrió un error al agregar el área. Intenta nuevamente.');
            }
        });
    });

    // Llamar la función al cargar la página
    cargar_area_conocimiento();

    // Función para editar el área
    function editar_area_conocimiento(button) {
        const row = button.closest('tr'); // Seleccionar la fila (tr) correspondiente al botón de editar
        const ID_Area = row.getAttribute('data-id'); // Obtener el data-id de la fila
        const nombreCell_Area = row.querySelector('td:nth-child(2)');
        const nombre_area = nombreCell_Area.textContent;

        // Reemplazar el nombre por un campo input con el valor actual
        nombreCell_Area.innerHTML = `<input type="text" value="${nombre_area}" id="input-nombre_area-${ID_Area}" />`;

        // Ocultar los botones de editar y eliminar, y mostrar el botón de aceptar
        row.querySelector('.btn-editar').style.display = 'none';
        row.querySelector('.btn-eliminar').style.display = 'none';
        row.querySelector('.btn-aceptar').style.display = 'inline-block';

        // Enfocar el campo de entrada automáticamente para poder escribir sin mover el ratón
        const input = document.getElementById(`input-nombre_area-${ID_Area}`);
        input.focus();

        // Detectar el evento de Enter para guardar los cambios
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                actualizarArea(ID_Area);
            }
        });
    }

    // Función para actualizar el área
    function actualizarArea(ID_Area) {
        const NuevoNombre_Area = document.querySelector(`#input-nombre_area-${ID_Area}`).value;

        // Enviar una petición AJAX para actualizar el área
        $.ajax({
            url: `/area-conocimiento/actualizar/${ID_Area}`,
            method: 'PUT',
            data: {
                _token: document.querySelector('input[name="_token"]').value,
                Nombre: NuevoNombre_Area
            },
            success: function (response) {
                if (response.success) {
                    // Actualizar la fila en lugar de recargar la tabla
                    const row = document.querySelector(`tr[data-id="${ID_Area}"]`);
                    const nombreCell_Area = row.querySelector('td:nth-child(2)');

                    // Restaurar el texto del área
                    nombreCell_Area.innerHTML = NuevoNombre_Area;

                    // Restaurar los botones
                    row.querySelector('.btn-editar').style.display = 'inline-block';
                    row.querySelector('.btn-eliminar').style.display = 'inline-block';
                    row.querySelector('.btn-aceptar').style.display = 'none';
                } else {
                    alert(response.message);
                }
            },
            error: function (error) {
                console.error('Error al actualizar el área:', error);
                alert('Ocurrió un error al actualizar. Por favor, intenta nuevamente.');
            }
        });
    }
});
