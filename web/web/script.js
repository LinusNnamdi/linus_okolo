/**
 * StudioForge — Website Showcase
 * Central data + UI logic for filters, cards, modal, gallery
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Project data (easy to replace images later)
  // ---------------------------------------------------------------------------
  const PROJECTS = [
    {
      id: 1,
      title: "Business / Corporate Website",
      category: "Business",
      description: "Professional online presence for companies that need clear messaging, services and credibility.",
      purpose: "Establish brand authority, present services or products, generate leads and support sales conversations.",
      targetAudience: "B2B and B2C companies, startups, agencies and established organizations seeking a polished corporate presence.",
      features: ["Service & product pages", "About & team", "Contact & lead forms", "Blog / news", "SEO-ready structure"],
      frontend: "Semantic HTML/CSS/JS or component-based SPA; responsive layouts; accessible navigation; CMS-driven content where needed.",
      backend: "CMS or headless API for content; form handling; optional CRM integration; analytics endpoints.",
      database: "PostgreSQL or MySQL for structured content and form submissions; optional CMS database.",
      authentication: "Admin login for content editors; role-based access for marketing vs. technical staff.",
      integrations: "Email (transactional), CRM (e.g. HubSpot), analytics, optional calendar booking.",
      security: "HTTPS, CSRF protection on forms, sanitized inputs, secure admin sessions, regular dependency updates.",
      deployment: "Static or SSR hosting (Vercel, Netlify, or VPS); CDN; SSL; staging environment.",
      complexity: "Low–Medium",
      technologyStack: ["HTML5", "CSS3", "JavaScript", "Node/Express or CMS", "PostgreSQL", "Cloud hosting"],
      developmentSteps: ["Discovery", "IA & design", "Frontend build", "CMS/backend", "Content migration", "QA & launch"],
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
      ]
    },
    {
      id: 2,
      title: "E-commerce Store",
      category: "E-commerce",
      description: "Online store for selling products with catalog, cart, checkout and order management.",
      purpose: "Enable product discovery, purchase and order fulfillment for retail or D2C brands.",
      targetAudience: "Retailers, brands and entrepreneurs selling physical or digital goods online.",
      features: ["Product catalog", "Search & filters", "Cart & checkout", "Payment gateway", "Order history", "Admin inventory"],
      frontend: "Product listing and detail pages; cart state; responsive checkout; optional PWA for mobile.",
      backend: "Product & inventory APIs; order processing; payment webhooks; inventory updates; email notifications.",
      database: "PostgreSQL or MySQL for products, orders, users; Redis optional for sessions/cart.",
      authentication: "Customer accounts; guest checkout; admin roles for catalog and orders.",
      integrations: "Stripe/PayPal, shipping APIs, email, tax services, inventory sync.",
      security: "PCI-aware payment flow, HTTPS, secure tokens, input validation, rate limiting on checkout.",
      deployment: "Scalable cloud (AWS/GCP); CDN for assets; separate staging; monitoring on payment failures.",
      complexity: "Medium–High",
      technologyStack: ["HTML/CSS/JS or SPA", "Node/Laravel/Django", "PostgreSQL", "Stripe", "Redis", "CDN"],
      developmentSteps: ["Requirements", "Catalog design", "Checkout flows", "Payments", "Admin", "Security QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80"
      ]
    },
    {
      id: 3,
      title: "SaaS Web Application",
      category: "SaaS",
      description: "Subscription-based software product with multi-tenant features, dashboards and billing.",
      purpose: "Deliver software as a service with onboarding, usage, billing and account management.",
      targetAudience: "Product companies and startups building B2B or B2C subscription tools.",
      features: ["User onboarding", "Dashboard", "Subscription billing", "Team/roles", "Usage metrics", "Settings"],
      frontend: "SPA or hybrid app; dashboard UI; forms; charts; responsive and accessible.",
      backend: "Multi-tenant APIs; billing webhooks; background jobs; rate limits; feature flags.",
      database: "PostgreSQL with tenant isolation; optional analytics store.",
      authentication: "Email/password + OAuth; MFA optional; team invites and roles.",
      integrations: "Stripe Billing, email, analytics, optional SSO (SAML/OIDC).",
      security: "Tenant isolation, encryption, audit logs, secure session/token handling.",
      deployment: "Containerized or serverless; CI/CD; staging; observability (logs, metrics, alerts).",
      complexity: "High",
      technologyStack: ["React/Vue or Flutter Web", "Node/Go/Python", "PostgreSQL", "Stripe", "Redis", "Docker"],
      developmentSteps: ["Product discovery", "Architecture", "Auth & tenancy", "Core features", "Billing", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
      ]
    },
    {
      id: 4,
      title: "Real Estate Platform",
      category: "Real Estate",
      description: "Property listings, search, agent tools and inquiry management for buyers and sellers.",
      purpose: "Connect buyers, renters and agents with property inventory and streamline inquiries.",
      targetAudience: "Agencies, brokerages and property platforms serving residential or commercial markets.",
      features: ["Property search & map", "Listings detail", "Agent profiles", "Inquiry forms", "Saved searches", "Admin listings"],
      frontend: "Map integration; filterable search; listing galleries; responsive cards and detail pages.",
      backend: "Listing CRUD; search/index; inquiry routing; optional MLS sync; media storage.",
      database: "PostgreSQL with geospatial support; object storage for photos.",
      authentication: "Agent and admin accounts; optional user accounts for saved searches.",
      integrations: "Maps (Google/Mapbox), email/SMS, payment for featured listings, MLS if required.",
      security: "Secure uploads, access control on agent data, spam protection on forms.",
      deployment: "Cloud hosting; CDN for images; backup of listings; monitoring of search performance.",
      complexity: "Medium–High",
      technologyStack: ["HTML/JS or SPA", "Node/Laravel", "PostgreSQL + PostGIS", "S3", "Mapbox", "CDN"],
      developmentSteps: ["Requirements", "Search UX", "Listings model", "Maps", "Agent tools", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
      ]
    },
    {
      id: 5,
      title: "Restaurant / Food Ordering Website",
      category: "Services",
      description: "Menu, online ordering, table booking and delivery coordination for restaurants.",
      purpose: "Drive orders and reservations while presenting the brand and menu clearly.",
      targetAudience: "Restaurants, cafés, cloud kitchens and food brands offering pickup or delivery.",
      features: ["Digital menu", "Cart & ordering", "Table reservation", "Order status", "Admin menu & orders"],
      frontend: "Menu UI; cart; reservation calendar; mobile-first ordering flow.",
      backend: "Orders API; kitchen/status updates; payment; optional delivery partner APIs.",
      database: "PostgreSQL/MySQL for menu, orders, reservations; Redis optional for live status.",
      authentication: "Customer accounts optional; staff/admin for menu and order management.",
      integrations: "Payments, SMS/email, delivery (DoorDash-style or in-house), POS if needed.",
      security: "Secure payments, order integrity, rate limits on ordering endpoints.",
      deployment: "Cloud or VPS; SSL; peak-load readiness for dinner hours.",
      complexity: "Medium",
      technologyStack: ["HTML/CSS/JS", "Node/PHP", "MySQL", "Stripe", "SMS API", "Cloud host"],
      developmentSteps: ["Menu model", "Order flow", "Payments", "Reservations", "Admin", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
      ]
    },
    {
      id: 6,
      title: "School / Education Portal",
      category: "Education",
      description: "School information, admissions, events and parent/student communication hub.",
      purpose: "Centralize school presence, admissions and communication with parents and students.",
      targetAudience: "Schools, academies and educational institutions needing a public and internal portal.",
      features: ["Programs & admissions", "Events calendar", "News", "Parent/student login", "Document downloads", "Admin CMS"],
      frontend: "Public site + authenticated portal; forms; calendar; accessible content.",
      backend: "Content management; admissions workflow; notifications; document storage.",
      database: "PostgreSQL/MySQL for users, content, applications; file storage for docs.",
      authentication: "Student/parent/staff roles; secure password policies; optional SSO for staff.",
      integrations: "Email, calendar, payment for fees, optional SIS integration.",
      security: "Privacy of student data, access control, secure file downloads, HTTPS.",
      deployment: "Reliable hosting; backups; compliance-aware data handling where required.",
      complexity: "Medium",
      technologyStack: ["HTML/JS or CMS", "Laravel/Django", "PostgreSQL", "S3", "Email", "SSL"],
      developmentSteps: ["IA", "Public pages", "Admissions", "Portal auth", "CMS", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
      ]
    },
    {
      id: 7,
      title: "Healthcare / Medical Website",
      category: "Healthcare",
      description: "Clinic or practice site with services, providers, appointments and patient information.",
      purpose: "Inform patients, enable booking and present services and credentials professionally.",
      targetAudience: "Clinics, hospitals, private practices and healthcare networks.",
      features: ["Services & specialties", "Provider profiles", "Appointment booking", "Location & hours", "Patient resources", "Admin"],
      frontend: "Accessible UI; booking calendar; clear service hierarchy; mobile-friendly.",
      backend: "Scheduling API; provider availability; notifications; optional EHR hooks.",
      database: "PostgreSQL for appointments and content; strict access controls on patient-related data.",
      authentication: "Staff admin; optional patient accounts; strong session security.",
      integrations: "Calendar, SMS/email reminders, maps, optional telehealth or EHR.",
      security: "HIPAA-minded practices where applicable; encryption; audit trails; minimal data collection.",
      deployment: "Secure hosting; encrypted backups; monitoring; documented access policies.",
      complexity: "Medium–High",
      technologyStack: ["Accessible frontend", "Node/Python", "PostgreSQL", "Twilio/email", "Secure cloud"],
      developmentSteps: ["Compliance review", "Services IA", "Booking", "Providers", "Security QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80"
      ]
    },
    {
      id: 8,
      title: "Job Board / Recruitment Platform",
      category: "Services",
      description: "Connect employers with candidates through listings, search, applications and dashboards.",
      purpose: "Facilitate job discovery and applications for employers and job seekers.",
      targetAudience: "Recruiters, companies and platforms focused on hiring and talent matching.",
      features: ["Job listings", "Search & filters", "Employer dashboard", "Candidate profiles", "Applications", "Admin moderation"],
      frontend: "Search UX; job detail; application forms; employer and candidate dashboards.",
      backend: "Listings API; application workflow; notifications; search indexing; moderation tools.",
      database: "PostgreSQL for jobs, users, applications; optional Elasticsearch for search.",
      authentication: "Employer and candidate accounts; email verification; optional OAuth.",
      integrations: "Email, LinkedIn/OAuth optional, analytics, payment for featured jobs.",
      security: "Spam and fake listing controls; data privacy; secure file uploads (CVs).",
      deployment: "Scalable API; CDN; background workers for emails; monitoring.",
      complexity: "Medium–High",
      technologyStack: ["SPA or server-rendered", "Node/Rails", "PostgreSQL", "Redis", "Email", "Search index"],
      developmentSteps: ["Roles & flows", "Listings", "Applications", "Dashboards", "Moderation", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
      ]
    },
    {
      id: 9,
      title: "Financial / Digital Wallet Platform",
      category: "Finance",
      description: "Digital wallet or fintech product for balances, transfers, history and account security.",
      purpose: "Enable users to hold value, send/receive funds and manage financial activity online.",
      targetAudience: "Fintech startups and financial institutions building consumer or merchant wallet experiences.",
      features: ["Account balance", "Transfers", "Transaction history", "KYC flows", "Notifications", "Admin risk tools"],
      frontend: "Secure dashboard; transfer flows; clear status and history; strong mobile UX.",
      backend: "Ledger-style APIs; transfer orchestration; KYC hooks; webhooks; audit logging.",
      database: "PostgreSQL with strong consistency for balances; immutable transaction log.",
      authentication: "Strong auth (MFA); device awareness; session controls; recovery flows.",
      integrations: "Payment rails, KYC providers, SMS, email, optional banking APIs.",
      security: "Encryption, fraud checks, rate limits, audit trails, principle of least privilege.",
      deployment: "Highly available infrastructure; disaster recovery; compliance-ready logging.",
      complexity: "High",
      technologyStack: ["Secure SPA", "Node/Go/Java", "PostgreSQL", "Redis", "KYC API", "HSM/secrets"],
      developmentSteps: ["Compliance design", "Ledger model", "Auth & MFA", "Transfers", "Risk tools", "Security audit", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
      ]
    },
    {
      id: 10,
      title: "Hotel / Booking Website",
      category: "Services",
      description: "Property showcase, room availability, online booking and reservation management.",
      purpose: "Convert visitors into bookings and manage inventory and guest communications.",
      targetAudience: "Hotels, resorts, boutique stays and property managers.",
      features: ["Room catalog", "Availability calendar", "Booking engine", "Guest forms", "Admin reservations", "Payments"],
      frontend: "Gallery-rich pages; date picker; booking summary; confirmation UX.",
      backend: "Availability engine; booking creation; payment capture; cancellation rules; emails.",
      database: "PostgreSQL for rooms, rates, bookings; lock strategy for overbooking prevention.",
      authentication: "Guest optional accounts; staff/admin for operations.",
      integrations: "Payments, channel managers optional, email/SMS, maps, reviews.",
      security: "Secure payments, booking integrity, admin access control.",
      deployment: "Reliable hosting; backup of bookings; seasonal traffic readiness.",
      complexity: "Medium–High",
      technologyStack: ["HTML/JS or SPA", "Node/Laravel", "PostgreSQL", "Stripe", "Email", "CDN"],
      developmentSteps: ["Inventory model", "Availability", "Checkout", "Admin", "Integrations", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
      ]
    },
    {
      id: 11,
      title: "News / Magazine Website",
      category: "Media",
      description: "Editorial platform for articles, categories, authors and engagement features.",
      purpose: "Publish and distribute content with strong readability, SEO and editorial workflows.",
      targetAudience: "Publishers, media brands and organizations with ongoing content production.",
      features: ["Article pages", "Categories & tags", "Author profiles", "Search", "Newsletter signup", "CMS workflow"],
      frontend: "Readable typography; article templates; related content; fast load; AMP optional.",
      backend: "CMS or headless; publishing workflow; search; analytics; newsletter API.",
      database: "PostgreSQL/MySQL for content; CDN/object storage for media.",
      authentication: "Editor and admin roles; optional comments with moderation.",
      integrations: "Newsletter (e.g. Mailchimp), analytics, social sharing, ad slots if needed.",
      security: "XSS prevention, secure CMS auth, rate limits on comments/forms.",
      deployment: "CDN-heavy; caching; staging for editorial preview.",
      complexity: "Medium",
      technologyStack: ["Next-style or CMS", "Headless CMS or custom", "PostgreSQL", "CDN", "Newsletter API"],
      developmentSteps: ["Content model", "Templates", "CMS", "Search", "Performance", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1504711434869-fe1a838ae84f?w=800&q=80",
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80",
        "https://images.unsplash.com/photo-1456324504489-2e69d5e6a4f1?w=800&q=80"
      ]
    },
    {
      id: 12,
      title: "Portfolio / Personal Brand Website",
      category: "Business",
      description: "Showcase work, skills and contact for freelancers, creatives and professionals.",
      purpose: "Present projects and expertise to attract clients or opportunities.",
      targetAudience: "Designers, developers, photographers, consultants and personal brands.",
      features: ["Project gallery", "About", "Services", "Testimonials", "Contact form", "Blog optional"],
      frontend: "Visual-first layout; case study pages; smooth interactions; fast static build.",
      backend: "Optional CMS; form backend; analytics; simple contact API.",
      database: "Minimal — static or light CMS; form submissions storage.",
      authentication: "Admin only for content updates if CMS is used.",
      integrations: "Email, analytics, optional Calendly or similar.",
      security: "Form spam protection, HTTPS, minimal attack surface.",
      deployment: "Static hosting (Netlify/Vercel); custom domain; SSL.",
      complexity: "Low–Medium",
      technologyStack: ["HTML/CSS/JS", "Optional CMS", "Form API", "CDN", "Analytics"],
      developmentSteps: ["Content & IA", "Design", "Build", "Forms", "Polish", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1467232004584-a241cdc8eece?w=800&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"
      ]
    },
    {
      id: 13,
      title: "Event Management / Ticketing Platform",
      category: "Services",
      description: "Create events, sell tickets, manage attendees and check-in.",
      purpose: "Enable organizers to publish events and sell or distribute tickets end-to-end.",
      targetAudience: "Event organizers, venues, conferences and community groups.",
      features: ["Event pages", "Ticket types", "Checkout", "Attendee list", "Check-in", "Organizer dashboard"],
      frontend: "Event discovery and detail; ticket selection; checkout; organizer admin UI.",
      backend: "Inventory of tickets; payment; QR/ticket generation; check-in API; refunds.",
      database: "PostgreSQL for events, tickets, orders; unique ticket codes.",
      authentication: "Organizer accounts; attendee optional; staff check-in roles.",
      integrations: "Payments, email/SMS tickets, calendar, maps, optional streaming.",
      security: "Anti-fraud on sales, secure ticket codes, access control on attendee data.",
      deployment: "Peak capacity for on-sale; reliable email delivery; monitoring.",
      complexity: "Medium–High",
      technologyStack: ["SPA or hybrid", "Node/Django", "PostgreSQL", "Stripe", "QR lib", "Workers"],
      developmentSteps: ["Event model", "Ticketing", "Payments", "Check-in", "Dashboard", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
      ]
    },
    {
      id: 14,
      title: "Learning Management System (LMS)",
      category: "Education",
      description: "Courses, lessons, progress tracking and assessments for online learning.",
      purpose: "Deliver structured learning experiences with enrollment, content and progress.",
      targetAudience: "Training companies, schools, corporate L&D and course creators.",
      features: ["Course catalog", "Lessons & media", "Progress tracking", "Quizzes", "Certificates", "Instructor admin"],
      frontend: "Course player; progress UI; dashboard; responsive lesson layout.",
      backend: "Enrollment; content delivery; progress APIs; quiz scoring; certificates.",
      database: "PostgreSQL for users, courses, progress; object storage for video.",
      authentication: "Learner and instructor roles; optional SSO for enterprise.",
      integrations: "Video (Vimeo/S3), email, payment for paid courses, analytics.",
      security: "Content access control, secure media URLs, privacy of learner data.",
      deployment: "CDN for media; scalable API; backup of progress data.",
      complexity: "High",
      technologyStack: ["SPA/Flutter Web", "Node/Laravel", "PostgreSQL", "S3/CDN", "Stripe", "Workers"],
      developmentSteps: ["Course model", "Player UX", "Progress", "Assessments", "Admin", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
      ]
    },
    {
      id: 15,
      title: "Marketplace Platform",
      category: "E-commerce",
      description: "Multi-vendor marketplace with listings, orders, payments and vendor dashboards.",
      purpose: "Connect buyers and multiple sellers with discovery, transactions and operations tools.",
      targetAudience: "Platform founders and businesses building two-sided marketplaces.",
      features: ["Vendor onboarding", "Listings", "Search", "Cart & checkout", "Split payments", "Vendor & admin dashboards"],
      frontend: "Discovery and listing UX; cart; buyer and seller dashboards; responsive.",
      backend: "Multi-tenant listings; order routing; payment splits; disputes; moderation.",
      database: "PostgreSQL for users, listings, orders; search index optional.",
      authentication: "Buyer and seller accounts; KYC for sellers where required; admin roles.",
      integrations: "Stripe Connect or similar, email, shipping, analytics.",
      security: "Seller verification, payment security, fraud monitoring, access control.",
      deployment: "Scalable services; background jobs; strong monitoring of payments.",
      complexity: "High",
      technologyStack: ["SPA", "Node/Rails", "PostgreSQL", "Stripe Connect", "Redis", "Search"],
      developmentSteps: ["Two-sided design", "Listings", "Checkout", "Payouts", "Moderation", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        "https://images.unsplash.com/photo-1556742111-a301550d8024?w=800&q=80",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
      ]
    },
    {
      id: 16,
      title: "Logistics / Delivery Platform",
      category: "Services",
      description: "Order tracking, dispatch, driver apps and customer delivery status.",
      purpose: "Coordinate pickup, routing and delivery visibility for logistics operators.",
      targetAudience: "Delivery companies, last-mile operators and businesses with fleet coordination needs.",
      features: ["Order intake", "Dispatch board", "Tracking", "Driver assignment", "Status updates", "Admin reports"],
      frontend: "Ops dashboard; tracking map; customer status page; mobile-friendly driver views.",
      backend: "Order lifecycle; assignment logic; real-time status; notifications; reporting.",
      database: "PostgreSQL; geospatial for locations; optional real-time store (Redis).",
      authentication: "Ops staff, drivers, optional customer accounts; role-based access.",
      integrations: "Maps, SMS/push, payments optional, fleet or GPS providers.",
      security: "Secure driver endpoints, location data policies, audit of order changes.",
      deployment: "Real-time capable infra; monitoring; high availability for dispatch.",
      complexity: "High",
      technologyStack: ["Dashboard SPA", "Node/Go", "PostgreSQL", "Redis", "Maps", "Push/SMS"],
      developmentSteps: ["Order model", "Dispatch UX", "Tracking", "Driver flows", "Notifications", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
        "https://images.unsplash.com/photo-1601584115197-04ecc1dedea6?w=800&q=80",
        "https://images.unsplash.com/photo-1578574577315-52ac881c63ea?w=800&q=80"
      ]
    },
    {
      id: 17,
      title: "Church / Religious Organization Website",
      category: "Community",
      description: "Sermons, events, ministries and giving for churches and faith communities.",
      purpose: "Connect congregation and visitors with services, media and ways to participate.",
      targetAudience: "Churches, mosques, temples and faith-based organizations.",
      features: ["Service times", "Sermon media", "Events", "Ministries", "Online giving", "Contact & visit"],
      frontend: "Welcoming design; media embeds; events calendar; mobile-first.",
      backend: "CMS for content; giving integration; event management; newsletter.",
      database: "CMS DB or PostgreSQL; secure handling of donor-related data if stored.",
      authentication: "Admin/editor roles; optional member portal.",
      integrations: "Giving (Stripe/donor tools), YouTube/Vimeo, email, calendar.",
      security: "Secure forms and giving; privacy of member data; HTTPS.",
      deployment: "Reliable hosting; CDN for media; easy content updates for staff.",
      complexity: "Low–Medium",
      technologyStack: ["CMS or static + API", "Giving API", "Email", "CDN", "SSL"],
      developmentSteps: ["Content IA", "Design", "Media", "Events", "Giving", "Training", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1438236812111-d05a4f8e6d0e?w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80"
      ]
    },
    {
      id: 18,
      title: "NGO / Nonprofit Website",
      category: "Community",
      description: "Mission storytelling, programs, impact and donation flows for nonprofits.",
      purpose: "Communicate impact, recruit support and accept donations or volunteers.",
      targetAudience: "NGOs, charities and mission-driven organizations.",
      features: ["Programs & impact", "Stories", "Donate", "Volunteer signup", "News", "Transparency pages"],
      frontend: "Story-driven design; donation UX; accessible forms; clear CTAs.",
      backend: "CMS; donation provider; volunteer forms; email automation.",
      database: "CMS or PostgreSQL; careful handling of donor information.",
      authentication: "Staff CMS access; optional donor accounts.",
      integrations: "Payment/donation platforms, email, analytics, social.",
      security: "PCI-aware donations, form security, privacy policy alignment.",
      deployment: "Cost-effective hosting; CDN; easy updates for campaigns.",
      complexity: "Low–Medium",
      technologyStack: ["CMS or custom", "Donation API", "Email", "Analytics", "CDN"],
      developmentSteps: ["Messaging", "IA", "Donate flow", "CMS", "Forms", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
      ]
    },
    {
      id: 19,
      title: "Social Community Platform",
      category: "Community",
      description: "Profiles, posts, feeds, groups and moderation for community products.",
      purpose: "Enable members to connect, share and participate in groups or topics.",
      targetAudience: "Community builders, brands and products centered on member interaction.",
      features: ["Profiles", "Feed & posts", "Groups", "Notifications", "Moderation", "Admin tools"],
      frontend: "Feed UI; profiles; group pages; real-time-friendly interactions; mobile UX.",
      backend: "Feed generation; post/CRUD; notifications; moderation queues; rate limits.",
      database: "PostgreSQL; optional Redis for feeds/notifications; object storage for media.",
      authentication: "Member accounts; optional OAuth; report/block flows.",
      integrations: "Push/email notifications, media processing, analytics, optional SSO.",
      security: "Abuse prevention, content policies, secure media, privacy controls.",
      deployment: "Scalable API; workers for notifications; monitoring of abuse signals.",
      complexity: "High",
      technologyStack: ["SPA", "Node/Go", "PostgreSQL", "Redis", "S3", "Push"],
      developmentSteps: ["Core entities", "Feed", "Groups", "Moderation", "Notifications", "QA", "Launch"],
      images: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
      ]
    },
    {
      id: 20,
      title: "Admin Dashboard / Business Management System",
      category: "SaaS",
      description: "Internal tools for operations: users, data tables, reports and workflows.",
      purpose: "Give teams visibility and control over business data and day-to-day operations.",
      targetAudience: "Companies needing internal admin panels, ops tools or back-office systems.",
      features: ["Data tables", "Filters & export", "Role-based access", "Reports", "Activity logs", "Settings"],
      frontend: "Dense but clear UI; tables; forms; charts; keyboard-friendly patterns.",
      backend: "CRUD APIs; permissions; reporting queries; audit logs; export jobs.",
      database: "PostgreSQL matched to domain models; read replicas if reporting is heavy.",
      authentication: "Staff SSO or email; granular roles; session management.",
      integrations: "Existing business APIs, email, export to sheets/CSV, optional BI tools.",
      security: "Strict RBAC, audit trails, IP allowlists optional, secrets management.",
      deployment: "Private or VPC-friendly hosting; backups; access logging.",
      complexity: "Medium–High",
      technologyStack: ["SPA/Flutter Web", "Node/Python", "PostgreSQL", "Auth provider", "Charts", "Workers"],
      developmentSteps: ["Domain model", "RBAC", "Core screens", "Reports", "Audit", "QA", "Rollout"],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let activeCategory = "all";
  let searchQuery = "";
  let galleryImages = [];
  let galleryIndex = 0;
  let lastFocused = null;

  // ---------------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------------
  const cardsGrid = document.getElementById("cards-grid");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");
  const searchInput = document.getElementById("search-input");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const emptyResetBtn = document.getElementById("empty-reset");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const yearEl = document.getElementById("year");

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  function padId(id) {
    return String(id).padStart(2, "0");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function filterProjects() {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const catMatch = activeCategory === "all" || p.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.category,
        p.description,
        p.purpose,
        ...(p.features || [])
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  function updateResultCount(n) {
    resultCount.textContent =
      n === 0
        ? "No results"
        : n === 1
          ? "1 website type"
          : `${n} website types`;
  }

  function updateResetVisibility() {
    const hasFilter = activeCategory !== "all" || searchQuery.trim() !== "";
    resetFiltersBtn.hidden = !hasFilter;
  }

  // ---------------------------------------------------------------------------
  // Cards
  // ---------------------------------------------------------------------------
  function createCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";
    article.setAttribute("role", "listitem");
    article.dataset.id = project.id;

    const tags = (project.features || []).slice(0, 4)
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");

    const imgSrc = project.images && project.images[0] ? project.images[0] : "";

    article.innerHTML = `
      <div class="card-image-wrap" data-action="gallery" data-id="${project.id}" role="button" tabindex="0" aria-label="View images for ${escapeHtml(project.title)}">
        <span class="card-badge">#${padId(project.id)}</span>
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(project.title)} preview" loading="lazy" data-fallback="${escapeHtml(project.title)}" />
      </div>
      <div class="card-body">
        <p class="card-category">${escapeHtml(project.category)}</p>
        <h3 class="card-title">${escapeHtml(project.title)}</h3>
        <p class="card-desc">${escapeHtml(project.description)}</p>
        <ul class="card-tags">${tags}</ul>
        <div class="card-actions">
          <button type="button" class="btn btn-secondary btn-sm" data-action="read-more" data-id="${project.id}">Read More</button>
          <button type="button" class="btn btn-ghost btn-sm" data-action="gallery" data-id="${project.id}">View Images</button>
          <a href="../home.html" class="btn btn-primary btn-sm">Start This Project</a>
        </div>
      </div>
    `;

    const img = article.querySelector("img");
    if (img) {
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        const wrap = img.parentElement;
        const fallback = document.createElement("div");
        fallback.className = "img-fallback";
        fallback.textContent = project.title;
        img.replaceWith(fallback);
      });
    }

    return article;
  }

  function renderCards() {
    const list = filterProjects();
    cardsGrid.innerHTML = "";
    list.forEach((p) => cardsGrid.appendChild(createCard(p)));
    updateResultCount(list.length);
    emptyState.hidden = list.length > 0;
    updateResetVisibility();
  }

  // ---------------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------------
  function openModal(project) {
    lastFocused = document.activeElement;
    const stack = (project.technologyStack || [])
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join("");
    const features = (project.features || [])
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join("");
    const steps = (project.developmentSteps || [])
      .map((s) => `<li>${escapeHtml(s)}</li>`)
      .join("");

    modalContent.innerHTML = `
      <h2 id="modal-title">${escapeHtml(project.title)}</h2>
      <p class="modal-cat">${escapeHtml(project.category)}</p>

      <div class="modal-section">
        <h3>Overview</h3>
        <p>${escapeHtml(project.purpose)}</p>
      </div>
      <div class="modal-section">
        <h3>Ideal clients &amp; audience</h3>
        <p>${escapeHtml(project.targetAudience)}</p>
      </div>
      <div class="modal-section">
        <h3>Core features</h3>
        <ul>${features}</ul>
      </div>
      <div class="modal-section">
        <h3>Frontend architecture</h3>
        <p>${escapeHtml(project.frontend)}</p>
      </div>
      <div class="modal-section">
        <h3>Backend architecture</h3>
        <p>${escapeHtml(project.backend)}</p>
      </div>
      <div class="modal-section">
        <h3>Database</h3>
        <p>${escapeHtml(project.database)}</p>
      </div>
      <div class="modal-section">
        <h3>Authentication</h3>
        <p>${escapeHtml(project.authentication)}</p>
      </div>
      <div class="modal-section">
        <h3>APIs &amp; integrations</h3>
        <p>${escapeHtml(project.integrations)}</p>
      </div>
      <div class="modal-section">
        <h3>Security</h3>
        <p>${escapeHtml(project.security)}</p>
      </div>
      <div class="modal-section">
        <h3>Deployment</h3>
        <p>${escapeHtml(project.deployment)}</p>
      </div>
      <div class="modal-section">
        <h3>Estimated complexity</h3>
        <span class="modal-complexity">${escapeHtml(project.complexity)}</span>
      </div>
      <div class="modal-section">
        <h3>Recommended technology stack</h3>
        <ul class="modal-stack">${stack}</ul>
      </div>
      <div class="modal-section">
        <h3>Project development stages</h3>
        <ul>${steps}</ul>
      </div>
      <div class="modal-cta">
        <p style="margin:0 0 1rem;color:var(--color-text-muted);font-size:0.9375rem;">Ready to build something like this?</p>
        <a href="../home.html" class="btn btn-primary btn-lg">Start This Project</a>
      </div>
    `;

    modalOverlay.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  // ---------------------------------------------------------------------------
  // Lightbox
  // ---------------------------------------------------------------------------
  function openGallery(project) {
    galleryImages = project.images && project.images.length ? project.images : [];
    if (!galleryImages.length) return;
    galleryIndex = 0;
    lastFocused = document.activeElement;
    updateLightboxImage();
    lightboxOverlay.hidden = false;
    document.body.classList.add("lightbox-open");
    lightboxClose.focus();
  }

  function updateLightboxImage() {
    const src = galleryImages[galleryIndex];
    lightboxImg.src = src;
    lightboxImg.alt = `Image ${galleryIndex + 1} of ${galleryImages.length}`;
    lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  }

  function closeLightbox() {
    lightboxOverlay.hidden = true;
    document.body.classList.remove("lightbox-open");
    lightboxImg.src = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function galleryPrev() {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }

  function galleryNext() {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }

  // ---------------------------------------------------------------------------
  // Filters
  // ---------------------------------------------------------------------------
  function setCategory(cat) {
    activeCategory = cat;
    filterBtns.forEach((btn) => {
      const isActive = btn.dataset.category === cat;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    renderCards();
  }

  function resetFilters() {
    searchInput.value = "";
    searchQuery = "";
    setCategory("all");
  }

  // ---------------------------------------------------------------------------
  // Mobile nav
  // ---------------------------------------------------------------------------
  function toggleMenu() {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", open ? "false" : "true");
    menuToggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    if (open) {
      mobileNav.hidden = true;
    } else {
      mobileNav.hidden = false;
    }
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  function getProjectById(id) {
    return PROJECTS.find((p) => p.id === Number(id));
  }

  cardsGrid.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
    const id = actionEl.dataset.id;
    const project = getProjectById(id);
    if (!project) return;
    if (actionEl.dataset.action === "read-more") {
      openModal(project);
    } else if (actionEl.dataset.action === "gallery") {
      openGallery(project);
    }
  });

  cardsGrid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const actionEl = e.target.closest("[data-action=\"gallery\"]");
    if (!actionEl) return;
    e.preventDefault();
    const project = getProjectById(actionEl.dataset.id);
    if (project) openGallery(project);
  });

  filterBtns.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    btn.addEventListener("click", () => setCategory(btn.dataset.category));
  });

  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = searchInput.value;
      renderCards();
    }, 180);
  });

  resetFiltersBtn.addEventListener("click", resetFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetFilters);

  menuToggle.addEventListener("click", toggleMenu);
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", galleryPrev);
  lightboxNext.addEventListener("click", galleryNext);
  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!lightboxOverlay.hidden) {
        closeLightbox();
      } else if (!modalOverlay.hidden) {
        closeModal();
      } else if (menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    }
    if (!lightboxOverlay.hidden) {
      if (e.key === "ArrowLeft") galleryPrev();
      if (e.key === "ArrowRight") galleryNext();
    }
  });

  // Footer category quick filters
  document.querySelectorAll("[data-filter-cat]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = link.getAttribute("data-filter-cat");
      setCategory(cat);
      document.getElementById("samples").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Init
  renderCards();
})();
