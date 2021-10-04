function initBreadcrumbs() {
    const breadcrumbsSegments = document.querySelectorAll('.breadcrumbs-segment');
    
    breadcrumbsSegments.forEach(segment => {
        segment.addEventListener('click', () => {
            fetchItems(segment.getAttribute('item-id'));
        })
    })
}