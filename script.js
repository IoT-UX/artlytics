// Global Variables
let isDarkMode = false;
let isAccessibilityOpen = false;
let accessibilitySettings = {
    fontSize: 'normal',
    contrast: 'normal',
    motion: 'normal',
    focusRing: true
};

// Interactive Chart Variables
let chartData = [];
let chartColor = '#3b82f6';
let currentTab = 'charts';

// Creative Tools Variables
let isDrawing = false;
let currentTool = 'brush';
let brushSize = 5;
let currentColor = '#3b82f6';
let generativeMode = 'particles';

// Data Playground Variables
let isPlaying = false;
let playgroundData = [];
let dataType = 'random';
let visualization = 'bars';
let animationSpeed = 1000;
let dataSize = 20;
let playgroundInterval;

// Gallery Data
const galleryItems = [
    {
        id: 1,
        title: "Quantum Data Flow",
        description: "Visualizing quantum state transitions through particle data",
        category: "visualization",
        views: 1247,
        likes: 89,
        image: "https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Scientific Data"
    },
    {
        id: 2,
        title: "Urban Rhythm Patterns",
        description: "City traffic data transformed into musical visualizations",
        category: "generative",
        views: 892,
        likes: 156,
        image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Urban Data"
    },
    {
        id: 3,
        title: "Climate Data Mandala",
        description: "Temperature and weather patterns in circular art form",
        category: "abstract",
        views: 2103,
        likes: 234,
        image: "https://images.pexels.com/photos/1389460/pexels-photo-1389460.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Climate Data"
    },
    {
        id: 4,
        title: "Social Network Galaxy",
        description: "Interactive exploration of social connections",
        category: "interactive",
        views: 756,
        likes: 78,
        image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Social Data"
    },
    {
        id: 5,
        title: "Economic Wave Forms",
        description: "Stock market data as flowing wave patterns",
        category: "visualization",
        views: 1456,
        likes: 198,
        image: "https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Financial Data"
    },
    {
        id: 6,
        title: "Genetic Art Sequence",
        description: "DNA data transformed into abstract generative art",
        category: "generative",
        views: 634,
        likes: 92,
        image: "https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=800",
        dataType: "Biological Data"
    }
];

// Hero Text Animation
const heroTexts = [
    "Transform Data into Art",
    "Visualize Creative Stories", 
    "Interactive Data Experience",
    "Art Meets Analytics"
];
let currentTextIndex = 0;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadSettings();
    setupEventListeners();
    initializeBackgroundAnimation();
    initializeHeroAnimation();
    initializeInteractiveChart();
    initializeGallery();
    initializeCreativeTools();
    initializeDataPlayground();
    setupScrollEffects();
}

// Settings Management
function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    const savedSettings = localStorage.getItem('accessibilitySettings');
    
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
    
    if (savedSettings) {
        accessibilitySettings = JSON.parse(savedSettings);
        applyAccessibilitySettings();
    }
}

function saveSettings() {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
}

function applyAccessibilitySettings() {
    const root = document.documentElement;
    
    // Remove existing classes
    root.className = root.className.replace(/font-size-\w+|contrast-\w+|motion-\w+/g, '');
    
    // Apply new settings
    root.classList.add(`font-size-${accessibilitySettings.fontSize}`);
    root.classList.add(`contrast-${accessibilitySettings.contrast}`);
    root.classList.add(`motion-${accessibilitySettings.motion}`);
    
    if (!accessibilitySettings.focusRing) {
        root.classList.add('no-focus-ring');
    } else {
        root.classList.remove('no-focus-ring');
    }
}

// Event Listeners
function setupEventListeners() {
    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Accessibility Menu
    document.getElementById('accessibility-toggle').addEventListener('click', toggleAccessibilityMenu);
    document.getElementById('close-accessibility').addEventListener('click', closeAccessibilityMenu);
    
    // Accessibility Tabs
    document.querySelectorAll('.accessibility-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchAccessibilityTab(this.dataset.tab);
        });
    });
    
    // Accessibility Settings
    document.querySelectorAll('.setting-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            updateAccessibilitySetting(this.dataset.setting, this.dataset.value);
        });
    });
    
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const setting = this.dataset.setting;
            const currentValue = this.dataset.value === 'true';
            updateAccessibilitySetting(setting, !currentValue);
        });
    });
    
    // Interactive Chart Controls
    setupInteractiveChartListeners();
    
    // Gallery Filters
    setupGalleryListeners();
    
    // Creative Tools
    setupCreativeToolsListeners();
    
    // Data Playground
    setupDataPlaygroundListeners();
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme Functions
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    saveSettings();
}

// Accessibility Menu Functions
function toggleAccessibilityMenu() {
    isAccessibilityOpen = !isAccessibilityOpen;
    const menu = document.getElementById('accessibility-menu');
    const toggle = document.getElementById('accessibility-toggle');
    
    menu.classList.toggle('active', isAccessibilityOpen);
    toggle.classList.toggle('active', isAccessibilityOpen);
}

function closeAccessibilityMenu() {
    isAccessibilityOpen = false;
    document.getElementById('accessibility-menu').classList.remove('active');
    document.getElementById('accessibility-toggle').classList.remove('active');
}

function switchAccessibilityTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.accessibility-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
}

function updateAccessibilitySetting(setting, value) {
    accessibilitySettings[setting] = value;
    
    // Update UI
    if (setting === 'focusRing') {
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            if (btn.dataset.setting === setting) {
                btn.classList.toggle('active', value);
                btn.dataset.value = value.toString();
            }
        });
    } else {
        document.querySelectorAll('.setting-btn').forEach(btn => {
            if (btn.dataset.setting === setting) {
                btn.classList.toggle('active', btn.dataset.value === value);
            }
        });
    }
    
    // Update motion description
    if (setting === 'motion') {
        const descriptions = {
            normal: 'All animations and transitions are enabled for a rich experience.',
            reduced: 'Animations are simplified to reduce motion sensitivity.',
            none: 'All animations are disabled for a static experience.'
        };
        const descElement = document.getElementById('motion-description');
        if (descElement) {
            descElement.textContent = descriptions[value];
        }
    }
    
    applyAccessibilitySettings();
    saveSettings();
}

// Background Animation
function initializeBackgroundAnimation() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(window.innerWidth / 20, 50);
        const colors = isDarkMode 
            ? ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24']
            : ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.3 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }
    
    function animate() {
        ctx.fillStyle = isDarkMode 
            ? 'rgba(17, 24, 39, 0.05)' 
            : 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
            
            // Draw connections
            particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = isDarkMode 
                        ? `rgba(96, 165, 250, ${opacity})` 
                        : `rgba(59, 130, 246, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    
    // Update particles when theme changes
    const originalToggleTheme = toggleTheme;
    toggleTheme = function() {
        originalToggleTheme();
        createParticles();
    };
}

// Hero Animation
function initializeHeroAnimation() {
    const animatedText = document.getElementById('animated-text');
    
    function updateText() {
        animatedText.style.opacity = '0';
        
        setTimeout(() => {
            animatedText.textContent = heroTexts[currentTextIndex];
            animatedText.style.opacity = '1';
            currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
        }, 250);
    }
    
    setInterval(updateText, 3000);
}

// Interactive Chart
function initializeInteractiveChart() {
    generateChartData();
    drawInteractiveChart();
    
    setInterval(() => {
        generateChartData();
        drawInteractiveChart();
        updateChartStats();
    }, 2000);
}

function setupInteractiveChartListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentTab = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart title and description
            const titles = {
                charts: 'Live Charts',
                users: 'User Stats',
                global: 'Global Data',
                realtime: 'Real-time'
            };
            
            const descriptions = {
                charts: 'Dynamic data visualization',
                users: 'Interactive user metrics',
                global: 'Worldwide information',
                realtime: 'Live data streams'
            };
            
            document.getElementById('chart-title').textContent = titles[currentTab];
            document.getElementById('chart-description').textContent = descriptions[currentTab];
            
            generateChartData();
            drawInteractiveChart();
        });
    });
    
    // Data range slider
    document.getElementById('data-range').addEventListener('input', function() {
        generateChartData(parseInt(this.value));
        drawInteractiveChart();
        updateChartStats();
    });
    
    // Color picker
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            chartColor = this.dataset.color;
            
            // Update active color
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            drawInteractiveChart();
        });
    });
}

function generateChartData(maxValue = 50) {
    chartData = Array.from({ length: 20 }, () => 
        Math.floor(Math.random() * maxValue) + 20
    );
}

function drawInteractiveChart() {
    const canvas = document.getElementById('interactive-chart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const padding = 40;
    const chartWidth = canvas.offsetWidth - padding * 2;
    const chartHeight = canvas.offsetHeight - padding * 2;
    
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    
    if (chartData.length === 0) return;
    
    // Draw grid
    ctx.strokeStyle = isDarkMode ? '#374151' : '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, padding + chartHeight);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw chart line
    const maxValue = Math.max(...chartData);
    ctx.strokeStyle = chartColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    chartData.forEach((value, index) => {
        const x = padding + (chartWidth / (chartData.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = chartColor;
    chartData.forEach((value, index) => {
        const x = padding + (chartWidth / (chartData.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateChartStats() {
    if (chartData.length === 0) return;
    
    const peak = Math.max(...chartData);
    const average = Math.floor(chartData.reduce((a, b) => a + b, 0) / chartData.length);
    
    document.getElementById('peak-value').textContent = peak;
    document.getElementById('average-value').textContent = average;
}

// Gallery Functions
function initializeGallery() {
    renderGallery('all');
}

function setupGalleryListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active filter
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            renderGallery(filter);
        });
    });
}

function renderGallery(filter) {
    const grid = document.getElementById('gallery-grid');
    const filteredItems = filter === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filter);
    
    grid.innerHTML = filteredItems.map(item => `
        <article class="gallery-item" tabindex="0">
            <div class="gallery-item-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <div class="gallery-item-stats">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            ${item.views.toLocaleString()}
                        </span>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            ${item.likes}
                        </span>
                    </div>
                    <div class="gallery-item-actions">
                        <button class="gallery-action-btn" aria-label="Like ${item.title}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                        <button class="gallery-action-btn" aria-label="Share ${item.title}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                <polyline points="16,6 12,2 8,6"/>
                                <line x1="12" y1="2" x2="12" y2="15"/>
                            </svg>
                        </button>
                        <button class="gallery-action-btn" aria-label="Download ${item.title}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7,10 12,15 17,10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="gallery-item-badge">${item.category}</div>
            </div>
            <div class="gallery-item-content">
                <div class="gallery-item-type">${item.dataType}</div>
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-description">${item.description}</p>
            </div>
        </article>
    `).join('');
}

// Creative Tools
function initializeCreativeTools() {
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Set initial canvas background
    ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
}

function setupCreativeToolsListeners() {
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    
    // Tool selection
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentTool = this.dataset.tool;
            
            // Update active tool
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide tool controls
            document.querySelectorAll('.tool-controls').forEach(control => {
                control.classList.add('hidden');
            });
            
            const controlId = `${currentTool}-controls`;
            const control = document.getElementById(controlId);
            if (control) {
                control.classList.remove('hidden');
            }
            
            // Update instruction text
            const instructions = {
                brush: 'Click and drag to draw',
                generative: 'Click anywhere to generate art',
                'data-art': 'Click to create data-driven patterns'
            };
            
            document.getElementById('canvas-instruction').textContent = instructions[currentTool];
        });
    });
    
    // Brush size control
    document.getElementById('brush-size').addEventListener('input', function() {
        brushSize = parseInt(this.value);
        this.nextElementSibling.textContent = `${brushSize}px`;
    });
    
    // Generative mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            generativeMode = this.dataset.mode;
            
            // Update active mode
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color palette
    document.querySelectorAll('.palette-color').forEach(btn => {
        btn.addEventListener('click', function() {
            currentColor = this.dataset.color;
            
            // Update active color
            document.querySelectorAll('.palette-color').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Canvas drawing events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Clear canvas
    document.getElementById('clear-canvas').addEventListener('click', clearCanvas);
    
    // Download art
    document.getElementById('download-art').addEventListener('click', downloadArt);
}

function startDrawing(e) {
    if (currentTool === 'brush') {
        isDrawing = true;
        draw(e);
    } else if (currentTool === 'generative') {
        generateArt(e);
    } else if (currentTool === 'data-art') {
        generateDataArt(e);
    }
}

function draw(e) {
    if (!isDrawing || currentTool !== 'brush') return;
    
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    
    if (e.type === 'touchstart') startDrawing(mouseEvent);
    else if (e.type === 'touchmove') draw(mouseEvent);
}

function generateArt(e) {
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;
    
    if (generativeMode === 'particles') {
        // Generate particle system
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const radius = Math.random() * 100 + 20;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
            ctx.fillStyle = currentColor + '80';
            ctx.fill();
        }
    } else if (generativeMode === 'waves') {
        // Generate wave patterns
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            for (let x = 0; x < canvas.offsetWidth; x += 5) {
                const y = centerY + Math.sin((x + i * 50) * 0.01) * (30 + i * 10);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
}

function generateDataArt(e) {
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;
    
    // Generate data-driven geometric patterns
    const dataPoints = Array.from({ length: 12 }, () => Math.random() * 100);
    
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((value, index) => {
        const angle = (Math.PI * 2 * index) / dataPoints.length;
        const radius = value * 1.5;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.closePath();
    ctx.stroke();
    
    // Add data points
    dataPoints.forEach((value, index) => {
        const angle = (Math.PI * 2 * index) / dataPoints.length;
        const radius = value * 1.5;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = currentColor;
        ctx.fill();
    });
}

function clearCanvas() {
    const canvas = document.getElementById('creative-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
}

function downloadArt() {
    const canvas = document.getElementById('creative-canvas');
    const link = document.createElement('a');
    link.download = 'data-art-creation.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Data Playground
function initializeDataPlayground() {
    generatePlaygroundData();
    drawPlaygroundVisualization();
    updatePlaygroundStats();
}

function setupDataPlaygroundListeners() {
    // Play/Pause button
    document.getElementById('play-pause').addEventListener('click', togglePlayground);
    
    // Refresh data button
    document.getElementById('refresh-data').addEventListener('click', function() {
        generatePlaygroundData();
        drawPlaygroundVisualization();
        updatePlaygroundStats();
    });
    
    // Data type selection
    document.querySelectorAll('.data-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            dataType = this.dataset.type;
            
            // Update active data type
            document.querySelectorAll('.data-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            generatePlaygroundData();
            drawPlaygroundVisualization();
            updatePlaygroundTitle();
        });
    });
    
    // Visualization selection
    document.querySelectorAll('.viz-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            visualization = this.dataset.viz;
            
            // Update active visualization
            document.querySelectorAll('.viz-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            drawPlaygroundVisualization();
            updatePlaygroundTitle();
        });
    });
    
    // Animation speed control
    document.getElementById('animation-speed').addEventListener('input', function() {
        animationSpeed = parseInt(this.value);
        this.nextElementSibling.textContent = `${animationSpeed}ms`;
        
        if (isPlaying) {
            clearInterval(playgroundInterval);
            startPlaygroundAnimation();
        }
    });
    
    // Data points control
    document.getElementById('data-points').addEventListener('input', function() {
        dataSize = parseInt(this.value);
        this.nextElementSibling.textContent = `${dataSize} points`;
        
        generatePlaygroundData();
        drawPlaygroundVisualization();
        updatePlaygroundStats();
    });
}

function togglePlayground() {
    isPlaying = !isPlaying;
    
    const playBtn = document.getElementById('play-pause');
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    const playText = playBtn.querySelector('.play-text');
    
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        playText.textContent = 'Pause';
        startPlaygroundAnimation();
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        playText.textContent = 'Play';
        clearInterval(playgroundInterval);
    }
    
    updatePlaygroundStatus();
}

function startPlaygroundAnimation() {
    playgroundInterval = setInterval(() => {
        generatePlaygroundData();
        drawPlaygroundVisualization();
        updatePlaygroundStats();
    }, animationSpeed);
}

function generatePlaygroundData() {
    switch (dataType) {
        case 'random':
            playgroundData = Array.from({ length: dataSize }, () => 
                Math.floor(Math.random() * 100)
            );
            break;
        case 'sine':
            playgroundData = Array.from({ length: dataSize }, (_, i) => 
                Math.floor((Math.sin(i * 0.3) + 1) * 50)
            );
            break;
        case 'fibonacci':
            const fib = [1, 1];
            for (let i = 2; i < dataSize; i++) {
                fib[i] = (fib[i - 1] + fib[i - 2]) % 100;
            }
            playgroundData = fib.slice(0, dataSize);
            break;
        case 'primes':
            const primes = [];
            let num = 2;
            while (primes.length < dataSize) {
                let isPrime = true;
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime) primes.push(num % 100);
                num++;
            }
            playgroundData = primes;
            break;
    }
}

function drawPlaygroundVisualization() {
    const canvas = document.getElementById('playground-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    
    if (playgroundData.length === 0) return;
    
    const maxValue = Math.max(...playgroundData);
    const color = isDarkMode ? '#60a5fa' : '#3b82f6';
    
    switch (visualization) {
        case 'bars':
            drawBars(ctx, canvas, playgroundData, maxValue, color);
            break;
        case 'line':
            drawLine(ctx, canvas, playgroundData, maxValue, color);
            break;
        case 'circles':
            drawCircles(ctx, canvas, playgroundData, maxValue, color);
            break;
        case 'spiral':
            drawSpiral(ctx, canvas, playgroundData, maxValue, color);
            break;
    }
}

function drawBars(ctx, canvas, data, maxValue, color) {
    const padding = 20;
    const barWidth = (canvas.offsetWidth - padding * 2) / data.length;
    
    data.forEach((value, index) => {
        const height = (value / maxValue) * (canvas.offsetHeight - padding * 2);
        const x = padding + index * barWidth;
        const y = canvas.offsetHeight - padding - height;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth - 2, height);
    });
}

function drawLine(ctx, canvas, data, maxValue, color) {
    const padding = 20;
    const width = canvas.offsetWidth - padding * 2;
    const height = canvas.offsetHeight - padding * 2;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * width;
        const y = padding + height - (value / maxValue) * height;
        
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = color;
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * width;
        const y = padding + height - (value / maxValue) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawCircles(ctx, canvas, data, maxValue, color) {
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;
    
    ctx.fillStyle = color + '80';
    
    data.forEach((value, index) => {
        const angle = (index / data.length) * Math.PI * 2;
        const distance = (index / data.length) * maxRadius;
        const radius = (value / maxValue) * 20 + 5;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawSpiral(ctx, canvas, data, maxValue, color) {
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    
    ctx.fillStyle = color;
    
    data.forEach((value, index) => {
        const angle = (index / data.length) * Math.PI * 4;
        const radius = (value / maxValue) * 100 + 20;
        const size = (value / maxValue) * 8 + 2;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updatePlaygroundStats() {
    if (playgroundData.length === 0) return;
    
    const max = Math.max(...playgroundData);
    const min = Math.min(...playgroundData);
    const avg = Math.floor(playgroundData.reduce((a, b) => a + b, 0) / playgroundData.length);
    const count = playgroundData.length;
    
    document.getElementById('max-stat').textContent = max;
    document.getElementById('min-stat').textContent = min;
    document.getElementById('avg-stat').textContent = avg;
    document.getElementById('count-stat').textContent = count;
}

function updatePlaygroundTitle() {
    const dataTypeNames = {
        random: 'Random Numbers',
        sine: 'Sine Wave',
        fibonacci: 'Fibonacci',
        primes: 'Prime Numbers'
    };
    
    const vizNames = {
        bars: 'Bar Chart',
        line: 'Line Chart',
        circles: 'Circle Pack',
        spiral: 'Spiral'
    };
    
    const title = `${dataTypeNames[dataType]} - ${vizNames[visualization]}`;
    document.getElementById('viz-title').textContent = title;
}

function updatePlaygroundStatus() {
    const status = isPlaying ? 'Animation running' : 'Animation paused';
    document.getElementById('viz-status').textContent = status;
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Close accessibility menu with Escape key
    if (e.key === 'Escape' && isAccessibilityOpen) {
        closeAccessibilityMenu();
    }
    
    // Toggle accessibility menu with Alt + A
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        toggleAccessibilityMenu();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Redraw canvases
    drawInteractiveChart();
    drawPlaygroundVisualization();
    
    // Reinitialize creative canvas
    const creativeCanvas = document.getElementById('creative-canvas');
    if (creativeCanvas) {
        const ctx = creativeCanvas.getContext('2d');
        creativeCanvas.width = creativeCanvas.offsetWidth * window.devicePixelRatio;
        creativeCanvas.height = creativeCanvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        ctx.fillStyle = isDarkMode ? '#1f2937' : '#ffffff';
        ctx.fillRect(0, 0, creativeCanvas.offsetWidth, creativeCanvas.offsetHeight);
    }
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(function() {
    drawInteractiveChart();
    drawPlaygroundVisualization();
}, 250));