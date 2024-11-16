<!-- resources/views/vistas-equipoagregar/agregardatos/radio-carrera.blade.php -->

<div class="agregar-carrera">

    <h2 style="text-align: center">Agregar Carrera</h2>

    <form action="{{ route('carrera.agregar') }}" method="POST">
        @csrf

        <!-- Contenedor para el grupo de selectores -->
        <div class="grupo-carrera">
            <div>
                <label>Área de Conocimiento:</label>
                <select class="area-vista-carrera" id="area-vista-carrera" name="ID_Area" required>
                    <!-- Las opciones de áreas se cargarán dinámicamente -->
                    <option value="">Seleccione un área de conocimiento</option>
                    <!-- Aquí se añadirán las áreas dinámicamente con JS -->
                </select>
            </div>

            <div>
                <label>Departamento:</label>
                <select class="departamento-select" id="departamento-select" name="ID_Departamento" required>
                    <!-- Opciones de departamentos se cargarán dinámicamente después de seleccionar el área -->
                    <option value="">Seleccione un área de conocimiento</option>
                </select>        
            </div>
        </div>

        <div>
            <label>Nueva Carrera:</label>
            <input type="text" name="Nombre" placeholder="Nueva Carrera" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const areaSelect = document.getElementById('area-vista-carrera');
        const departamentoSelect = document.getElementById('departamento-select');

        // Cargar las áreas de conocimiento cuando la página se haya cargado
        fetch('/area-conocimiento')  // Asegúrate de que esta URL esté bien configurada
            .then(response => response.json()) // Esperamos el resultado en formato JSON
            .then(data => {
                if (data && data.length > 0) {
                    // Añadir las opciones del select
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area; // El valor será el ID de la área
                        option.textContent = area.Nombre; // El texto será el nombre de la área
                        areaSelect.appendChild(option); // Añadir la opción al select
                    });
                } else {
                    let option = document.createElement('option');
                    option.textContent = 'No hay áreas disponibles';
                    option.disabled = true;
                    areaSelect.appendChild(option);
                }
            })
            .catch(error => console.error('Error al cargar las áreas:', error)); // Manejo de errores

        // Cargar los departamentos cuando se selecciona un área
        areaSelect.addEventListener('change', function () {
            const areaId = areaSelect.value;

            // Limpiar los departamentos previos
            departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';

            if (areaId) {
                // Obtener departamentos según el área seleccionada
                fetch(`/departamentos?idArea=${areaId}`)  // Ahora usamos el parámetro 'idArea' en la URL
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            // Añadir las opciones de departamentos al select
                            data.forEach(departamento => {
                                let option = document.createElement('option');
                                option.value = departamento.ID_Departamento; // ID del departamento
                                option.textContent = departamento.Nombre; // Nombre del departamento
                                departamentoSelect.appendChild(option); // Añadir al select
                            });
                            // Cambiar el mensaje en el select de departamentos
                            departamentoSelect.querySelector('option').textContent = "Seleccione un departamento";
                        } else {
                            // Si no hay departamentos, actualizar el mensaje
                            let option = departamentoSelect.querySelector('option');
                            option.textContent = "No hay departamentos disponibles";
                        }
                    })
                    .catch(error => {
                        console.error('Error al cargar los departamentos:', error);
                        let option = departamentoSelect.querySelector('option');
                        option.textContent = 'Error al cargar los departamentos';
                    });
            } else {
                // Si no hay área seleccionada, poner el mensaje por defecto en el departamento
                let option = departamentoSelect.querySelector('option');
                option.textContent = 'Seleccione un área de conocimiento';
            }
        });
    });
</script>
