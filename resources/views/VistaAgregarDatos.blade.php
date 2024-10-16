<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    @vite(['resources/css/Vista_Secundaria/app.css']) <!-- archivo css y js -->
    @vite(['resources/css/Recursos/selectstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/btn.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/inputstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Recursos/btnstyle.css']) <!-- archivo css personalizado -->
    @vite(['resources/css/Vista_Secundaria/equipoagregar.css'])

    @vite(['resources/js/tables/area_conocimiento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/departamento.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/carreras.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/profesor.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/estudiante.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/edificio.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/aula.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/tipoexamen.js']) <!-- archivo js personalizado -->
    @vite(['resources/js/tables/localidad.js']) <!-- archivo js personalizado -->

    <style>
        .view {display: none;} /* Ocultar Vista  */
        .active {display: block; /*Mostrar Vista*/}
    </style>

</head>

<body>

    <div class="vista-principal-2">
        <div class="mostrar-vistas"> <!-- Aquí se cargarán las vistas -->
            
            <div id="view-area-conocimiento" class="view active">@include('vistas-equipoagregar.agregardatos.radio-area-conocimiento')</div>
            <div id="view-departamento" class="view"> @include('vistas-equipoagregar.agregardatos.radio-departamento')</div>
            <div id="view-carrera" class="view">@include('vistas-equipoagregar.agregardatos.radio-carrera')</div>
            <div id="view-estudiante" class="view"> @include('vistas-equipoagregar.agregardatos.radio-estudiante')</div>
            <div id="view-profesor" class="view"> @include('vistas-equipoagregar.agregardatos.radio-profesor')</div>
            <div id="view-localidades" class="view">@include('vistas-equipoagregar.agregardatos.radio-localidades')</div>
            <div id="view-edificio" class="view">@include('vistas-equipoagregar.agregardatos.radio-edificio')</div>
            <div id="view-aula" class="view">@include('vistas-equipoagregar.agregardatos.radio-aula')</div>
            <div id="view-tipo-examen" class="view">@include('vistas-equipoagregar.agregardatos.radio-tipo-examen')</div>
            <div id="view-rol" class="view">@include('vistas-equipoagregar.agregardatos.radio-rol')</div>
            <div id="view-perfil" class="view">@include('vistas-equipoagregar.agregardatos.radio-perfil')</div>

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
    </script>
    
</body>
</html>
