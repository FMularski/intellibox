function addItem() {
    const itemType = document.querySelector('#select-instance').value;
    const parentBox = document.querySelector('#select-parent-box').value;
    const name = document.querySelector('#add-item-name');
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const uploadBtn = document.querySelector('#upload-btn');
    const flashMsg = document.querySelector('#flash-msg');

    uploadBtn.innerHTML = '<i class="fas fa-spinner"></i>';

    $.ajax({
        url: '/api/add-item/' + parentBox + '/',
        method: 'POST',
        headers: {'X-CSRFToken': token},
        dataType: 'json',
        data: {
            'type': itemType,
            'name': name.value
        },
        success: response => {
            // refresh button
            uploadBtn.innerHTML = '<i class="fas fa-arrow-circle-up"></i> upload';
            // close add panel
            document.querySelector('#close-new-panel-btn').click();
            // open parent box
            fetchItems(parentBox);
            // clear name field for the next usage
            name.value = '';
            // show flash msg
            flashMsg.classList.add('active');
            document.querySelector('#flash-msg-text').innerText = `${response.type} '${response.item.name}' has been created.`;
            setTimeout(() => flashMsg.classList.remove('active'), 3000);

        }
    })
}

const addItemForm = document.querySelector('#add-new-form');
addItemForm.addEventListener('submit', event => {
    event.preventDefault();
    addItem();
})