<!-- resources/views/vistas-equipoagregar/agregardatos/radio-localidades.blade.php -->


<div class="agregar-localidades">

    <h2 style="text-align: center">Agregar Localidad</h2>

    <form action="{{ route('localidad.agregar') }}" method="POST"> <!-- El formulario envía datos a la ruta 'localidad/agregar' -->

        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre de la localidad:</label>
            <input type="text" id="Localidad" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>

    </form>

</div>
