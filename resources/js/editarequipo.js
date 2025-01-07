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
            cargarDepartamentoSelect(data.data);
        })
        .catch(error => console.error('Error al cargar los datos del equipo:', error));
}

const areaSelectEditar = document.getElementById('editararea');
const departamentoSelectEditar = document.getElementById('editardepartamento');

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
        })
        .catch(error => console.error('Error al cargar las áreas:', error));
}

areaSelectEditar.addEventListener('change', function () { //En caso de cambiar opcion del selector areaSelectEditar
    const areaId = areaSelectEditar.value; //Guardar el ID del selector de areaSelectEditar
    console.log("ID del area Seleccionado:", areaSelectEditar.value);

    departamentoSelectEditar.innerHTML = ''; //Limpiar el Selector

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });
            departamentoSelectEditar.selectedIndex = 0; //Autoseleccionar la primera opcion
    })
    .catch(error => console.error('Error fetching departamentos:', error));
});


function cargarDepartamentoSelect(data){

    const areaId = areaSelectEditar.value;

    fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
        .then(response => response.json())
        .then(departamentos => {
            departamentos.forEach(departamento => {
                let option = document.createElement('option');
                option.value = departamento.ID_Departamento;
                option.textContent = departamento.Nombre;
                departamentoSelectEditar.appendChild(option);
            });

            const departamentoSeleccionada = departamentos.find(departamento => departamento.Nombre === data.departamento); //Autoseleccion del area del evento

            if (departamentoSeleccionada) {areaSelectEditar.value = departamentoSeleccionada.ID_Departamento;}
            console.log("Departamento del evento:", data.departamento);
        })
        .catch(error => console.error('Error al cargar las áreas:', error));

}
