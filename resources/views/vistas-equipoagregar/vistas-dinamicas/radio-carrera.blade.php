<!-- resources/views/vistas-equipoagregar/agregardatos/radio-carrera.blade.php -->

@vite(['resources/js/vistas-dinamicas/carreras.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Carrera</h2>

    <form id="agregarCarreraForm">
        @csrf
            <div>
                <label>Área de Conocimiento:</label>
                <select class="area-vista-carrera" id="area-vista-carrera" name="ID_Area" required>
                    <!-- Las opciones de áreas se cargarán dinámicamente -->
                    <option value="">Seleccione un área de conocimiento</option>
                    <!-- Aquí se añadirán las áreas dinámicamente con JS -->
                </select>
            </div>

            <div>
                <label>Departamento:</label>
                <select class="departamento-select" id="departamento-select" name="ID_Departamento" required>
                    <!-- Opciones de departamentos se cargarán dinámicamente después de seleccionar el área -->
                    <option value="">Seleccione un área de conocimiento</option>
                </select>        
            </div>

        <div>
            <label>Nueva Carrera:</label>
            <input type="text" name="Nombre_carrera" placeholder="Nueva Carrera" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Carreras</h2>
        
        <table id="carreraTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Departamento</th>
                    <th>Area de Conocimiento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí se cargarán dinámicamente las localidades -->
            </tbody>
        </table>
    </div>

</div>
