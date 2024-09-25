@vite(['resources/css/equipoagregar.css'])

<div class="contenedor-agregar"> <!-- Contenedor Principal -->
    <div id="agregar-equipo"> <!-- Mostrará la vista para agregar equipos -->
        @include('vistas-equipoagregar.agregarequipo')
    </div>

    <div id="agregar-datos"> 
        <!-- Las vistas se cargarán aquí dinámicamente -->
    </div> <!-- Mostrará la vista para agregar nuevos datos a la base de datos -->
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Obtener referencias a los elementos necesarios
        const radios = document.querySelectorAll('input[type="radio"]'); // Obtener todos los radio-buttons
        const agregarEquipoDiv = document.getElementById('agregar-equipo'); 
        const agregarDatosDiv = document.getElementById('agregar-datos');
        const btnAgregarDatos = document.querySelector('.btn-agregar-datos'); // Botón de agregar datos

        // Función para cargar una vista mediante AJAX
        function cargarVista(url) {
            fetch(url) // Hacer una solicitud AJAX al servidor
                .then(response => response.text()) // Convertir la respuesta en texto (HTML)
                .then(html => {
                    agregarDatosDiv.innerHTML = html; // Insertar la vista en el div agregar-datos
                })
                .catch(error => console.error('Error al cargar la vista:', error)); // Manejar errores
        }

        // Función para mostrar u ocultar las vistas basadas en el radio-button seleccionado
        function actualizarVista() {
            if (document.getElementById('radio-agregar-equipo').checked) {
                agregarEquipoDiv.style.display = 'block'; // Mostrar vista de equipo
                agregarDatosDiv.innerHTML = ''; // Limpiar contenido de agregar-datos
                agregarDatosDiv.style.display = 'none'; // Ocultar vista de datos
                btnAgregarDatos.style.display = 'none'; // Ocultar botón de agregar datos
            } else {
                agregarEquipoDiv.style.display = 'none'; // Ocultar vista de equipo
                agregarDatosDiv.style.display = 'block'; // Mostrar vista de datos
                btnAgregarDatos.style.display = 'block'; // Mostrar botón de agregar datos

                // Cargar la vista correspondiente según el radio-button seleccionado
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
        }

        // Escuchar los cambios en los radio-buttons y actualizar la vista cuando cambien
        radios.forEach(function(radio) {
            radio.addEventListener('change', actualizarVista);
        });

        // Llamar a la función una vez para establecer la vista inicial al cargar la página
        actualizarVista();
    });
</script>
