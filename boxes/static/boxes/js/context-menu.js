(function() {
    const contextMenu = document.querySelector('#context-menu');
    const boxItems = document.querySelectorAll('.box-item');
    const body = document.querySelector('body');

    // keep track of mouse position
    let mousePosX, mousePosY;

    body.addEventListener('mousemove', event => {
        mousePosX = event.pageX;
        mousePosY = event.pageY;
    })


    boxItems.forEach( item => {
        item.addEventListener('contextmenu', event => {

            // mark selected item with visual effect and unmark all others
            boxItems.forEach(item => {
                item.classList.remove('active-box-item');
            });
            item.classList.toggle('active-box-item');

            // set position and interactivity of the context menu 
            contextMenu.style.opacity = '1';
            contextMenu.style.pointerEvents = 'all';
            contextMenu.style.left = mousePosX + 'px';
            contextMenu.style.top = mousePosY + 'px';

            // prevent chrome's context menu from popping out
            event.preventDefault();
        })
    });

    // unclicking context menu, if clicked anywhere and not menu => hide
    document.addEventListener('click', event => {
        const clickedOutside = !contextMenu.contains(event.target);

        if (clickedOutside) {
            contextMenu.style.opacity = '0';
            contextMenu.style.pointerEvents = 'none';
        }
    })

})();