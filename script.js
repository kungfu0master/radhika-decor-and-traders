/* ==========================================================================
   Radhika Decor & Traders - Premium Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY HEADER & SCROLL TRANSLATIONS
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE HAMBURGER MENU
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 3. BEFORE & AFTER IMAGE COMPARISON SLIDER
    const slider = document.getElementById('comparisonSlider');
    const foregroundImg = document.getElementById('foregroundImage');
    const sliderHandle = document.getElementById('sliderHandle');

    if (slider && foregroundImg && sliderHandle) {
        let isDragging = false;

        const updateSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            const position = clientX - rect.left;
            let percentage = (position / rect.width) * 100;

            // Boundaries
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            // Apply updates
            sliderHandle.style.left = `${percentage}%`;
            foregroundImg.style.width = `${percentage}%`;
        };

        // Mouse Events
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Touch Events for Mobile Performance
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                updateSlider(e.touches[0].clientX);
            }
        });
    }

    // 4. SHOWCASE GALLERY LIGHTBOX
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (lightbox && galleryItems.length > 0) {
        let currentIdx = 0;
        const imagesList = Array.from(galleryItems).map(item => ({
            src: item.getAttribute('data-src'),
            title: item.getAttribute('data-title')
        }));

        const openLightbox = (index) => {
            currentIdx = index;
            const data = imagesList[currentIdx];
            lightboxImg.src = data.src;
            lightboxImg.alt = data.title;
            lightboxTitle.textContent = data.title;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Lock scroll
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Release scroll
        };

        const navigateLightbox = (direction) => {
            currentIdx = (currentIdx + direction + imagesList.length) % imagesList.length;
            const data = imagesList[currentIdx];
            // Smooth fade transition on image load
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = data.src;
                lightboxImg.alt = data.title;
                lightboxTitle.textContent = data.title;
                lightboxImg.style.opacity = '1';
            }, 150);
        };

        // Attach Clicks to Gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Close Action
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Nav Actions
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
        lightboxNext.addEventListener('click', () => navigateLightbox(1));

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
        });
    }

    // 5. SCROLL REVEAL (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll('.fade-up-init');
    
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('reveal'));
    }

    // 6. DYNAMIC LEAD GENERATION LOGIC (WHATSAPP INTEGRATION)
    // Product WhatsApp hooks
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.getAttribute('data-product');
        const whatsappBtn = card.querySelector('.btn-card-whatsapp');
        
        if (whatsappBtn) {
            // Encode WhatsApp pre-filled message
            const message = encodeURIComponent(`Hello Radhika Decor, I am interested in knowing more about your premium "${productName}" for my space. Please share the pricing details and catalog.`);
            // Mathura Branch number is default for cards, Vrindavan is also available.
            whatsappBtn.href = `https://wa.me/917455090082?text=${message}`;
            whatsappBtn.setAttribute('target', '_blank');
            whatsappBtn.setAttribute('rel', 'noopener');
        }
    });

    // Lead Form WhatsApp Redirection
    const consultationForm = document.getElementById('consultationForm');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const clientName = document.getElementById('clientName').value.trim();
            const clientPhone = document.getElementById('clientPhone').value.trim();
            const materialInterest = document.getElementById('materialInterest').value;
            
            // Format WhatsApp Message
            const formattedMessage = `*New Consultation Query*\n` +
                                     `---------------------------\n` +
                                     `*Name:* ${clientName}\n` +
                                     `*Phone/WhatsApp:* ${clientPhone}\n` +
                                     `*Interested In:* ${materialInterest}\n\n` +
                                     `Please send me catalogs and call me for design options.`;
            
            const encodedText = encodeURIComponent(formattedMessage);
            
            // Redirect based on selected material (default to Mathura line)
            window.open(`https://wa.me/917455090082?text=${encodedText}`, '_blank');
        });
    }

    // 7. EXCLUSIVE CATALOGS LOGIC
    const categoryInfo = {
        cbc_sheets: {
            title: "CBC Charcoal Sheets",
            path: "assets/cbc_sheets/",
            sliderId: "cbcSlider"
        },
        pu_feather: {
            title: "PU Feather Panels",
            path: "assets/pu_feather/",
            sliderId: "puSlider"
        },
        uv_sheets_new: {
            title: "New UV Marble Sheets",
            path: "assets/uv_sheets_new/",
            sliderId: "uvNewSlider"
        }
    };

    const sliderIndices = {
        cbc_sheets: 0,
        pu_feather: 0,
        uv_sheets_new: 0
    };

    // Render Section Slider
    const renderSectionSlider = (category) => {
        const info = categoryInfo[category];
        const slider = document.getElementById(info.sliderId);
        if (!slider || !CATALOG_DATA[category]) return;

        const files = CATALOG_DATA[category];
        const activeIndex = sliderIndices[category];
        const file = files[activeIndex];
        const displayName = file.split('.')[0];
        const message = encodeURIComponent(`Hello Radhika Decor, I am interested in ${info.title} - Design ${file}. Please share pricing and details.`);
        const waLink = `https://wa.me/917455090082?text=${message}`;

        slider.innerHTML = `
            <div class="catalog-item-card">
                <div class="catalog-item-img-box">
                    <img src="${info.path}${file}" alt="${info.title}" loading="lazy">
                </div>
                <div class="catalog-item-info">
                    <div class="catalog-item-actions">
                        <a href="${waLink}" target="_blank" rel="noopener" class="btn-catalog-action btn-catalog-whatsapp">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.39 1.97 13.91 1.053 11.997 1.053c-5.444 0-9.87 4.374-9.874 9.8-.001 2.016.527 3.985 1.53 5.742L2.616 20.94l4.031-1.786z"/></svg>
                            <span>Inquire on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    };

    const navigateSectionSlider = (category, direction) => {
        if (!CATALOG_DATA[category]) return;
        const count = CATALOG_DATA[category].length;
        sliderIndices[category] = (sliderIndices[category] + direction + count) % count;
        renderSectionSlider(category);
    };

    // Initial render for all sliders
    Object.keys(categoryInfo).forEach(cat => renderSectionSlider(cat));

    window.navigateSectionSlider = navigateSectionSlider;

    // Catalog Modal Elements
    const catOverlay = document.getElementById('catalogModalOverlay');
    const catTitle = document.getElementById('catalogModalTitle');
    const catCount = document.getElementById('catalogModalCount');
    const catGrid = document.getElementById('catalogModalGrid');
    const catSearch = document.getElementById('catalogSearchInput');
    const catSearchClear = document.getElementById('catalogSearchClear');
    const catClose = document.getElementById('catalogModalClose');

    let activeCategory = '';

    const openCatalogModal = (category) => {
        activeCategory = category;
        const info = categoryInfo[category];
        if (!info || !CATALOG_DATA[category]) return;

        catTitle.textContent = info.title;
        catSearch.value = '';
        catSearchClear.style.display = 'none';
        
        renderModalGrid(CATALOG_DATA[category]);
        
        catOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        catOverlay.setAttribute('aria-hidden', 'false');
    };

    const renderModalGrid = (files) => {
        const info = categoryInfo[activeCategory];
        catCount.textContent = `${files.length} Designs`;

        if (files.length === 0) {
            catGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No designs found matching your search.</div>`;
            return;
        }

        catGrid.innerHTML = files.map(file => {
            const displayName = file.split('.')[0];
            const message = encodeURIComponent(`Hello Radhika Decor, I am interested in ${info.title} - Design ${file}. Please share pricing and details.`);
            const waLink = `https://wa.me/917455090082?text=${message}`;

            return `
                <div class="catalog-item-card">
                    <div class="catalog-item-img-box">
                        <img src="${info.path}${file}" alt="${info.title} - Design ${displayName}" loading="lazy">
                    </div>
                    <div class="catalog-item-info">
                        <h4 class="catalog-item-name">Design ${displayName}</h4>
                        <div class="catalog-item-actions">
                            <a href="${waLink}" target="_blank" rel="noopener" class="btn-catalog-action btn-catalog-whatsapp">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.39 1.97 13.91 1.053 11.997 1.053c-5.444 0-9.87 4.374-9.874 9.8-.001 2.016.527 3.985 1.53 5.742L2.616 20.94l4.031-1.786z"/></svg>
                                <span>Inquire</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };

    const closeCatalogModal = () => {
        catOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        catOverlay.setAttribute('aria-hidden', 'true');
    };

    // Modal close listeners
    if (catClose) catClose.addEventListener('click', closeCatalogModal);
    if (catOverlay) {
        catOverlay.addEventListener('click', (e) => {
            if (e.target === catOverlay) closeCatalogModal();
        });
    }

    // Search Input behavior
    if (catSearch) {
        catSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query) {
                catSearchClear.style.display = 'block';
            } else {
                catSearchClear.style.display = 'none';
            }

            const allFiles = CATALOG_DATA[activeCategory] || [];
            const filtered = allFiles.filter(file => {
                const displayName = file.split('.')[0].toLowerCase();
                return displayName.includes(query);
            });
            renderModalGrid(filtered);
        });
    }

    if (catSearchClear) {
        catSearchClear.addEventListener('click', () => {
            catSearch.value = '';
            catSearchClear.style.display = 'none';
            renderModalGrid(CATALOG_DATA[activeCategory] || []);
            catSearch.focus();
        });
    }

    // Make openCatalogModal globally accessible
    window.openCatalogModal = openCatalogModal;

    // Refresh scroll reveals for dynamically added elements
    setTimeout(() => {
        const newRevealElements = document.querySelectorAll('.fade-up-init:not(.reveal)');
        if ('IntersectionObserver' in window && newRevealElements.length > 0) {
            const newObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.05 });
            newRevealElements.forEach(el => newObserver.observe(el));
        } else {
            newRevealElements.forEach(el => el.classList.add('reveal'));
        }
    }, 500);
});
