<!-- resources/views/vistas-principales/editarequipo.blade.php -->

@vite(['resources/css/Vista_Principal/contenedoreditarequipo.css'])

<div class="contenedor-editar" style="background-color: #bbc5f1"> <!-- Contenedor Principal -->
    
    <div>

        <form id="editarequipo-form">

            <h2 style="margin-top: 0px; text-align: center;">Editar Equipo</h2>
            @csrf <!-- Protección contra ataques CSRF -->
            
            <div>
                <label>Título del equipo:</label>
                <input type="text" id="editartitulo" placeholder="Título" required>
            </div>
        
            <!-- Área de Conocimiento y Departamento en una fila -->
            <div style="display: flex; gap: 10px; width: 100%;">
        
                <div style="flex: 1;">
                    <label>Área de Conocimiento:</label>
                    <select id="editararea" required></select>
                </div>
        
                <div style="flex: 1;">
                    <label>Departamento:</label>
                    <select id="editardepartamento" required></select>
                </div>
        
            </div>
        
            <div>
                <label>Carrera:</label>
                <select id="editarcarrera" required></select>
            </div>
        
            <!-- Integrantes del equipo en una fila -->
            <h3>Integrantes del equipo</h3>
        
            <div style="display: flex; gap: 10px; width: 100%;">
        
                <div style="flex: 1;">
                    <label>Integrante 1:</label>
                    <select id="editarintegrante1" required></select>
                </div>
        
                <div style="flex: 1;">
                    <label>Integrante 2:</label>
                    <select id="editarintegrante2"></select>
                </div>
        
                <div style="flex: 1;">
                    <label>Integrante 3:</label>
                    <select id="editarintegrante3"></select>
                </div>
        
            </div>
        
            <h3>Fecha y Hora</h3>
        
            <div>
                <label>Fecha Asignada:</label>
                <input type="text" id="editarfecha_asignada" placeholder="Selecciona una fecha" name="Fecha_Asignada" required>
            </div><br>

            <div>
                <label>Fecha Aprobada:</label>
                <input type="text" id="editarfecha_aprobada" placeholder="Selecciona una fecha" name="Fecha_Aprobada">
            </div><br>
            
            <div style="display: flex; gap: 10px; width: 100%;">
                <div style="flex: 1;">
                    <label>Hora de Inicio:</label>
                    <input type="text" id="editarhora_inicio" placeholder="Hora de Inicio" required>
                </div>

                <div style="flex: 1;">
                    <label>Hora de Fin:</label>
                    <input type="text" id="editarhora_fin" placeholder="Hora de Fin" required>
                </div>
            </div>

            
            <div>
                <label>Calificacion:</label>
                <input type="number" id="editarcalificacion" placeholder="Califica" name="calificacion">
            </div><br>
            
            <h3 id="avisoeditardia" style="color:red;"></h3>
            <h3 id="avisoeditarhora" style="color:red;"></h3>
        
            
            <!-- Ubicación -->
            <h3>Ubicación</h3>
        
            <div style="display: flex; gap: 10px; width: 100%;">
        
                <div style="flex: 1;">
                    <label>Edificio:</label>
                    <select id="editaredificio" required></select>
                </div>
        
                <div style="flex: 1;">
                    <label>Aula:</label>
                    <select id="editaraula" required></select>
                </div>
        
            </div>
        
            <!-- Tipo de examen -->
            <h3>Examen</h3>
        
            <div>
                <label>Tipo de Examen:</label>
                <select id="editartipo_examen" required></select>
            </div>

            <div id="tipoexameneditar" style="margin-bottom: 20px">
        
                <!-- Tutor y jueces en una fila -->
                <h3>Tutor y Jueces</h3>
            
                <div>
                    <label>Tutor:</label>
                    <select id="editartutor"></select>
                </div>
            
                <div style="display: flex; gap: 10px; width: 100%;">
                    
                    <div style="flex: 1;">
                        <label>Juez 1:</label>
                        <select id="editarjuez1"></select>
                    </div>
            
                    <div style="flex: 1;">
                        <label>Juez 2 (Opcional):</label>
                        <select id="editarjuez2"></select>
                    </div>
            
                    <div style="flex: 1;">
                        <label>Juez 3 (Opcional):</label>
                        <select id="editarjuez3"></select>
                    </div>
            
                </div>

            </div>

            <!-- Botón de guardar -->
            <div id="guardar-cambios" style="text-align: center; margin-top: 30px; margin-bottom: 30px">
                <button type="submit" class="button"> <!-- clase en equipoagregar.css -->
                    <span class="label">Guardar Cambios</span>
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

    </div>

</div>

