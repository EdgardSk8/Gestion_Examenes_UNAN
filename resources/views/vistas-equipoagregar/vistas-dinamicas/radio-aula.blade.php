<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-aula.blade.php -->

@vite(['resources/js/vistas-dinamicas/aula.js']) <!-- archivo js personalizado -->

<div id="agregarAulaForm" class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Aula</h2>

    <form action="{{ route('aulas.agregar.ajax') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-aula" id="area-select-aula" name="ID_Area" required>
                <option value="">Seleccione un área de conocimiento</option>
            </select>
        </div>

        <div>
            <label>Edificio:</label>
            <select class="edificio-vista-aula" id="edificio-vista-aula" name="ID_Edificio" required>
                <option value="">Seleccione un edificio</option>
            </select>
        </div>

        <div>
            <label>Nueva Aula:</label>
            <input type="text" name="Nombre_Aula" placeholder="Nueva Aula" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Aulas</h2>

        <table id="aulaTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edificio</th>
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


