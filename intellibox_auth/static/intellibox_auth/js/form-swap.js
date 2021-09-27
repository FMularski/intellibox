(function(){
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const noAccountButton = document.querySelector('#no-account-btn');
    const alreadyUserButton = document.querySelector('#already-user-btn');

    noAccountButton.addEventListener('click', event => {
        event.preventDefault();

        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    alreadyUserButton.addEventListener('click', event => {
        event.preventDefault();

        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

})();