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

    function lockOtherNavBtns(clicked) {
        navItems.forEach(item => {
            item.classList.add('inactive');
            clicked.classList.remove('inactive');
        })
    } 

    function unlockAllNavBtns() {
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
    
        $.ajax({
            url: '/api/open_root/',
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                unlockAllNavBtns();
            }
        });
    }

    function favourites() {
        const currentPath = clearPath();
    
        $.ajax({
            url: '/api/favourites/',
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                unlockAllNavBtns();

                currentPath.innerHTML = '<i class="fas fa-star"></i> Favourites';
            }
        });
    }

    function recent() {
        const currentPath = clearPath();

        $.ajax({
            url: '/api/recent/',
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();
                unlockAllNavBtns();

                currentPath.innerHTML = '<i class="fas fa-clock"></i> Recent';
            }
        })
    }

    const navRootBtn = document.querySelector('#nav-root');
    const navFavouritesBtn = document.querySelector('#nav-favourites');
    const navRecentBtn = document.querySelector('#nav-recent');

    navRootBtn.addEventListener('click', event => {
        lockOtherNavBtns(event.target);
        openRoot();
    });

    navFavouritesBtn.addEventListener('click', event => {
        lockOtherNavBtns(event.target);
        favourites();
    });

    navRecentBtn.addEventListener('click', event => {
        lockOtherNavBtns(event.target);
        recent();
    })

})();