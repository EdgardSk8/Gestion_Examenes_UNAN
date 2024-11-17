<div class="contenedor-agregar-datos">
    <h2 style="text-align: center">Agregar Área de Conocimiento</h2>

    <form id="agregarAreaForm" method="POST">
        @csrf
        <div>
            <label for="nombre">Nombre del Área de Conocimiento:</label>
            <input type="text" id="nombre" name="Nombre" required>
        </div>
        <button type="submit" class="btn">Agregar</button>
    </form>
    
    <div class="tabla-mostrar-datos">
        <h3 style="text-align: center">Áreas de Conocimiento</h3>

        <table id="areaConocimientoTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Los datos se cargarán aquí -->
            </tbody>
        </table>
    </div>

</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const table = $('#areaConocimientoTable').DataTable(); // Inicializar DataTable

        

        // Función para cargar los datos
        function cargar_areasdeconocimiento() {
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
                            ` // Botones de editar y eliminar
                        ]).draw(false);
                    });

                    // Agregar evento click a los botones de eliminar
                    document.querySelectorAll('.btn-eliminar').forEach(button => {
                        button.addEventListener('click', function () {
                            eliminar_area_conocimiento(this.dataset.id);
                        });
                    });

                    // Agregar evento click a los botones de editar (aún sin funcionalidad)
                    document.querySelectorAll('.btn-editar').forEach(button => {
                        button.addEventListener('click', function () {
                            alert('Funcionalidad de editar aún no implementada.');
                        });
                    });
                },
                error: function (error) {
                    console.error('Error al cargar los datos:', error);
                }
            });
        }

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
                    alert('¡Área eliminada correctamente!');
                    cargar_areasdeconocimiento(); // Recargar la tabla
                },
                error: function (error) {
                    console.error('Error al eliminar el área:', error);
                    alert('Ocurrió un error al eliminar. Por favor, intenta nuevamente.');
                }
            });
        }

        // Llamar la función al cargar la página
        cargar_areasdeconocimiento();

        // Función para agregar una nueva área
        document.getElementById("agregarAreaForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

            const nombre = document.getElementById("nombre").value;

            $.ajax({
                url: '/area-conocimiento/agregar', // Ruta para agregar área
                method: 'POST',
                data: {
                    _token: document.querySelector('input[name="_token"]').value,
                    Nombre: nombre
                },
                success: function (response) {
                    alert('¡Área agregada correctamente!');
                    cargar_areasdeconocimiento(); // Recargar la tabla
                    document.getElementById("nombre").value = ''; // Limpiar el campo de entrada
                },
                error: function (error) {
                    console.error('Error al agregar el área:', error);
                    alert('Ocurrió un error al agregar el área. Intenta nuevamente.');
                }
            });
        });
    });
</script>
