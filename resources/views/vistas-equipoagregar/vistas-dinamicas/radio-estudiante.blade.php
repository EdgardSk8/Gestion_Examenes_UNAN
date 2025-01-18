<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-estudiante.blade.php -->

@vite(['resources/js/vistas-dinamicas/estudiante.js'])

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Estudiante</h2>

    <form id="AgregarEstudianteForm">
        @csrf

        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-estudiante" id="area-vista-estudiante" name="ID_Area" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Departamento:</label>
            <select class="departamento-vista-estudiante" id="departamento-vista-estudiante" name="ID_Departamento" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Carrera:</label>
            <select class="carrera-vista-estudiante" id="carrera-vista-estudiante" name="ID_Carrera" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Localidad:</label>
            <select class="localidad-vista-estudiante" id="localidad-vista-estudiante" name="ID_Localidad" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Nombre Completo:</label>
            <input type="text" name="Nombre_Completo" required> 
        </div>

        <div>
            <label for="Carnet">Carnet:</label>
            <input type="text" id="Carnet" name="Carnet" required>
            <div id="mensaje-carnet" style="color: red; display: none; margin: 5px;"></div>
            <div id="carnet-existente" style="color: red; display: block; font-weight: bold; margin: 5px;"></div>
        </div>

        <div>
            <label for="Genero">Género:</label>
            <select id="genero-vista-estudiante" name="genero-vista-estudiante" required>
                <option value="" disabled selected>Seleccionar Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
            </select>
        </div>

        <div>
            <label for="Correo_Institucional">Correo Institucional:</label>
            <input type="email" id="Correo_Institucional" name="Correo_Institucional" required>
            <div id="mensaje-correo" style="color: red; display: none;"></div> 
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">
        
        <h2 style="text-align: center; margin-top: 20px;">Lista de Estudiantes</h2>

            <table id="estudianteTable" class="display">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Area de Conocimiento</th>
                        <th>Departamento</th>
                        <th>Carrera</th>
                        <th>Localidad</th>
                        <th>Carnet</th>
                        <th>Correo Institucional</th>
                        <th>Genero</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Aquí se cargarán dinámicamente los roles -->
                </tbody>

            </table>
    </div>

</div>