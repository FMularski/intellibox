function formatSize(size) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let units_idx = 0;

    while ((size / 1024) > 1) {
        size = size / 1024;
        units_idx += 1;
    }

    return `${Math.round(size)} ${units[units_idx]}`;
}

function displayItems(response) {
    const boxContent = document.querySelector('#box-content');
    
    // construct breadcrumbs
    document.querySelector('#current-path').innerHTML =
        (response.box.parent_box ? '<span class="breadcrumbs-segment" item-id="' + response.box.parent_box +  '"> <i class="fas fa-arrow-left"></i> </span>' : '') +  
        '<span class="breadcrumbs-segment" item-id="' + response.box.id + '">' + response.box.name + '</span>';
    
    // display location
    document.querySelector('#current-path-full').innerHTML = response.box.location;

    // enable search and filter
    document.querySelector('#search-sort-panels').classList.remove('hidden');
        
        // if no files/boxes in the box
        if (response.innerBoxes.length + response.innerFiles.length == 0) {
            boxContent.innerHTML = '<p id="no-files"><i class="far fa-file-excel"></i> No files here yet.</p>';
            return;
        }

        let rows = '';

        response.innerBoxes.concat(response.innerFiles).forEach(item => {
            rows += 
                '<tr class="box-item" item-id="' + item.id + '" item-type="' + (item.instance ? 'file' : 'box') + '">' + 
                    '<td><i class="far fa-star"></i></td>' +
                    '<td>' + 
                        (item.instance ? '<i class="fas fa-file"></i>' : '<i class="fas fa-archive"></i>') +  
                    '</td>' + 
                    '<td>' + item.name + '</td>' + 
                    '<td>' + (item.instance ? formatSize(item.size) : item.files_count + ' files') + '</td>' + 
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

    $.ajax({
        url: boxId ? '/api/open_box/' + boxId + '/' : '/api/open_root/',
        dataType: 'json',
        success: response => {
            displayItems(response);
            addListenersToItems();
            initContextMenu();
            initBreadcrumbs();
        }
    });
}

fetchItems();