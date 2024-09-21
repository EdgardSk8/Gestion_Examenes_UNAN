    <label>Agregar equipo</label>

    <form id="equipo-form" method="POST">
        @csrf <!-- Protección contra ataques CSRF -->
        
        <input type="text" id="titulo" name="Titulo" placeholder="Título" required>
    
        <select id="area-select" name="ID_Area_Conocimiento" required></select>
    
        <select id="departamento-select" name="ID_Departamento" required></select>
    
        <select id="carrera-select" name="ID_Carrera" required></select>
    
        <select id="integrante1" name="Ipntegrante1" required></select>
        
        <select id="integrante2" name="Integrante2"></select>
        
        <select id="integrante3" name="Integrante3"></select>
    
        <label for="fecha_asignada">Fecha Asignada:</label>
        <input type="date" id="fecha_asignada" name="Fecha_Asignada" required>
    
        <label for="hora_inicio">Hora de Inicio:</label>
        <input type="time" id="hora_inicio" name="Hora_Inicio" required>
    
        <label for="hora_fin">Hora de Fin:</label>
        <input type="time" id="hora_fin" name="Hora_Fin" required>
    
        <select id="edificio" name="ID_Edificio" required></select>
    
        <select id="aula" name="ID_Aula" required></select>
    
        <select id="tipoexamen" name="ID_Tipo_Examen" required></select>
    
        <select id="tutor" name="Tutor_ID" required></select>
        
        <select id="juez1" name="Juez1_ID"></select>
        
        <select id="juez2" name="Juez2_ID"></select>
        
        <select id="juez3" name="Juez3_ID"></select>
    
        <button type="submit">Guardar Equipo</button>
    </form>
    