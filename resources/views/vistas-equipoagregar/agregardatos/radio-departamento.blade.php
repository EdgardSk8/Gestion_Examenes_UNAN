<!-- resources/views/vistas-equipoagregar/agregardatos/radio-departamento.blade.php -->
@vite(['resources/js/tables/area_conocimiento.js']) <!-- archivo js personalizado -->


<div class="agregar-departamento">

    <h2 style="text-align: center">Agregar Departamento</h2>

    <form action="">

        <div>
            <label for="area-select-add">Área de Conocimiento:</label>
            <select id="area-select-add" name="ID_Area_Conocimiento" class="area-select" required></select>
        </div>

        <div>
            <label>Nuevo Departamento</label>
            <input type="text" id="nuevo-departamento" name="nuevo-departamento" placeholder="Nuevo Departamento" required>
        </div>

        <button type="submit" class="btn">Agregar</button>

    </form>

    <h1>Sin Funcionalidad</h1>

</div>
