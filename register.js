document.addEventListener('DOMContentLoaded', function() {
    const formRegister = document.getElementById('form-register');
    const emailInput = document.getElementById('email');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const passwordRepeatInput = document.getElementById('password-repeat');
    
    const emailError = document.getElementById('email-error');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');
    const passwordRepeatError = document.getElementById('password-repeat-error');

    // Функции валидации
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            emailError.textContent = 'Email обязателен для заполнения';
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Введите корректный email адрес';
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            return false;
        }
        
        emailError.textContent = '';
        emailInput.classList.remove('error');
        emailInput.classList.add('valid');
        return true;
    }

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
        
        if (login.length > 20) {
            loginError.textContent = 'Логин не должен превышать 20 символов';
            loginInput.classList.add('error');
            loginInput.classList.remove('valid');
            return false;
        }
        
        const loginRegex = /^[a-zA-Z0-9_]+$/;
        if (!loginRegex.test(login)) {
            loginError.textContent = 'Логин может содержать только буквы, цифры и подчеркивания';
            loginInput.classList.add('error');
            loginInput.classList.remove('valid');
            return false;
        }
        
        // Проверка на уникальность логина (здесь можно сделать запрос к серверу)
        // const isLoginTaken = await checkLoginAvailability(login);
        
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
        
        if (password.length < 8) {
            passwordError.textContent = 'Пароль должен содержать минимум 8 символов';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        // Проверка сложности пароля
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
            passwordError.textContent = 'Пароль должен содержать заглавные и строчные буквы, а также цифры';
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        passwordInput.classList.add('valid');
        return true;
    }

    function validatePasswordRepeat() {
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;
        
        if (passwordRepeat.length === 0) {
            passwordRepeatError.textContent = 'Повторите пароль';
            passwordRepeatInput.classList.add('error');
            passwordRepeatInput.classList.remove('valid');
            return false;
        }
        
        if (password !== passwordRepeat) {
            passwordRepeatError.textContent = 'Пароли не совпадают';
            passwordRepeatInput.classList.add('error');
            passwordRepeatInput.classList.remove('valid');
            return false;
        }
        
        passwordRepeatError.textContent = '';
        passwordRepeatInput.classList.remove('error');
        passwordRepeatInput.classList.add('valid');
        return true;
    }

    // Обработчики событий для валидации при вводе
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    loginInput.addEventListener('input', validateLogin);
    loginInput.addEventListener('blur', validateLogin);
    
    passwordInput.addEventListener('input', function() {
        validatePassword();
        // Также проверяем повтор пароля при изменении основного
        validatePasswordRepeat();
    });
    
    passwordRepeatInput.addEventListener('input', validatePasswordRepeat);
    passwordRepeatInput.addEventListener('blur', validatePasswordRepeat);

    // Обработчик отправки формы
    formRegister.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Выполняем все проверки
        const isEmailValid = validateEmail();
        const isLoginValid = validateLogin();
        const isPasswordValid = validatePassword();
        const isPasswordRepeatValid = validatePasswordRepeat();
        
        // Если все данные валидны
        if (isEmailValid && isLoginValid && isPasswordValid && isPasswordRepeatValid) {
            // Собираем данные формы
            const userData = {
                email: emailInput.value.trim(),
                login: loginInput.value.trim(),
                password: passwordInput.value,
                rememberMe: document.getElementById('member').checked
            };
            
            // Здесь можно отправить данные на сервер
            // Например, через fetch API:
            /*
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Сохраняем данные пользователя
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    // Переходим на страницу профиля
                    window.location.href = 'profil.html';
                } else {
                    // Показываем ошибку с сервера
                    alert(data.message || 'Ошибка регистрации');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка при регистрации');
            });
            */
            
            // Для демонстрации - сохраняем в localStorage и переходим
            localStorage.setItem('user', JSON.stringify({
                email: userData.email,
                login: userData.login,
                isLoggedIn: true
            }));
            
            // Сохраняем данные для авторизации (в реальном приложении НЕ храните пароли в localStorage!)
            if (userData.rememberMe) {
                localStorage.setItem('userLogin', userData.login);
            } else {
                sessionStorage.setItem('userLogin', userData.login);
            }
            
            // Переходим на страницу профиля
            window.location.href = 'profil.html';
        } else {
            // Прокручиваем к первой ошибке
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Инициализация валидации при загрузке
    validateEmail();
    validateLogin();
    validatePassword();
    validatePasswordRepeat();
});