/**
 * Main Application Controller
 * Handles routing, event listeners, and data flow.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- INITIALIZATION ---
    function init() {
        console.log('CityPulse Initializing...');
        
        UI.initModal();
        
        // Setup Event Listeners
        setupNavigation();
        setupMobileNav();     // New
        setupSidebarToggle();
        setupThemeToggle();
        setupAlertFilters();
        setupMapZones();
        setupFeedbackForm();

        // Load initial page content
        loadDashboard();
        loadAlerts();
        loadCommunityStats(); // New

        // Start live clock
        UI.updateTime();
        setInterval(UI.updateTime, 10000); 

        startDataSimulation(); 

        handleHashChange();
    }

    // --- ROUTING ---
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                navigateTo(pageId);
                window.location.hash = pageId;
            });
        });
        
        window.addEventListener('hashchange', handleHashChange);
    }
    
    // NEW: Mobile Navigation
    function setupMobileNav() {
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                navigateTo(pageId);
                window.location.hash = pageId;
            });
        });
    }

    function handleHashChange() {
        const pageId = window.location.hash.substring(1) || 'home';
        navigateTo(pageId);
    }

    function navigateTo(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Deactivate all nav links (Desktop)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        // Deactivate all nav links (Mobile)
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Activate the target nav link (Desktop)
        const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        // Activate the target nav link (Mobile)
        const targetMobileLink = document.querySelector(`.mobile-nav-link[data-page="${pageId}"]`);
        if (targetMobileLink) {
            targetMobileLink.classList.add('active');
        }

        // Scroll to top on page change
        window.scrollTo(0, 0);
    }

    // --- INTERACTIVE FEATURES ---

    function setupSidebarToggle() {
        const toggleBtn = document.getElementById('sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('sidebar-collapsed');
        });
    }

    function setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        
        const savedTheme = localStorage.getItem('citypulse-theme') || 'dark';
        document.body.dataset.theme = savedTheme;

        toggleBtn.addEventListener('click', () => {
            let currentTheme = document.body.dataset.theme;
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.dataset.theme = newTheme;
            localStorage.setItem('citypulse-theme', newTheme);
        });
    }

    function startDataSimulation() {
        UI.updateDashboard(cityData.dashboard);

        setInterval(() => {
            let aqiChange = Math.floor(Math.random() * 6) - 3;
            let trafficChange = Math.floor(Math.random() * 10) - 5;
            
            cityData.dashboard.aqi += aqiChange;
            cityData.dashboard.traffic += trafficChange;

            if (cityData.dashboard.aqi < 20) cityData.dashboard.aqi = 20;
            if (cityData.dashboard.aqi > 180) cityData.dashboard.aqi = 180;
            if (cityData.dashboard.traffic < 10) cityData.dashboard.traffic = 10;
            if (cityData.dashboard.traffic > 100) cityData.dashboard.traffic = 100;

            UI.updateDashboard(cityData.dashboard);

        }, 5000);
    }


    // --- PAGE-SPECIFIC LOGIC ---

    function loadDashboard() {
        // Handled by startDataSimulation()
    }

    function loadAlerts() {
        const sortedAlerts = cityData.alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        UI.renderAlerts(sortedAlerts);
    }

    // NEW: Load Community Stats
    function loadCommunityStats() {
        // Use a timeout to make the animation more noticeable on page load
        setTimeout(() => {
            UI.renderCommunityStats(cityData.communityStats);
        }, 500); // Start animation shortly after page load
    }

    function setupAlertFilters() {
        const filterContainer = document.querySelector('.filter-controls');
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filter = e.target.getAttribute('data-filter');
                filterAlerts(filter);
            }
        });
    }

    function filterAlerts(category) {
        let filteredAlerts;
        if (category === 'all') {
            filteredAlerts = cityData.alerts;
        } else {
            filteredAlerts = cityaData.alerts.filter(alert => alert.category === category);
        }
        const sortedAlerts = filteredAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        UI.renderAlerts(sortedAlerts);
    }

    function setupMapZones() {
        document.querySelectorAll('.map-zone').forEach(zone => {
            zone.addEventListener('click', (e) => {
                const zoneId = e.currentTarget.getAttribute('data-zone');
                const zoneData = cityData.mapZones[zoneId];
                
                if (zoneData) {
                    const modalTitle = zoneData.title;
                    const modalContent = `
                        <div class="modal-map-info">
                            <i class="${zoneData.icon}"></i>
                            <div>
                                <p>${zoneData.info}</p>
                                <strong>${zoneData.contact}</strong>
                            </div>
                        </div>
                    `;
                    UI.openModal(modalTitle, modalContent);
                }
            });
        });
    }

    function setupFeedbackForm() {
        const form = document.getElementById('feedback-form');
        const nameField = document.getElementById('user-name');
        const emailField = document.getElementById('user-email');
        const messageField = document.getElementById('user-message');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isNameValid = UI.validateField(nameField);
            const isEmailValid = UI.validateField(emailField);
            const isMessageValid = UI.validateField(messageField);

            if (isNameValid && isEmailValid && isMessageValid) {
                console.log('Form Submitted:', {
                    name: nameField.value,
                    email: emailField.value,
                    subject: document.getElementById('user-subject').value,
                    message: messageField.value
                });

                const successTitle = "Feedback Submitted!";
                const successContent = `
                    <p>Thank you, <strong>${nameField.value}</strong>! Your feedback has been received.</p>
                    <p>Connect with us on social media:</p>
                    <div style="font-size: 1.5rem; margin-top: 1rem;">
                        <a href="#" style="margin-right: 1rem;"><i class="fab fa-twitter"></i></a>
                        <a href="#" style="margin-right: 1rem;"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                `;
                UI.openModal(successTitle, successContent);
                
                form.reset();
            } else {
                console.log('Form validation failed.');
            }
        });
    }

    // --- START THE APP ---
    init();

});