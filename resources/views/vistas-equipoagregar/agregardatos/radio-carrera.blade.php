<!-- resources/views/vistas-equipoagregar/agregardatos/radio-carrera.blade.php -->

<div class="agregar-carrera">

    <h2 style="text-align: center">Agregar Carrera</h2>

    <form action="">
        <!-- Contenedor para el grupo de selectores -->
        <div class="grupo-carrera">
            <div>
                <label>Área de Conocimiento:</label>
                <select class="area-select" required>
                    <!-- Opciones de áreas -->
                </select>
            </div>

            <div>
                <label>Departamento:</label>
                <select class="departamento-select" required>
                    <!-- Opciones de departamentos -->
                </select>        
            </div>
        </div>

        <div>
            <label>Nueva Carrera:</label>
            <input type="text" name="nueva-carrera" placeholder="Nueva Carrera" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

</div>
