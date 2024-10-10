<!-- resources/views/vistas-equipoagregar/agregardatos/radio-aula.blade.php -->


<div class="agregar-Aula">

    <h2 style="text-align: center">Agregar Aula</h2>

    <form action="">

        <div>
            <label for="area-select-add">Área de Conocimiento:</label>
            <select id="area-select-add" name="ID_Area_Conocimiento" class="area-select" required></select>
        </div>

        <div>
            <label>Edificio</label>
            <select id="edificio-select-add" name="ID_Edificio" class="edificio-select" required></select>
        </div>

        <div>
            <label>Nueva Aula</label>
            <input type="text" id="nueva-aula" name="nueva-aula" placeholder="Nueva Aula" required>
        </div>

        <button type="submit" class="btn">Agregar</button>

    </form>

    <!-- <h1>Sin Funcionalidad</h1> -->

</div>
