function renderIframe(src) {
    const iframeHTML = `
<div class="window active" style="max-width: 75%">
    <div class="title-bar">
    <div class="title-bar-text">A window with contents</div>
    <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close" id="close-btn"></button>
    </div>
    </div>
    <div class="window-body has-space">
    <object data =${src}></object> 
    </div>
</div>`;
const desktopGridContainer = document.querySelector('.desktop-grid-container');
desktopGridContainer.insertAdjacentHTML('afterbegin', iframeHTML);
document.addEventListener('click', function(event) {
    if (event.target.id === 'close-btn') {
        event.target.closest('.window').remove();
    }});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('icon-github').addEventListener('click', function() {
        console.log("Github icon clicked");
        renderIframe('https://github.com/0x3at');
    })})
    
    document.getElementById('icon-linkedin').addEventListener('click', function() {
        console.log("LinkedIn icon clicked");
        renderIframe('https://www.linkedin.com/in/ethan-rose-0077901b4/');
    })

    document.getElementById('icon-pypi').addEventListener('click', function() {
        console.log("PyPi");
        renderIframe('https://pypi.org/user/DunderDev/');
    })

    document.getElementById('icon-replay-startup').addEventListener('click', function() {
        handleFirstTimeVisit();
});