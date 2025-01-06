const editButton = document.getElementById('editar-evento');

if (editButton) {
    editButton.addEventListener('click', function () {
        const eventId = editButton.getAttribute('data-event-id'); // Obtener el ID del evento asignado al botón
        if (!eventId) {
            console.error('No se ha seleccionado ningún evento para editar.');
        } else {
            console.log("ID del evento: ", eventId);
            Verificador();
            EditarEquipo(eventId); // Pasar el eventId para cargar los datos específicos
        }
    });
}

function Verificador() {
    const elementos = [
        'editartitulo', 'editararea', 'editardepartamento', 'editarcarrera', 'editarintegrante1', 'editarintegrante2', 'editarintegrante3',
        'editarfecha_asignada', 'editarfecha_aprobada', 'editarhora_inicio', 'editarhora_fin', 'editarcalificacion', 'editaredificio',
        'editaraula', 'editartipo_examen', 'editartutor', 'editarjuez1', 'editarjuez2', 'editarjuez3', 'guardar-cambios', 'resultado',
        'aviso'
    ];

    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (!elemento) {
            console.log(`El elemento con el ID '${id}' no existe.`);
        }
    });
}

function EditarEquipo(eventId) {

    console.log("s", eventId);
    // Función para cargar las áreas de conocimiento
    fetch('/area-conocimiento')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar las áreas de conocimiento: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const areaSelect = document.getElementById('editararea');
            areaSelect.innerHTML = '';

            data.forEach(area => {
                const option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                areaSelect.appendChild(option);
            });

            areaSelect.addEventListener('change', (e) => {
                const areaId = e.target.value;
                cargarDepartamentos(areaId); 
            });

            cargarDepartamentos(areaSelect.value);
        })
        .catch(error => {
            console.error('Error al cargar las áreas de conocimiento:', error);
        });

    // Función para cargar los departamentos según el área seleccionada
    function cargarDepartamentos(areaId) {
        fetch(`/departamentos?idArea=${areaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar los departamentos: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const departamentoSelect = document.getElementById('editardepartamento');
                departamentoSelect.innerHTML = '';

                if (data.length === 0) {
                    const noDepartamentosOption = document.createElement('option');
                    noDepartamentosOption.textContent = 'Sin departamentos';
                    noDepartamentosOption.disabled = true;
                    noDepartamentosOption.selected = true;
                    departamentoSelect.appendChild(noDepartamentosOption);
                } else {
                    data.forEach(departamento => {
                        const option = document.createElement('option');
                        option.value = departamento.ID_Departamento;
                        option.textContent = departamento.Nombre;
                        departamentoSelect.appendChild(option);
                    });

                    departamentoSelect.addEventListener('change', (e) => {
                        const departamentoId = e.target.value;
                        cargarCarreras(departamentoId);
                    });
                    cargarCarreras(departamentoSelect.value);
                }
            })
            .catch(error => {
                console.error('Error al cargar los departamentos:', error);
            });
    }

    // Función para cargar las carreras según el departamento seleccionado
    function cargarCarreras(departamentoId) {
        fetch(`/carreras?departamentoId=${departamentoId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar las carreras: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const carreraSelect = document.getElementById('editarcarrera');
                carreraSelect.innerHTML = '';

                if (data.length === 0) {
                    const noCarrerasOption = document.createElement('option');
                    noCarrerasOption.textContent = 'Sin carreras';
                    noCarrerasOption.disabled = true;
                    noCarrerasOption.selected = true;
                    carreraSelect.appendChild(noCarrerasOption);
                } else {
                    data.forEach(carrera => {
                        const option = document.createElement('option');
                        option.value = carrera.ID_Carrera;
                        option.textContent = carrera.Nombre;
                        carreraSelect.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar las carreras:', error);
            });
    }

     

}
