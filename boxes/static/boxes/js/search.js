function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const spinner = document.querySelector('#search-spinner');
    const searchResults = document.querySelector('#search-results');

    searchInput.addEventListener('focusout', () => {
        setTimeout(() => {
            searchResults.innerHTML = '';
            searchInput.value = '';
        }, 500);
    });

    searchInput.addEventListener('keyup', () => {

        if (!searchInput.value) {
            searchResults.innerHTML = '';
            return;
        }

        spinner.innerHTML = '<i class="fas fa-spinner"></i>';
        searchResults.innerHTML = '';

        $.ajax({
            url: '/api/search/' + searchInput.value + '/',
            dataType: 'json',
            success: response => {
                spinner.innerHTML = '';
                searchResults.innerHTML = '';
                
                (response.foundBoxes.concat(response.foundFiles)).forEach(result => {
                    searchResults.innerHTML += 
                        '<div class="search-result" item-id="' + result.id + '" item-type="' + (result.category ? 'file' : 'box') + '">' +
                            '<p>' + (result.category ? assignFileIcon(result.category) : 
                                '<i class="fas fa-archive" style="color: brown;"></i>') + 
                                result.location + '<b>' + result.name + '</b>' +
                            '</p>' + 
                        '</div>';
                });

                const results = document.querySelectorAll('.search-result');
                results.forEach(result => {
                    result.addEventListener('click', () => {
                        const itemId = result.getAttribute('item-id');
                        const itemType = result.getAttribute('item-type');

                        if (itemType == 'box') fetchItems(itemId);
                        else if (itemType == 'file') fetchFile(itemId);
                        
                        searchResults.innerHTML = '';
                        searchInput.value = '';
                    });
                });
            }
        });

    });
}

initSearch();