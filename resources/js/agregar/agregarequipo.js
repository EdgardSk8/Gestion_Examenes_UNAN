document.addEventListener('DOMContentLoaded', function () {
    // Obtener el formulario
    const equipoForm = document.getElementById('equipo-form');

    equipoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto de enviar el formulario

        // Recopilar los datos del formulario
        const formData = {
            Titulo: document.getElementById('titulo').value,
            Integrante1: document.getElementById('integrante1').value,
            Integrante2: document.getElementById('integrante2').value || null,
            Integrante3: document.getElementById('integrante3').value || null,
            Fecha_Asignada: document.getElementById('fecha_asignada').value,
            Hora_Inicio: document.getElementById('hora_inicio').value,
            Hora_Fin: document.getElementById('hora_fin').value,
            ID_Aula: document.getElementById('aula').value,
            ID_Tipo_Examen: document.getElementById('tipoexamen').value,
            Tutor_ID: document.getElementById('tutor').value,
            Juez1_ID: document.getElementById('juez1').value || null,
            Juez2_ID: document.getElementById('juez2').value || null,
            Juez3_ID: document.getElementById('juez3').value || null,
            //ID_Carrera: document.getElementById('carrera-select').value,
            ID_Area_Conocimiento: document.getElementById('area-select').value, // Añadido
            ID_Departamento: document.getElementById('departamento-select').value // Añadido
        };

        // Enviar los datos al servidor usando fetch
        fetch('/equipo/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            // Manejar respuesta exitosa
            alert('Equipo creado correctamente');
            // Limpiar el formulario
            equipoForm.reset(); 
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
            alert('Hubo un error al crear el equipo');
        });
    });
});
