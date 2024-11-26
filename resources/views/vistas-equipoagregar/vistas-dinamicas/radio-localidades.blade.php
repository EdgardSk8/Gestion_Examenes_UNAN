<!-- resources/views/vistas-equipoagregar/vistas-dinamicas/radio-localidades.blade.php -->

@vite(['resources/js/vistas-dinamicas/localidades.js']) <!-- archivo js personalizado -->

<div class="contenedor-agregar-datos"> <!-- clase obligatoria del contenedor -->

    <h2 style="text-align: center">Agregar Localidad</h2>

    <!-- Formulario para agregar una nueva localidad -->
    <form id="agregarLocalidadForm" action="{{ route('localidad.agregar.ajax') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre de la localidad:</label>
            <input type="text" id="Localidad" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <div class="tabla-mostrar-datos">

        <h2 style="text-align: center; margin-top: 20px;">Lista de Localidades</h2>
        
        <table id="localidadTable" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- Aquí se cargarán dinámicamente las localidades -->
            </tbody>
        </table>
    </div>
    
</div>
