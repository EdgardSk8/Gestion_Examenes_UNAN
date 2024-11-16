<!-- resources/views/vistas-equipoagregar/agregardatos/radio-departamento.blade.php -->


<div class="agregar-departamento">
    <h2 style="text-align: center">Agregar Departamento</h2>

    <form action="{{ route('departamento.agregar') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Área de Conocimiento:</label>
            <select id="area-vista-departamento" name="ID_Area" required></select>
        </div>

        <div>
            <label>Nuevo Departamento:</label>
            <input type="text" name="Nombre" placeholder="Nuevo Departamento" required>
        </div>

        <button type="submit" class="btn">Agregar</button><!-- Botón para enviar el formulario -->
    </form>
</div>

<!-- Script para cargar dinámicamente las áreas de conocimiento -->
<script>

    document.addEventListener('DOMContentLoaded', function () {
        const areaSelect = document.getElementById('area-vista-departamento'); // Referencia al elemento select

        // Añadir una opción por defecto al select con el mensaje "Seleccione un área de conocimiento"
        let defaultOption = document.createElement('option');
        defaultOption.value = ""; // Valor vacío por defecto
        defaultOption.textContent = "Seleccione un área de conocimiento"; // Texto visible de la opción por defecto
        defaultOption.disabled = true; // No se puede seleccionar esta opción
        defaultOption.selected = true; // Esta es la opción seleccionada por defecto
        areaSelect.appendChild(defaultOption); // Añadimos la opción por defecto al select

        // Hacer una solicitud para obtener las áreas de conocimiento desde la API
        fetch('/area-conocimiento')  // Asegúrate de que esta URL es la correcta para obtener las áreas
            .then(response => response.json()) // Procesamos la respuesta en formato JSON
            .then(data => {
                // Verificamos si se recibieron datos y si la lista no está vacía
                if (data && data.length > 0) {
                    // Iteramos sobre los datos recibidos para crear las opciones del select
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area; // El valor del option será el ID de la área
                        option.textContent = area.Nombre; // El texto visible será el nombre de la área
                        areaSelect.appendChild(option); // Añadimos la opción al select
                    });
                } else {
                    // Si no hay áreas disponibles, mostramos una opción indicando que no hay áreas
                    let option = document.createElement('option');
                    option.textContent = 'No hay áreas disponibles'; // Mensaje cuando no hay áreas
                    option.disabled = true; // No se puede seleccionar esta opción
                    areaSelect.appendChild(option); // Añadimos esta opción al select
                }
            })
            .catch(error => console.error('Error al cargar las áreas:', error)); // Manejo de errores
    });
</script>

