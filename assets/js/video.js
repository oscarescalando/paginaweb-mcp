document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('interactiveVideo');
    const tooltipDisplay = document.getElementById('tooltipDisplay');
    const tooltipsListContainer = document.getElementById('tooltipsList');

    // IMPORTANT: Make sure the video file specified in HTML is available.
    // If the video doesn't load, `loadedmetadata` and `timeupdate` events might not fire correctly.
    // You may need to ensure the video is present or provide a valid source.

    const tooltipsData = [
        { time: 2, duration: 5, text: "Woman in red jacket: A visitor enjoys the serene view from the pier at Laguna Mucubají." },
        { time: 4, duration: 5, text: "Wooden Pier & Information Signs: The pier offers access to the lake and provides information about the local ecosystem." },
        { time: 10, duration: 5, text: "Vlogger/Tourist Group: Laguna Mucubají is a popular spot for tourists and content creators." },
        { time: 16, duration: 4, text: "Visitor Posing: Another tourist enjoying the picturesque scenery of the Andes." },
        { time: 22, duration: 5, text: "Lakeshore Stroll: Exploring the banks of the high-altitude lagoon." },
        { time: 28, duration: 4, text: "Drone Pilot with DJI Backpack: Preparing for or returning from an aerial filming session." },
        { time: 33, duration: 8, text: "Aerial View of Laguna Mucubají: A stunning bird's-eye perspective of the glacial lake." },
        { time: 45, duration: 8, text: "Andean Páramo Landscape: Characterized by high-altitude grasslands and unique flora, surrounded by mountains and pine forests." },
        { time: 56, duration: 3, text: "VZLA AERIAL Logo: The creators of this beautiful aerial footage." }
    ];

    // Populate tooltips list and add click listeners
    tooltipsData.forEach(tip => {
        const listItem = document.createElement('li');
        
        // Format time for display
        const minutes = Math.floor(tip.time / 60);
        const seconds = Math.floor(tip.time % 60);
        const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        listItem.innerHTML = `<strong>${displayTime}</strong> - ${tip.text}`;
        listItem.dataset.time = tip.time; // Store time for easy access

        listItem.addEventListener('click', () => {
            video.currentTime = tip.time;
            if (video.paused) { // Play if paused, helps if user clicks while video is stopped
                video.play();
            }
            // Optional: scroll to video if it's not in view
            // video.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        tooltipsListContainer.appendChild(listItem);
    });

    let currentTooltip = null;

    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        let activeTooltipData = null;

        for (const tip of tooltipsData) {
            if (currentTime >= tip.time && currentTime < tip.time + tip.duration) {
                activeTooltipData = tip;
                break;
            }
        }

        if (activeTooltipData) {
            if (currentTooltip !== activeTooltipData) {
                tooltipDisplay.textContent = activeTooltipData.text;
                tooltipDisplay.style.display = 'block';
                currentTooltip = activeTooltipData;
            }
        } else {
            if (currentTooltip !== null) {
                tooltipDisplay.style.display = 'none';
                currentTooltip = null;
            }
        }
    });

    // Handle video end to hide any lingering tooltip
    video.addEventListener('ended', () => {
        tooltipDisplay.style.display = 'none';
        currentTooltip = null;
    });

    // Initial check in case the video starts playing from a non-zero time (e.g., via URL fragment)
    // This requires the video metadata to be loaded.
    video.addEventListener('loadedmetadata', () => {
        // Force an initial check if needed, though timeupdate should handle it
        // For now, let 'timeupdate' handle it as the video plays.
    });

});