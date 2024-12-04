<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-profesor.blade.php -->

@vite(['resources/js/vistas-dinamicas/profesor.js'])

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Profesor</h2>

    <form id="AgregarProfesorForm">
        @csrf

        <div>
            <label>Área de Conocimiento:</label>
            <select id="area-vista-profesor" name="ID_Area" required>
                <option value="" disabled selected>Seleccione un área de conocimiento</option>
                <!-- Se cargarán las áreas de conocimiento aquí -->
            </select>
        </div>

        <div>
            <label>Departamento:</label>
            <select id="departamento-vista-profesor" name="ID_Departamento" required>
                <option value="" disabled selected>Seleccione un departamento</option>
                <!-- Los departamentos se cargarán aquí según el área seleccionada -->
            </select>
        </div>

        <div>
            <label>Nombre Completo:</label>
            <input type="text" name="Nombre_Completo_P" required>
        </div>

        <div>
            <label for="Correo">Correo:</label>
            <input type="email" id="Correo" name="Correo" required>
        </div>
        
        <div>
            <label for="Contrasenia">Contraseña:</label>
            <input type="password" id="Contrasenia" name="Contrasenia" required>
        </div>

        <div>
            <label>Perfil:</label>
            <select id="perfil-vista-profesor" name="ID_Perfil" required>
                <option value="" disabled selected>Seleccione un perfil</option>
                <!-- Los perfiles se cargarán aquí -->
            </select>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">
        
        <h2 style="text-align: center; margin-top: 20px;">Lista de Profesores</h2>

            <table id="profesorTable" class="display">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>Area de Conocimiento</th>
                        <th>Perfil</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Aquí se cargarán dinámicamente los roles -->
                </tbody>
            </table>
    </div>

</div>