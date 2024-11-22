<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-rol.blade.php -->

@vite(['resources/js/vistas-dinamicas/rol.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Rol</h2>

    <!-- Formulario para agregar un nuevo perfil (rol) -->
    <form id="agregarRolForm">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Perfil (Rol):</label>
            <input type="text" id="NombreRol" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">
        
        <h2 style="text-align: center; margin-top: 20px;">Lista de Roles</h2>

            <table id="rolTable" class="display">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Aquí se cargarán dinámicamente los roles -->
                </tbody>
            </table>
    </div>
    
</div>
