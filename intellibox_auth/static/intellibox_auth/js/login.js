(function(){
    const loginForm = document.querySelector('#login-form');
    const loginBtn = document.querySelector('#login-btn');
    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');

    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        loginBtn.innerHTML = '<i class="fas fa-spinner"></i>';
        loginBtn.style.pointerEvents = 'none';

        $.ajax({
            url: '/login/',
            method: 'POST',
            headers: {'X-CSRFToken': token},
            dataType: 'json',
            data: {
                'username-login': usernameInput.value,
                'password-login': passwordInput.value
            },
            success: response => {
                if (response.status == 400) {
                    const flashMsg = document.createElement('div');
                    flashMsg.setAttribute('id', 'flash-msg');
                    flashMsg.classList.add('error');
                    flashMsg.innerHTML = 
                        '<h3><i class="fas fa-exclamation-triangle"></i> Error</h3>' + 
                        '<p>Invalid credentials.</p>';

                    flashMsg.addEventListener('animationend', () => {
                        setTimeout(() => {
                            flashMsg.style.animation = 'flash-msg-outro .5s ease';
                            flashMsg.addEventListener('animationend', () => {
                                flashMsg.remove();
                            });    
                        }, 5000);
                    })

                    document.querySelector('main').append(flashMsg);
                    loginBtn.innerHTML = 'Log In';
                    loginBtn.style.pointerEvents = 'all';

                    usernameInput.value = '';
                    passwordInput.value = '';


                } else if (response.status == 200) {
                    location.href = '/test-login/'
                }
            }
        })
    });

})();