function initFavouriteButtons() {
    const favBtns = document.querySelectorAll('.fav-btn');

    favBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const itemId = btn.getAttribute('item-id');
            const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

            $.ajax({
                url: '/api/mark_as_favourite/' + itemId + '/',
                method: 'POST',
                headers: { 'X-CSRFToken': token },
                dataType: 'json',
                success: response => {
                    btn.classList.remove('far'); // far fa-star - empty star
                    btn.classList.remove('fas'); // fas fa-star - full star

                    btn.classList.add(response.is_favourite ? 'fas' : 'far');
                }
            })
        })
    })
}