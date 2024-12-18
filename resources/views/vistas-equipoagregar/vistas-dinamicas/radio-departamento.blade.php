<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-departamento.blade.php -->

@vite(['resources/js/vistas-dinamicas/departamento.js'])

<div class="contenedor-agregar-datos">
    <h2 style="text-align: center">Agregar Departamento</h2>

    <form id="agregarDepartamentoForm">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Área de Conocimiento:</label>
            <select id="area-vista-departamento" name="ID_Area" required> 
                <option value="" disabled selected>Seleccione un área de conocimiento</option>
            </select>
           
        </div>

        <div>
            <label>Nuevo Departamento:</label>
            <input type="text" name="Nombre_Nuevo_Departamento" placeholder="Nuevo Departamento" required>
        </div>

        <button type="submit" class="btn">Agregar</button><!-- Botón para enviar el formulario -->
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Departamentos</h2>

        <table id="departamentoTable" class="display">
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
