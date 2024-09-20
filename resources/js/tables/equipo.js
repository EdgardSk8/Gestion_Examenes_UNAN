// resources/js/equipo.js
document.addEventListener('DOMContentLoaded', function () {
    const carreraSelect = document.getElementById('carrera-select');
    const equiposContainer = document.getElementById('equipos-container');

    carreraSelect.addEventListener('change', function () {
        const carreraId = this.value;

        // Limpiar el contenedor de equipos
        equiposContainer.innerHTML = '';

        if (carreraId) {
            fetch(`/equipos?carrera_id=${carreraId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        data.forEach(equipo => {
                            // Crear un div que represente al equipo como un evento
                            const equipoDiv = document.createElement('div');
                            equipoDiv.classList.add('equipo');
                            equipoDiv.textContent = `${equipo.Titulo} - Aula: ${equipo.aula ? equipo.aula.Nombre_Aula : 'Sin asignar'}`;
                            equipoDiv.dataset.id = equipo.ID_Equipo; // Añadir ID del equipo como data attribute
                            equipoDiv.draggable = true; // Hacer el div arrastrable

                            // Agregar el div al contenedor de equipos
                            equiposContainer.appendChild(equipoDiv);

                            // Manejar el evento de arrastre
                            equipoDiv.addEventListener('dragstart', function (e) {
                                e.dataTransfer.setData('text/plain', JSON.stringify({
                                    id: equipo.ID_Equipo,
                                    title: equipo.Titulo,
                                    aula: equipo.aula ? equipo.aula.Nombre_Aula : 'Sin asignar'
                                }));
                            });
                        });
                    } else {
                        equiposContainer.textContent = 'No hay equipos para esta carrera.';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    equiposContainer.textContent = 'Error al cargar los equipos.';
                });
        }
    });
});
