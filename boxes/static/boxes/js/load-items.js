function formatSize(size) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let units_idx = 0;

    while ((size / 1024) > 1) {
        size = size / 1024;
        units_idx += 1;
    }

    return `${Math.round(size)} ${units[units_idx]}`;
}

function assignFileIcon(extension) {
    const txt = ['txt']
    const word = ['doc', 'docm', 'docx', 'dotm', 'dotx', 'odt']
    const video = ['3g2', '3gp', 'avi', 'mov', 'flv', 'mkv', 'mp4', 'mpg', 'ogv', 'webm', 'wmv']
    const image = ['bmp', 'eps', 'gif', 'ico', 'jpg', 'png', 'svg', 'jpeg', 'tga', 'tiff', 'wbmp']
    const audio = ['aac', 'aaif', 'flac', 'm4a', 'm4r', 'mmf', 'mp3', 'ogg', 'opus', 'wav', 'wma']
    const pdf = ['pdf']
    const excel = ['xlsx', 'xlsm', 'xlsb', 'xltx']
    const powerpoint = ['pps', 'ppt', 'pptx']
    const csv = ['csv']
    const archive = ['7z', 'bz2', 'gz', 'zip']
    const code = ['c', 'cgi', 'pl', 'class', 'cpp', 'cs', 'h', 'java', 'php', 'py', 'sh', 'swift', 
        'vb', 'js', 'html', 'xml', 'css', 'sass', 'xhtml', 'asp', 'aspx']

    if (txt.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-alt" style="color: #9e9e9e;"></i>';

    if (word.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-word" style="color: #304cff;"></i>';
    
    if (video.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-video" style="color: #ff36f8;"></i>';
    
    if (image.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-image" style="color: #ff5252;"></i>';

    if (audio.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-audio" style="color: #ffd342;"></i>';

    if (pdf.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-pdf" style="color: red;"></i>';
    
    if (excel.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-excel" style="color: #306e18;"></i>';

    if (powerpoint.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-powerpoint" style="color: #ff4000;"></i>';

    if (csv.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-csv" style="color: #306e18;"></i>';

    if (archive.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-archive" style="color: yellow;"></i>';
    
    if (code.includes(extension.toLowerCase()))
        return '<i class="fas fa-file-code" style="color: #9233ff;"></i>';

    return '<i class="fas fa-file" style="color: black;"></i>';
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
                        (item.instance ? assignFileIcon(item.extension) : '<i class="fas fa-archive" style="color: brown;"></i>') +  
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