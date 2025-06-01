// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ffd700', '#ffcc00', '#ffdb4d', '#ffed4a', '#fff176', '#ffeb3b', '#fdd835']
        },
        shape: {
            type: ['circle', 'triangle', 'star'],
        },
        opacity: {
            value: 0.6,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffd700',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'bubble'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            bubble: {
                distance: 200,
                size: 4,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            push: {
                particles_nb: 3
            }
        }
    },
    retina_detect: true
});

// Sample games data with additional information
const games = [
    {
        id: 1,
        title: "Meow Blossom Match",
        category: "puzzle",
        image: "images/meow_blossom.png",
        description: "Cute kitten match-3 puzzle! Match flowers, decorate, and relax now!",
        downloads: "5k",
        ranking: "#1 in store",
        playTime: "100k Minutes of Play Time",
        androidLink: "https://play.google.com/store/apps/details?id=com.xikelabs.meowblossommatch",
        iosLink: "null"
    },
    {
        id: 2,
        title: "Hair Dye",
        category: "action",
        image: "images/game2.png",
        description: "Dye hair with realistic colors and effects. Experiment with different styles.",
        downloads: "115M",
        ranking: "#1 in 100 Countries",
        playTime: "2B Minutes of Play Time",
        androidLink: "null",
        iosLink: "null",
        //switchLink: "https://www.nintendo.com/games/detail/hair-dye"
    },
    {
        id: 3,
        title: "Makeup Kit - Color Mixing",
        category: "other",
        image: "images/game3.png",
        description: "Mix and match colors to create perfect makeup combinations.",
        downloads: "75M",
        ranking: "#1 in Beauty Games",
        playTime: "1.5B Minutes of Play Time",
        androidLink: "null",
        iosLink: "null"
    }
];

// DOM Elements
const gamesContainer = document.querySelector('.games-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Modal functionality
const modal = document.getElementById('downloadModal');
const modalClose = modal.querySelector('.modal-close');
const modalGameImage = document.getElementById('modalGameImage');
const modalGameTitle = document.getElementById('modalGameTitle');
const modalGameDescription = document.getElementById('modalGameDescription');
const modalGameSize = document.getElementById('modalGameSize');
const modalGameVersion = document.getElementById('modalGameVersion');
const modalDownloadBtn = modal.querySelector('.modal-download-btn');

function openModal(game) {
    modalGameImage.src = game.image;
    modalGameTitle.textContent = game.title;
    modalGameDescription.textContent = game.description;
    modalGameSize.textContent = game.size;
    modalGameVersion.textContent = game.version;
    modalDownloadBtn.setAttribute('data-download-url', game.downloadUrl);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal when clicking close button
modalClose.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Handle download button click
modalDownloadBtn.addEventListener('click', () => {
    const downloadUrl = modalDownloadBtn.getAttribute('data-download-url');
    // Here you can implement the actual download logic
    console.log('Downloading game from:', downloadUrl);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize DOM elements
    const gamesContainer = document.querySelector('.games-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if games container exists
    if (!gamesContainer) {
        console.error('Games container not found!');
        return;
    }

    // Display all games first
    console.log('Displaying games...');
    displayGames('all');
    
    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            console.log('Filter clicked:', category);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display filtered games
            displayGames(category);
        });
    });

    // Setup other functionality
    setupEventListeners();
    initializeAnimations();
    addMetallicEffect();
    setupMobileMenu();
    
    // Initialize particles.js
    // if (typeof particlesJS !== 'undefined') {
    //     particlesJS('particles-js', particlesConfig);
    // }
});

// Display games based on category
function displayGames(category) {
    console.log('Displaying games for category:', category);
    console.log('Available games:', games);
    
    // Get the games container
    const gamesContainer = document.querySelector('.games-container');
    if (!gamesContainer) {
        console.error('Games container not found');
        return;
    }
    
    // Clear current games
    gamesContainer.innerHTML = '';
    
    // Filter games based on category
    const filteredGames = category === 'all' 
        ? games 
        : games.filter(game => game.category === category);

    console.log('Filtered games:', filteredGames);

    // Create and append game cards
    filteredGames.forEach((game, index) => {
        const gameCard = createGameCard(game);
        gameCard.style.animationDelay = `${index * 0.1}s`;
        gamesContainer.appendChild(gameCard);
    });
}

// Create game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card animate__animated animate__fadeInUp';
    
    const platformIcons = `
        <div class="platform-icons">
            ${game.androidLink !== "null" ? `
                <a href="${game.androidLink}" class="platform-icon android" target="_blank" aria-label="Download on Android">
                    <i class="fab fa-android"></i>
                </a>
            ` : ''}
            ${game.iosLink !== "null" ? `
                <a href="${game.iosLink}" class="platform-icon ios" target="_blank" aria-label="Download on iOS">
                    <i class="fab fa-apple"></i>
                </a>
            ` : ''}
            ${game.switchLink ? `
                <a href="${game.switchLink}" class="platform-icon switch" target="_blank" aria-label="Available on Nintendo Switch">
                    <i class="fas fa-gamepad"></i>
                </a>
            ` : ''}
        </div>
    `;
    
    card.innerHTML = `
        <div class="game-card-image">
            <img src="${game.image}" alt="${game.title} - ${game.description}" loading="lazy">
            <div class="game-stats">
                ${game.downloads ? `<div class="stat-item">${game.downloads} Downloads</div>` : ''}
                ${game.ranking ? `<div class="stat-item">${game.ranking}</div>` : ''}
                ${game.playTime ? `<div class="stat-item">${game.playTime}</div>` : ''}
            </div>
        </div>
        <div class="game-card-content">
            <h2 class="game-title">${game.title}</h2>
            <meta name="description" content="${game.description}">
        </div>
        ${platformIcons}
    `;
    
    // Prevent modal from opening when clicking platform icons
    const platformIconsElement = card.querySelector('.platform-icons');
    if (platformIconsElement) {
        platformIconsElement.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display filtered games
            displayGames(button.dataset.filter);
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Responsive navigation
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Add scroll reveal animations
    const elements = document.querySelectorAll('.game-card, .footer-section');
    elements.forEach(element => {
        element.classList.add('animate__animated', 'animate__fadeInUp');
    });

    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.btn-download, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Add metallic effect to elements
function addMetallicEffect() {
    // Add shimmer effect to buttons
    const buttons = document.querySelectorAll('.btn-download, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Add floating animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'float 6s ease-in-out infinite';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Setup mobile menu
function setupMobileMenu() {
    // Create mobile navigation if it doesn't exist
    let mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav) {
        const nav = document.createElement('div');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <div class="mobile-nav-links">
                <a href="#games-grid">Games</a>
                <a href="#footer-content">About</a>
                <a href="#footer-content">Contact</a>
            </div>
            <div class="mobile-nav-buttons">
                <a href="#" class="btn-download">Download Games</a>
                <a href="#" class="btn-language">EN <i class="fas fa-chevron-down"></i></a>
            </div>
        `;
        document.body.appendChild(nav);
        mobileNav = nav;
    }

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        }, 250);
    });
} 