 document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const startOverlay = document.getElementById('start-overlay');
            const startBtn = document.getElementById('start-btn');
            const messageScreens = document.querySelectorAll('.message-screen');
            const replayBtn = document.getElementById('replay-btn');
            const shareBtn = document.getElementById('share-btn');
            const progressBar = document.querySelector('.progress-bar');
            const musicControl = document.getElementById('music-control');
            const backgroundMusic = document.getElementById('background-music');
            const heartsContainer = document.getElementById('hearts-container');
            
            // Variables
            let currentScreen = 0;
            let musicPlaying = false;
            
            // Initialize
            function init() {
                // Hide all message screens initially
                messageScreens.forEach(screen => {
                    screen.style.display = 'none';
                });
                
                // Set up event listeners
                startBtn.addEventListener('click', startExperience);
                document.addEventListener('click', advanceScreen);
                document.addEventListener('keydown', handleKeyPress);
                replayBtn.addEventListener('click', restartExperience);
                shareBtn.addEventListener('click', shareExperience);
                musicControl.addEventListener('click', toggleMusic);
                
                // Create floating hearts
                createHearts();
            }
            
            // Start the experience
            function startExperience() {
                startOverlay.style.opacity = '0';
                setTimeout(() => {
                    startOverlay.style.display = 'none';
                    showScreen(0);
                    playMusic();
                }, 800);
                
                // Update progress bar
                updateProgressBar();
            }
            
            // Show a specific screen
            function showScreen(index) {
                // Hide all screens
                messageScreens.forEach(screen => {
                    screen.style.display = 'none';
                    screen.classList.remove('active');
                });
                
                // Show the requested screen
                if (index < messageScreens.length) {
                    messageScreens[index].style.display = 'block';
                    setTimeout(() => {
                        messageScreens[index].classList.add('active');
                    }, 50);
                    
                    currentScreen = index;
                    updateProgressBar();
                }
            }
            
            // Advance to the next screen
            function advanceScreen() {
                if (!startOverlay.style.display || startOverlay.style.display === 'none') {
                    if (currentScreen < messageScreens.length - 1) {
                        showScreen(currentScreen + 1);
                    }
                }
            }
            
            // Handle keyboard navigation
            function handleKeyPress(e) {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
                    advanceScreen();
                } else if (e.key === 'ArrowLeft' && currentScreen > 0) {
                    showScreen(currentScreen - 1);
                }
            }
            
            // Restart the experience
            function restartExperience() {
                showScreen(0);
                playMusic();
            }
            
            // Share the experience
            function shareExperience() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Special Birthday Message',
                        text: 'Check out this beautiful birthday message!',
                        url: window.location.href
                    })
                    .catch(() => {
                        alert('Share this URL: ' + window.location.href);
                    });
                } else {
                    alert('Share this URL: ' + window.location.href);
                }
            }
            
            // Play background music
            function playMusic() {
                if (!musicPlaying) {
                    backgroundMusic.volume = 0.4;
                    backgroundMusic.play()
                        .then(() => {
                            musicPlaying = true;
                            musicControl.innerHTML = '<i>🔊</i>';
                        })
                        .catch(error => {
                            console.log('Audio play failed:', error);
                        });
                }
            }
            
            // Toggle music on/off
            function toggleMusic() {
                if (musicPlaying) {
                    backgroundMusic.pause();
                    musicControl.innerHTML = '<i>🔇</i>';
                } else {
                    backgroundMusic.play();
                    musicControl.innerHTML = '<i>🔊</i>';
                }
                musicPlaying = !musicPlaying;
            }
            
            // Update progress bar
            function updateProgressBar() {
                const progress = (currentScreen / (messageScreens.length - 1)) * 100;
                progressBar.style.width = progress + '%';
            }
            
            // Create floating hearts
            function createHearts() {
                const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '💞'];
                
                for (let i = 0; i < 25; i++) {
                    setTimeout(() => {
                        createHeart();
                    }, i * 300);
                }
                
                function createHeart() {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                    
                    // Random position
                    heart.style.left = Math.random() * 100 + 'vw';
                    
                    // Random size
                    const size = Math.random() * 25 + 15;
                    heart.style.fontSize = size + 'px';
                    
                    // Random animation duration
                    const duration = Math.random() * 4 + 4;
                    heart.style.animationDuration = duration + 's';
                    
                    // Random delay
                    const delay = Math.random() * 5;
                    heart.style.animationDelay = delay + 's';
                    
                    heartsContainer.appendChild(heart);
                    
                    // Remove heart after animation completes
                    setTimeout(() => {
                        heart.remove();
                    }, (duration + delay) * 1000);
                }
                
                // Continuously create hearts
                setInterval(createHeart, 500);
            }
            
            // Initialize the experience
            init();
        });