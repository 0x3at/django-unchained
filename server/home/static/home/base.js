function updateSystemTray(){
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const time = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    
    const timeString = time.toLocaleTimeString('en-US', options);
    const dateString = time.toLocaleDateString('en-US', dateOptions);

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}
updateSystemTray();
setInterval(updateSystemTray, 30000);

document.getElementById('start-button').addEventListener('click', function () {
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

const selectionBox = document.getElementById('selection-box');

let isDragging = false;
let startX, startY;

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = '0';
    selectionBox.style.height = '0';
    selectionBox.style.display = 'block'; 
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = currentX - startX;
    const height = currentY - startY;

    selectionBox.style.width = `${Math.abs(width)}px`;
    selectionBox.style.height = `${Math.abs(height)}px`;
    selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
    selectionBox.style.top = `${height < 0 ? currentY : startY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    selectionBox.style.display = 'none'; 
});

document.addEventListener('mouseleave', () => {
    isDragging = false;
    selectionBox.style.display = 'none'; 
});
