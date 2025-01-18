<style>
    .delete-button {
        width: 60px;
        height: 60px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s; /* Transición suave */
    }

    .delete-button:hover {
        background-color: rgb(240, 142, 142); /* Color de fondo al pasar el cursor */
    }

    .delete-button img {
        width: 100%;
        height: 100%;
    }
</style>

<div style="background-color: burlywood; padding: 21px;"> 

    <h2>Buscador</h2>

    <h3 style="margin: 0px">Area de conocimiento</h3>
    <select id="filtrar_Area_Equipo"></select>

    </p \n>
    <h3 style="margin: 0px">Departamento</h3>
    <select id="filtrar_Departamento_Equipo"></select>

    <div id="logoutButton" style="text-align: center; margin-top: 10px; margin-bottom: 20px">
        <button type="submit" class="button">
            <span class="label">Cerrar Sesión</span>
            <span class="gradient"></span>
            <span class="transition"></span>
        </button>
    </div>

</div>
