(function(){
    const dark = document.querySelector('#dark');
    const newPanel = document.querySelector('#new-panel');
    const closeBtn = document.querySelector('#close-new-panel-btn');
    const newBtn = document.querySelector('.new-btn');

    newBtn.addEventListener('click', () => {
        dark.classList.add('active');
        newPanel.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        dark.classList.remove('active');
        newPanel.classList.remove('active');
    });


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
    
})();