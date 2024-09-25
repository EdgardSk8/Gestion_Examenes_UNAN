<!-- resources/views/vistas-equipoagregar/agregardatos/radio-area-conocimiento.blade.php -->

<div class="agregar-area">

    <h2>Agregar Área de Conocimiento</h2>

    <form  method="POST">

        @csrf <!-- Token de protección contra CSRF -->
        
        <div>
            <label for="nombre">Nombre del Área de Conocimiento:</label>
            <input type="text" id="nombre" name="Nombre" required>
        </div>

        <button type="submit">Agregar</button>
    </form>
</div>