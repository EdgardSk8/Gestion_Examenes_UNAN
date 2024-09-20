    <label>Agregar equipo</label>

    <form method="POST">

        <input type="text" id="titulo" name="Titulo" placeholder="Titulo" required>

        <select id="area-select" required>
            <!-- Area -->
        </select>

        <select id="departamento-select" required>
            <!-- Departamentos -->
        </select>

        <select id="carrera-select" required>
            <!-- Carreras -->
        </select>

        <select id="integrante1" required>
            <!-- Las opciones se agregarán dinámicamente -->
        </select>
        
        <select id="integrante2">
            <!-- Las opciones se agregarán dinámicamente -->
        </select>
        
        <select id="integrante3">
            <!-- Las opciones se agregarán dinámicamente -->
        </select>

        <label for="fecha_asignada">Fecha Asignada:</label>
        <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>

        <label for="hora_inicio">Hora de Inicio:</label>
        <input type="time" id="hora_inicio" name="Hora_Inicio" required>

        <label for="hora_fin">Hora de Fin:</label>
        <input type="time" id="hora_fin" name="Hora_Fin" required>

        <select id="aula" required>
        </select>

        <select id="tipo_examen" name="ID_Tipo_Examen" required>
        </select>

        <select id="tutor" required>
            <!-- Las opciones se agregarán dinámicamente -->
        </select>
        
        <select id="juez1" required>
            <!-- Las opciones se agregarán dinámicamente -->
        </select>
        
        <select id="juez2">
            <!-- Las opciones se agregarán dinámicamente -->
        </select>
        
        <select id="juez3">
            <!-- Las opciones se agregarán dinámicamente -->
        </select>

        <button type="submit">Guardar Equipo</button>

    </form>