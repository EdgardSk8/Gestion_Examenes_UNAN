<!-- resources/views/vistas-equipoagregar/agregardatos/radio-carrera.blade.php -->

<div class="agregar-carrera">

    <h2 style="text-align: center">Agregar Carrera</h2>

    <form action="">
        <!-- Contenedor para el grupo de selectores -->
        <div class="grupo-carrera">
            <div>
                <label>Área de Conocimiento:</label>
                <select name="ID_Area_Conocimiento" class="area-select" required>
                    <!-- Opciones de áreas -->
                </select>
            </div>

            <div>
                <label>Departamento:</label>
                <select name="ID_Departamento" class="departamento-select" required>
                    <!-- Opciones de departamentos -->
                </select>        
            </div>
        </div>

        <div>
            <label>Nueva Carrera:</label>
            <input type="text" name="nueva_carrera" placeholder="Nueva Carrera" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <!-- <h1>Sin Funcionalidad</h1> -->

</div>
