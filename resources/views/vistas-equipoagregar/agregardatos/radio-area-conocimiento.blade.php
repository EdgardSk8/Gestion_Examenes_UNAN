<!-- resources/views/vistas-equipoagregar/agregardatos/radio-area-conocimiento.blade.php -->

<div class="agregar-area">

    <h2 style="text-align: center">Agregar Área de Conocimiento</h2>

    <form action="{{ route('area-conocimiento.agregar') }}" method="POST">
        @csrf
        <div>
            <label>Nombre del Área de Conocimiento:</label>
            <input type="text" id="nombre" name="Nombre" required>
        </div>
        <button type="submit" class="btn">Agregar</button>
    </form>

    <h4 style="text-align: center">Lista de Áreas de Conocimiento</h4>

</div>