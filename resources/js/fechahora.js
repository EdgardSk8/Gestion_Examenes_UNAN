// flatpickr("#fecha_asignada", {
//     dateFormat: "Y-m-d", // Formato de fecha
//     minDate: "today", // Fecha mínima (hoy)
//     onChange: mostrarResultado
// });

// flatpickr("#hora_inicio", {
//     enableTime: true,
//     noCalendar: true,
//     dateFormat: "h:i K", // Formato 12 horas
//     minDate: "08:00",
//     maxDate: "17:00",
//     minuteIncrement: 30, // Incremento de minutos
//     onChange: mostrarResultado
// });

// flatpickr("#hora_fin", {
//     enableTime: true,
//     noCalendar: true,
//     dateFormat: "h:i K", // Formato 12 horas
//     minDate: "08:00",
//     maxDate: "17:00",
//     minuteIncrement: 30, // Incremento de minutos
//     onChange: mostrarResultado
// });

// // Función para convertir a formato de 24 horas
// function convertTo24HourFormat(timeStr) {
//     return moment(timeStr, "hh:mm A").format("HH:mm");
// }

// // Captura el evento de envío del formulario
// document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Evitar el envío del formulario

//     // Obtén las horas y conviértelas a 24 horas
//     const horaInicio = document.getElementById('hora_inicio').value;
//     const horaFin = document.getElementById('hora_fin').value;

//     // Convertir las horas
//     document.getElementById('hora_inicio').value = convertTo24HourFormat(horaInicio);
//     document.getElementById('hora_fin').value = convertTo24HourFormat(horaFin);

//     // Mostrar el resultado
//     mostrarResultado();
// });

// // Función para mostrar el resultado
// function mostrarResultado() {
//     const fechaStr = document.getElementById('fecha_asignada').value;
//     const horaInicioStr = document.getElementById('hora_inicio').value;
//     const horaFinStr = document.getElementById('hora_fin').value;

//     const aviso = document.getElementById('aviso'); // Asegúrate de tener un elemento con id "aviso"

//     if (fechaStr && horaInicioStr && horaFinStr) {
//         // Convertir la fecha a un objeto de fecha
//         const fecha = new Date(fechaStr);

//         // Definir los días de la semana y los meses en español
//         const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
//         const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

//         // Obtener el día de la semana, el día del mes y el año
//         const diaSemana = diasSemana[fecha.getDay()]; // Día de la semana
//         const diaDelMes = fecha.getDate(); // Día del mes
//         const mes = meses[fecha.getMonth()]; // Nombre del mes
//         const anio = fecha.getFullYear(); // Año

//         // Formatear las horas
//         const horaInicio = horaInicioStr; // Mantener el formato 24 horas
//         const horaFin = horaFinStr; // Mantener el formato 24 horas

//         // Validar que la hora de fin no sea antes ni igual que la de inicio
//         if (convertTo24HourFormat(horaFin) < convertTo24HourFormat(horaInicio)) {
//             aviso.innerText = "La hora de finalización no puede suceder antes de la hora de inicio.";
//         } else if (convertTo24HourFormat(horaFin) === convertTo24HourFormat(horaInicio)) {
//             aviso.innerText = "La hora de finalización no debe coincidir con la hora de inicio.";
//         } else {
//             aviso.innerText = ""; // Limpiar el aviso si todo está bien
//         }

//         // Mostrar el resultado en el <h2>
//         document.getElementById('resultado').innerHTML = `Fecha: ${diaSemana} ${diaDelMes} de ${mes} del ${anio}<br>Inicio: ${horaInicio}<br>Finalización: ${horaFin}`;
//     }
// }


// Configuración de Flatpickr
flatpickr("#fecha_asignada", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: mostrarResultado
});

flatpickr("#hora_inicio", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Mostrar en formato 12 horas para el usuario
    minTime: "08:00",
    maxTime: "17:00",
    minuteIncrement: 30,
    onChange: mostrarResultado
});

flatpickr("#hora_fin", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Mostrar en formato 12 horas para el usuario
    minTime: "08:00",
    maxTime: "17:00",
    minuteIncrement: 30,
    onChange: mostrarResultado
});

// Función para convertir a formato de 24 horas
function convertTo24HourFormat(timeStr) {
    return moment(timeStr, "hh:mm A").format("HH:mm");
}

// Función para mostrar el resultado en pantalla
function mostrarResultado() {
    const fechaStr = document.getElementById('fecha_asignada').value;
    const horaInicioStr = document.getElementById('hora_inicio').value;
    const horaFinStr = document.getElementById('hora_fin').value;
    const aviso = document.getElementById('aviso');

    if (fechaStr && horaInicioStr && horaFinStr) {
        const fecha = new Date(fechaStr);
        const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        
        const diaSemana = diasSemana[fecha.getDay()];
        const diaDelMes = fecha.getDate();
        const mes = meses[fecha.getMonth()];
        const anio = fecha.getFullYear();

        const horaInicio = convertTo24HourFormat(horaInicioStr);
        const horaFin = convertTo24HourFormat(horaFinStr);

        aviso.innerText = (horaFin <= horaInicio)
            ? "La hora de fin debe ser posterior a la hora de inicio."
            : "";

        document.getElementById('resultado').innerHTML = 
            `Fecha: ${diaSemana} ${diaDelMes} de ${mes} del ${anio}<br>Inicio: ${horaInicioStr}<br>Fin: ${horaFinStr}`;
    }
}

// Convertir a formato 24 horas antes de enviar
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío para poder realizar la conversión

    const horaInicioInput = document.getElementById('hora_inicio');
    const horaFinInput = document.getElementById('hora_fin');

    // Convierte a 24 horas y actualiza el valor del input
    horaInicioInput.value = convertTo24HourFormat(horaInicioInput.value);
    horaFinInput.value = convertTo24HourFormat(horaFinInput.value);

    // Aquí puedes proceder con el envío a la base de datos, ahora en formato 24 horas
    this.submit(); // Envía el formulario
});
