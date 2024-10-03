<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calendario</title>

    <!-- Importaciones de archivos css y javascript  -->

    @vite(['resources/css/Vista_Principal/app.css', 'resources/js/app.js']) <!-- archivo css y js -->
    @vite(['resources/css/Vista_Principal/fullcalendar.css']) <!-- archivo css fullcalendar -->
    @vite(['resources/css/Vista_Principal/equipos.css']) <!-- archivo css personalizado -->

    @vite(['resources/css/Recursos/btn.css']) <!-- archivo de recursos css personalizado -->
    @vite(['resources/css/Recursos/selectstyle.css']) <!-- archivo de recursos css personalizado -->
    @vite(['resources/css/Recursos/inputstyle.css']) <!-- archivo de recursos css personalizado -->

    @vite(['resources/js/fullcalendar.js']) <!-- js del fullcalendar -->
    @vite(['resources/js/tables/area_conocimiento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/departamento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/carreras.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/profesor.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/estudiante.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/edificio.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/aula.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/tipoexamen.js']) <!-- archivo js personalizado -->


    @vite(['resources/js/agregar/agregarequipo.js']) <!-- archivo js personalizado -->

    <!-- Importaciones de archivos css y javascript -->

    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- Token CSRF para proteger solicitudes no autorizadas -->

</head>

    <!--
        
    php artisan optimize:clear

    git add .
    git commit -m "Cambios realizados"
    git push

    -->

<body>

    <div id='calendar-container'> <!-- Obtenido de fullcalendar.css -->

        <div id="vista-agregar" class="vista" style="display: none" >
            @include('cuadro-equipos.equipoagregar') <!-- /views/cuadro-equipos/equipodetalle.blade.php -->
        </div>

        <div id='calendar' class="vista-principal"></div>

        <div id='equipos-list'> <!-- Obtenido de equipos.css -->

            <div style="display: flex; width: 100%; gap: 1px">
                <button id="equipos-btn" class="btn" style="flex: 2;">Equipos</button> <!-- Obtenido de equipos.css -->
                <button id="detalles-btn" class="btn" style="flex: 3;">Detalles</button> <!-- Obtenido de equipos.css -->
                <button id="agregar-btn" class="btn" style="flex: 2;">Agregar</button> <!-- Obtenido de equipos.css -->
            </div>

            <!-- Contenedores para las diferentes vistas -->

            <div id="vista-equipos" class="vista" style="display: none">
                @include('cuadro-equipos.equipo')
            </div>

            <div id="vista-detalles" class="vista" > <!-- mover el style al div que desea mostrar al cargar la pagina -->
                 @include('cuadro-equipos.equipodetalle') <!-- /views/cuadro-equipos/equipodetalle.blade.php -->
            </div>

            <div style="margin-top: 10px"> 
                
                <h2>Agregar Nuevos Datos</h2>
                    
                <div style="margin-top: 10px; text-align: center;">
                    <input type="text" placeholder="Nombre de Usuario" style="padding: 0.5em; width: 80%; margin-bottom: 10px;">
                    <input type="password" placeholder="Contraseña" style="padding: 0.5em; width: 80%;">
                </div>

                <!-- Nueva Vista -->
                <form action="{{ route('VistaAgregarDatos') }}" method="GET">
                    <div style="text-align: center; margin-top: 10px; margin-bottom: 20px">
                        <button type="submit" class="button">
                            <span class="label">Iniciar Sesion</span>
                            <span class="gradient"></span>
                            <span class="transition"></span>
                        </button>
                    </div>
                </form>
                    
            </div>
        </div>
    </div>

</body>

</html>
