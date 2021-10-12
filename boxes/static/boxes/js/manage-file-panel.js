function initManageFilePanel(fileId) {
    const manageFilePanel = document.querySelector('#manage-file-panel');
    manageFilePanel.setAttribute('file-id', fileId);

    // manage file panel buttons
    const favBtn = document.querySelector('#manage-file-favourite');
    const removeBtn = document.querySelector('#manage-file-remove');

    // refresh callbacks by removing them and setting again
    favBtn.removeEventListener('click', markAsFavouritePanel);
    favBtn.addEventListener('click', markAsFavouritePanel);

    removeBtn.removeEventListener('click', removePanel);
    removeBtn.addEventListener('click', removePanel);
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

function removePanel() {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const manageFilePanel = document.querySelector('#manage-file-panel');
    const idToRemove = manageFilePanel.getAttribute('file-id');
    const dark = document.querySelector('#dark');
    const removingPanel = document.querySelector('#removing-panel');

    dark.classList.add('active');
    removingPanel.classList.add('active');


    $.ajax({
        url: '/api/remove-item/' + idToRemove + '/',
        method: 'POST',
        headers: {'X-CSRFToken': token},
        dataType: 'json', 
        success: response => {
            fetchItems(response.parentBoxId);
            dark.classList.remove('active');
            removingPanel.classList.remove('active');
            updateStorage();
        }
    })
}