(function(){
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(item => {
                item.classList.remove('active-nav-item');
            });

            item.classList.add('active-nav-item');
        })
    })
})();