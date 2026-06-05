// Gallery data configuration
const gallerySections = [
    { id: 'gallery-mockup', folder: '01_Suntik-Intro', count: 23, title: 'Mock-Up' },
    { id: 'gallery-pembukaan-sl', folder: '02_Suntik-Pembukaan', count: 64, title: 'Pembukaan Sumpah Lantik' },
    { id: 'gallery-angkat-sumpah', folder: '03_Suntik-AngkatSumpah', count: 36, title: 'Prosesi Angkat Sumpah' },
    { id: 'gallery-pembagian-raport', folder: '04_Suntik-PembRaportKalung', count: 98, title: 'Pembagian Raport & Pengalungan' },
    { id: 'gallery-penutupan-sl', folder: '05_Suntik-Penutup', count: 31, title: 'Penutupan Sumpah Lantik' },
    { id: 'gallery-foto-bersama', folder: '06_Suntik-FotoBersama', count: 16, title: 'Prosesi Foto Bersama' },
    { id: 'gallery-siswa-terbaik', folder: '07_Suntik-SiswaJurusanTerbaik', count: 18, title: 'Penampilan Siswa Terbaik' },
    { id: 'gallery-pembukaan-pt', folder: '08_Paturay-Pembukaan', count: 24, title: 'Pembukaan Paturay Tineung' },
    { id: 'gallery-pembacaan-puisi', folder: '09_Paturay-PenPuisi', count: 41, title: 'Pembacaan Puisi' },
    { id: 'gallery-sungkem', folder: '10_Paturay-Kadedeuh', count: 58, title: 'Prosesi Sungkem' },
    { id: 'gallery-purna-tugas', folder: '11_Paturay-PurnaTugas', count: 104, title: 'Purna Tugas Kepala Sekolah' },
    { id: 'gallery-penghargaan-siswa', folder: '12_Paturay-PenghargaanSiswa', count: 30, title: 'Penghargaan Siswa' },
    { id: 'gallery-pelepasan', folder: '13_Paturay-Pelepasan', count: 61, title: 'Penampilan & Pelepasan Kelas XII' },
    { id: 'gallery-penampilan-x', folder: '14_Paturay-PenampilanX', count: 50, title: 'Penampilan Kelas X' },
    { id: 'gallery-pentutupan', folder: '15_Paturay-Penutupan', count: 33, title: 'Penutupan Paturay Tineung' }
];

// All images array for lightbox
let allImages = [];
let currentImageIndex = 0;

// DOM Elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Initialize galleries
function initGalleries() {
    gallerySections.forEach(section => {
        const galleryElement = document.getElementById(section.id);
        if (galleryElement) {
            loadGalleryImages(galleryElement, section.folder, section.count, section.title);
        }
    });
}

// Load gallery images
function loadGalleryImages(container, folder, count, title) {
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const paddedNumber = String(i).padStart(2, '0');
        const imagePath = `images/${folder}/${folder}_${paddedNumber}.jpg`;
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${imagePath}" alt="${title} - Foto ${i}" loading="lazy" onerror="this.style.display='none'">
            <div class="gallery-overlay">
                <p>${title} - ${i}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(imagePath, `${title} - Foto ${i}`, folder, count, i));
        container.appendChild(galleryItem);
    }
}

// Open lightbox
function openLightbox(src, caption, folder, count, index) {
    // Build all images array for this section
    allImages = [];
    for (let i = 1; i <= count; i++) {
        const paddedNumber = String(i).padStart(2, '0');
        allImages.push({
            src: `images/${folder}/${folder}_${paddedNumber}.jpg`,
            caption: `${caption.split(' - ')[0]} - Foto ${i}`,
            index: i
        });
    }
    
    currentImageIndex = index - 1;
    showLightboxImage(currentImageIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Show lightbox image
function showLightboxImage(index) {
    if (index < 0 || index >= allImages.length) return;
    
    const img = allImages[index];
    lightboxImage.src = img.src;
    lightboxCaption.textContent = img.caption;
    lightboxCounter.textContent = `${index + 1} / ${allImages.length}`;
    currentImageIndex = index;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        lightboxImage.src = '';
    }, 300);
}

// Navigate lightbox
function navigateLightbox(direction) {
    let newIndex = currentImageIndex + direction;
    
    if (newIndex < 0) {
        newIndex = allImages.length - 1;
    } else if (newIndex >= allImages.length) {
        newIndex = 0;
    }
    
    showLightboxImage(newIndex);
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
    navMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

// Handle dropdown menus on mobile
function handleDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
}

// Active navigation link on scroll
function handleActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Keyboard navigation for lightbox
function handleKeyboardNavigation(e) {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
}

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Keyboard events
document.addEventListener('keydown', handleKeyboardNavigation);

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    if (!link.parentElement.classList.contains('dropdown')) {
        link.addEventListener('click', closeMobileMenu);
    }
});

document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initGalleries();
    handleDropdowns();
    handleActiveNav();
    
    // Add scroll progress indicator
    createScrollProgress();
    
    // Add smooth reveal animation
    observeElements();
});

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scrollProgress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Intersection Observer for reveal animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.glass-card, .gallery-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Add reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .gallery-item {
        transition: all 0.4s ease;
    }
`;
document.head.appendChild(style);

// Lazy loading improvement
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('%c🎓 SMKS Kesehatan SDM Sumedang - Galeri Foto', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%c✨ Interactive Photo Gallery with Glassmorphism Theme', 'color: #764ba2; font-size: 14px;');
console.log('%c📸 Total Sections: ' + gallerySections.length, 'color: #f093fb; font-size: 12px;');
