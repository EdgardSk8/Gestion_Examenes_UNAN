
@vite(['resources/css/equipoagregar.css'])

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

<div class="contenedor-agregar"> <!-- Contendor Principal -->

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

        function mostrarVista() { // Función para alternar entre las vistas
            if (radioAgregarEquipo.checked) {
                agregarEquipoDiv.style.display = 'block';
                agregarDatosDiv.style.display = 'none';
            } else if (radioAgregarDatos.checked) {
                agregarEquipoDiv.style.display = 'none';
                agregarDatosDiv.style.display = 'block';
            }
        }
        mostrarVista();// Ejecutar al cargar la página

        // Cambiar la vista cuando se selecciona un radio
        radioAgregarEquipo.addEventListener('change', mostrarVista);
        radioAgregarDatos.addEventListener('change', mostrarVista);
    });

</script>

