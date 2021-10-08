function initSort() {
    const sort = document.querySelector('#sort');

    if (!sort.getAttribute('listener')) {
        sort.setAttribute('listener', 'active');

        sort.addEventListener('change', event => {
            sort.style.pointerEvents = 'none';
            const sortValue = event.target.value;
            const boxContent = document.querySelector('#box-content');
            boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';

            // choose url to sort
            let url;
            switch(sort.getAttribute('box-to-sort')) {
                case 'box': 
                    url = '/api/open_root/?sort_by=' + sortValue;
                    break;
                case 'favourites':
                    url = '/api/favourites/?sort_by=' + sortValue;
                    break;
                case 'recent':
                    url = '/api/recent/?sort_by=' + sortValue;
                    break;
                case 'bin':
                    url = '/api/bin/?sort_by=' + sortValue;
                    break;
                default:
                    url = '/api/open_box/' + sort.getAttribute('box-to-sort') + '/?sort_by=' + sortValue;
            }

            $.ajax({
                url: url,
                dataType: 'json',
                success: response => {
                    displayItems(response);
                    initClickingItems();
                    initContextMenu();
                    initBreadcrumbs();
                    initFavouriteButtons();
                    initSort();
                    sort.style.pointerEvents = 'all';
                }
            })
    
        })
    }
}