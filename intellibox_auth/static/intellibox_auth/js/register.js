(function(){
    const registerForm = document.querySelector('#register-form');
    const registerBtn = document.querySelector('#register-btn');

    const usernameInput = document.querySelector('#id_username');
    const emailInput = document.querySelector('#id_email');
    const passwordInput = document.querySelector('#id_password1');
    const confirmInput = document.querySelector('#id_password2');
    const pinInput = document.querySelector('#id_pin');

    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    registerForm.addEventListener('submit', event => {
        event.preventDefault();

        registerBtn.innerHTML = '<i class="fas fa-spinner"></i>';
        
        $.ajax({
            url: '/register/',
            method: 'POST',
            headers: {'X-CSRFToken': token },
            dataType: 'json',
            data: {
                'username': usernameInput.value,
                'email': emailInput.value,
                'password1': passwordInput.value,
                'password2': confirmInput.value,
                'pin': pinInput.value
            },
            success: response => {
                registerBtn.innerHTML = 'Register';
                let flashMsgText = '';
                let flashMsg = document.createElement('div');
                flashMsg.setAttribute('id', 'flash-msg');

                if (response.status == 400) {
                    for(let field in response.message) 
                        flashMsgText += `<b>[${field}]</b> ${response.message[field]}<br>`;

                    flashMsg.classList.add('error');
                    flashMsg.innerHTML = 
                        '<h3><i class="fas fa-exclamation-triangle"></i> Error</h3>' + 
                        '<p>' + flashMsgText + '</p>';
                    
                } else if(response.status == 200) {
                    flashMsgText += response.message;
                    flashMsg.classList.add('success');
                    flashMsg.innerHTML =
                    '<h3><i class="fas fa-check-square"></i> Success!</h3>' +
                    '<p>' + flashMsgText + '</p>';

                    document.querySelector('#already-user-btn').click();
                }

                flashMsg.addEventListener('animationend', () => {
                    setTimeout(() => {
                        flashMsg.style.animation = 'flash-msg-outro .5s ease';
                        flashMsg.addEventListener('animationend', () => {
                            flashMsg.remove();
                        });    
                    }, 5000);

                })

                document.querySelector('main').append(flashMsg);

                usernameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmInput.value = '';
                pinInput.value = '';
            }
        })
    });

})();