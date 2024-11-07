<!-- resources/views/vistas-equipoagregar/agregardatos/radio-area-conocimiento.blade.php -->

<div class="agregar-area">

    <h2 style="text-align: center">Agregar Área de Conocimiento</h2>

    <form action="{{ route('area-conocimiento.agregar') }}" method="POST">
        @csrf
        <div>
            <label>Nombre del Área de Conocimiento:</label>
            <input type="text" id="nombre" name="Nombre" required>
        </div>
        <button type="submit" class="btn">Agregar</button>
    </form>

    <h4 style="text-align: center">Lista de Áreas de Conocimiento</h4>

    <table id="areasTable" class="display">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            <!-- Las filas se llenarán dinámicamente con JS -->
        </tbody>
    </table>
</div>

<!-- Inicializar DataTables y cargar los datos por AJAX -->
<script>
    $(document).ready(function() {
        // Inicializa DataTables en la tabla
        $('#areasTable').DataTable({
            processing: true,  // Mostrar el indicador de procesamiento mientras carga
            serverSide: false,  // Usar el lado del servidor para procesar los datos
            ajax: {
                url: '/area-conocimiento',  // URL correcta para obtener las áreas
                dataSrc: '',  // El JSON retornado será un arreglo de áreas directamente
            },
            columns: [
                { data: 'ID_Area' },
                { data: 'Nombre' },
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' // Carga el idioma en español
            }
        });
    });
</script>

 
