<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Agregar</title>

    @vite(['resources/css/Vista_Secundaria/app.css']) <!-- archivo css y js -->
    @vite(['resources/css/Recursos/selectstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/btn.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/inputstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/btnstyle.css']) <!-- archivo css personalizado -->
    
    @vite(['resources/css/Vista_Secundaria/equipoagregar.css'])
    @vite(['resources/css/Vista_Secundaria/vista-agregardatos.css'])
    @vite(['resources/css/Vista_Secundaria/acciones.css'])
    @vite(['resources/css/Vista_Secundaria/tabladatos.css'])
    @vite(['resources/js/fechahora.js']) <!-- logica de fecha y hora con Flatpickr -->

    <!-- Libreria DataTables -->
    <link href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>

    <!-- Libreria DataTables -->

    <style>
        .view {display: none;} /* Ocultar Vista  */
        .active {display: block; /*Mostrar Vista*/}
        body {visibility: hidden;}
    </style>

    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>

<body>

    <div class="vista-principal-2">
        <div class="mostrar-vistas"> <!-- Aquí se cargarán las vistas -->
            
            <div id="view-area-conocimiento" class="view active">@include('vistas-equipoagregar.vistas-dinamicas.radio-area-conocimiento')</div>
            <div id="view-departamento" class="view"> @include('vistas-equipoagregar.vistas-dinamicas.radio-departamento')</div>
            <div id="view-carrera" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-carrera')</div>
            <div id="view-estudiante" class="view"> @include('vistas-equipoagregar.vistas-dinamicas.radio-estudiante')</div>
            <div id="view-profesor" class="view"> @include('vistas-equipoagregar.vistas-dinamicas.radio-profesor')</div>
            <div id="view-localidades" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-localidades')</div>
            <div id="view-edificio" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-edificio')</div>
            <div id="view-aula" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-aula')</div>
            <div id="view-tipo-examen" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-tipo-examen')</div>
            <div id="view-rol" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-rol')</div>
            <div id="view-perfil" class="view">@include('vistas-equipoagregar.vistas-dinamicas.radio-perfil')</div>

        </div>

        <div class="lista-vista">

            <div class="radio-inputs">

                <label class="radio">
                    <input type="radio" id="radio-area-conocimiento" name="radio-agregardatos" checked onclick="mostrar('view-area-conocimiento')">
                    <span class="name">Área de Conocimiento</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-departamento" name="radio-agregardatos" onclick="mostrar('view-departamento')">
                    <span class="name">Departamento</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-carrera" name="radio-agregardatos" onclick="mostrar('view-carrera')">
                    <span class="name">Carrera</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-estudiante" name="radio-agregardatos" onclick="mostrar('view-estudiante')">
                    <span class="name">Estudiante</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-profesor" name="radio-agregardatos" onclick="mostrar('view-profesor')">
                    <span class="name">Profesor</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-localidades" name="radio-agregardatos" onclick="mostrar('view-localidades')">
                    <span class="name">Localidad</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-edificio" name="radio-agregardatos" onclick="mostrar('view-edificio')">
                    <span class="name">Edificio</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-aula" name="radio-agregardatos" onclick="mostrar('view-aula')">
                    <span class="name">Aula</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-tipo-examen" name="radio-agregardatos" onclick="mostrar('view-tipo-examen')">
                    <span class="name">Tipo de Examen</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-rol" name="radio-agregardatos" onclick="mostrar('view-rol')">
                    <span class="name">Rol</span>
                </label>

                <label class="radio">
                    <input type="radio" id="radio-perfil" name="radio-agregardatos" onclick="mostrar('view-perfil')">
                    <span class="name">Perfil</span>
                </label>

            </div> 

            <form action="{{ url('/') }}" method="GET">
                <div style="text-align: center; margin-top: 10px; margin-bottom: 20px">
                    <button type="submit" class="button">
                        <span class="label">Cerrar Sesion</span>
                        <span class="gradient"></span>
                        <span class="transition"></span>
                    </button>
                </div>
            </form>

        </div>
    </div>

    @if (session('success'))
    <script>
        window.onload = function() {
            alert("{{ session('success') }}");
        };
    </script>
    @endif

    <script>
        function mostrar(viewId) {
            const views = document.querySelectorAll('.view');
    
            views.forEach(view => {
                const selectores = view.querySelectorAll('select');
                selectores.forEach(select => {
                    select.disabled = true; // Deshabilitar selectores de la vista oculta
                });
                view.classList.remove('active');
            });
    
            const activeView = document.getElementById(viewId);
            activeView.classList.add('active');
    
            // Habilitar selectores solo en la vista activa
            const activeSelectores = activeView.querySelectorAll('select');
            activeSelectores.forEach(select => {
                select.disabled = false; // Habilitar selectores de la vista activa
            });
        }

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
            document.body.style.visibility = 'none';
            alert('No disponible');
            window.location.href = '/login';
        },
        profesor: () => {
            console.log('El usuario es Profesor');
            document.body.style.visibility = 'none';
            alert('No disponible');
            window.location.href = '/login';
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

    </script>
    
</body>
</html>
