/**
 * TABS MOBILE BUSINESS SOLUTIONS - Production Modular JavaScript Framework
 * Architecture: Vanilla JS SPA Router, Cart State, Filters, Modal Controllers & Form Prototype
 */

'use strict';

// 1. DATA STATE (Services, Products, Portfolio, Blog & FAQs)
const APP_DATA = {
    services: [
        {
            id: 'srv-1',
            title: 'Digital Marketing Consulting',
            desc: 'Personalized growth frameworks tailored around business objectives to maximize target reach and acquisition.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
        },
        {
            id: 'srv-2',
            title: 'Social Media Marketing',
            desc: 'Strategic content production, brand voice establishment, and active engagement routines across key social channels.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`
        },
        {
            id: 'srv-3',
            title: 'Social Media Monetization',
            desc: 'Structured playbooks for transforming online presence and organic audience attention into recurring commercial pipelines.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
        },
        {
            id: 'srv-4',
            title: 'Brand Visibility',
            desc: 'Establishing authoritative digital touchpoints ensuring your enterprise stands out in local and international markets.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
        },
        {
            id: 'srv-5',
            title: 'Business Promotion',
            desc: 'Targeted campaign executions engineered to increase market awareness and accelerate inbound business inquiries.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        },
        {
            id: 'srv-6',
            title: 'Digital Marketing Solutions',
            desc: 'Turnkey operational blueprints covering lead capture, messaging strategy, and digital brand positioning.',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
        }
    ],
    products: [
        {
            id: 'prod-1',
            name: 'Social Media Growth Package',
            category: 'Marketing',
            price: 75000,
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
            desc: 'Comprehensive starter framework for auditing and optimizing commercial social media pages.'
        },
        {
            id: 'prod-2',
            name: 'Digital Strategy Blueprint',
            category: 'Consulting',
            price: 120000,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
            desc: 'Step-by-step digital roadmap tailored for Nigerian market engagement and lead generation.'
        },
        {
            id: 'prod-3',
            name: 'Brand Visibility Suite',
            category: 'Branding',
            price: 95000,
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
            desc: 'Visual assets, messaging guide, and digital directory placement strategy for elevated authority.'
        },
        {
            id: 'prod-4',
            name: 'Social Monetization Consultation',
            category: 'Monetization',
            price: 150000,
            image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80',
            desc: '1-on-1 strategic session with actionable monetization frameworks for online business channels.'
        }
    ],
    portfolio: [
        {
            id: 'port-1',
            title: 'Commercial Visibility Framework',
            category: 'Digital Marketing',
            badge: 'Sample Project Concept',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
            desc: 'Concept blueprint demonstrating audience expansion tactics for regional retail brands.'
        },
        {
            id: 'port-2',
            title: 'Social Channel Monetization Architecture',
            category: 'Social Media',
            badge: 'Portfolio Methodology',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
            desc: 'Strategy model illustrating lead conversion funnels integrated directly within social channels.'
        },
        {
            id: 'port-3',
            title: 'Brand Positioning Revamp',
            category: 'Branding',
            badge: 'Design Blueprint',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
            desc: 'Corporate visual hierarchy concept designed to elevate brand authority in local commercial spaces.'
        }
    ],
    blog: [
        {
            id: 'blog-1',
            title: 'How Nigerian Businesses Can Build a Stronger Digital Presence',
            category: 'Digital Growth',
            date: 'Aug 18, 2026',
            readTime: '4 min read',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
            excerpt: 'Explore structural approaches to digital marketing that go beyond basic social media posting.',
            content: `Building a resilient digital presence in Nigeria requires more than occasional posting. Business owners must focus on three core pillars: baseline brand authority, direct communication channels (such as targeted WhatsApp integration), and consistent value delivery. By aligning digital messaging with genuine commercial solutions, local enterprises can achieve sustainable growth.`
        },
        {
            id: 'blog-2',
            title: '5 Ways Entrepreneurs Can Monetize Social Media',
            category: 'Monetization',
            date: 'Aug 10, 2026',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
            excerpt: 'Transform organic follower metrics into actionable customer acquisition and revenue streams.',
            content: `Monetization is about converting attention into value. Key frameworks include: 1) Packaging digital consultations, 2) Direct chat sales funnels, 3) Tiered service packages, 4) Strategic affiliate promotion, and 5) Exclusive value communities. Positioning yourself as an expert is the first prerequisite.`
        },
        {
            id: 'blog-3',
            title: 'Why Brand Visibility Matters for Small Businesses',
            category: 'Branding',
            date: 'Jul 28, 2026',
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
            excerpt: 'High visibility creates trust before the first sales conversation even begins.',
            content: `In competitive business hubs like Owerri and across Nigeria, visual consistency and messaging clarity instill buyer confidence. Premium branding establishes immediate trust, enabling businesses to command proper value for their products.`
        }
    ],
    faqs: [
        {
            q: 'What services does TABS MOBILE BUSINESS SOLUTIONS provide?',
            a: 'We specialize in digital marketing consulting, social media marketing, brand visibility, business promotion, and social media monetization strategies tailored for Nigerian entrepreneurs.'
        },
        {
            q: 'Do you work with small and emerging businesses?',
            a: 'Yes. We work closely with small-to-medium enterprises (SMEs), personal brands, and established business owners seeking scalable digital growth.'
        },
        {
            q: 'What is social media monetization?',
            a: 'Social media monetization refers to structuring your online presence so organic engagement and audience traffic translate directly into paying clients and commercial leads.'
        },
        {
            q: 'Do you work with clients outside Owerri?',
            a: 'Yes! While based in Owerri, Imo State, our digital consulting and marketing frameworks operate seamlessly remotely across Nigeria.'
        },
        {
            q: 'Can I book a strategic consultation before committing?',
            a: 'Absolutely. You can request an appointment using our online booking prototype or reach out directly via WhatsApp to discuss your goals.'
        }
    ]
};

// 2. STATE MANAGER (Cart & Navigation)
let STATE = {
    cart: JSON.parse(localStorage.getItem('tabs_cart')) || [],
    activeFilter: 'all',
    searchQuery: '',
    selectedCategory: 'all',
    selectedSort: 'default'
};

function saveCart() {
    localStorage.setItem('tabs_cart', JSON.stringify(STATE.cart));
    updateCartUI();
}

// 3. UI RENDERERS
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;
    container.innerHTML = APP_DATA.services.map(s => `
        <div class="service-card">
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
            <a href="#contact" class="service-link">Inquire About Service &rarr;</a>
        </div>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let items = [...APP_DATA.products];

    // Filter by Category
    if (STATE.selectedCategory !== 'all') {
        items = items.filter(p => p.category === STATE.selectedCategory);
    }

    // Filter by Search Query
    if (STATE.searchQuery.trim() !== '') {
        const query = STATE.searchQuery.toLowerCase();
        items = items.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    }

    // Sorting
    if (STATE.selectedSort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
    } else if (STATE.selectedSort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
    }

    if (items.length === 0) {
        grid.innerHTML = `<p class="text-center" style="grid-column: 1/-1; color: var(--muted);">No matching growth products found.</p>`;
        return;
    }

    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <div class="product-thumb">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <span class="product-category-tag">${p.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-bottom">
                    <span class="product-price">₦${p.price.toLocaleString()}</span>
                    <button class="btn-icon-add" onclick="addToCart('${p.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    let items = APP_DATA.portfolio;
    if (STATE.activeFilter !== 'all') {
        items = items.filter(item => item.category === STATE.activeFilter);
    }

    grid.innerHTML = items.map(p => `
        <div class="portfolio-card">
            <div class="portfolio-img-box">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="portfolio-content">
                <span class="badge-concept">${p.badge}</span>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderBlog() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    grid.innerHTML = APP_DATA.blog.map(b => `
        <div class="blog-card" onclick="openBlogModal('${b.id}')">
            <div class="blog-thumb">
                <img src="${b.image}" alt="${b.title}" loading="lazy">
            </div>
            <div class="blog-meta">
                <span>${b.category}</span> • <span>${b.date}</span>
            </div>
            <div class="blog-content">
                <h3>${b.title}</h3>
                <p>${b.excerpt}</p>
            </div>
        </div>
    `).join('');
}

function renderFAQs() {
    const container = document.getElementById('faqAccordion');
    if (!container) return;

    container.innerHTML = APP_DATA.faqs.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
            <button class="faq-header" onclick="toggleFAQ(this)">${faq.q}</button>
            <div class="faq-body">${faq.a}</div>
        </div>
    `).join('');
}

// 4. CART & SHOPPING ACTIONS
function addToCart(productId) {
    const product = APP_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existing = STATE.cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        STATE.cart.push({ ...product, qty: 1 });
    }

    saveCart();
    showToast(`Added "${product.name}" to cart.`);
}

function updateCartQty(id, change) {
    const item = STATE.cart.find(i => i.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        STATE.cart = STATE.cart.filter(i => i.id !== id);
    }
    saveCart();
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const itemsList = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotal');

    const totalCount = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (badge) badge.textContent = totalCount;
    if (subtotalEl) subtotalEl.textContent = `₦${subtotal.toLocaleString()}`;

    if (itemsList) {
        if (STATE.cart.length === 0) {
            itemsList.innerHTML = `<p style="text-align:center; color: var(--muted); padding: 1rem;">Your cart is empty.</p>`;
        } else {
            itemsList.innerHTML = STATE.cart.map(item => `
                <div class="cart-item">
                    <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div style="font-size:0.85rem; color:var(--muted)">₦${item.price.toLocaleString()} x ${item.qty}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// 5. INTERACTION & MODAL HANDLERS
function toggleFAQ(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close other FAQs for accordion behavior
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    
    if (!isActive) {
        item.classList.add('active');
    }
}

function openBlogModal(blogId) {
    const article = APP_DATA.blog.find(b => b.id === blogId);
    if (!article) return;

    const modalContent = document.getElementById('blogModalContent');
    const modal = document.getElementById('blogModal');

    if (modalContent && modal) {
        modalContent.innerHTML = `
            <span class="sub-title">${article.category} • ${article.date}</span>
            <h2 style="color:var(--primary); margin: 0.5rem 0 1rem 0;">${article.title}</h2>
            <img src="${article.image}" alt="${article.title}" style="width:100%; border-radius: var(--radius-md); margin-bottom:1.5rem;">
            <div style="line-height:1.7; color:var(--text);">${article.content}</div>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 6. INITIALIZATION & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderServices();
    renderProducts();
    renderPortfolio();
    renderBlog();
    renderFAQs();
    updateCartUI();

    // Sticky Header Scroll Effect
    const header = document.getElementById('siteHeader');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });

    // Navigation Link Active State & Mobile Menu Close
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            navMenu?.classList.remove('active');
        });
    });

    // Shop Controls Event Listeners
    document.getElementById('shopSearch')?.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value;
        renderProducts();
    });

    document.getElementById('shopCategory')?.addEventListener('change', (e) => {
        STATE.selectedCategory = e.target.value;
        renderProducts();
    });

    document.getElementById('shopSort')?.addEventListener('change', (e) => {
        STATE.selectedSort = e.target.value;
        renderProducts();
    });

    // Portfolio Filters
    const portfolioButtons = document.querySelectorAll('#portfolioFilters .filter-btn');
    portfolioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            portfolioButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.activeFilter = btn.getAttribute('data-filter') || 'all';
            renderPortfolio();
        });
    });

    // Contact Form vs Booking Form Tab Toggle
    const tabContactBtn = document.getElementById('tabContactBtn');
    const tabBookingBtn = document.getElementById('tabBookingBtn');
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');

    tabContactBtn?.addEventListener('click', () => {
        tabContactBtn.classList.add('active');
        tabBookingBtn?.classList.remove('active');
        contactForm?.classList.add('active');
        bookingForm?.classList.remove('active');
    });

    tabBookingBtn?.addEventListener('click', () => {
        tabBookingBtn.classList.add('active');
        tabContactBtn?.classList.remove('active');
        bookingForm?.classList.add('active');
        contactForm?.classList.remove('active');
    });

    // Simulated Form Submissions
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message inquiry prototype submitted successfully!');
        contactForm.reset();
    });

    bookingForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Appointment prototype request captured!');
        bookingForm.reset();
    });

    // Cart Modal Handlers
    const cartModal = document.getElementById('cartModal');
    document.getElementById('cartTrigger')?.addEventListener('click', () => {
        cartModal?.classList.add('active');
        cartModal?.setAttribute('aria-hidden', 'false');
    });

    document.getElementById('closeCartBtn')?.addEventListener('click', () => {
        cartModal?.classList.remove('active');
        cartModal?.setAttribute('aria-hidden', 'true');
    });

    document.getElementById('clearCartBtn')?.addEventListener('click', () => {
        STATE.cart = [];
        saveCart();
    });

    document.getElementById('checkoutWhatsappBtn')?.addEventListener('click', () => {
        if (STATE.cart.length === 0) {
            showToast('Your cart is empty.');
            return;
        }
        const textItems = STATE.cart.map(i => `${i.name} (Qty: ${i.qty})`).join(', ');
        const waUrl = `https://wa.me/2348037720750?text=${encodeURIComponent(`Hello TABS Mobile Solutions, I wish to order: ${textItems}`)}`;
        window.open(waUrl, '_blank');
    });

    // Close Modals on Outer Click
    const blogModal = document.getElementById('blogModal');
    document.getElementById('closeBlogBtn')?.addEventListener('click', () => {
        blogModal?.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) cartModal.classList.remove('active');
        if (e.target === blogModal) blogModal.classList.remove('active');
    });
});