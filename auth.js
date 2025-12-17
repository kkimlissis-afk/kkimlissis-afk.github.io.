document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('auth-form');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    // Функции валидации
    function validateLogin() {
        const login = loginInput.value.trim();
        
        if (login.length === 0) {
            loginError.textContent = 'Логин обязателен для заполнения';
            loginInput.classList.add('error');
            loginInput.classList.remove('valid');
            return false;
        }
        
        if (login.length < 3) {
            loginError.textContent = 'Логин должен содержать минимум 3 символа';
            loginInput.classList.add('error');
            loginInput.classList.remove('valid');
            return false;
        }
        
        // Можно добавить проверку на разрешенные символы
        const loginRegex = /^[a-zA-Z0-9_]+$/;
        if (!loginRegex.test(login)) {
            loginError.textContent = 'Логин может содержать только буквы, цифры и подчеркивания';
            loginInput.classList.add('error');
            loginInput.classList.remove('valid');
            return false;
        }
        
        loginError.textContent = '';
        loginInput.classList.remove('error');
        loginInput.classList.add('valid');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        
        if (password.length === 0) {
            passwordError.textContent = 'Пароль обязателен для заполнения';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        if (password.length < 6) {
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        passwordInput.classList.add('valid');
        return true;
    }

    // Обработчики событий для валидации при вводе
    loginInput.addEventListener('input', validateLogin);
    loginInput.addEventListener('blur', validateLogin);
    
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);

    // Обработчик отправки формы
    authForm.addEventListener('submit', function(event) {
        // Предотвращаем стандартную отправку формы
        event.preventDefault();
        
        // Выполняем валидацию
        const isLoginValid = validateLogin();
        const isPasswordValid = validatePassword();
        
        // Если все данные валидны
        if (isLoginValid && isPasswordValid) {
            // Здесь можно добавить отправку данных на сервер
            // Например, через fetch API
            
            // Сохраняем данные в localStorage (для демонстрации)
            localStorage.setItem('userLogin', loginInput.value.trim());
            localStorage.setItem('isLoggedIn', 'true');
            
            // Переходим на страницу профиля
            window.location.href = 'profil.html';
        } else {
            // Показываем общее сообщение об ошибке
            if (!isLoginValid && !isPasswordValid) {
                alert('Пожалуйста, исправьте ошибки в форме');
            }
        }
    });

    // Валидация при загрузке страницы (для уже заполненных полей)
    validateLogin();
    validatePassword();
});