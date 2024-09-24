@vite(['resources/css/equipoagregar.css'])

<div class="contenedor-agregar"> <!-- Contenedor Principal -->
    <div id="agregar-equipo"> <!-- Mostrará la vista para agregar equipos -->
        @include('vistas-equipoagregar.agregarequipo')
    </div>

    <div id="agregar-datos"> <!-- Mostrará la vista para agregar nuevos datos a la base de datos -->
        @include('vistas-equipoagregar.agregardatos')
    </div>
</div>


<script>
    document.addEventListener('DOMContentLoaded', function () {

        const radioAgregarEquipo = document.getElementById('radio-agregar-equipo');
        const radioAgregarDatos = document.getElementById('radio-agregar-datos');
        const agregarEquipoDiv = document.getElementById('agregar-equipo');
        const agregarDatosDiv = document.getElementById('agregar-datos');

        // Función para ocultar los botones 
        function ocultarAgregardatos() {
            document.querySelector('.btn-agregar-datos').style.display = 'none';  // Ocultar los "botones" de agregar
        }

        function mostrarAgregardatos() {
            document.querySelector('.btn-agregar-datos').style.display = 'block';  // Mostrar los "botones" de agregar
        }

        // Función para mostrar la vista correspondiente dependiendo del radio-button seleccionado
        function mostrarVista() {
            if (radioAgregarEquipo.checked) {
                agregarEquipoDiv.style.display = 'block';
                agregarDatosDiv.style.display = 'none';
                ocultarAgregardatos();
            } else if (radioAgregarDatos.checked) {
                agregarEquipoDiv.style.display = 'none';
                agregarDatosDiv.style.display = 'block';
                mostrarAgregardatos();
            }
        }

        // Ejecutar al cargar la página
        mostrarVista();

        // Cambiar la vista cuando se selecciona un radio-button
        radioAgregarEquipo.addEventListener('change', mostrarVista);
        radioAgregarDatos.addEventListener('change', mostrarVista);

    });
</script>
