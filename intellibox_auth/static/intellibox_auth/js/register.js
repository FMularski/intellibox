(function(){
    const registerForm = document.querySelector('#register-form');

    const usernameInput = document.querySelector('#id_username');
    const emailInput = document.querySelector('#id_email');
    const passwordInput = document.querySelector('#id_password1');
    const confirmInput = document.querySelector('#id_password2');
    const pinInput = document.querySelector('#id_pin');

    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    registerForm.addEventListener('submit', event => {
        event.preventDefault();
        
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
                let flashMsgText = '';
                
                if (response.status == 400) {
                    for(let field in response.message) 
                        flashMsgText += `[${field}] ${response.message[field]}\n`;
                } else if(response.status == 200) {
                    flashMsgText += response.message;
                }

                // flash msg display

                usernameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmInput.value = '';
                pinInput.value = '';

            }
        })
    });

})();