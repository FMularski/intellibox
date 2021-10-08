(function(){
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(item => {
                item.classList.remove('active-nav-item');
            });

            item.classList.add('active-nav-item');
        })
    });

    function lockNavBtns() {
        navItems.forEach(item => {
            item.classList.add('inactive');
        })
    } 

    function unlockNavBtns() {
        navItems.forEach(item => {
            item.classList.remove('inactive');
        })
    }

    function clearPath() {
        const boxContent = document.querySelector('#box-content');
        boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';

        const currentPath = document.querySelector('#current-path'); 
        currentPath.innerHTML = '<i class="fas fa-spinner"></i>';

        const currentPathFull = document.querySelector('#current-path-full');
        currentPathFull.innerHTML = '';

        return currentPath;
    }

    function openRoot() {
        const currentPath = clearPath();
        const sort = document.querySelector('#sort');
        sort.setAttribute('box-to-sort', 'box');

        $.ajax({
            url: '/api/open_root/?sort_by=' + sort.value,
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                initSort();
                unlockNavBtns();

                // document.querySelector('#sort').value = "-is_favourite";
            }
        });
    }

    function favourites() {
        const currentPath = clearPath();
        const sort = document.querySelector('#sort');
        sort.setAttribute('box-to-sort', 'favourites');
        
        $.ajax({
            url: '/api/favourites/?sort_by=' + sort.value,
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                initSort();
                unlockNavBtns();

                currentPath.innerHTML = '<i class="fas fa-star"></i> Favourites';
            }
        });
    }

    function recent() {
        const currentPath = clearPath();
        const sort = document.querySelector('#sort');
        sort.setAttribute('box-to-sort', 'recent');

        $.ajax({
            url: '/api/recent/?sort_by=' + sort.value,
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                initSort();
                unlockNavBtns();

                currentPath.innerHTML = '<i class="fas fa-clock"></i> Recent';
            }
        })
    }

    function bin(){
        const currentPath = clearPath();
        const sort = document.querySelector('#sort');
        sort.setAttribute('box-to-sort', 'bin');

        $.ajax({
            url: '/api/bin/?sort_by=' + sort.value,
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                initSort();
                unlockNavBtns();

                currentPath.innerHTML = '<i class="fas fa-trash"></i> Bin';
            }
        })

    }

    const navRootBtn = document.querySelector('#nav-root');
    const navFavouritesBtn = document.querySelector('#nav-favourites');
    const navRecentBtn = document.querySelector('#nav-recent');
    const navBinBtn = document.querySelector('#nav-bin');

    navRootBtn.addEventListener('click', event => {
        lockNavBtns();
        openRoot();
    });

    navFavouritesBtn.addEventListener('click', event => {
        lockNavBtns();
        favourites();
    });

    navRecentBtn.addEventListener('click', event => {
        lockNavBtns();
        recent();
    });

    navBinBtn.addEventListener('click', event => {
        lockNavBtns();
        bin();
    });

})();