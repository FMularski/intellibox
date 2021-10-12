function updateStorage() {
    const storageBar = document.querySelector('.storage-bar');
    const storageUsed = document.querySelector('.storage-used-number');
    const storageLimit = document.querySelector('.storage-limit-number');

    $.ajax({
        url: '/api/storage/',
        dataType: 'json',
        success: response => {
            storageUsed.innerText = formatSize(response.storageUsed);
            storageLimit.innerText = formatSize(response.storageLimit);
            storageBar.style.width = `${response.storagePercentage * 100}%`;
        }
    })
}

updateStorage();