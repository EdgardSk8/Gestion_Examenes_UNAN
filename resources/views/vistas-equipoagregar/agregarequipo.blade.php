<form id="equipo-form" method="POST">

    <h2 style="margin-top: 0px; text-align: center;">Agregar equipo</h2>
    @csrf <!-- Protección contra ataques CSRF -->
    
    <!-- Campo de título -->
    <div>
        <label for="titulo">Título del equipo:</label>
        <input type="text" id="titulo" name="Titulo" placeholder="Título" required>
    </div>

    <!-- Área de Conocimiento, Departamento y Carrera en una fila -->
    <div style="display: flex; gap: 10px; width: 100%;">
        <div style="flex: 1;">
            <label for="area-select">Área de Conocimiento:</label>
            <select id="area-select" name="ID_Area_Conocimiento" required></select>
        </div>

        <div style="flex: 1;">
            <label for="departamento-select">Departamento:</label>
            <select id="departamento-select" name="ID_Departamento" required></select>
        </div>
    </div>
    <div>
        <label for="carrera-select">Carrera:</label>
        <select id="carrera-select" name="ID_Carrera" required></select>
    </div>

    <!-- Integrantes del equipo en una fila -->
    <h3>Integrantes del equipo</h3>
    <div style="display: flex; gap: 10px; width: 100%;">
        <div style="flex: 1;">
            <label for="integrante1">Integrante 1:</label>
            <select id="integrante1" name="Integrante1" required></select>
        </div>

        <div style="flex: 1;">
            <label for="integrante2">Integrante 2 (Opcional):</label>
            <select id="integrante2" name="Integrante2"></select>
        </div>

        <div style="flex: 1;">
            <label for="integrante3">Integrante 3 (Opcional):</label>
            <select id="integrante3" name="Integrante3"></select>
        </div>
    </div>

    <!-- Fecha y hora -->
    <h3>Fecha y Hora</h3>
    <div>
        <label for="fecha_asignada">Fecha Asignada:</label>
        <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>
    </div>

    <div style="display: flex; gap: 10px; width: 100%;">
        <div style="flex: 1;">
            <label for="hora_inicio">Hora de Inicio:</label>
            <input type="time" id="hora_inicio" name="Hora_Inicio" required>
        </div>

        <div style="flex: 1;">
            <label for="hora_fin">Hora de Fin:</label>
            <input type="time" id="hora_fin" name="Hora_Fin" required>
        </div>
    </div>

    <!-- Ubicación -->
    <h3>Ubicación</h3>
    <div style="display: flex; gap: 10px; width: 100%;">
        <div style="flex: 1;">
            <label for="edificio">Edificio:</label>
            <select id="edificio" name="ID_Edificio" required></select>
        </div>

        <div style="flex: 1;">
            <label for="aula">Aula:</label>
            <select id="aula" name="ID_Aula" required></select>
        </div>
    </div>

    <!-- Tipo de examen -->
    <h3>Examen</h3>
    <div>
        <label for="tipoexamen">Tipo de Examen:</label>
        <select id="tipoexamen" name="ID_Tipo_Examen" required></select>
    </div>

    <!-- Tutor y jueces en una fila -->
    <h3>Tutor y Jueces</h3>

    <div>
        <label for="tutor">Tutor:</label>
        <select id="tutor" name="Tutor_ID" required></select>
    </div>

    <div style="display: flex; gap: 10px; width: 100%;">
        

        <div style="flex: 1;">
            <label for="juez1">Juez 1 (Opcional):</label>
            <select id="juez1" name="Juez1_ID"></select>
        </div>

        <div style="flex: 1;">
            <label for="juez2">Juez 2 (Opcional):</label>
            <select id="juez2" name="Juez2_ID"></select>
        </div>

        <div style="flex: 1;">
            <label for="juez3">Juez 3 (Opcional):</label>
            <select id="juez3" name="Juez3_ID"></select>
        </div>
    </div>

    <!-- Botón de guardar -->
    <div style="text-align: center; margin-top: 10px; margin-bottom: 20px">
        <button type="submit" class="button">
            <span class="label">Guardar Equipo</span>
            <span class="gradient"></span>
            <span class="transition"></span>
        </button>
    </div>

</form>
