// Tailwind script
function initializeTailwind() {
    document.documentElement.style.setProperty('--accent-gold', '#C9A961');
}

// Three.js 3D Wedding Rings
let scene, camera, renderer;
let ring1, ring2;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(420, 420);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.z = 5.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.1, 100);
    pointLight.position.set(4, 6, 8);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xD4AF37, 0.7, 100);
    pointLight2.position.set(-6, -4, -3);
    scene.add(pointLight2);

    // Extra rim light for premium shine
    const rimLight = new THREE.PointLight(0xffffff, 0.5, 100);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Premium Gold material (more luxurious look)
    const goldMaterial = new THREE.MeshPhongMaterial({
        color: 0xD4AF37,
        shininess: 120,
        specular: 0x666666,
        flatShading: false,
        metalness: 0.8,
        emissive: 0x2a1f0f
    });

    // Ring 1 (left)
    const ringGeometry = new THREE.TorusGeometry(1.15, 0.18, 28, 70);
    ring1 = new THREE.Mesh(ringGeometry, goldMaterial);
    ring1.position.x = -1.05;
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.1;
    scene.add(ring1);

    // Ring 2 (right) - slightly rotated for interlocking look
    ring2 = new THREE.Mesh(ringGeometry, goldMaterial);
    ring2.position.x = 1.05;
    ring2.rotation.x = Math.PI * 0.65;
    ring2.rotation.y = -Math.PI * 0.18;
    scene.add(ring2);

    // Subtle inner highlight rings
    const innerMaterial = new THREE.MeshPhongMaterial({
        color: 0xE8D5A3,
        shininess: 40,
        transparent: true,
        opacity: 0.35
    });
    
    const innerRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.07, 20, 60), innerMaterial);
    innerRing1.position.x = -1.05;
    innerRing1.rotation.x = ring1.rotation.x;
    innerRing1.rotation.y = ring1.rotation.y;
    scene.add(innerRing1);

    const innerRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.07, 20, 60), innerMaterial);
    innerRing2.position.x = 1.05;
    innerRing2.rotation.x = ring2.rotation.x;
    innerRing2.rotation.y = ring2.rotation.y;
    scene.add(innerRing2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        if (ring1 && ring2) {
            ring1.rotation.y += 0.0028;
            ring2.rotation.y -= 0.0025;
            
            // Gentle elegant floating
            ring1.position.y = Math.sin(Date.now() * 0.0009) * 0.08;
            ring2.position.y = Math.sin(Date.now() * 0.0011 + 1.5) * 0.08;
        }

        renderer.render(scene, camera);
    }
    animate();

    // Responsive resize
    function handleResize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
}

// Countdown Timer
function updateCountdown() {
    const timerContainer = document.getElementById('countdown-timer');
    if (!timerContainer) return;

    const weddingDate = new Date('2026-07-26T16:00:00+06:00');
    
    function calculateTime() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            timerContainer.innerHTML = `
                <div class="col-span-4 text-center py-8">
                    <p class="text-3xl font-semibold text-[#C9A961]">Свадьба уже началась! 🎉</p>
                    <p class="mt-2 text-[#6B5B4F]">Спасибо, что были с нами</p>
                </div>
            `;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerContainer.innerHTML = `
            <div class="timer-box rounded-2xl p-5 md:p-6">
                <div class="countdown-number text-6xl md:text-7xl font-semibold tracking-tighter text-[#3F2A1E]">${days}</div>
                <div class="text-xs uppercase tracking-[2.5px] text-[#6B5B4F] mt-2 font-medium">ДНЕЙ</div>
            </div>
            <div class="timer-box rounded-2xl p-5 md:p-6">
                <div class="countdown-number text-6xl md:text-7xl font-semibold tracking-tighter text-[#3F2A1E]">${hours.toString().padStart(2, '0')}</div>
                <div class="text-xs uppercase tracking-[2.5px] text-[#6B5B4F] mt-2 font-medium">ЧАСОВ</div>
            </div>
            <div class="timer-box rounded-2xl p-5 md:p-6">
                <div class="countdown-number text-6xl md:text-7xl font-semibold tracking-tighter text-[#3F2A1E]">${minutes.toString().padStart(2, '0')}</div>
                <div class="text-xs uppercase tracking-[2.5px] text-[#6B5B4F] mt-2 font-medium">МИНУТ</div>
            </div>
            <div class="timer-box rounded-2xl p-5 md:p-6">
                <div class="countdown-number text-6xl md:text-7xl font-semibold tracking-tighter text-[#3F2A1E]">${seconds.toString().padStart(2, '0')}</div>
                <div class="text-xs uppercase tracking-[2.5px] text-[#6B5B4F] mt-2 font-medium">СЕКУНД</div>
            </div>
        `;
    }

    calculateTime();
    setInterval(calculateTime, 1000);
}

// Leaflet Map
let mapInstance = null;

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || mapInstance) return;

    const lat = 42.8335;
    const lng = 75.3035;

    mapInstance = L.map('map', {
        zoomControl: true,
        attributionControl: false
    }).setView([lat, lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        className: 'map-tiles'
    }).addTo(mapInstance);

    const goldIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background:#C9A961; width:28px; height:28px; border-radius:9999px; border:4px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
                    <span style="color:white; font-size:15px; line-height:1;">💍</span>
               </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
    });

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(mapInstance);
    
    marker.bindPopup(`
        <div style="min-width:180px; font-family: Inter, system-ui, sans-serif;">
            <strong style="color:#3F2A1E; font-size:15px;">Ресторан «Баласагын»</strong><br>
            <span style="color:#6B5B4F; font-size:13px;">Шамшинская 25а, Токмок</span><br>
            <span style="color:#C9A961; font-size:12px;">26 июля • 16:00</span>
        </div>
    `, { closeButton: true, offset: [0, -8] }).openPopup();

    mapContainer.style.cursor = 'pointer';
    mapContainer.addEventListener('click', function(e) {
        if (e.target.closest('.leaflet-popup')) return;
        openGoogleMaps();
    });
}

function openGoogleMaps() {
    const query = encodeURIComponent('Шамшинская 25а, Токмок, Кыргызстан');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
}

// Initialize everything
function initializeWebsite() {
    initializeTailwind();
    
    setTimeout(() => {
        initThreeJS();
    }, 300);

    updateCountdown();

    setTimeout(() => {
        initMap();
    }, 800);

    document.addEventListener('keydown', function(e) {
        if (e.key === "?" && document.activeElement.tagName === "BODY") {
            e.preventDefault();
            const mapSection = document.getElementById('map');
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    setTimeout(() => {
        console.log('%c[Wedding] 3D invitation ready — Аманбек & Умутай', 'color:#C9A961');
    }, 1200);

    // Light scroll animations for sections (except hero)
    const sections = document.querySelectorAll('#countdown, #details, #map, footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Bonus: Easter egg
document.addEventListener('click', function(e) {
    const canvas = document.getElementById('three-canvas');
    if (canvas && e.target === canvas) {
        canvas.style.transitionDuration = '80ms';
        canvas.style.transform = 'scale(0.96)';
        setTimeout(() => {
            canvas.style.transform = 'scale(1)';
        }, 120);
    }
});

// Boot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}