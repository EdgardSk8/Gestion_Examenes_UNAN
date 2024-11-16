<!-- resources/views/vistas-equipoagregar/agregardatos/radio-perfil.blade.php -->


<div class="agregar-perfil">

    <h2 style="text-align: center">Agregar Perfil</h2>

    <form action="{{ route('perfil.agregar') }}" method="POST"> <!-- El formulario envía datos a la ruta 'rol/agregar' -->
        
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Nombre del Perfil</label>
            <input type="text" id="Perfil" name="Nombre" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

</div>

<!-- Agregar Perfil funciona correctamente -->
<!-- Revisar mensaje usando ventanas dinamicas -->
