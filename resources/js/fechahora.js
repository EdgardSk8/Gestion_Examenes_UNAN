// Configuración de Flatpickr

//Agregar equipo
flatpickr("#fecha_asignada", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: mostrarResultadoAgregar
});

flatpickr("#hora_inicio", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Mostrar en formato 12 horas para el usuario
    minTime: "08:00",
    maxTime: "17:00",
    minuteIncrement: 30,
    onChange: mostrarResultadoAgregar
});

flatpickr("#hora_fin", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Mostrar en formato 12 horas para el usuario
    minTime: "08:00",
    maxTime: "17:00",
    minuteIncrement: 30,
    onChange: mostrarResultadoAgregar
});

// Función para convertir a formato de 24 horas
function convertTo24HourFormat(timeStr) {
    return moment(timeStr, "hh:mm A").format("HH:mm");
}

// Función para mostrar el resultado en pantalla
function mostrarResultadoAgregar() {
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

        document.getElementById('resultado').innerHTML = `
            Fecha: ${diaSemana} ${diaDelMes} de ${mes} del ${anio}<br>Inicio: ${horaInicioStr}<br>Fin: ${horaFinStr}`;
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

document.addEventListener('DOMContentLoaded', () => {mostrarResultadoEditar();});

function mostrarResultadoEditar() {

    horafechaeditar(); 

    const avisohora = document.getElementById('avisoeditarhora');
    const avisodia = document.getElementById('avisoeditardia');

    const fechaAsignada = document.getElementById('editarfecha_asignada').value;
    const fechaAprobada = document.getElementById('editarfecha_aprobada').value;
    const horaInicio = document.getElementById('editarhora_inicio').value;
    const horaFin = document.getElementById('editarhora_fin').value;

    avisohora.innerText = "";
    avisodia.innerHTML = "";

    // Validar fechas
    if (fechaAprobada && fechaAprobada < fechaAsignada) {avisodia.innerText = "La fecha aprobada no puede ser anterior a la fecha asignada.";return;}
    else{avisodia.innerHTML = "";}

    if(horaInicio && horaFin){
        // Validar horas
        if (horaInicio === horaFin) { avisohora.innerText = "La hora de inicio no puede ser igual a la hora de fin.";return;}
        if (horaFin < horaInicio) {avisohora.innerText = "La hora de fin debe ser posterior a la hora de inicio.";return;}
        else{avisohora.innerText = "";}
    }
}

function horafechaeditar(){

    //Editar equipo
    flatpickr("#editarfecha_asignada", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: mostrarResultadoEditar
    });

    flatpickr("#editarfecha_aprobada", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: mostrarResultadoEditar
    });

    flatpickr("#editarhora_inicio", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K", 
        minTime: "08:00",
        maxTime: "17:00",
        minuteIncrement: 30,
        onChange: mostrarResultadoEditar
    });

    flatpickr("#editarhora_fin", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        minTime: "08:00",
        maxTime: "17:00",
        minuteIncrement: 30,
        onChange: mostrarResultadoEditar
    });
}





