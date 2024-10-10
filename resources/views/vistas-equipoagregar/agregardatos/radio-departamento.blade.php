<!-- resources/views/vistas-equipoagregar/agregardatos/radio-departamento.blade.php -->

<div class="agregar-departamento">

    <h2 style="text-align: center">Agregar Departamento</h2>

    <form action="{{ route('departamento.agregar') }}" method="POST"> <!-- Cambiar la ruta según sea necesario -->
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Área de Conocimiento:</label>
            <select required></select>
        </div>

        <div>
            <label>Nuevo Departamento:</label>
            <input type="text" name="Nombre" placeholder="Nuevo Departamento" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <!-- <h1>Sin Funcionalidad</h1> -->

</div>
