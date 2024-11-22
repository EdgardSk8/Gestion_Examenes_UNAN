<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-tipoexamen.blade.php -->

@vite(['resources/js/vistas-dinamicas/tipoexamen.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Tipo de Examen</h2>

    <!-- Formulario para agregar un nuevo tipo de examen -->
    <form id="agregarTipoExamenForm">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Tipo de Examen:</label>
            <input type="text" id="TipoExamen" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Tipos de Examen</h2>

        <table id="tipoExamenTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <!-- Aquí se cargarán dinámicamente los tipos de examen -->
            </tbody>
        </table>
    </div>
    
</div>