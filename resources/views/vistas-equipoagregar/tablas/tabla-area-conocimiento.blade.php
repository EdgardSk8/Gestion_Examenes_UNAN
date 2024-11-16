<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Áreas de Conocimiento</title>

    <style>
        /* Estilo general de la tabla */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-family: 'Arial', sans-serif;
            border: 2px solid black;
        }

        /* Estilo de las celdas de la tabla */
        th, td {
            padding: 12px 15px;
            text-align: left;
            border: 1px solid #ddd;
        }

        /* Estilo para los encabezados */
        th {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
        }

        /* Efecto hover para las filas */
        tr:hover {
            background-color: #f5f5f5;
        }

        /* Estilo para la primera fila (encabezado) */
        thead tr {
            background-color: #007BFF;
            color: white;
        }

        /* Bordes y sombras en las celdas */
        td {
            border-bottom: 1px solid #ddd;
        }

        /* Cambiar color al pasar el mouse sobre las celdas */
        td:hover {
            background-color: #f1f1f1;
        }

        /* Fila alternada con color diferente */
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        /* Efecto de transición suave en el hover */
        tr, td, th {
            transition: background-color 0.3s ease;
        }

        /* Estilo para el contenedor de la tabla */
        .table-container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        /* Estilo para el título */
        h1 {
            text-align: center;
            color: #333;
        }
    </style>

</head>
<body>

    <div class="table-container" style=" border: 2px solid black;" >
        <h1>Áreas de Conocimiento</h1>

        <!-- Tabla para mostrar los datos -->
        <table id="areaConocimientoTable">
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

    <!-- Incluir jQuery para hacer la solicitud AJAX -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

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
</html>
