(function(){
    const boxItems = document.querySelectorAll('.box-item');


    // mark clicked item
    boxItems.forEach(item => {
        item.addEventListener('click', () => {
            boxItems.forEach(item => {
                item.classList.remove('active-box-item');
            });
            item.classList.toggle('active-box-item');
        });
    });


    // unclick item
    document.addEventListener('click', event => {
        boxItems.forEach(item => {
            if (!item.contains(event.target))
                item.classList.remove('active-box-item');
        })
    })

})();