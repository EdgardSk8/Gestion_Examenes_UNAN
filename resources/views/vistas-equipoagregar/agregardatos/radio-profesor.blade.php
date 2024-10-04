<div class="agregar-Profesor">

    <h2 style="text-align: center">Agregar Profesor</h2>

    <form action="" method="POST">
        @csrf

        <div>
            <label for="area-select-add">Área de Conocimiento:</label>
            <select id="area-select-add" name="ID_Area_Conocimiento" class="area-select" required>
            </select>
        </div>

        <div>
            <label for="departamento-select-add">Departamento:</label>
            <select id="departamento-select-add" name="ID_Departamento" class="departamento-select" required>
            </select>
        </div>

        <div>
            <label for="Nombre">Nombre Completo:</label>
            <input type="text" id="Nombre" name="Nombre_Completo" required>
        </div>

        <div>
            <label for="Correo">Correo:</label>
            <input type="email" id="Correo" name="Correo" required>
        </div>

        <div>
            <label for="Contrasenia">Contraseña:</label>
            <input type="password" id="Contrasenia" name="Contrasenia" required>
        </div>

        <div>
            <label for="perfil-select-add">Perfil:</label>
            <select id="perfil-select-add" name="ID_Perfil" class="perfil-select" required>
            </select>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>

    <h1>Sin Funcionalidad</h1>

</div>
