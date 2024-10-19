function updateSystemTray() {
    const timeElement = document.getElementById('time-display');
    const dateElement = document.getElementById('date-display');

    const time = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const timeString = time.toLocaleTimeString('en-US', options);
    const dateString = time.toLocaleDateString('en-US', dateOptions);

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}
updateSystemTray();
setInterval(updateSystemTray, 30000);

document.getElementById('start-button').addEventListener('click', function() {
    const startMenuContainer = document.getElementById('start-menu-container');

    const existingMenu = document.getElementById('start-menu-container').querySelector('.start-menu');

    if (existingMenu) {
        existingMenu.remove();
    } else {
        fetch("static/home/props/startMenu.html")
            .then(response => response.text())
            .then(html => {
                startMenuContainer.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching start menu:', error);
            });
    }
});

document.getElementById('music-toggle').addEventListener('click', function() {
    const player = document.getElementById('music-player');
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('vcard-toggle').addEventListener('click', function() {
    const iframe = document.getElementById('vcard-popup-container');
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
});
