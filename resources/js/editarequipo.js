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

function EditarEquipo(id) {
    fetch(`/equipo/editar/${id}`) // Endpoint actualizado para obtener los datos del equipo
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener los datos del equipo: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            console.log("Datos del equipo:", data);
            cargarAreaSelect(data.data); //Carga las areas y selecciona el area del evento
        })
        .catch(error => console.error('Error al cargar los datos del equipo:', error));
}

/*-------------------------------------------------------------------------------------------------------------------------------------------*/

//Referencias de ID de los selectores
const areaSelectEditar = document.getElementById('editararea'); 
const departamentoSelectEditar = document.getElementById('editardepartamento');
const carreraSelectEditar = document.getElementById('editarcarrera');
const edificioSelectEditar = document.getElementById('editaredificio');

function cargarAreaSelect(data) {

    areaSelectEditar.innerHTML = '';

    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(areas => {
            areas.forEach(area => {
                let option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                areaSelectEditar.appendChild(option);
            });

            const areaSeleccionada = areas.find(area => area.Nombre === data.area_conocimiento); //Autoseleccion del area del evento

            if (areaSeleccionada) {areaSelectEditar.value = areaSeleccionada.ID_Area;}
            // console.log("Área de conocimiento del evento:", data.area_conocimiento);
            cargarDepartamentoSelect(data);
            cargarEdificioSelect(data);
        })
        .catch(error => console.error('Error al cargar las áreas:', error));
}

//En caso de cambiar opcion del selector areaSelectEditar
areaSelectEditar.addEventListener('change', function () { 
    const areaId = areaSelectEditar.value; //Guardar el ID del selector de areaSelectEditar
    //console.log("ID del area Seleccionado:", areaSelectEditar.value);

    departamentoSelectEditar.innerHTML = ''; //Limpiar el Selector

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) { // Verificar si no hay carreras en el departamento
                let option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay departamentos disponibles';
                departamentoSelectEditar.appendChild(option);

                carreraSelectEditar.innerHTML = '';
                let opcionsincarreras = document.createElement('option');
                opcionsincarreras.textContent = 'Seleccione un departamento';
                carreraSelectEditar.appendChild(opcionsincarreras);
            } else {
            data.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });
            departamentoSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
            departamentoSelectEditar.dispatchEvent(new Event('change'));
        }
    })
    .catch(error => console.error('Error fetching departamentos:', error));

    edificioSelectEditar.innerHTML = '';

    fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(edificios => {
            if (edificios.length === 0) {
               
                let option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay edificios disponibles';
                edificioSelectEditar.appendChild(option);
            } else {
                edificios.forEach(edificio => {
                    let option = document.createElement('option');
                    option.value = edificio.ID_Edificio;
                    option.textContent = edificio.Nombre_Edificio;
                    edificioSelectEditar.appendChild(option);
                });

                // Autoseleccionar la primera opción
                edificioSelectEditar.selectedIndex = 0;
                edificioSelectEditar.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => console.error('Error fetching edificios:', error));
});

function cargarDepartamentoSelect(data) {

    const areaId = areaSelectEditar.value;
    departamentoSelectEditar.innerHTML = '';

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(departamentos => {
            departamentos.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el departamento asociado al evento
            const departamentoSeleccionado = departamentos.find(departamento => departamento.Nombre === data.departamento);
           
            if (departamentoSeleccionado) {departamentoSelectEditar.value = departamentoSeleccionado.ID_Departamento;
                //console.log("Departamento seleccionado automáticamente:", departamentoSeleccionado.Nombre);
            } else if (departamentos.length > 0) {departamentoSelectEditar.selectedIndex = 0;
                console.log("No se encontró el departamento del evento, se seleccionó el primero.");
            }
            cargarCarreraSelect(data);
        })
        .catch(error => console.error('Error al cargar los departamentos:', error));
}

function cargarCarreraSelect(data){

    const departamentoId = departamentoSelectEditar.value;
    carreraSelectEditar.innerHTML = '';

    fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
        .then(response => response.json())
        .then(carreras => {
            carreras.forEach(carrera => {
                let option = document.createElement('option');
                option.value = carrera.ID_Carrera;
                option.textContent = carrera.Nombre;
                carreraSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente la carrera asociada al evento
            const carreraSeleccionada = carreras.find(carrera => carrera.Nombre === data.carrera);

            if (carreraSeleccionada) {carreraSelectEditar.value = carreraSeleccionada.ID_Carrera;
                console.log("Departamento seleccionado automáticamente:", carreraSeleccionada.Nombre);
            } else if (carreras.length > 0) {carreraSelectEditar.selectedIndex = 0;
                console.log("No se encontró el carrera del evento, se seleccionó el primero.");
            }
            carreraSelectEditar.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error al cargar las carreras:', error));
}

//En caso de cambiar opcion del selector departamentoSelectEditar
departamentoSelectEditar.addEventListener('change', function () { 
    const departamentoId = departamentoSelectEditar.value; //Guardar el ID del selector de departamentoSelectEditar
    console.log("ID del Departamento Seleccionado:", departamentoSelectEditar.value);

    carreraSelectEditar.innerHTML = ''; //Limpiar el Selector

    if(departamentoId){
        fetch(`/carreras?departamentoId=${encodeURIComponent(departamentoId)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) { // Verificar si no hay carreras en el departamento
                    let option = document.createElement('option');
                    option.value = '';
                    option.textContent = 'Departamento sin carrera';
                    carreraSelectEditar.appendChild(option);
                } else {
                data.forEach(carrera => {
                    let option = document.createElement('option');
                    option.value = carrera.ID_Carrera;
                    option.textContent = carrera.Nombre;
                    carreraSelectEditar.appendChild(option);
                });
                carreraSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
            }
        })
        .catch(error => console.error('Error fetching departamentos:', error));
    }
});

function cargarEdificioSelect(data) {

    const areaId = areaSelectEditar.value;
    edificioSelectEditar.innerHTML = '';

    fetch(`/edificio?areaId=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(edificios => {
            edificios.forEach(edificio => {
                let option = document.createElement('option');
                option.value = edificio.ID_Edificio;
                option.textContent = edificio.Nombre_Edificio;
                edificioSelectEditar.appendChild(option);
            });

            // Seleccionar automáticamente el edificio asociado al evento
            const edificioSeleccionado = edificios.find(edificio => edificio.Nombre_Edificio === data.edificio);
           
            if (edificioSeleccionado) {edificioSelectEditar.value = edificioSeleccionado.ID_Edificio;
                //console.log("Edificio seleccionado automáticamente:", edificioSeleccionado.Nombre_Edificio);
            } else if (edificios.length > 0) {edificioSelectEditar.selectedIndex = 0;
                console.log("No se encontró el edificio del evento, se seleccionó el primero.");
            }
            edificioSelectEditar.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error al cargar los edificios:', error));
}
