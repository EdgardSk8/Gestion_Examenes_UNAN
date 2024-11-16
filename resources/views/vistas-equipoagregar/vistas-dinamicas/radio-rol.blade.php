<!-- resources/views/vistas-equipoagregar/agregardatos/radio-rol.blade.php -->


<div class="agregar-rol">

    <h2 style="text-align: center">Agregar Rol</h2>

    <form action="{{ route('rol.agregar') }}" method="POST"> <!-- El formulario envía datos a la ruta 'rol/agregar' -->

        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Rol:</label>
            <input type="text" id="Rol" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

</div>

<!-- Agregar Rol funciona correctamente -->
<!-- Revisar mensaje usando ventanas dinamicas -->
