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

    @vite(['resources/css/Vista_Secundaria/equipoagregar.css'])



</head>

<body>

    <div class="vista-principal-2"> <!-- Obtenido de fullcalendar.css -->
        

        <div class="mostrar-vistas">


        </div>

        <div class="lista-vista"> <!-- Obtenido de equipos.css -->

                <div class="radio-inputs" style="margin-top: 0px">

                    <label class="radio">
                        <input type="radio" id="radio-area-conocimiento" name="radio-agregardatos" checked>
                        <span class="name">Área de Conocimiento</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-departamento" name="radio-agregardatos">
                        <span class="name">Departamento</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-carrera" name="radio-agregardatos">
                        <span class="name">Carrera</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-estudiante" name="radio-agregardatos">
                        <span class="name">Estudiante</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-profesor" name="radio-agregardatos">
                        <span class="name">Profesor</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-localidades" name="radio-agregardatos">
                        <span class="name">Localidad</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-edificio" name="radio-agregardatos">
                        <span class="name">Edificio</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-aula" name="radio-agregardatos">
                        <span class="name">Aula</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-tipo-examen" name="radio-agregardatos">
                        <span class="name">Tipo de Examen</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-rol" name="radio-agregardatos">
                        <span class="name">Rol</span>
                    </label>
                    <label class="radio">
                        <input type="radio" id="radio-perfil" name="radio-agregardatos">
                        <span class="name">Perfil</span>
                    </label>
                </div> 
            
        </div>
    </div>
    @if (session('success'))
    <script>
        window.onload = function() {
            alert("{{ session('success') }}");
        };
    </script>
@endif
    

</body>

</html>

<script>
    
   

    document.addEventListener('DOMContentLoaded', function() {
    const mostrarVistas = document.querySelector('.mostrar-vistas');

    // Función para cargar la vista
    function cargarVista(url) {
        // Realiza la petición fetch para obtener la vista
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                mostrarVistas.innerHTML = data; // Inserta la vista en el contenedor
            })
            .catch(error => {
                console.error('Hubo un problema con la petición Fetch:', error);
                mostrarVistas.innerHTML = '<p>Error al cargar la vista.</p>';
            });
    }

    // Muestra la vista correspondiente al botón de radio seleccionado
    function mostrarVista() {
        if (document.getElementById('radio-area-conocimiento').checked) {
            cargarVista('/vista-area-conocimiento');
        } else if (document.getElementById('radio-departamento').checked) {
            cargarVista('/vista-departamento');
        } else if (document.getElementById('radio-carrera').checked) {
            cargarVista('/vista-carrera');
        } else if (document.getElementById('radio-estudiante').checked) {
            cargarVista('/vista-estudiante');
        } else if (document.getElementById('radio-profesor').checked) {
            cargarVista('/vista-profesor');
        } else if (document.getElementById('radio-localidades').checked) {
            cargarVista('/vista-localidades');
        } else if (document.getElementById('radio-edificio').checked) {
            cargarVista('/vista-edificio');
        } else if (document.getElementById('radio-aula').checked) {
            cargarVista('/vista-aula');
        } else if (document.getElementById('radio-tipo-examen').checked) {
            cargarVista('/vista-tipo-examen');
        } else if (document.getElementById('radio-rol').checked) {
            cargarVista('/vista-rol');
        } else if (document.getElementById('radio-perfil').checked) {
            cargarVista('/vista-perfil');
        }
    }

    // Asigna el evento change a cada botón de radio
    document.querySelectorAll('input[name="radio-agregardatos"]').forEach(radio => {
        radio.addEventListener('change', mostrarVista);
    });

    // Muestra la vista inicial al cargar la página
    mostrarVista();
});

</script>