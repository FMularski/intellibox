(function(){
    const boxItems = document.querySelectorAll('.box-item');


    boxItems.forEach(item => {
        // mark clicked item
        item.addEventListener('click', () => {
            boxItems.forEach(item => {
                item.classList.remove('active-box-item');
            });
            item.classList.toggle('active-box-item');
        });

        item.addEventListener('dblclick', event => {
            // open box ore preview file
            alert(item + ' doubleclicked!');
        })
    });


    // unclick item
    document.addEventListener('click', event => {
        boxItems.forEach(item => {
            if (!item.contains(event.target))
                item.classList.remove('active-box-item');
        })
    })

})();