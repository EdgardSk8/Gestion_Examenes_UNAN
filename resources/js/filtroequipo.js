document.addEventListener('DOMContentLoaded', function(){

    const filtro_Area_Equipo = document.getElementById("filtrar_Area_Equipo");
    const filtro_Departamento_Equipo = document.getElementById("filtrar_Departamento_Equipo");

    if(filtro_Area_Equipo == null){console.log("ID Area no encontrado", filtro_Area_Equipo);}
    if(filtro_Departamento_Equipo == null){console.log("ID departamento no encontrado", filtro_Departamento_Equipo);}

    fetch('/area-conocimiento')
        .then(response => response.json())
        .then(areas => {
            areas.forEach(area => {
                let option = document.createElement('option');
                option.value = area.ID_Area;
                option.textContent = area.Nombre;
                filtro_Area_Equipo.appendChild(option);
            });
            cargarDepartamentoSelect();
        })
        .catch(error => console.error('Error al cargar las áreas:', error));

        function cargarDepartamentoSelect() {
            filtro_Departamento_Equipo.innerHTML = "";

            const areaId = filtro_Area_Equipo.value;

            fetch(`/departamentos?idArea=${encodeURIComponent(areaId)}`)
                .then(response => response.json())
                .then(departamentos => {
                    if (departamentos.length === 0) { // Verificar si no hay carreras en el departamento
                        let option = document.createElement('option');
                        option.value = '';
                        option.textContent = 'No hay departamentos disponibles';
                        filtro_Departamento_Equipo.appendChild(option);
                    } else {
                        departamentos.forEach(departamento => {
                            let option = document.createElement('option');
                            option.value = departamento.ID_Departamento;
                            option.textContent = departamento.Nombre;
                            filtro_Departamento_Equipo.appendChild(option);
                        });
                            const departamentoId = filtro_Departamento_Equipo.value;
                            console.log("ID del departamento autoseleccionado: ", departamentoId); // Mostrar el ID del departamento seleccionado automáticamente
                            //localStorage.setItem('departamentoId', departamentoId);
                        }
                })
                .catch(error => console.error('Error al cargar los departamentos:', error));
        }

        filtro_Area_Equipo.addEventListener('change', function () {cargarDepartamentoSelect();});

        filtro_Departamento_Equipo.addEventListener('change', function() {
            const departamentoId = filtro_Departamento_Equipo.value;
            console.log("ID del departamento autoseleccionado: ", departamentoId); // Mostrar el ID del departamento seleccionado automáticamente
            //localStorage.setItem('departamentoId', departamentoId);
        });

})