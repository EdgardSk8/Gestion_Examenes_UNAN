<!-- resources/views/vistas-equipoagregar/agregardatos/radio-tipo-examen.blade.php -->


<div class="agregar-tipoexamen">

    <h2 style="text-align: center">Agregar Tipo de Examen</h2>

    <form action="{{ route('tipoexamen.agregar') }}" method="POST"> <!-- El formulario envía datos a la ruta 'tipoexamen/agregar' -->
        
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Tipo de Examen:</label>
            <input type="text" id="TipoExamen" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

</div>

<!-- Agregar Tipo Examen funciona correctamente -->
<!-- Revisar mensaje usando ventanas dinamicas -->
