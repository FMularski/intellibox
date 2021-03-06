function formatSize(size) {
    const units = ['bytes', 'KB', 'MB', 'GB'];
    let units_idx = 0;

    while ((size / 1024) > 1) {
        size = size / 1024;
        units_idx += 1;
    }

    return `${Math.round(size)} ${units[units_idx]}`;
}

function assignFileIcon(category) {
    switch (category) {
        case 'text':
            return '<i class="fas fa-file-alt" style="color: #9e9e9e;"></i>';
        case 'document':
            return '<i class="fas fa-file-word" style="color: #304cff;"></i>';
        case 'video':
            return '<i class="fas fa-file-video" style="color: #ff36f8;"></i>';
        case 'image':
            return '<i class="fas fa-file-image" style="color: #ff5252;"></i>';
        case 'audio':
            return '<i class="fas fa-file-audio" style="color: #ffd342;"></i>';
        case 'pdf':
            return '<i class="fas fa-file-pdf" style="color: red;"></i>';
        case 'excel':
            return '<i class="fas fa-file-excel" style="color: #306e18;"></i>';
        case 'powerpoint':
            return '<i class="fas fa-file-powerpoint" style="color: #ff4000;"></i>';
        case 'csv':
            return '<i class="fas fa-file-csv" style="color: #306e18;"></i>';
        case 'archive':
            return '<i class="fas fa-file-archive" style="color: #c9a071;"></i>';
        case 'code':
            return '<i class="fas fa-file-code" style="color: #9233ff;"></i>';
        default: 
            return '<i class="fas fa-file" style="color: black;"></i>';
    }
}

function displayItems(response) {
    const boxContent = document.querySelector('#box-content');

    // enable search and sort and disable manage file panel
    document.querySelector('#search-sort-panels').classList.remove('hidden');
    document.querySelector('#manage-file-panel').classList.add('hidden');

    // build breadcrumbs and display location only if open box - not when display favourites etc.
    if(response.box) {
        // construct breadcrumbs
        document.querySelector('#current-path').innerHTML =
            (response.box.parent_box ? '<span class="breadcrumbs-segment" item-id="' + response.box.parent_box +  '"> <i class="fas fa-arrow-left"></i> </span>' : '') +  
            '<span class="breadcrumbs-segment" item-id="' + response.box.id + '">' + response.box.name + '</span>';
        
        // display location
        document.querySelector('#current-path-full').innerHTML = response.box.location;


        // set attribute required for 
        document.querySelector('#sort').setAttribute('box-to-sort', response.box.id);
    }

            
    // if no files/boxes in the box
    if (response.innerBoxes.length + response.innerFiles.length == 0) {
        boxContent.innerHTML = '<p id="no-files"><i class="far fa-file-excel"></i> No files here yet.</p>';
        return;
    }

    let rows = '';

    response.innerBoxes.concat(response.innerFiles).forEach(item => {
        rows += 
            '<tr class="box-item ' + (item.instance ? '' : 'box-row') + '" item-id="' + item.id + '" item-type="' + 
                (item.instance ? 'file' : 'box') + '" item-name="' + item.name + '" item-url="' + (item.instance ? item.instance : '') + '">' + 
                '<td><i class="' + (item.is_favourite ? 'fas' : 'far') + ' fa-star fav-btn" item-id="' + item.id + '"></i></td>' +
                '<td>' + 
                    (item.instance ? assignFileIcon(item.category) : '<i class="fas fa-archive" style="color: brown;"></i>') +  
                '</td>' + 
                '<td>' + item.name + '</td>' + 
                '<td>' + formatSize(item.size) + '</td>' + 
                // '<td>' + (item.instance ? formatSize(item.size) : item.files_count + ' items') + '</td>' + 
                '<td>' + item.last_modified + '</td>' +
            '</tr>';
    });

    boxContent.innerHTML = 
        '<table>' + 
            '<thead>' + 
                '<th></th>' + 
                '<th></th>' + 
                '<th>Name</th>' + 
                '<th>Size</th>' + 
                '<th>Last Modified</th>' + 
            '</thead>' + 
            '<tbody>' + rows + '</tbody>' + 
        '</table>';
}

function fetchItems(boxId=null) {
    const boxContent = document.querySelector('#box-content');
    boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';
    document.querySelector('#current-path').innerHTML = '<i class="fas fa-spinner"></i>';
    document.querySelector('#current-path-full').innerHTML = '';

    const sort = document.querySelector('#sort');

    $.ajax({
        url: boxId ? ('/api/open_box/' + boxId + '/?sort_by=' + sort.value) : ('/api/open_root/?sort_by=' + sort.value),
        dataType: 'json',
        success: response => {
            displayItems(response);
            initClickingItems();
            initContextMenu();
            initBreadcrumbs();
            initFavouriteButtons();
            initSort();
        }
    });
}

fetchItems();