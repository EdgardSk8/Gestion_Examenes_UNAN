<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calendario</title>

    <!-- Importaciones de archivos css y javascript  -->

    @vite(['resources/css/app.css', 'resources/js/app.js']) <!-- archivo css y js -->
    @vite(['resources/css/fullcalendar.css']) <!-- archivo css fullcalendar -->
    @vite(['resources/css/selectstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/equipos.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/btn.css']) <!-- archivo css personalizado -->

    @vite(['resources/js/fullcalendar.js']) <!-- js del fullcalendar -->
    @vite(['resources/js/tables/area_conocimiento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/departamento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/carreras.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/equipo.js']) <!-- archivo js personalizado -->

    <!-- Importaciones de archivos css y javascript -->

    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- Token CSRF para proteger solicitudes no autorizadas -->

</head>

<!--
php artisan optimize:clear
-->

<body>

    <div id='calendar-container'> <!-- Obtenido de fullcalendar.css -->
        <div id='calendar'></div> <!-- Obtenido de fullcalendar.css -->

        <div id='equipos-list' style="border: 1px solid #000000;"> <!-- Obtenido de equipos.css -->

                <div style="margin: 5px">
                    <button id="equipos-btn" class="btn">Equipos</button> <!-- Obtenido de equipos.css -->
                    <button id="detalles-btn" class="btn">Detalles</button> <!-- Obtenido de equipos.css -->
                    <button id="agregar-btn" class="btn">Agregar</button> <!-- Obtenido de equipos.css -->
                </div>

                <!-- Contenedores para las diferentes vistas -->

                <div id="vista-equipos" class="vista" style="display: none">

                    <label>Áreas de Conocimiento</label>
                    <select id="area-select">
                        <!-- Area -->
                    </select>

                    <label>Departamento:</label>
                    <select id="departamento-select">
                        <!-- Departamentos -->
                    </select>

                    <label>Carrera:</label>
                    <select id="carrera-select">
                        <!-- Carreras -->
                    </select>

                    <label for="equipo-container">Equipos:</label>
                    <div id="equipos-container">
                        <!-- Equipos -->
                    </div>
                    
                </div>

                <div id="vista-detalles" class="vista" style="display: none"> <!-- mover el style al div que desea mostrar al cargar la pagina -->
                    <label>Detalles de Equipos</label>
                    @include('cuadro-equipos.equipodetalle') <!-- /views/cuadro-equipos/equipodetalle.blade.php -->
                </div>

                <div id="vista-agregar" class="vista" >
                    @include('cuadro-equipos.equipoagregar') <!-- /views/cuadro-equipos/equipodetalle.blade.php -->
                </div>

            
            
        </div>
    </div>

</body>

</html>
