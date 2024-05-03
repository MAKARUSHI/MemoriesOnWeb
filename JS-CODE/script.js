// Import memoriesImgs and memoriesVideos properly
import memoriesImgs from './memoriesImgs.js';
import memoriesVideos from './memoriesVideos.js';

// Check if elements exist before manipulating them
function displayRandomImage() {
    const imageContainer = document.getElementById('dailyImg');
    if (!imageContainer) return; // Exit function if element doesn't exist

    const randomImgIndex = Math.floor(Math.random() * memoriesImgs.length);
    const randomImgElement = document.createElement('img');
    randomImgElement.src = memoriesImgs[randomImgIndex];

    imageContainer.innerHTML = '';
    imageContainer.appendChild(randomImgElement);
}

function displayRandomVideo() {
    const videoContainer = document.getElementById('dailyVideo');
    if (!videoContainer) return; // Exit function if element doesn't exist

    const randomVideoIndex = Math.floor(Math.random() * memoriesVideos.length);
    const randomVideoElement = document.createElement('video');
    randomVideoElement.src = memoriesVideos[randomVideoIndex];
    randomVideoElement.autoplay = true;
    randomVideoElement.controls = true;

    videoContainer.innerHTML = '';
    videoContainer.appendChild(randomVideoElement);
}

// Run code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Call your functions after the DOM is ready
    displayRandomImage();
    displayRandomVideo();

    // Add event listener to filter media on checkbox change
    document.getElementById('showImages').addEventListener('change', filterMedia);
    document.getElementById('showVideos').addEventListener('change', filterMedia);
    document.getElementById('showAll').addEventListener('change', filterMedia);

    filterMedia(); // Initial call to filter media based on checkbox states
});

//DISPLAY IMGS/VIDEOS
//DISPLAY IMGS/VIDEOS
const mediaData = [
    ...memoriesImgs.map(imgSrc => ({ type: 'image', src: imgSrc })),
    ...memoriesVideos.map(videoSrc => ({ type: 'video', src: videoSrc }))
];

function filterMedia() {
    const showImages = document.getElementById('showImages').checked;
    const showVideos = document.getElementById('showVideos').checked;
    const showAll = document.getElementById('showAll').checked;

    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.innerHTML = ''; 

    mediaData.forEach(media => {
        let isVisible = false;

        if (showAll || (showImages && media.type === 'image') || (showVideos && media.type === 'video')) {
            isVisible = true;
        }

        if (isVisible) {
            const mediaElement = createMediaElement(media);
            mediaContainer.appendChild(mediaElement);
        }
    });
}

function createMediaElement(media) {
    let mediaElement;
    if (media.type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = media.src;
        mediaElement.alt = 'Image';
    } else if (media.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = media.src;
        mediaElement.controls = true;
        mediaElement.setAttribute('type', 'video/mp4');
    }
    return mediaElement;
}

document.addEventListener('DOMContentLoaded', function () {
    const mediaContainer = document.getElementById('mediaContainer');

    mediaContainer.addEventListener('click', function (event) {
        const target = event.target;

        if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
            toggleFullscreen(target);
        }
    });

    function toggleFullscreen(element) {
        if (!document.fullscreenElement) {
            element.requestFullscreen().catch(err => {
                console.error('Error attempting to enable full-screen mode:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', function () {
        if (!document.fullscreenElement) {
            // Remove fullscreen class from all media elements
            const allMediaElements = mediaContainer.querySelectorAll('img, video');
            allMediaElements.forEach(element => {
                element.classList.remove('fullscreen');
            });
        }
    });
});
