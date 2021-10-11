const dark = document.querySelector('#dark');
const newPanel = document.querySelector('#new-panel');
const closeBtn = document.querySelector('#close-new-panel-btn');
const newBtn = document.querySelector('.new-btn');
const fileInput = document.querySelector('#new-file-input');
const filesList = document.querySelector('#uploaded-files-list');


function loadParentBoxes() {
    const parentBoxSelect = document.querySelector('#select-parent-box');

    parentBoxSelect.innerHTML = '<option>Loading boxes...</option>';

    $.ajax({
        url: '/api/parent_boxes/',
        dataType: 'json',
        success: response => {
            parentBoxSelect.innerHTML = '';
            response.forEach(box => {
                parentBoxSelect.innerHTML += 
                    '<option value="' + box.id + '">' + box.location + box.name + '</option>';
            })
        }
    });
}

// open new
newBtn.addEventListener('click', () => {
    dark.classList.add('active');
    newPanel.classList.add('active');
    loadParentBoxes();
});

// close new
closeBtn.addEventListener('click', () => {
    dark.classList.remove('active');
    newPanel.classList.remove('active');
    // clear inputs
    document.querySelector('#add-item-name').value = '';
    document.querySelector('#new-file-input').value = '';
    filesList.innerHTML = '';
    document.querySelector('#upload-btn').innerHTML = '<i class="fas fa-arrow-circle-up"></i> Upload';
});


// toggle name/file input depending on type
const selectInstance = document.querySelector('#select-instance');
const newFileInput = document.querySelector('#new-file-input');
const newName = document.querySelector('div#new-name');

selectInstance.addEventListener('change', event => {
    if (event.target.value == 'box') {
        newFileInput.classList.add('hidden');
        filesList.classList.add('hidden');
        newName.classList.remove('hidden');
    } else if (event.target.value == 'file') { 
        newFileInput.classList.remove('hidden');
        filesList.classList.remove('hidden');
        newName.classList.add('hidden');
    }
});


fileInput.addEventListener('change', event => {

    filesList.innerHTML = '';

    for (let i = 0; i < fileInput.files.length; i++){
        filesList.innerHTML += '<li><i class="far fa-file"></i> ' + fileInput.files.item(i).name + '</li>';
    }
})
