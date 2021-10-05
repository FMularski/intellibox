function initManageFilePanel(fileId) {
    const manageFilePanel = document.querySelector('#manage-file-panel');
    manageFilePanel.setAttribute('file-id', fileId);

    // manage file panel buttons
    const favBtn = document.querySelector('#manage-file-favourite');

    // refresh callbacks by removing them and setting again
    favBtn.removeEventListener('click', markAsFavouritePanel);
    favBtn.addEventListener('click', markAsFavouritePanel);
}

// manage file panel functions
function markAsFavouritePanel() {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const manageFilePanel = document.querySelector('#manage-file-panel');
    const favBtn = document.querySelector('#manage-file-favourite');

    $.ajax({
        url: '/api/mark_as_favourite/' + manageFilePanel.getAttribute('file-id') + '/',
        method: 'POST',
        headers: { 'X-CSRFToken': token },
        dataType: 'json',
        success: response => {
            favBtn.classList.remove('far'); // far fa-star - empty star
            favBtn.classList.remove('fas'); // fas fa-star - full star

            favBtn.classList.add(response.is_favourite ? 'fas' : 'far');
        }
    })
}