function initClickingItems() {
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
            
            if(item.getAttribute('item-type') == 'box')
                fetchItems(item.getAttribute('item-id'));
            else 
                fetchFile(item.getAttribute('item-id'));
        })
    });


    // unclick item
    document.addEventListener('click', event => {
        boxItems.forEach(item => {
            if (!item.contains(event.target))
                item.classList.remove('active-box-item');
        })
    })

}