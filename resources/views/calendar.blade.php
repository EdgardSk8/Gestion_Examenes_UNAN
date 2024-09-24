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
    @vite(['resources/css/inputstyle.css']) <!-- archivo css personalizado -->

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
         <!-- Obtenido de fullcalendar.css -->

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

                <div class="botones-agregar" style="display: none;">

                    <div class="radio-inputs">

                        <label class="radio">
                          <input id="radio-agregar-equipo" type="radio" name="radio" checked="">
                          <span class="name">Agregar Equipo</span>
                        </label>

                        <label class="radio">
                          <input id="radio-agregar-datos" type="radio" name="radio">
                          <span class="name">Agregar Nuevos Datos</span>
                        </label>

                    </div>

                </div>

                <div class="btn-agregar-datos" style="margin-top: 30px">

                    <div class="radio-inputs" style="flex-direction: column">

                        <label class="radio">
                            <input id="radio-area-conocimiento" type="radio" name="radio-area" checked="">
                            <span class="name">Área de Conocimiento</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-departamento" type="radio" name="radio-area">
                            <span class="name">Departamento</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-carrera" type="radio" name="radio-area">
                            <span class="name">Carrera</span>
                        </label>

                        <label class="radio">
                            <input id="radio-estudiante" type="radio" name="radio-area">
                            <span class="name">Estudiante</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-profesor" type="radio" name="radio-area">
                            <span class="name">Profesor</span>
                        </label>

                        <label class="radio">
                            <input id="radio-localidades" type="radio" name="radio-area">
                            <span class="name">Localidad</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-edificio" type="radio" name="radio-area">
                            <span class="name">Edificio</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-aula" type="radio" name="radio-area">
                            <span class="name">Aula</span>
                        </label>
                
                        <label class="radio">
                            <input id="radio-tipo-examen" type="radio" name="radio-area">
                            <span class="name">Tipo de Examen</span>
                        </label>

                        <label class="radio">
                            <input id="radio-rol" type="radio" name="radio-area">
                            <span class="name">Rol</span>
                        </label>

                        <label class="radio">
                            <input id="radio-perfil" type="radio" name="radio-area">
                            <span class="name">Perfil</span>
                        </label>
                
                    </div>
                
                </div>

               
            
            
        </div>
    </div>

</body>

</html>
