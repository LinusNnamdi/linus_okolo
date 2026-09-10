/**
 * OMA'S THRIFT HUB - PREMIUM E-COMMERCE ENGINE
 * Business: Oma's Thrift Hub | Owner: Chioma Patrick
 * Developer: EarnDee Limited
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DATA ARCHITECTURE & PRODUCT CATALOG
    // ==========================================
    
    const products = [
        {
            id: 1,
            name: "Vintage Velvet Emerald Evening Gown",
            category: "Gowns",
            price: 28500,
            oldPrice: 35000,
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
            description: "A show-stopping emerald velvet gown curated for high-class events, dinners, and gala nights.",
            sizes: ["M", "L"],
            condition: "Thrift Premium (Like New)",
            rating: 5,
            reviews: 12,
            isNew: true,
            isFeatured: true
        },
        {
            id: 2,
            name: "Floral Chiffon Wrap Sun Dress",
            category: "Gowns",
            price: 14000,
            oldPrice: 18000,
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
            description: "Lightweight and feminine floral dress suitable for Sunday best, brunch dates, and casual outings.",
            sizes: ["S", "M"],
            condition: "Exquisitely Maintained",
            rating: 4.8,
            reviews: 8,
            isNew: false,
            isFeatured: true
        },
        {
            id: 3,
            name: "Ribbed Knit Corset Crop Top",
            category: "Crop Tops",
            price: 8500,
            oldPrice: 12000,
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
            description: "Trendy corset-style ribbed crop top that pairs effortlessly with denim jackets and high-waist jeans.",
            sizes: ["XS", "S", "M"],
            condition: "Thrift Grade A",
            rating: 4.9,
            reviews: 19,
            isNew: true,
            isFeatured: false
        },
        {
            id: 4,
            name: "Silk Satin Casual Bralette Top",
            category: "Crop Tops",
            price: 9000,
            oldPrice: 11500,
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
            description: "Silky, luxurious feel for evening hangouts or layering under a corporate blazer.",
            sizes: ["S", "M"],
            condition: "Like New",
            rating: 4.7,
            reviews: 5,
            isNew: false,
            isFeatured: false
        },
        {
            id: 5,
            name: "Crisp Cotton White Corporate Button-Up",
            category: "Corporate Shirts",
            price: 12500,
            oldPrice: 16000,
            image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80",
            description: "Tailored corporate shirt for modern working women. Sharp collar and pristine fabric finish.",
            sizes: ["M", "L", "XL"],
            condition: "Thrift Grade A",
            rating: 5,
            reviews: 14,
            isNew: false,
            isFeatured: true
        },
        {
            id: 6,
            name: "Striped Silk Executive Blouse",
            category: "Corporate Shirts",
            price: 15000,
            oldPrice: 20000,
            image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=80",
            description: "Sophisticated executive blouse designed to exude power, confidence, and understated elegance.",
            sizes: ["S", "M"],
            condition: "Thrift Premium",
            rating: 4.9,
            reviews: 11,
            isNew: true,
            isFeatured: false
        },
        {
            id: 7,
            name: "Oversized Vintage Denim Trucker Jacket",
            category: "Jeans Jackets",
            price: 22000,
            oldPrice: 28000,
            image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
            description: "Heavyweight vintage denim jacket with chic distress details. A timeless staple.",
            sizes: ["M", "L", "XL"],
            condition: "Vintage Excellent",
            rating: 5,
            reviews: 23,
            isNew: false,
            isFeatured: true
        },
        {
            id: 8,
            name: "Distressed Cropped Jean Jacket",
            category: "Jeans Jackets",
            price: 18500,
            oldPrice: 24000,
            image: "https://images.unsplash.com/photo-1525457136159-8878648a7ad0?auto=format&fit=crop&w=800&q=80",
            description: "Edgy cropped denim jacket perfect for layering over bodycon gowns and crop tops.",
            sizes: ["S", "M"],
            condition: "Thrift Grade A",
            rating: 4.8,
            reviews: 9,
            isNew: true,
            isFeatured: false
        },
        {
            id: 9,
            name: "High-Waisted Vintage Mom Jeans",
            category: "Jeans Trousers",
            price: 16500,
            oldPrice: 21000,
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
            description: "Classic high-rise fit that accentuates curves while providing all-day comfort.",
            sizes: ["28", "30", "32"],
            condition: "Thrift Premium",
            rating: 4.9,
            reviews: 18,
            isNew: false,
            isFeatured: true
        },
        {
            id: 10,
            name: "Wide-Leg Light Wash Denim Trousers",
            category: "Jeans Trousers",
            price: 17500,
            oldPrice: 22000,
            image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80",
            description: "Modern wide-leg silhouette favored by Gen Z and young professionals.",
            sizes: ["26", "28", "30"],
            condition: "Like New",
            rating: 4.7,
            reviews: 7,
            isNew: true,
            isFeatured: false
        },
        {
            id: 11,
            name: "Satin Pleated Cocktail Dress",
            category: "Gowns",
            price: 24000,
            oldPrice: 30000,
            image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
            description: "Radiant satin fabric cut to perfection for birthday shoots and evening celebrations.",
            sizes: ["S", "M", "L"],
            condition: "Flawless",
            rating: 5,
            reviews: 15,
            isNew: true,
            isFeatured: false
        },
        {
            id: 12,
            name: "Linen Summer Button-Down Shirt",
            category: "Corporate Shirts",
            price: 13000,
            oldPrice: 17000,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
            description: "Breathable natural linen shirt ideal for tropical weather and classy Friday workdays.",
            sizes: ["M", "L"],
            condition: "Thrift Grade A",
            rating: 4.6,
            reviews: 6,
            isNew: false,
            isFeatured: false
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: "Chisom Okeke",
            location: "Awka, Anambra",
            rating: 5,
            text: "Oma's Thrift Hub changed my perspective on thrift shopping. The dress I ordered looked literally brand new and I received so many compliments at my corporate event!"
        },
        {
            id: 2,
            name: "Blessing Adebayo",
            location: "Lagos Island, Lagos",
            rating: 5,
            text: "Fast delivery to Lagos! The denim jacket quality was top-tier heavy cotton. Definitely buying my entire rainy-season wardrobe from Chioma."
        },
        {
            id: 3,
            name: "Nkechi Egwu",
            location: "Enugu, Enugu State",
            rating: 5,
            text: "Luxury for less isn't just a tagline, it's real. Ordering on WhatsApp was super smooth and painless."
        }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "How to Style Thrift Pieces Like High Fashion",
            category: "Style Guide",
            date: "August 12, 2026",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
            excerpt: "Learn how to pair vintage thrift tops with modern tailored trousers to create expensive-looking outfits.",
            content: "Thrift fashion isn't about looking like you're wearing old clothes—it's about finding rare silhouetted pieces that nobody else has..."
        },
        {
            id: 2,
            title: "5 Capsule Wardrobe Staples for Nigerian Women",
            category: "Wardrobe Essentials",
            date: "August 04, 2026",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
            excerpt: "Building a classy, versatile wardrobe on a budget starts with five core thrift items every woman should own.",
            content: "From the crisp white corporate button-up to high-rise vintage mom jeans, having these five foundational items ensures you never lack what to wear..."
        }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT & LOCAL STORAGE
    // ==========================================

    let cart = JSON.parse(localStorage.getItem('oma_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('oma_wishlist')) || [];
    let appliedDiscount = 0;
    let activeCategory = 'All';

    const saveCart = () => localStorage.setItem('oma_cart', JSON.stringify(cart));
    const saveWishlist = () => localStorage.setItem('oma_wishlist', JSON.stringify(wishlist));

    // ==========================================
    // 3. UI RENDERERS
    // ==========================================

    // Toast Notifications
    const showToast = (message) => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> ${message}`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    };

    // Format Currency in NGN
    const formatNaira = (amount) => '₦' + amount.toLocaleString();

    // Render Categories
    const renderCategories = () => {
        const categoriesContainer = document.getElementById('categories-container');
        const categoryData = [
            { name: "Gowns", desc: "Elegant & Cocktail Dresses", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" },
            { name: "Crop Tops", desc: "Chic & Youthful Tops", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80" },
            { name: "Corporate Shirts", desc: "Classy Workwear Blouses", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80" },
            { name: "Jeans Jackets", desc: "Vintage & Cropped Denim", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80" },
            { name: "Jeans Trousers", desc: "High-Waist & Mom Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80" }
        ];

        categoriesContainer.innerHTML = categoryData.map(cat => `
            <div class="category-card" data-category="${cat.name}">
                <img src="${cat.image}" alt="${cat.name}" loading="lazy">
                <div class="category-overlay">
                    <h3>${cat.name}</h3>
                    <p>${cat.desc}</p>
                    <span class="btn btn-sm btn-outline-gold">Explore</span>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.dataset.category;
                filterCategory(cat);
                document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
            });
        });
    };

    // Render Product Cards
    const renderProducts = (itemsToRender = products) => {
        const grid = document.getElementById('product-grid');
        if (itemsToRender.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 3rem 0;"><p>No products found in this category.</p></div>`;
            return;
        }

        grid.innerHTML = itemsToRender.map(product => {
            const isWishlisted = wishlist.some(id => id === product.id);
            const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image-wrap">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        ${product.isNew ? `<span class="product-badge">New Drop</span>` : ''}
                        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
                            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
                        </button>
                        <div class="product-actions-overlay">
                            <button class="btn btn-sm btn-primary full-width quick-view-btn" data-id="${product.id}">Quick View</button>
                            <button class="btn btn-sm btn-whatsapp add-cart-btn" data-id="${product.id}">
                                <i class="fa-solid fa-bag-shopping"></i> Add
                            </button>
                        </div>
                    </div>
                    <div class="product-details">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price-row">
                            <span class="current-price">${formatNaira(product.price)}</span>
                            <span class="old-price">${formatNaira(product.oldPrice)}</span>
                            <span style="font-size:0.75rem; color:#10b981; font-weight:600;">-${discountPercent}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        attachProductEvents();
    };

    // Event Attachments for Product Cards
    const attachProductEvents = () => {
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openQuickView(parseInt(btn.dataset.id));
            });
        });

        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(parseInt(btn.dataset.id));
            });
        });

        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleWishlist(parseInt(btn.dataset.id));
            });
        });
    };

    // Category Filtering & Sorting
    const filterCategory = (category) => {
        activeCategory = category;
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        let filtered = category === 'All' ? [...products] : products.filter(p => p.category === category);
        renderProducts(filtered);
    };

    document.getElementById('category-tabs').addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            filterCategory(e.target.dataset.category);
        }
    });

    document.getElementById('sort-select').addEventListener('change', (e) => {
        const val = e.target.value;
        let sorted = [...products];

        if (activeCategory !== 'All') {
            sorted = sorted.filter(p => p.category === activeCategory);
        }

        if (val === 'price-low') sorted.sort((a, b) => a.price - b.price);
        else if (val === 'price-high') sorted.sort((a, b) => b.price - a.price);
        else if (val === 'rating') sorted.sort((a, b) => b.rating - a.rating);

        renderProducts(sorted);
    });

    // ==========================================
    // 4. SHOPPING CART SYSTEM
    // ==========================================

    const addToCart = (productId) => {
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }
        saveCart();
        updateCartUI();
        showToast("Item added to cart");
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
        showToast("Item removed from cart");
    };

    const updateQty = (productId, delta) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) removeFromCart(productId);
            else {
                saveCart();
                updateCartUI();
            }
        }
    };

    const updateCartUI = () => {
        const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
        document.getElementById('cart-count').textContent = cartCount;
        document.getElementById('cart-drawer-count').textContent = cartCount;

        const container = document.getElementById('cart-items');
        if (cart.length === 0) {
            container.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 2rem 0;">Your cart is empty.</p>`;
        } else {
            container.innerHTML = cart.map(item => {
                const prod = products.find(p => p.id === item.id);
                return `
                    <div class="cart-item">
                        <img src="${prod.image}" alt="${prod.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${prod.name}</div>
                            <div class="cart-item-price">${formatNaira(prod.price)}</div>
                            <div class="cart-qty-controls">
                                <button class="qty-btn" onclick="updateQty(${prod.id}, -1)">-</button>
                                <span>${item.qty}</span>
                                <button class="qty-btn" onclick="updateQty(${prod.id}, 1)">+</button>
                            </div>
                        </div>
                        <button class="close-btn" onclick="removeFromCart(${prod.id})" style="font-size:1.2rem;">&times;</button>
                    </div>
                `;
            }).join('');
        }

        // Calculate Totals
        const subtotal = cart.reduce((sum, item) => {
            const prod = products.find(p => p.id === item.id);
            return sum + (prod.price * item.qty);
        }, 0);

        const discountAmt = subtotal * appliedDiscount;
        const total = subtotal - discountAmt;

        document.getElementById('cart-subtotal').textContent = formatNaira(subtotal);
        document.getElementById('cart-discount').textContent = `-` + formatNaira(discountAmt);
        document.getElementById('cart-total').textContent = formatNaira(total);
        document.getElementById('checkout-summary-total').textContent = formatNaira(total);

        document.getElementById('discount-row').style.display = appliedDiscount > 0 ? 'flex' : 'none';
    };

    // Global expose for inline cart buttons
    window.updateQty = updateQty;
    window.removeFromCart = removeFromCart;

    // Coupon System
    document.getElementById('apply-coupon-btn').addEventListener('click', () => {
        const val = document.getElementById('coupon-input').value.trim().toUpperCase();
        if (val === 'OMA10') {
            appliedDiscount = 0.10;
            showToast("Coupon OMA10 applied (10% OFF)");
            updateCartUI();
        } else {
            showToast("Invalid coupon code");
        }
    });

    // ==========================================
    // 5. WISHLIST SYSTEM
    // ==========================================

    const toggleWishlist = (productId) => {
        const index = wishlist.indexOf(productId);
        if (index > -1) {
            wishlist.splice(index, 1);
            showToast("Removed from Wishlist");
        } else {
            wishlist.push(productId);
            showToast("Added to Wishlist");
        }
        saveWishlist();
        updateWishlistUI();
        renderProducts(activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory));
    };

    const updateWishlistUI = () => {
        document.getElementById('wishlist-count').textContent = wishlist.length;
        document.getElementById('wishlist-drawer-count').textContent = wishlist.length;

        const container = document.getElementById('wishlist-items');
        if (wishlist.length === 0) {
            container.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding: 2rem 0;">Your wishlist is empty.</p>`;
        } else {
            container.innerHTML = wishlist.map(id => {
                const prod = products.find(p => p.id === id);
                return `
                    <div class="cart-item">
                        <img src="${prod.image}" alt="${prod.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${prod.name}</div>
                            <div class="cart-item-price">${formatNaira(prod.price)}</div>
                            <button class="btn btn-sm btn-primary" onclick="addToCart(${prod.id})">Move to Cart</button>
                        </div>
                        <button class="close-btn" onclick="toggleWishlist(${prod.id})" style="font-size:1.2rem;">&times;</button>
                    </div>
                `;
            }).join('');
        }
    };

    window.toggleWishlist = toggleWishlist;
    window.addToCart = addToCart;

    // ==========================================
    // 6. QUICK VIEW & MODALS
    // ==========================================

    const openQuickView = (productId) => {
        const prod = products.find(p => p.id === productId);
        const container = document.getElementById('modal-product-details');

        container.innerHTML = `
            <div class="modal-gallery">
                <img src="${prod.image}" alt="${prod.name}">
            </div>
            <div class="modal-product-info">
                <span class="product-category">${prod.category}</span>
                <h2>${prod.name}</h2>
                <div class="modal-price">${formatNaira(prod.price)} <span class="old-price">${formatNaira(prod.oldPrice)}</span></div>
                <p><strong>Condition:</strong> ${prod.condition}</p>
                <p style="margin: 1rem 0; color: var(--text-muted);">${prod.description}</p>
                <p><strong>Available Sizes:</strong> ${prod.sizes.join(', ')}</p>
                
                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="btn btn-primary full-width" onclick="addToCart(${prod.id})">Add to Cart</button>
                    <a href="https://wa.me/2349067882985?text=Hello%20Oma%E2%80%99s%20Thrift%20Hub,%20I%20am%20interested%20in%20purchasing%20${encodeURIComponent(prod.name)}." target="_blank" rel="noopener" class="btn btn-whatsapp full-width">Buy via WhatsApp</a>
                </div>
            </div>
        `;

        document.getElementById('product-modal').classList.add('active');
    };

    // ==========================================
    // 7. CHECKOUT & WHATSAPP INTEGRATION
    // ==========================================

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            showToast("Your cart is empty");
            return;
        }

        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const address = document.getElementById('cust-address').value;
        const state = document.getElementById('cust-state').value;
        const city = document.getElementById('cust-city').value;
        const notes = document.getElementById('cust-notes').value;

        let itemsListText = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            const prod = products.find(p => p.id === item.id);
            const lineTotal = prod.price * item.qty;
            subtotal += lineTotal;
            itemsListText += `${index + 1}. ${prod.name} (Qty: ${item.qty}) - ${formatNaira(lineTotal)}\n`;
        });

        const discountAmt = subtotal * appliedDiscount;
        const total = subtotal - discountAmt;

        let message = `*NEW ORDER - OMA'S THRIFT HUB*\n\n`;
        message += `*Customer Details:*\n`;
        message += `• Name: ${name}\n`;
        message += `• Phone: ${phone}\n`;
        message += `• Delivery Address: ${address}, ${city}, ${state} State.\n`;
        if (notes) message += `• Order Notes: ${notes}\n`;
        message += `\n*Ordered Items:*\n${itemsListText}\n`;
        if (appliedDiscount > 0) message += `• Discount Applied: -${formatNaira(discountAmt)}\n`;
        message += `*TOTAL AMOUNT: ${formatNaira(total)}*\n\n`;
        message += `Please confirm item availability and send payment account details.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/2349067882985?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        showToast("Redirecting to WhatsApp to complete order...");
    });

    // ==========================================
    // 8. BLOG & TESTIMONIALS RENDERERS
    // ==========================================

    const renderBlog = () => {
        const grid = document.getElementById('blog-grid');
        grid.innerHTML = blogPosts.map(post => `
            <div class="blog-card">
                <div class="blog-img">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">${post.category} | ${post.date}</div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="btn btn-sm btn-outline-gold read-blog-btn" data-id="${post.id}">Read Article</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.read-blog-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const post = blogPosts.find(p => p.id === parseInt(btn.dataset.id));
                const body = document.getElementById('blog-modal-body');
                body.innerHTML = `
                    <h2>${post.title}</h2>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem;">${post.category} | ${post.date}</p>
                    <img src="${post.image}" style="width:100%; height:300px; object-fit:cover; margin-bottom:1.5rem;" alt="">
                    <p>${post.content}</p>
                `;
                document.getElementById('blog-modal').classList.add('active');
            });
        });
    };

    let currentTestimonialIndex = 0;
    const renderTestimonials = () => {
        const container = document.getElementById('testimonial-slider');
        const t = testimonials[currentTestimonialIndex];
        container.innerHTML = `
            <div class="testimonial-card">
                <div class="rating-stars">${'★'.repeat(t.rating)}</div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">${t.name}</div>
                <div class="testimonial-location">${t.location}</div>
            </div>
        `;
    };

    document.getElementById('prev-test').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        renderTestimonials();
    });

    document.getElementById('next-test').addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        renderTestimonials();
    });

    // Submit Review Form
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('review-name').value;
        const location = document.getElementById('review-location').value;
        const rating = parseInt(document.getElementById('review-rating').value);
        const text = document.getElementById('review-text').value;

        testimonials.push({ id: Date.now(), name, location, rating, text });
        currentTestimonialIndex = testimonials.length - 1;
        renderTestimonials();
        showToast("Thank you! Your review has been published.");
        e.target.reset();
    });

    // Appointment Form
    document.getElementById('appointment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('app-name').value;
        const phone = document.getElementById('app-phone').value;
        const date = document.getElementById('app-date').value;
        const time = document.getElementById('app-time').value;

        const msg = `Hello Chioma, I would like to book a VIP Personal Style Consultation.\n\n• Name: ${name}\n• Phone: ${phone}\n• Date: ${date}\n• Time: ${time}`;
        window.open(`https://wa.me/2349067882985?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Contact Form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const phone = document.getElementById('contact-phone').value;
        const message = document.getElementById('contact-message').value;

        const msg = `Hello Oma's Thrift Hub,\n\nMessage from ${name} (${phone}):\n${message}`;
        window.open(`https://wa.me/2349067882985?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Newsletter Form
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Subscribed successfully! You will receive drop alerts.");
        e.target.reset();
    });

    // ==========================================
    // 9. EVENT LISTENERS & UI DRAWER HANDLERS
    // ==========================================

    // Header Search Toggle
    document.getElementById('search-trigger').addEventListener('click', () => {
        document.getElementById('search-overlay').classList.toggle('active');
    });
    document.getElementById('search-close').addEventListener('click', () => {
        document.getElementById('search-overlay').classList.remove('active');
    });

    // Live Search Input
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
        renderProducts(filtered);
    });

    // Drawer Toggles
    const cartDrawer = document.getElementById('cart-drawer');
    const wishlistDrawer = document.getElementById('wishlist-drawer');
    const backdrop = document.getElementById('cart-backdrop');

    document.getElementById('cart-trigger').addEventListener('click', () => {
        cartDrawer.classList.add('active');
        backdrop.classList.add('active');
    });

    document.getElementById('cart-close').addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        backdrop.classList.remove('active');
    });

    document.getElementById('wishlist-trigger').addEventListener('click', () => {
        wishlistDrawer.classList.add('active');
        backdrop.classList.add('active');
    });

    document.getElementById('wishlist-close').addEventListener('click', () => {
        wishlistDrawer.classList.remove('active');
        backdrop.classList.remove('active');
    });

    backdrop.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        wishlistDrawer.classList.remove('active');
        backdrop.classList.remove('active');
    });

    // Modal Close buttons
    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('product-modal').classList.remove('active');
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        backdrop.classList.remove('active');
        document.getElementById('checkout-modal').classList.add('active');
    });

    document.getElementById('checkout-close').addEventListener('click', () => {
        document.getElementById('checkout-modal').classList.remove('active');
    });

    document.getElementById('blog-modal-close').addEventListener('click', () => {
        document.getElementById('blog-modal').classList.remove('active');
    });

    // Mobile Menu Toggle
    document.getElementById('mobile-toggle').addEventListener('click', () => {
        document.getElementById('nav-menu').classList.toggle('active');
    });

    // Floating WhatsApp Button
    document.getElementById('whatsapp-float-btn').addEventListener('click', () => {
        document.getElementById('whatsapp-popover').classList.toggle('active');
    });

    // Sticky Nav Scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 10. INITIALIZATION
    // ==========================================
    renderCategories();
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    renderBlog();
    renderTestimonials();
});