// Configuración de Flatpickr
flatpickr("#fecha_asignada", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: mostrarResultado
});

flatpickr("#editarfecha_asignada", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: mostrarResultado
});

flatpickr("#editarfecha_aprobada", {
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

flatpickr("#editarhora_inicio", {
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

flatpickr("#editarhora_fin", {
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
