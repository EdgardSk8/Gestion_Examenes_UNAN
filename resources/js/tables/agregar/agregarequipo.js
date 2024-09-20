document.addEventListener('DOMContentLoaded', function () {
    // Elementos de los select para los profesores
    var tutorSelect = document.getElementById('tutor');
    var juez1Select = document.getElementById('juez1');
    var juez2Select = document.getElementById('juez2');
    var juez3Select = document.getElementById('juez3');

    // Función para llenar un select con opciones
    function llenarSelectProfesores(selectElement, profesores) {
        // Limpia el select antes de agregar nuevas opciones
        selectElement.innerHTML = '';

        // Crea una opción por defecto
        let defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccionar profesor';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        // Llena el select con los profesores obtenidos
        profesores.forEach(profesor => {
            let option = document.createElement('option');
            option.value = profesor.ID_Profesor;
            option.textContent = profesor.Nombre; // Ajusta según el campo que tengas en la tabla
            selectElement.appendChild(option);
        });
    }

    // Realiza la solicitud para obtener los profesores
    fetch('/profesor')
        .then(response => response.json())
        .then(data => {
            // Llenar los select de tutor y jueces con los profesores obtenidos
            llenarSelectProfesores(tutorSelect, data);
            llenarSelectProfesores(juez1Select, data);
            llenarSelectProfesores(juez2Select, data);
            llenarSelectProfesores(juez3Select, data);
        })
        .catch(error => {
            console.error('Error al obtener los profesores:', error);
        });
});
