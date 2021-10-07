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

    function openRoot() {
        const boxContent = document.querySelector('#box-content');
        boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';
        document.querySelector('#current-path').innerHTML = '<i class="fas fa-spinner"></i>';
        document.querySelector('#current-path-full').innerHTML = '';
    
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
        const boxContent = document.querySelector('#box-content');
        boxContent.innerHTML = '<p id="loading-content"><i class="fas fa-spinner"></i></p>';

        const currentPath = document.querySelector('#current-path'); 
        currentPath.innerHTML = '<i class="fas fa-spinner"></i>';

        document.querySelector('#current-path-full').innerHTML = '';
    
        $.ajax({
            url: '/api/favourites/',
            dataType: 'json',
            success: response => {
                displayItems(response);
                initClickingItems();
                initContextMenu();
                initBreadcrumbs();
                initFavouriteButtons();

               currentPath.innerHTML = '<i class="fas fa-star"></i> Favourites';
               unlockAllNavBtns();
            }
        });
    }

    const navRootBtn = document.querySelector('#nav-root');
    const navFavouritesBtn = document.querySelector('#nav-favourites');

    navRootBtn.addEventListener('click', event => {
        lockOtherNavBtns(event.target);
        openRoot();
    });

    navFavouritesBtn.addEventListener('click', event => {
        lockOtherNavBtns(event.target);
        favourites();
    });

})();