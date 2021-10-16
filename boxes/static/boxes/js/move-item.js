/* 
    how to move items:
        set attribute 'moving-item-id' of button#confirm-move-btn
*/

const moveItemForm = document.querySelector('#move-item-form');
moveItemForm.addEventListener('submit', event => {
    event.preventDefault();

    const moveToPanel = document.querySelector('#move-to-panel');
    const dark = document.querySelector('#dark');
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const confirmMoveBtn = document.querySelector('#confirm-move-btn');
    const selectInput = document.querySelector('#new-parent-select');

    const itemId = confirmMoveBtn.getAttribute('moving-item-id');
    const newParentId = selectInput.value;

    confirmMoveBtn.innerHTML = '<i class="fa fa-spinner"></i>';
    confirmMoveBtn.style.pointerEvents = 'none';

    $.ajax({
        url: '/api/move-item/' + itemId + '/' + newParentId + '/',
        method: 'POST',
        headers: {'X-CSRFToken': token},
        dataType: 'json',
        success : response => {
            confirmMoveBtn.innerHTML = 'Move';
            moveToPanel.classList.remove('active');
            dark.classList.remove('active');
            confirmMoveBtn.style.pointerEvents = 'all';

            fetchItems(response.newParentId);
        }
    });
})