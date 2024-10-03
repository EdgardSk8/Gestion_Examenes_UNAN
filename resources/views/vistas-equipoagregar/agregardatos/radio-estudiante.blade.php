<!-- resources/views/vistas-equipoagregar/agregardatos/radio-estudiante.blade.php -->


<div class="agregar-Estudiante">

    <h2 style="text-align: center">Agregar Estudiante</h2>

    <form action="" method="POST">
        @csrf

        <div>
            <label for="area-select-add">Área de Conocimiento:</label>
            <select id="area-select-add" name="ID_Area_Conocimiento" required></select>
        </div>

        <div>
            <label for="departamento-select-add">Departamento:</label>
            <select id="departamento-select-add" name="ID_Departamento" required></select>  
        </div>

        <div>
            <label for="carrera-select-add">Carrera:</label>
            <select id="carrera-select-add" name="ID_Carrera" required></select>
        </div>

        <div>
            <label for="localidad-select-add">Localidad:</label>
            <select id="localidad-select-add" name="ID_Localidad" required></select>
        </div>

        <div>
            <label for="Nombre">Nombre Completo:</label>
            <input type="text" id="Nombre" name="Nombre_Completo" required>
        </div>

        <div>
            <label for="Carnet">Carnet:</label>
            <input type="text" id="Carnet" name="Carnet" required>
        </div>

        <div>
            <label for="Genero">Género:</label>
            <select id="Genero" name="Genero" required>
                <option value="" disabled selected>Seleccionar Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
            </select>
        </div>

        <div>
            <label for="Correo_Institucional">Correo Institucional:</label>
            <input type="email" id="Correo_Institucional" name="Correo_Institucional" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <h1>Sin Funcionalidad</h1>

</div>