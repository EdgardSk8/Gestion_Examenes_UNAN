<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-perfil.blade.php -->

@vite(['resources/js/vistas-dinamicas/perfil.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos">

    <h2 style="text-align: center">Agregar Perfil</h2>

    <!-- Formulario para agregar un nuevo perfil -->
    <form id="agregarPerfilForm"> <!-- Acción para agregar el perfil con AJAX -->
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Perfil:</label>
            <input type="text" id="Nombre" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Perfiles</h2>

        <table id="perfilTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <!-- Aquí se cargarán dinámicamente los perfiles -->
            </tbody>
        </table>
    </div>
    
</div>