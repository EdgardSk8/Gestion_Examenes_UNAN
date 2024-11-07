<!-- resources/views/vistas-equipoagregar/agregardatos/radio-edificio.blade.php -->


<div class="agregar-Edificio">

    <h2 style="text-align: center">Agregar Edificio</h2>

    <!-- Formulario para agregar el edificio -->
    <form action="{{ route('edificio.agregar') }}" method="POST">
        @csrf

        <!-- Selector de Área de Conocimiento -->
        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-edificio" name="ID_Area" required>
                <option value="">Seleccione un área de conocimiento</option>
                <!-- Opciones dinámicas de áreas se cargarán aquí -->
            </select>
        </div>

        <!-- Campo para el Nombre del Edificio -->
        <div>
            <label for="nombre-edificio">Nuevo Edificio:</label>
            <input type="text" id="nombre-edificio" name="Nombre_Edificio" placeholder="Nuevo Edificio" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>
</div>

<!-- Script para cargar las áreas dinámicamente -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const areaSelect = document.querySelector('.area-vista-edificio');

        // Cargar las áreas de conocimiento al cargar la página
        fetch('/area-conocimiento')  // Asegúrate de que esta URL está configurada correctamente
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Añadir las opciones al select de área
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area;  // Asignar el ID de la área
                        option.textContent = area.Nombre;  // Mostrar el nombre de la área
                        areaSelect.appendChild(option);  // Agregar la opción al select
                    });
                } else {
                    // Si no hay áreas disponibles
                    let option = document.createElement('option');
                    option.textContent = 'No hay áreas disponibles';
                    option.disabled = true;
                    areaSelect.appendChild(option);
                }
            })
            .catch(error => console.error('Error al cargar las áreas:', error)); // Manejo de errores
    });
</script>

