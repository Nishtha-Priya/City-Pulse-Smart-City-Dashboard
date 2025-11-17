/**
 * UI Controller Module
 * Handles all interactions with the DOM.
 */
const UI = {
    // Re-usable function for animating number count-ups
    animateCountUp(el, to, suffix = '') {
        let from = parseFloat(el.textContent.replace(suffix, '')) || 0;
        if (isNaN(from)) from = 0;
        if (from === to) return;

        const duration = 2000; // 2 seconds
        const start = performance.now();

        const step = (timestamp) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            let current = from + (to - from) * progress;
            
            el.textContent = Math.round(current) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    },

    // === Modal Control ===
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalCloseBtn: document.getElementById('modal-close'),

    initModal() {
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
    },

    openModal(title, content) {
        this.modalTitle.innerHTML = title;
        this.modalBody.innerHTML = content;
        this.modalOverlay.classList.add('active');
    },

    closeModal() {
        this.modalOverlay.classList.remove('active');
    },

    // === Dashboard Updates ===
    updateDashboard(data) {
        document.getElementById('dash-temp').textContent = `${data.temperature}°C`;
        document.getElementById('dash-weather-desc').textContent = data.weather;
        
        this.updateAQIGauge(data.aqi);
        this.updateTrafficGauge(data.traffic);
    },

    updateAQIGauge(aqi) {
        const aqiValueEl = document.getElementById('aqi-value');
        const aqiStatusEl = document.getElementById('aqi-status');
        const gaugeEl = document.querySelector('.aqi-card .gauge-outer');

        this.animateCountUp(aqiValueEl, aqi);
        
        let status = '';
        let color = '';
        let percentage = (aqi / 300) * 100;
        if (aqi <= 50) {
            status = 'Good';
            color = 'var(--color-success)';
        } else if (aqi <= 100) {
            status = 'Moderate';
            color = 'var(--color-warning)';
        } else if (aqi <= 150) {
            status = 'Unhealthy (SG)';
            color = '#f97316';
        } else {
            status = 'Hazardous';
            color = 'var(--color-danger)';
        }
        
        aqiStatusEl.textContent = status;
        aqiStatusEl.style.color = color;
        gaugeEl.style.background = `conic-gradient(${color} ${percentage * 3.6}deg, var(--color-bg-light) 0deg)`;
    },

    updateTrafficGauge(trafficPercent) {
        const trafficValueEl = document.getElementById('traffic-value');
        const trafficStatusEl = document.getElementById('traffic-status');
        const gaugeEl = document.querySelector('.traffic-card .gauge-outer');

        this.animateCountUp(trafficValueEl, trafficPercent, '%');

        let status = '';
        let color = '';

        if (trafficPercent <= 30) {
            status = 'Light';
            color = 'var(--color-success)';
        } else if (trafficPercent <= 70) {
            status = 'Moderate';
            color = 'var(--color-warning)';
        } else {
            status = 'Heavy';
            color = 'var(--color-danger)';
        }
        
        trafficStatusEl.textContent = status;
        trafficStatusEl.style.color = color;
        gaugeEl.style.background = `conic-gradient(${color} ${trafficPercent * 3.6}deg, var(--color-bg-light) 0deg)`;
    },
    
    updateTime() {
        const timeEl = document.getElementById('current-time-date');
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        timeEl.innerHTML = `<strong>${time}</strong> &bull; ${date}`;
    },

    // === Alert Page Updates ===
    renderAlerts(alerts) {
        const container = document.getElementById('alerts-list');
        container.innerHTML = ''; 

        if (alerts.length === 0) {
            container.innerHTML = `<p class="glass-card">No alerts in this category.</p>`;
            return;
        }

        alerts.forEach(alert => {
            const alertDate = new Date(alert.timestamp);
            const relativeTime = this.formatTimeAgo(alertDate);

            const alertEl = document.createElement('div');
            alertEl.className = 'alert-card';
            alertEl.setAttribute('data-category', alert.category);
            alertEl.innerHTML = `
                <div class="alert-icon">
                    <i class="${alert.icon}"></i>
                </div>
                <div class="alert-content">
                    <h3>${alert.title}</h3>
                    <span class="alert-meta">${alert.category} &bull; ${relativeTime}</span>
                    <p>${alert.description}</p>
                </div>
            `;
            container.appendChild(alertEl);
        });
    },
    
    formatTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    },

    // === Form Validation ===
    validateField(field) {
        let valid = false;
        const errorEl = field.nextElementSibling;
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            valid = emailRegex.test(field.value.trim());
        } else {
            valid = field.value.trim() !== '';
        }

        if (valid) {
            field.parentElement.classList.remove('invalid');
        } else {
            field.parentElement.classList.add('invalid');
        }
        return valid;
    },

    // NEW: Render Community Stats
    renderCommunityStats(stats) {
        this.animateCountUp(document.getElementById('stat-reports'), stats.reports);
        this.animateCountUp(document.getElementById('stat-users'), stats.users);
        this.animateCountUp(document.getElementById('stat-resolved'), stats.resolved, '%');
    }
};