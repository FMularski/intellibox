(function(){
    $('#username').click(() => {
        $('#logout-btn').animate({width: 'toggle'}, 350);
    });

    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', () => {
        logoutBtn.classList.remove('fa-power-off');
        logoutBtn.classList.add('fa-spinner');
        logoutBtn.style.animation = 'spinning 1s ease infinite';
        logoutBtn.style.pointerEvents = 'none';

        $.ajax({
            url: '/logout/',
            method: 'POST',
            headers: {'X-CSRFToken': document.querySelector('input[name="csrfmiddlewaretoken"]').value },
            success: response => {
                location.replace('/login-page/');
            }
        })
    });
    
})();