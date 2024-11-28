<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    @vite(['resources/css/Vista_Principal/login.css'])

</head>

<body>
    <div class="login-card">

        <h2>Gestion de Examenes UNAN-LEON</h2>

        <form id="loginForm">

            <div class="input-group">
                <input type="text" id="usuario" required placeholder="Nombre de usuario">
            </div>

            <div class="input-group">
                <input type="password" id="password" required placeholder="••••••••">
            </div>

        </form>

        <form action="{{ url('/') }}" method="GET">
            <button type="submit" id="submitButton">Iniciar Sesion</button>
        </form>

    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loginCard = document.querySelector('.login-card');
            // Animate login card on load
            setTimeout(() => {
                loginCard.classList.add('visible');
            }, 100);
        });
    </script>

</body>
</html>