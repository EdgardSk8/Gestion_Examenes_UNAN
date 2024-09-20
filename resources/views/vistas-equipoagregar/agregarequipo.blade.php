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



<label for="integrante1">Integrante 1:</label>
    <input type="text" id="integrante1" name="Integrante1" required>

    <label for="integrante2">Integrante 2:</label>
    <input type="text" id="integrante2" name="Integrante2">

    <label for="integrante3">Integrante 3:</label>
    <input type="text" id="integrante3" name="Integrante3">

    <label for="fecha_asignada">Fecha Asignada:</label>
    <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>

    <label for="hora_inicio">Hora de Inicio:</label>
    <input type="time" id="hora_inicio" name="Hora_Inicio" required>

    <label for="hora_fin">Hora de Fin:</label>
    <input type="time" id="hora_fin" name="Hora_Fin" required>

    <label for="aula">Aula:</label>
    <select id="aula" name="ID_Aula" required>
        <!-- Opciones serán llenadas dinámicamente o cargadas en el controlador -->
        <option value="">Seleccionar aula</option>
    </select>

    <label for="tipo_examen">Tipo de Examen:</label>
    <select id="tipo_examen" name="ID_Tipo_Examen" required>
        <!-- Opciones serán llenadas dinámicamente o cargadas en el controlador -->
        <option value="">Seleccionar tipo de examen</option>
    </select>

    <label for="tutor">Tutor:</label>
    <input type="text" id="tutor" name="Tutor_ID" required>

    <label for="juez1">Juez 1:</label>
    <input type="text" id="juez1" name="Juez1_ID" required>

    <label for="juez2">Juez 2:</label>
    <input type="text" id="juez2" name="Juez2_ID">

    <label for="juez3">Juez 3:</label>
    <input type="text" id="juez3" name="Juez3_ID">

    <button type="submit">Guardar Equipo</button>

</form>