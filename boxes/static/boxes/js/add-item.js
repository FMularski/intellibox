const addItemForm = document.querySelector('#add-new-form');

function addItem() {
    const itemType = document.querySelector('#select-instance').value;
    const parentBox = document.querySelector('#select-parent-box').value;
    const name = document.querySelector('#add-item-name');
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const uploadBtn = document.querySelector('#upload-btn');
    const flashMsg = document.querySelector('#flash-msg');
    const fileInput = document.querySelector('#new-file-input');

    uploadBtn.innerHTML = '<i class="fas fa-spinner"></i>';

    const formData = new FormData();
    formData.append('type', itemType);
    formData.append('name', name.value);

    const filesArray = Array.from(fileInput.files);

    filesArray.forEach(file => {
        formData.append('file', file);
    });



    $.ajax({
        url: '/api/add-item/' + parentBox + '/',
        method: 'POST',
        headers: {'X-CSRFToken': token},
        dataType: 'json',
        data: formData,
        success: response => {
            
            // refresh button
            uploadBtn.innerHTML = '<i class="fas fa-arrow-circle-up"></i> upload';
            // close add panel
            document.querySelector('#close-new-panel-btn').click();
            // open parent box
            fetchItems(parentBox);
            // clear name and file(s) field for the next usage
            name.value = '';
            fileInput.value = '';
            // show flash msg
            flashMsg.classList.add('active');

            // message for box 
            if (response.item)
                document.querySelector('#flash-msg-text').innerText = `${response.type} ${response.item.name} uploaded.`;
            // message for file(s)
            if (response.items)
                document.querySelector('#flash-msg-text').innerText = `${response.type}(s) uploaded.`;
            
            
            setTimeout(() => flashMsg.classList.remove('active'), 3000);
        },
        contentType: false,
        processData: false,
        cache: false
    });
}


addItemForm.addEventListener('submit', event => {
    event.preventDefault();
    addItem();
})