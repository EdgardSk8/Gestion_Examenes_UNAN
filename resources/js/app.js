//Script para mostrar las vistas de los botones en calendar.blade.php
document.addEventListener('DOMContentLoaded', function() {

    // Asignar eventos a los botones
    document.getElementById('equipos-btn').addEventListener('click', function() {
        mostrarVista('vista-equipos');
        mostrarCalendar();
        ocultarlogin();
    });

    document.getElementById('detalles-btn').addEventListener('click', function() {
        mostrarVista('vista-detalles');
        mostrarCalendar();
        ocultarlogin();
    });

    document.getElementById('agregar-btn').addEventListener('click', function() {
        mostrarVista('vista-agregar');
        ocultarCalendar();
        if(localStorage.getItem('role') !== 'secretario') {  // No mostrar login si es secretario
            mostrarlogin();
        }
    });

    document.getElementById('editar-evento').addEventListener('click', function() {
        mostrarVista('vista-editar-equipo');
        ocultarCalendar();
        if(localStorage.getItem('role') !== 'secretario') {  // No mostrar login si es secretario
            mostrarlogin();
        }
    });

    // Función para mostrar la vista seleccionada y ocultar las demás
    function mostrarVista(vistaId) {document.querySelectorAll('.vista').forEach(function(vista) {
        vista.style.display = 'none'; });// Ocultar todas las vistas
        document.getElementById(vistaId).style.display = 'block'; }// Mostrar la vista seleccionada

    function ocultarCalendar() {document.getElementById('calendar').style.display = 'none';}
    function mostrarCalendar() {document.getElementById('calendar').style.display = 'block';}
    function ocultarlogin() {document.getElementById('nuevodatos').style.display = 'none';}
    function mostrarlogin() {document.getElementById('nuevodatos').style.display = 'block';}

    const logoutButton = document.getElementById('logoutButton');
    const divagregar = document.getElementById('agregar-btn');
    const btneliminar = document.getElementById('eliminar-evento');
    const btneditar = document.getElementById('editar-evento');

    // Evento de logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('role');
        alert('Has cerrado sesión.');
        window.location.href = '/login';
    });

    // Comprobar el valor de 'role' en localStorage
    const storedRole = localStorage.getItem('role');

    // Definir los comportamientos para cada rol
    const roleActions = {
        admin: () => {
            console.log('El usuario es Administrador');
            document.body.style.visibility = 'visible';
        },
        secretario: () => {
            console.log('El usuario es Secretario');
            document.body.style.visibility = 'visible';
        },
        profesor: () => {
            console.log('El usuario es Profesor');
            document.body.style.visibility = 'visible';
            divagregar.style.display = 'none';
            btneliminar.style.display = 'none';
            btneditar.style.display = 'none';
        },
        default: () => {
            alert('El usuario no está logueado');
            window.location.href = '/login';
        }
    };

    // Ejecutar la acción correspondiente según el rol
    if (roleActions[storedRole]) {
        roleActions[storedRole]();
    } else {
        roleActions.default();
    }

    // Función para manejar el tiempo de inactividad y redirigir al login
    let inactivityTimer;

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            alert('Has estado inactivo por mucho tiempo. Redirigiendo al login...');
            localStorage.removeItem('role'); // Eliminar rol de localStorage
            window.location.href = '/login'; // Redirigir al login
        }, 10 * 60 * 1000); // 10 minutos en milisegundos
    };

    // Detectar actividad del usuario para reiniciar el temporizador de inactividad
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);

    // Iniciar el temporizador de inactividad cuando se carga la página
    resetInactivityTimer();

});



