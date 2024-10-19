let passwordBox; // Declare as global variable
let baloonHolster; // Declare as global variable
let completeHTML; // Declare as global variable

function setupReturnUserUI() {
    console.log("Returning user - startup rendering");
        const body = document.body;
        body.classList.add("home-body");
        body.classList.remove('home-body-blacked');
        const taskbar = document.getElementById("taskbar");
        taskbar.style.display = "flex";
};

function handleFirstTimeVisit() {
    console.log("First time visit - startup rendering");
    toggleSelectionBox();
    const body = document.body;
    const welcomeScreen = document.createElement("div");
    welcomeScreen.id = "welcome-screen";
    welcomeScreen.className = "welcome-screen full-screen";

    const beforeTooltip = `<div class='ws-component-grid'>
    <div class='ws-component-holster'>
        <img src='static/home/assets/me-avi.png'>
        <p class='avi-name'>Ethan L. Rose</p>
        <div class='password-buffer'>
            <div class='input-buffer'>
                <div class='field-row'>
                    <input id='text26' type='text' style='width:176px' placeholder='Password' />
                </div>
            </div>
            <div class='pass-enter' id='pass-enter'>
                <img id='pass-enter-img' src='static/home/assets/pass-enter.png'>
                <div class='baloon-holster' id='baloon-holster' style='display: none;'>
                    <div 
                        class='ws-click-tip fade-in pass-enter-tip' 
                        role='tooltip'`;
const tooltipStyles = (window.matchMedia('(max-width: 768px)').matches) ?
    `style=width:54px; font-weight:350;` :
    `style=width:86px; font-weight:500; height:46px`;
const afterTooltip = `'>
Click Here!
</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

    // Combine the parts to form the complete HTML
    completeHTML = formatString("{0}{1}{2}", beforeTooltip, tooltipStyles, afterTooltip);
    const sanitizedHTML = completeHTML.replace(/\n/g, '').replace(/\s+/g, ' ');
    welcomeScreen.innerHTML = sanitizedHTML;
    body.insertBefore(welcomeScreen, body.firstChild);

    const baloonHolster = document.getElementById("baloon-holster");
    const passwordBox = document.getElementById("text26");
    setTimeout(typewriterEffect, 500);
    document.getElementById('pass-enter').addEventListener('click', function() {
        handlePostSignInActions();
    });

    typewriterEffect(baloonHolster,passwordBox, 0);
}

function handlePostSignInActions() {
    document.getElementById('welcome-screen').remove();
    var startup_video = document.getElementById("startup");
    if (window.matchMedia("(max-width: 768px)").matches) {
        startup_video.src = "static/home/assets/startup_mobile.mp4";
        startup_video.classList.add('startup-mobile');
        startup_video.classList.remove('startup');
    }
    console.log("Starting video in mobile");
    startup_video.style.display = "block";
    startup_video.play()
    console.log(startup_video.src);
    body = document.body;
    body.classList.add("home-body");
    body.classList.remove('home-body-blacked');

    console.log(startup_video.currentTime);
    if (!startup_video.currentTime > 0) {
        console.log("Video is not playing, starting");
        console.log(startup_video.currentTime);
        startup_video.play().catch(function(error) {
            console.error('Error playing startup video:', error);
            startup_video.remove();
            taskbar.style.display = "flex";
            body.classList.add("home-body");
            body.classList.remove('home-body-blacked');
            toggleSelectionBox(initialize=true);

        });
        startup_video.addEventListener('ended', function() {
            startup_video.remove();
            taskbar.style.display = "flex";
            body.classList.add("home-body");
            body.classList.remove('home-body-blacked');
            toggleSelectionBox(initialize=true);
        })
    }

    var taskbar = document.getElementById("taskbar");


    if (startup_video.currentTime > 0) {
        console.log("Video is playing");
        console.log(startup_video.currentTime);
        startup_video.addEventListener('ended', function() {
            startup_video.remove();
            taskbar.style.display = "flex";
            toggleSelectionBox(initialize=true);
        });
    }

}

const textToType = "Win7 is the best os don't @ me";

function typewriterEffect(baloonHolster, passwordBox, textIndex) {
    console.log(textIndex)
    if (textIndex < textToType.length) {
        passwordBox.value += textToType.charAt(textIndex);
        textIndex++;

        const delay = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
        setTimeout(function() {
            typewriterEffect(baloonHolster, passwordBox, textIndex);
        }, delay);
    } else {
        baloonHolster.style.display = "block";
    }
}

function changeWin7ForMobile(elementID, updates) {
    console.log('Updating styles for mobile:', updates);
    // Get the element by ID
    const element = document.getElementById(elementID);

    // Check if the element exists
    if (!element) {
        console.error('Element not found');
        return;
    }

    // Update styles based on the updates object
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            element.style[key] = updates[key];
            styles[key] = updates[key]; // Update the styles object as well
        }
    }

    console.log('Updated styles:', styles);
}

function toggleSelectionBox(initialize=false) {
    if (initialize) {
        selectionBoxEnabled = true;
        initializeSelectionBox();
        console.log('Selection box initialized and set to enabled');
        return
    }

    selectionBoxEnabled = true ? false : true;
    console.log('Selection box toggled to:', selectionBoxEnabled);
    
    return selectionBoxEnabled;
}

const selectionBox = document.getElementById('selection-box');

let isDragging = false;
let startX, startY;

function initializeSelectionBox() {
    if (selectionBoxEnabled===false) return;

    document.addEventListener('mousedown', handleMouseDown);
}

function handleMouseDown(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = '0';
    selectionBox.style.height = '0';
    selectionBox.style.display = 'block';

    // Add subsequent event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
}

function handleMouseMove(e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = currentX - startX;
    const height = currentY - startY;

    selectionBox.style.width = `${Math.abs(width)}px`;
    selectionBox.style.height = `${Math.abs(height)}px`;
    selectionBox.style.left = `${width < 0 ? currentX : startX}px`;
    selectionBox.style.top = `${height < 0 ? currentY : startY}px`;
}

function handleMouseUp() {
    isDragging = false;
    selectionBox.style.display = 'none';

    // Remove event listeners to clean up
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseLeave);
}

function handleMouseLeave() {
    isDragging = false;
    selectionBox.style.display = 'none';

    // Remove event listeners to clean up
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseLeave);
}

function formatString(template, ...values) {
    return template.replace(/\{(\d+)\}/g, (match, index) => values[index]);
}

//render system tray arrow on mobile

const arrowButton = document.getElementById('arrow-button');
const arrow = document.getElementById('arrow');
const menu = document.getElementById('mobile-tray-menu');

arrowButton.addEventListener('click', () => {
    console.log('Arrow button clicked');
    
    // Get current aria-expanded value
    let isExpanded = arrowButton.getAttribute('aria-expanded') === 'true'; // Convert to boolean
    
    // Toggle the value (negate)
    isExpanded = !isExpanded;
    
    console.log('isExpanded:', isExpanded);
    
    // Toggle the menu visibility based on the new isExpanded value
    if (isExpanded) {
        menu.style.display = "block"  // Show the menu
        arrow.style.transform = "rotate(90deg)"; // Rotate arrow back to original
    } else {
        menu.style.display = 'none'; // Hide the menu
        arrow.style.transform = "rotate(0deg)"; // Rotate arrow 90 degrees
    }
    
    // Update the aria-expanded attribute based on the new state
    arrowButton.setAttribute('aria-expanded', isExpanded);
});

document.addEventListener('click', (event) => {
    // Check if the click was outside the menu and the arrow button
    if (!menu.contains(event.target) && !arrowButton.contains(event.target)) {
        // Close the menu if it's open
        if (arrowButton.getAttribute('aria-expanded') === 'true') {
            menu.style.display = "none"; // Optionally set display to none
            arrow.style.transform = "rotate(0deg)"; // Rotate arrow 90 degrees
            arrowButton.setAttribute('aria-expanded', 'false'); // Update aria-expanded
        }
    }
});