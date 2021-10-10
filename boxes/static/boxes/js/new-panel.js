const dark = document.querySelector('#dark');
const newPanel = document.querySelector('#new-panel');
const closeBtn = document.querySelector('#close-new-panel-btn');
const newBtn = document.querySelector('.new-btn');

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
});


// toggle name/file input depending on type
const selectInstance = document.querySelector('#select-instance');
const newFileInput = document.querySelector('#new-file-input');
const newName = document.querySelector('div#new-name');

selectInstance.addEventListener('change', event => {
    if (event.target.value == 'Box') {
        newFileInput.classList.add('hidden');
        newName.classList.remove('hidden');
    } else if (event.target.value == 'File') { 
        newFileInput.classList.remove('hidden');
        newName.classList.add('hidden');
    }
});
