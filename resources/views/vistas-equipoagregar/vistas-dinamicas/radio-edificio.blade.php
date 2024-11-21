<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-edificio.blade.php -->

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Edificio</h2>

    <!-- Formulario para agregar el edificio -->
    <form id="agregarEdificioForm" action="{{ route('edificio.agregar.ajax') }}" method="POST">
        @csrf

        <!-- Selector de Área de Conocimiento -->
        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-edificio" name="ID_Area" required>
                <option value="" disabled selected>Seleccione un área de conocimiento</option>
                <!-- Opciones dinámicas de áreas se cargarán aquí -->
            </select>
        </div>

        <!-- Campo para el Nombre del Edificio -->
        <div>
            <label>Nuevo Edificio:</label>
            <input type="text" id="nombre-edificio" name="Nombre_Edificio" placeholder="Nuevo Edificio" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>
</div>

<!-- Script para cargar las áreas dinámicamente y manejar la adición con AJAX -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const areaSelect = document.querySelector('.area-vista-edificio');
        const form = document.querySelector('#agregarEdificioForm');

        // Cargar las áreas de conocimiento al cargar la página
        fetch('/area-conocimiento') // Cambia la URL si es necesario
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Añadir las opciones al select de área
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area; // Asignar el ID de la área
                        option.textContent = area.Nombre; // Mostrar el nombre de la área
                        areaSelect.appendChild(option); // Agregar la opción al select
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

        // Manejar el envío del formulario con AJAX
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío normal del formulario

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}' // Agregar el token CSRF
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Usar console.log en lugar de mostrar mensaje en la vista
                    if (data.success) {
                        console.log('Edificio agregado exitosamente ', data.message);
                        form.reset(); // Limpiar el formulario
                    } else {
                        console.log('Error al agregar el edificio ', data.message);
                    }
                })
                .catch(error => {
                    console.log('Ocurrió un error al agregar el edificio:', error);
                });
        });
    });
</script>
