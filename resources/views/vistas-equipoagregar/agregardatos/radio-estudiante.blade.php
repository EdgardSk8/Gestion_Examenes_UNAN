<div class="agregar-Estudiante">
    <h2 style="text-align: center">Agregar Estudiante</h2>

    <form action="{{ route('estudiante.agregar') }}" method="POST" id="formEstudiante">
        @csrf

        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-estudiante" id="area-vista-estudiante" name="ID_Area" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Departamento:</label>
            <select class="departamento-vista-estudiante" id="departamento-vista-estudiante" name="ID_Departamento" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Carrera:</label>
            <select class="carrera-vista-estudiante" id="carrera-vista-estudiante" name="ID_Carrera" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Localidad:</label>
            <select class="localidad-vista-estudiante" id="localidad-vista-estudiante" name="ID_Localidad" required>
                <!-- Opciones cargadas dinámicamente -->
            </select>
        </div>

        <div>
            <label>Nombre Completo:</label>
            <input type="text" name="Nombre_Completo" required> 
        </div>

        <div>
            <label for="Carnet">Carnet:</label>
            <input type="text" id="Carnet" name="Carnet" required>
            <div id="mensaje-carnet" style="color: red; display: none;"></div>
            <h4>Formato del Carnet 00-00000-0</p>
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
            <div id="mensaje-correo" style="color: red; display: none;"></div>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>
</div>

<script>
   document.addEventListener('DOMContentLoaded', function () {
    const areaSelect = document.getElementById('area-vista-estudiante');
    const departamentoSelect = document.getElementById('departamento-vista-estudiante');
    const carreraSelect = document.getElementById('carrera-vista-estudiante');
    const localidadSelect = document.getElementById('localidad-vista-estudiante');
    const form = document.getElementById('formEstudiante');
    const carnetInput = document.getElementById('Carnet');
    const correoInput = document.getElementById('Correo_Institucional');
    const mensajeCarnet = document.getElementById('mensaje-carnet');
    const mensajeCorreo = document.getElementById('mensaje-correo');

    // Función para crear la opción predeterminada de "Seleccione..."
    function createDefaultOption(text) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = text;
        option.disabled = true;
        option.selected = true;
        return option;
    }

    // Añadir las opciones predeterminadas
    areaSelect.appendChild(createDefaultOption('Seleccione un área de conocimiento'));
    departamentoSelect.appendChild(createDefaultOption('Seleccione un departamento'));
    carreraSelect.appendChild(createDefaultOption('Seleccione una carrera'));
    localidadSelect.appendChild(createDefaultOption('Seleccione una localidad'));

    // Función para validar el carnet
    async function validateCarnet() {
        const carnet = carnetInput.value.trim();

        if (carnet === '') {
            mensajeCarnet.style.display = 'none';  // Si el campo está vacío, no mostramos el mensaje
            return;
        }

        try {
            const response = await fetch(`/validar-carnet?carnet=${carnet}`);
            const data = await response.json();

            if (data.exists) {
                mensajeCarnet.textContent = "El carnet ya está registrado.";
                mensajeCarnet.style.display = 'block';
            } else {
                mensajeCarnet.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al validar el carnet:', error);
        }
    }

    // Función para validar el correo
    async function validateCorreo() {
        const correo = correoInput.value.trim();

        if (correo === '') {
            mensajeCorreo.style.display = 'none';  // Si el campo está vacío, no mostramos el mensaje
            return;
        }

        try {
            const response = await fetch(`/validar-correo?correo=${correo}`);
            const data = await response.json();

            if (data.exists) {
                mensajeCorreo.textContent = "El correo institucional ya está registrado.";
                mensajeCorreo.style.display = 'block';
            } else {
                mensajeCorreo.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al validar el correo:', error);
        }
    }

    // Detectar cuando el usuario termina de escribir en el carnet
    carnetInput.addEventListener('input', validateCarnet);

    // Detectar cuando el usuario termina de escribir en el correo
    correoInput.addEventListener('input', validateCorreo);

    // Cargar las áreas de conocimiento
    fetch('/area-conocimiento')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          data.forEach(area => {
            let option = document.createElement('option');
            option.value = area.ID_Area;
            option.textContent = area.Nombre;
            areaSelect.appendChild(option);
          });
        } else {
          areaSelect.appendChild(createDefaultOption('No hay áreas disponibles'));
        }
      })
      .catch(error => {
        console.error('Error al cargar las áreas:', error);
        areaSelect.appendChild(createDefaultOption('Error al cargar las áreas'));
      });

    // Cargar los departamentos según el área seleccionada
    areaSelect.addEventListener('change', function () {
        const areaId = areaSelect.value;

        // Limpiar los departamentos previos
        departamentoSelect.innerHTML = '';
        departamentoSelect.appendChild(createDefaultOption('Seleccione un departamento'));

        if (areaId) {
            fetch(`/departamentos?idArea=${areaId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    data.forEach(departamento => {
                        let option = document.createElement('option');
                        option.value = departamento.ID_Departamento;
                        option.textContent = departamento.Nombre;
                        departamentoSelect.appendChild(option);
                    });
                } else {
                    departamentoSelect.appendChild(createDefaultOption('No hay departamentos disponibles'));
                }
            })
            .catch(error => {
                console.error('Error al cargar los departamentos:', error);
                departamentoSelect.appendChild(createDefaultOption('Error al cargar los departamentos'));
            });
        }
    });

    // Cargar las carreras según el departamento seleccionado
    departamentoSelect.addEventListener('change', function () {
        const departamentoId = departamentoSelect.value;

        // Limpiar las carreras previas
        carreraSelect.innerHTML = '';
        carreraSelect.appendChild(createDefaultOption('Seleccione una carrera'));

        if (departamentoId) {
            fetch(`/carreras?departamentoId=${departamentoId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    data.forEach(carrera => {
                        let option = document.createElement('option');
                        option.value = carrera.ID_Carrera;
                        option.textContent = carrera.Nombre;
                        carreraSelect.appendChild(option);
                    });
                } else {
                    carreraSelect.appendChild(createDefaultOption('No hay carreras disponibles'));
                }
            })
            .catch(error => {
                console.error('Error al cargar las carreras:', error);
                carreraSelect.appendChild(createDefaultOption('Error al cargar las carreras'));
            });
        }
    });

    // Cargar las localidades
    fetch('/localidades')
      .then(response => response.json())
      .then(data => {
        localidadSelect.innerHTML = '';
        localidadSelect.appendChild(createDefaultOption('Seleccione una localidad'));

        if (data && data.length > 0) {
          data.forEach(localidad => {
            let option = document.createElement('option');
            option.value = localidad.ID_Localidad;
            option.textContent = localidad.Nombre;
            localidadSelect.appendChild(option);
          });
        } else {
          localidadSelect.appendChild(createDefaultOption('No hay localidades disponibles'));
        }
      })
      .catch(error => {
        console.error('Error al cargar localidades:', error);
        localidadSelect.appendChild(createDefaultOption('Error al cargar localidades'));
      });
});

</script>
