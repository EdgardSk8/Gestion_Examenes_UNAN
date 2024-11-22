<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-area-conocimiento.blade.php -->

@vite(['resources/js/vistas-dinamicas/area-conocimiento.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos">
    <h2 style="text-align: center">Agregar Área de Conocimiento</h2>

    <form id="agregarAreaForm">
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



