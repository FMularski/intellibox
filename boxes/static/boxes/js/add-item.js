function addItem() {
    const itemType = document.querySelector('#select-instance').value;
    const parentBox = document.querySelector('#select-parent-box').value;
    const name = document.querySelector('#add-item-name');
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const uploadBtn = document.querySelector('#upload-btn');

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
        }
    })
}

const addItemForm = document.querySelector('#add-new-form');
addItemForm.addEventListener('submit', event => {
    event.preventDefault();
    addItem();
})