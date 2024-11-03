flatpickr("#fecha_asignada", {
    dateFormat: "Y-m-d", // Formato de fecha
    minDate: "today" // Fecha mínima (hoy)
});

flatpickr("#hora_inicio", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Formato 12 horas
    minDate: "08:00",
    maxDate: "17:00",
    minuteIncrement: 30, // Incremento de minutos
    onChange: function(selectedDates, dateStr, instance) {
        if (instance.config.minDate && dateStr < instance.config.minDate) {
            instance.clear(); // Limpiar si está fuera de rango
            alert("Por favor selecciona una hora entre 08:00 AM y 05:00 PM.");
        }
    }
});

flatpickr("#hora_fin", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Formato 12 horas
    minDate: "08:00",
    maxDate: "17:00",
    minuteIncrement: 30, // Incremento de minutos
    onChange: function(selectedDates, dateStr, instance) {
        if (instance.config.minDate && dateStr < instance.config.minDate) {
            instance.clear(); // Limpiar si está fuera de rango
            alert("Por favor selecciona una hora entre 08:00 AM y 05:00 PM.");
        }
    }
});

// Función para convertir a formato de 24 horas
function convertTo24HourFormat(timeStr) {
    return moment(timeStr, "hh:mm A").format("HH:mm");
}

// Captura el evento de envío del formulario
document.querySelector('form').addEventListener('submit', function(event) {
    // Obtén las horas y conviértelas a 24 horas
    const horaInicio = document.getElementById('hora_inicio').value;
    const horaFin = document.getElementById('hora_fin').value;

    // Convertir las horas
    document.getElementById('hora_inicio').value = convertTo24HourFormat(horaInicio);
    document.getElementById('hora_fin').value = convertTo24HourFormat(horaFin);
});