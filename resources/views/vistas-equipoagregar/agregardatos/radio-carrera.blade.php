<!-- resources/views/vistas-equipoagregar/agregardatos/radio-carrera.blade.php -->


<div class="agregar-carrera">

    <h2 style="text-align: center">Agregar Carrera</h2>

    <form action="">

        <div>
            <label for="area-select-add">Área de Conocimiento:</label>
            <select id="area-select-add" name="ID_Area_Conocimiento" required></select>
        </div>

        <div>
            <label>Nuevo Departamento</label>
            <select id="departamento-select-add" name="ID_Departamento" required></select>        
        </div>

        <div>
            <label>Nueva Carrera</label>
            <input type="text" id="nueva-carrera" name="nueva-carrera" placeholder="Nueva Carrera" required>
        </div>

        <button type="submit" class="btn">Agregar</button>

    </form>

    <h1>Sin Funcionalidad</h1>

</div>