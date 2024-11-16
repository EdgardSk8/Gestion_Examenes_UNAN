<!-- resources/views/vistas-equipoagregar/agregardatos/radio-area-conocimiento.blade.php -->

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Área de Conocimiento</h2>

    <form action="{{ route('area-conocimiento.agregar') }}" method="POST">
        @csrf
        <div>
            <label>Nombre del Área de Conocimiento:</label>
            <input type="text" id="nombre" name="Nombre" required>
        </div>
        <button type="submit" class="btn">Agregar</button>
    </form>
    
</head>
<body>

    <div class="tabla-mostrar-datos">
        <h3 style="text-align: center">Áreas de Conocimiento</h3>

        <!-- Tabla para mostrar los datos -->
        <table id="areaConocimientoTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                <!-- Los datos se cargarán aquí -->
            </tbody>
        </table>
    </div>

    <script>
        // Función para cargar los datos de la API
        function cargarDatos() {
            $.ajax({
                url: '/area-conocimiento', // La ruta de tu API Laravel
                method: 'GET',
                success: function(data) {
                    // Obtener el cuerpo de la tabla
                    const tbody = document.querySelector('#areaConocimientoTable tbody');
                    
                    // Limpiar la tabla antes de agregar nuevos datos
                    tbody.innerHTML = '';

                    // Recorrer los datos y agregarlos a la tabla
                    data.forEach(area => {
                        const row = document.createElement('tr');
                        const cellId = document.createElement('td');
                        cellId.textContent = area.ID_Area; // Mostrar el ID de área
                        const cellNombre = document.createElement('td');
                        cellNombre.textContent = area.Nombre; // Mostrar el nombre de área
                        
                        // Agregar las celdas a la fila
                        row.appendChild(cellId);
                        row.appendChild(cellNombre);
                        
                        // Agregar la fila a la tabla
                        tbody.appendChild(row);
                    });

                    // Inicializar DataTables después de cargar los datos
                    $('#areaConocimientoTable').DataTable();
                },
                error: function(error) {
                    console.error('Error al cargar los datos:', error);
                }
            });
        }

        // Cargar los datos cuando la página cargue
        window.onload = cargarDatos;
    </script>

</body>
    
</div>

<style>
    
</style>