<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-edificio.blade.php -->

@vite(['resources/js/vistas-dinamicas/edificio.js']) <!-- archivo js personalizado -->

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
            <input type="text" name="Nombre_Edificio" placeholder="Nuevo Edificio" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Edificios</h2>

        <table id="edificioTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Area de Conocimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <!-- Aquí se cargarán dinámicamente los tipos de examen -->
            </tbody>
        </table>
    </div>
    
</div>

