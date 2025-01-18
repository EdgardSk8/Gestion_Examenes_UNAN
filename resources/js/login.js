document.addEventListener('DOMContentLoaded', function () {
    const usuario = document.getElementById('usuario');
    const password = document.getElementById('password');
    const roleError = document.getElementById('roleError');
    const passwordError = document.getElementById('passwordError');
    const submitButton = document.getElementById('submitButton');

    // Datos locales simulados
    const users = {
        admin: '123',
        secretario: '123',
        profesor: '123'
    };

    // Verificar si ya existe un rol guardado en localStorage
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
        window.location.href = `/`; // Redirige automáticamente al dashboard del rol almacenado
    }

    // Manejar el evento de clic en el botón de inicio de sesión
    submitButton.addEventListener('click', () => {
        // Validar campos
        let isValid = true;

        if (!usuario.value) {
            roleError.style.display = 'block';
            isValid = false;
        } else {
            roleError.style.display = 'none';
        }

        if (!password.value.trim()) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (!isValid) return;

        // Verificar credenciales localmente
        const selectedRole = usuario.value;
        const enteredPassword = password.value;

        if (users[selectedRole] === enteredPassword) {
            // Almacenar el rol en localStorage
            localStorage.setItem('role', selectedRole);
            // Simular redirección según el rol
            switch (selectedRole) {
                case 'admin':
                    window.location.href = '/';
                    break;
                case 'secretario':
                    window.location.href = '/';
                    break;
                case 'profesor':
                    window.location.href = '/';
                    break;
            }
        } else {
            alert('Credenciales inválidas. Inténtalo nuevamente.');
        }
    });

   
});
