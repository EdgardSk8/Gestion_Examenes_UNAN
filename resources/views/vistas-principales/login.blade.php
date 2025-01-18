<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @vite(['resources/css/Vista_Principal/login.css'])
    @vite(['resources/js/login.js'])
</head>

<body>
    <div class="login-card">

        <h2>Gestión de Exámenes UNAN-León</h2>

        <form id="loginForm">
            <!-- Selector de roles -->
            <div>
                <select class="select-group" id="usuario" required>
                    <option value="" disabled selected>Selecciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="secretario">Secretario</option>
                    <option value="profesor">Profesor</option>
                </select>
                <span id="roleError" class="error-message" style="display: none; color: red;">Selecciona un rol.</span>
            </div>

            <!-- Campo de contraseña -->
            <div class="input-group">
                <input type="password" id="password" required placeholder="••••••••">
                <span id="passwordError" class="error-message" style="display: none; color: red;">Introduce tu contraseña.</span>
            </div>

            <!-- Botón de inicio de sesión -->
            <button id="submitButton" type="button">Iniciar Sesión</button>
        </form>

        <script>
            const loginCard = document.querySelector('.login-card');
            setTimeout(() => {loginCard.classList.add('visible');}, 100);
        </script>

    </div>

</body>
</html>
