<form id="equipo-form" action="{{ route('crearEquipo') }}" method="POST">

   

    <h2 style="margin-top: 0px; text-align: center;">Agregar equipo</h2>
    @csrf <!-- Protección contra ataques CSRF -->
    
    <div>
        <label>Título del equipo:</label>
        <input type="text" id="titulo" name="Titulo" placeholder="Título" required>
    </div>

    <!-- Área de Conocimiento y Departamento en una fila -->
    <div style="display: flex; gap: 10px; width: 100%;">

        <div style="flex: 1;">
            <label>Área de Conocimiento:</label>
            <select id="area-select" class="area-select" name="ID_Area_Conocimiento" required></select>
        </div>

        <div style="flex: 1;">
            <label>Departamento:</label>
            <select id="departamento-select" class="departamento-select" name="ID_Departamento" required></select>
        </div>

    </div>

    <div>
        <label>Carrera:</label>
        <select id="carrera-select" class="carrera-select" name="ID_Carrera" required></select>
    </div>

    <!-- Integrantes del equipo en una fila -->
    <h3>Integrantes del equipo</h3>

    <div style="display: flex; gap: 10px; width: 100%;">

        <div style="flex: 1;">
            <label>Integrante 1:</label>
            <select id="integrante1" name="Integrante1" required></select>
        </div>

        <div style="flex: 1;">
            <label>Integrante 2 (Opcional):</label>
            <select id="integrante2" name="Integrante2"></select>
        </div>

        <div style="flex: 1;">
            <label>Integrante 3 (Opcional):</label>
            <select id="integrante3" name="Integrante3"></select>
        </div>

    </div>

    <!-- Fecha y hora -->
    

    <!-- 
    <div>
        <label>Fecha Asignada:</label>
        <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>
    </div>

    <div style="display: flex; gap: 10px; width: 100%;">

        <div style="flex: 1;">
            <label>Hora de Inicio:</label>
            <input type="time" id="hora_inicio" name="Hora_Inicio" required>
        </div>

        <div style="flex: 1;">
            <label>Hora de Fin:</label>
            <input type="time" id="hora_fin" name="Hora_Fin" required>
        </div>

    </div> -->

    <!-- Fecha y hora -->

    <h3>Fecha y Hora</h3>

    <div>
        <label>Fecha Asignada:</label>
        <input type="text" id="fecha_asignada" placeholder="Selecciona una fecha" name="Fecha_Asignada" required>
    </div><br>
    
    <div style="display: flex; gap: 10px; width: 100%;">
        <div style="flex: 1;">
            <label>Hora de Inicio:</label>
            <input type="text" id="hora_inicio" placeholder="Hora de Inicio" name="Hora_Inicio" required>
        </div>
        <div style="flex: 1;">
            <label>Hora de Fin:</label>
            <input type="text" id="hora_fin" placeholder="Hora de Fin" name="Hora_Fin" required>
        </div>
    </div>
    
    <h3 id="resultado"></h3>
    <p id="aviso" style="color:red;"></p>

    
    <!-- Ubicación -->
    <h3>Ubicación</h3>

    <div style="display: flex; gap: 10px; width: 100%;">

        <div style="flex: 1;">
            <label>Edificio:</label>
            <select id="edificio-select" class="edificio-select" name="ID_Edificio" required></select>
        </div>

        <div style="flex: 1;">
            <label>Aula:</label>
            <select id="aula-select" name="ID_Aula" required></select>
        </div>

    </div>

    <!-- Tipo de examen -->
    <h3>Examen</h3>

    <div>
        <label>Tipo de Examen:</label>
        <select id="tipoexamen-select" name="ID_Tipo_Examen" required></select>
    </div>

    <!-- Tutor y jueces en una fila -->
    <h3>Tutor y Jueces</h3>

    <div>
        <label>Tutor:</label>
        <select id="tutor" name="Tutor_ID" required></select>
    </div>

    <div style="display: flex; gap: 10px; width: 100%;">
        
        <div style="flex: 1;">
            <label>Juez 1:</label>
            <select id="juez1" name="Juez1_ID"></select>
        </div>

        <div style="flex: 1;">
            <label>Juez 2 (Opcional):</label>
            <select id="juez2" name="Juez2_ID"></select>
        </div>

        <div style="flex: 1;">
            <label>Juez 3 (Opcional):</label>
            <select id="juez3" name="Juez3_ID"></select>
        </div>

    </div>

    <!-- Botón de guardar -->
    <div style="text-align: center; margin-top: 10px; margin-bottom: 20px">
        <button type="submit" class="button"> <!-- clase en equipoagregar.css -->
            <span class="label">Guardar Equipo</span>
            <span class="gradient"></span>
            <span class="transition"></span>
        </button>
    </div>

    @if (session('success') || session('error'))
        <script>
            window.onload = function() {
                let message = '{{ session('success') ?? session('error') }}';
                window.alert(message);
            };
        </script>
    @endif

    

</form>



