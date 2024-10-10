<!-- resources/views/vistas-equipoagregar/agregardatos/radio-estudiante.blade.php -->


<div class="agregar-Estudiante">

    <h2 style="text-align: center">Agregar Estudiante</h2>

    <form action="" method="POST">
        @csrf

        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-select" required></select>
        </div>

        <div>
            <label>Departamento:</label>
            <select class="departamento-select" required></select>  
        </div>

        <div>
            <label>Carrera:</label>
            <select class="carrera-select" required></select>
        </div>

        <div>
            <label>Localidad:</label>
            <select class="localidad-select"  required></select>
        </div>

        <div>
            <label>Nombre Completo:</label>
            <input type="text" name="Nombre_Estudiante" required>
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

    <!-- <h1>Sin Funcionalidad</h1> -->

</div>