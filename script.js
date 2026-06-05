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

// PhotoSwipe instance
let lightbox;

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Initialize galleries and PhotoSwipe
function initGalleries() {
    gallerySections.forEach(section => {
        const galleryElement = document.getElementById(section.id);
        if (galleryElement) {
            loadGalleryImages(galleryElement, section.folder, section.count, section.title);
        }
    });
    
    // Initialize PhotoSwipe Lightbox
    initPhotoSwipe();
}

// Initialize PhotoSwipe with touch support
function initPhotoSwipe() {
    lightbox = new PhotoSwipeLightbox({
        gallery: '.gallery-grid',
        children: '.gallery-item a',
        photoSwipe: {
            bgOpacity: 0.95
        }
    });
    
    lightbox.on('change', () => {
        const slide = lightbox.pswp.currSlide;
        if (slide) {
            // Enable pinch zoom
            slide.zoomLevel = Math.max(slide.fitWidth, slide.fitHeight, 1);
        }
    });
    
    lightbox.init();
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
            <a href="${imagePath}" data-pswp-width="1920" data-pswp-height="1080" target="_blank">
                <img src="${imagePath}" alt="${title} - Foto ${i}" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <p>${title} - ${i}</p>
                </div>
            </a>
        `;
        
        container.appendChild(galleryItem);
    }
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

// Event Listeners
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

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
    
    document.querySelectorAll('.fluent-card, .gallery-item').forEach(el => {
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
console.log('%c🎓 SMKS Kesehatan SDM Sumedang - Galeri Foto', 'color: #0078D4; font-size: 20px; font-weight: bold;');
console.log('%c✨ Interactive Photo Gallery with Fluent Design Theme', 'color: #106EBE; font-size: 14px;');
console.log('%c📸 Total Sections: ' + gallerySections.length, 'color: #00BCF2; font-size: 12px;');
