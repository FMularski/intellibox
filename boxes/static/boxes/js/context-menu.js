function initContextMenu() {
    const contextMenu = document.querySelector('#context-menu');
    const contextMenuHeader = document.querySelector('.context-menu-header');
    const boxItems = document.querySelectorAll('.box-item');
    const body = document.querySelector('body');

    // context menu buttons
    const contextPreviewBtn = document.querySelector('#context-preview');
    const contextDownloadBtn = document.querySelector('#context-download');
    const contextDownloadAnchor = document.querySelector('#context-download a');
    const contextRemoveBtn = document.querySelector('#context-remove');
    const contextMoveBtn = document.querySelector('#context-move');
    const contextFavBtn = document.querySelector('#context-fav');
    const contextLinkBtn = document.querySelector('#context-link');

    contextPreviewBtn.removeEventListener('click', previewContext); 
    contextPreviewBtn.addEventListener('click', previewContext);

    contextRemoveBtn.removeEventListener('click', removeContext);
    contextRemoveBtn.addEventListener('click', removeContext);

    contextMoveBtn.removeEventListener('click', moveItemContext);
    contextMoveBtn.addEventListener('click', moveItemContext);

    contextFavBtn.removeEventListener('click', markAsFavouriteContext);
    contextFavBtn.addEventListener('click', markAsFavouriteContext);

    contextLinkBtn.removeEventListener('click', getLinkContext);
    contextLinkBtn.addEventListener('click', getLinkContext);

    // keep track of mouse position
    let mousePosX, mousePosY;

    body.addEventListener('mousemove', event => {
        mousePosX = event.pageX;
        mousePosY = event.pageY;
    })


    boxItems.forEach( item => {

        item.addEventListener('contextmenu', event => {

            // mark selected item with visual effect and unmark all others
            boxItems.forEach(item => {
                item.classList.remove('active-box-item');
            });
            item.classList.toggle('active-box-item');

            // set position and interactivity of the context menu 
            contextMenu.style.opacity = '1';
            contextMenu.style.pointerEvents = 'all';
            contextMenu.style.left = mousePosX + 'px';
            contextMenu.style.top = mousePosY + 'px';

            // prevent chrome's context menu from popping out
            event.preventDefault();

            contextMenu.itemId = item.getAttribute('item-id');
            contextMenu.itemName = item.getAttribute('item-name');
            contextMenu.itemType = item.getAttribute('item-type');
            contextMenu.itemUrl = item.getAttribute('item-url');
            contextMenu.star = item.children[0].children[0];

            if (contextMenu.itemType == 'box') {
                contextDownloadBtn.classList.add('hidden');
                contextLinkBtn.classList.add('hidden');
            } else {
                contextDownloadBtn.classList.remove('hidden');
                contextLinkBtn.classList.remove('hidden');
                contextDownloadAnchor.setAttribute('href', contextMenu.itemUrl);
            }

            contextMenuHeader.innerHTML = '<i class="fas fa-cogs"></i> ' + contextMenu.itemName; 
        })
    });

    // unclicking context menu, if clicked anywhere and not menu => hide
    document.addEventListener('click', event => {
        const clickedOutside = !contextMenu.contains(event.target);

        if (clickedOutside) {
            contextMenu.style.opacity = '0';
            contextMenu.style.pointerEvents = 'none';
        }
    })

}

// context menu functions
function previewContext() {
    const contextMenu = document.querySelector('#context-menu');
    fetchItems(contextMenu.itemId);
    contextMenu.style.opacity = '0';
    contextMenu.style.pointerEvents = 'none';
}

function removeContext() {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const contextMenu = document.querySelector('#context-menu');
    const idToRemove = contextMenu.itemId;
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
            contextMenu.style.opacity = '0';
            contextMenu.style.pointerEvents = 'none';
            updateStorage();
        }
    })
}

function moveItemContext() {
    const moveToPanel = document.querySelector('#move-to-panel');
    const dark = document.querySelector('#dark');
    const selectInput = document.querySelector('#new-parent-select');
    const confirmMoveBtn = document.querySelector('#confirm-move-btn');
    const contextMenu = document.querySelector('#context-menu');
    const idToMove = contextMenu.itemId;
    
    confirmMoveBtn.setAttribute('moving-item-id', idToMove);
    contextMenu.style.opacity = '0';
    contextMenu.style.pointerEvents = 'none';
    selectInput.innerHTML = '<option> Loading boxes... </option>';

    $.ajax({
        url: '/api/parent_boxes/',
        dataType: 'json',
        success: response => {
            selectInput.innerHTML = '';
            response.forEach(box => {
                selectInput.innerHTML += 
                    '<option value="' + box.id + '">' + box.location + box.name + '</option>';
            });
        }
    })

    moveToPanel.classList.add('active');
    dark.classList.add('active');
}

function markAsFavouriteContext() {
    const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    const contextMenu = document.querySelector('#context-menu');
    contextMenu.style.opacity = '0';
    contextMenu.style.pointerEvents = 'none';
    const favBtn = contextMenu.star;

    $.ajax({
        url: '/api/mark_as_favourite/' + contextMenu.itemId + '/',
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

function getLinkContext() {
    const contextMenu = document.querySelector('#context-menu');
    const fileId = contextMenu.itemId;
    const gettingLinkPanel = document.querySelector('#getting-link-panel');
    const getLinkBtn = document.querySelector('#manage-file-get-link');
    const dark = document.querySelector('#dark');

    contextMenu.style.opacity = '0';
    contextMenu.style.pointerEvents = 'none';
    gettingLinkPanel.innerHTML = '<i class="fas fa-spinner"></i>';
    gettingLinkPanel.classList.add('active');
    dark.classList.add('active');
    getLinkBtn.style.pointerEvents = 'none';

    $.ajax({
        url: '/api/get-link/' + fileId + '/',
        dataType: 'json',
        success: response => {
            navigator.clipboard.writeText(response);
            gettingLinkPanel.innerHTML = 
                '<i class="fas fa-check-circle"></i>' +
                '<p>URL copied!</p>';

            setTimeout(() => {
                gettingLinkPanel.classList.remove('active');
                dark.classList.remove('active');
                getLinkBtn.style.pointerEvents = 'all';
            }, 1000);
        }
    })
}