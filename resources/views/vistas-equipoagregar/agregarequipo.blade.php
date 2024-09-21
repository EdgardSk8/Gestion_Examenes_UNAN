    <label>Agregar equipo</label>

    <form method="POST">

        <input type="text" id="titulo" placeholder="Titulo" required>

        <select id="area-select" required>
        </select>

        <select id="departamento-select" required>
        </select>

        <select id="carrera-select" required>
        </select>

        <select id="integrante1" required>
        </select>
        
        <select id="integrante2">
        </select>
        
        <select id="integrante3">
        </select>

        <label for="fecha_asignada">Fecha Asignada:</label>
        <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>

        <label for="hora_inicio">Hora de Inicio:</label>
        <input type="time" id="hora_inicio" name="Hora_Inicio" required>

        <label for="hora_fin">Hora de Fin:</label>
        <input type="time" id="hora_fin" name="Hora_Fin" required>

        <select id="edificio" required>
        </select>

        <select id="aula" required>
        </select>

        <select id="tipoexamen" required>
        </select>

        <select id="tutor" required>
        </select>
        
        <select id="juez1" required>
        </select>
        
        <select id="juez2">
        </select>
        
        <select id="juez3">
        </select>

        <button type="submit">Guardar Equipo</button>

    </form>