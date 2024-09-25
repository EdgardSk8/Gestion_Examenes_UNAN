<div class="agregar-localidad">
    <h2 style="text-align: center">Agregar Localidad</h2>

    <!-- El formulario ahora envía datos a la ruta 'localidad/agregar' -->
    <form action="{{ route('localidad.agregar') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label for="Localidad">Nombre de la localidad:</label>
            <input type="text" id="Localidad" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>
</div>
