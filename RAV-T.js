const indicator = document.getElementById("indicator");
const gearText = document.getElementById("gear-text");
const gearLabels = document.querySelectorAll(".gear-labels span");

const positions = {
    "N": "10px",
    "R": "60px",
    "D2": "110px",
    "D1": "160px"
};

const defaultGear = "N";
let currentGear = defaultGear;

// Set initial gear position
function setGear(gear) {
    currentGear = gear;
    indicator.style.top = positions[gear];
    gearText.textContent = gear;

    // Update active state
    gearLabels.forEach(label => {
        if (label.id === gear) {
            label.classList.add("active");
        } else {
            label.classList.remove("active");
        }
    });
}

// Add event listeners for gear selection
gearLabels.forEach(label => {
    label.addEventListener("click", () => {
        setGear(label.id);
    });
});

// Initialize default gear
setGear(defaultGear);

const button = document.getElementById('start-stop-btn');
const buttonText = button.querySelector('span');

// Toggle button state
button.addEventListener('click', function() {
    // Toggle the 'active' class
    button.classList.toggle('active');
    
    // Change text based on the active state
    if (button.classList.contains('active')) {
        buttonText.textContent = 'Stop';
    } else {
        buttonText.textContent = 'Start';
    }
});

function updateFrontContent() {
    const selectedOption = document.getElementById("front-feed-select").value;
    const contentDiv = document.getElementById("front-content");
    contentDiv.innerHTML = ""; // Clear previous content
    contentDiv.style.backgroundColor = "black"; // Default black background
    contentDiv.style.color = "white"; // Default text color
    contentDiv.style.fontSize = "1em"; // Default font size
    contentDiv.style.justifyContent = "center"; // Center text

    const feed1URL = localStorage.getItem('front-feed'); // Get stored URL for front feed
    const mapURL = localStorage.getItem('front-map-feed'); // Get stored map URL if needed

    if (selectedOption === "camera" && feed1URL) {
        // Show video feed with sound from localStorage
        const videoElement = document.createElement("video");
        videoElement.src = feed1URL;
        videoElement.autoplay = true;
        videoElement.loop = true;  // Loop the video for continuous playback
        videoElement.playsinline = true;  // Make the video play inline on mobile
        contentDiv.appendChild(videoElement);
    } else if (selectedOption === "map" && mapURL) {
        // Show map from localStorage
        const map = document.createElement("iframe");
        map.src = mapURL; // Replace with URL stored in localStorage
        map.width = "100%";
        map.height = "100%";
        contentDiv.appendChild(map);
    } else {
        contentDiv.textContent = "OFFLINE"; // Default text
    }
}

function updateRearContent() {
    const selectedOption = document.getElementById("rear-feed-select").value;
    const contentDiv = document.getElementById("rear-content");
    contentDiv.innerHTML = ""; // Clear previous content
    contentDiv.style.backgroundColor = "black"; // Default black background
    contentDiv.style.color = "white"; // Default text color
    contentDiv.style.fontSize = "1em"; // Default font size
    contentDiv.style.justifyContent = "center"; // Center text

    const feed2URL = localStorage.getItem('rear-feed'); // Get stored URL for rear feed
    const mapURL = localStorage.getItem('rear-map-feed'); // Get stored map URL if needed

    if (selectedOption === "camera" && feed2URL) {
        // Show video feed with sound from localStorage
        const videoElement = document.createElement("video");
        videoElement.src = feed2URL;
        videoElement.autoplay = true;
        videoElement.loop = true;  // Loop the video for continuous playback
        videoElement.playsinline = true;  // Make the video play inline on mobile
        contentDiv.appendChild(videoElement);
    } else if (selectedOption === "map" && mapURL) {
        // Show map from localStorage
        const map = document.createElement("iframe");
        map.src = mapURL; // Replace with URL stored in localStorage
        map.width = "100%";
        map.height = "100%";
        contentDiv.appendChild(map);
    } else {
        contentDiv.textContent = "OFFLINE"; // Default text
    }
}

function updateLeftContent() {
    const selectedOption = document.getElementById("left-feed-select").value;
    const contentDiv = document.getElementById("left-content");
    contentDiv.innerHTML = ""; // Clear previous content
    contentDiv.style.backgroundColor = "black"; // Default black background
    contentDiv.style.color = "white"; // Default text color
    contentDiv.style.fontSize = "1em"; // Default font size
    contentDiv.style.justifyContent = "center"; // Center text

    const feed3URL = localStorage.getItem('left-feed'); // Get stored URL for left feed
    const mapURL = localStorage.getItem('left-map-feed'); // Get stored map URL if needed

    if (selectedOption === "camera" && feed3URL) {
        // Show video feed with sound from localStorage
        const videoElement = document.createElement("video");
        videoElement.src = feed3URL;
        videoElement.autoplay = true;
        videoElement.loop = true;  // Loop the video for continuous playback
        videoElement.playsinline = true;  // Make the video play inline on mobile
        contentDiv.appendChild(videoElement);
    } else if (selectedOption === "map" && mapURL) {
        // Show map from localStorage
        const map = document.createElement("iframe");
        map.src = mapURL; // Replace with URL stored in localStorage
        map.width = "100%";
        map.height = "100%";
        contentDiv.appendChild(map);
    } else {
        contentDiv.textContent = "OFFLINE"; // Default text
    }
}

function updateRightContent() {
    const selectedOption = document.getElementById("right-feed-select").value;
    const contentDiv = document.getElementById("right-content");
    contentDiv.innerHTML = ""; // Clear previous content
    contentDiv.style.backgroundColor = "black"; // Default black background
    contentDiv.style.color = "white"; // Default text color
    contentDiv.style.fontSize = "1em"; // Default font size
    contentDiv.style.justifyContent = "center"; // Center text

    const feed4URL = localStorage.getItem('right-feed'); // Get stored URL for right feed
    const mapURL = localStorage.getItem('right-map-feed'); // Get stored map URL if needed

    if (selectedOption === "camera" && feed4URL) {
        // Show video feed with sound from localStorage
        const videoElement = document.createElement("video");
        videoElement.src = feed4URL;
        videoElement.autoplay = true;
        videoElement.loop = true;  // Loop the video for continuous playback
        videoElement.playsinline = true;  // Make the video play inline on mobile
        contentDiv.appendChild(videoElement);
    } else if (selectedOption === "map" && mapURL) {
        // Show map from localStorage
        const map = document.createElement("iframe");
        map.src = mapURL; // Replace with URL stored in localStorage
        map.width = "100%";
        map.height = "100%";
        contentDiv.appendChild(map);
    } else {
        contentDiv.textContent = "OFFLINE"; // Default text
    }
}

const buttonContainers = document.querySelectorAll('.button-container');

        buttonContainers.forEach(buttonContainer => {
            const menuId = buttonContainer.getAttribute('data-menu-id'); // Get the corresponding menu ID
            const menu = document.getElementById(menuId); // Get the menu by ID

            // Add event listener to toggle the menu visibility when a button is clicked
            buttonContainer.addEventListener('click', () => {
                // Close all other menus first
                document.querySelectorAll('.menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.display = 'none'; // Hide other menus
                    }
                });

                // Toggle the current menu visibility
                if (menu.style.display === 'none' || menu.style.display === '') {
                    menu.style.display = 'block'; // Show the current menu
                    const rect = buttonContainer.getBoundingClientRect();
                    menu.style.top = `${rect.top}px`;
                    menu.style.left = `${rect.right + 10}px`; // Position 10px to the right of the button container
                } else {
                    menu.style.display = 'none'; // Hide the current menu if it was already visible
                }
            });
        });

        // Optionally, close all menus when clicking outside
        window.addEventListener("click", (event) => {
            if (!event.target.closest('.buttonhub1')) {
                document.querySelectorAll('.menu').forEach(menu => {
                    menu.style.display = "none"; // Hide all menus when clicking outside
                });
            }
        });