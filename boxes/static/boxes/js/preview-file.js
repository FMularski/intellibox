function fetchFile(fileId) {
    const boxContent = document.querySelector('#box-content');
    boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';
    document.querySelector('#current-path').innerHTML = '<i class="fas fa-spinner"></i>';
    document.querySelector('#current-path-full').innerHTML = '';

    $.ajax({
        url: '/api/preview_file/' + fileId + '/',
        headers: {'X-Frame-Options': 'SAMEORIGIN'},
        dataType: 'json',
        success: response => {
            displayItem(response);
            initBreadcrumbs();
        }
    });
}

function displayItem(response) {
    const boxContent = document.querySelector('#box-content');

    // construct breadcrumbs
    document.querySelector('#current-path').innerHTML = '<span class="breadcrumbs-segment" item-type="box" item-id="' + response.parent_box +  '"> <i class="fas fa-arrow-left"></i> </span>' +
        '<span class="breadcrumbs-segment" item-type="file" item-id="' + response.id + '">' + response.name + '</span>';
    
    // display location 
    document.querySelector('#current-path-full').innerHTML = response.location;

    // disable search and filter
    document.querySelector('#search-sort-panels').classList.add('hidden');

    boxContent.innerHTML = '<embed src="' + response.instance + '" >';
}