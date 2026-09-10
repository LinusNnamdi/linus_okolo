/**
 * Flutter App Development Showcase
 * Data-driven samples, modal, lightbox, search & filters
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Sample data — replace image src values with real screenshots when ready
  // ---------------------------------------------------------------------------
  const SAMPLES = [
    {
      id: 1,
      number: "01",
      category: "Business",
      title: "Authentication & Onboarding",
      shortDescription:
        "Secure and polished authentication experience for modern Flutter applications.",
      description:
        "A production-ready authentication and onboarding experience covering login, registration, OTP verification, password recovery, biometric unlock, and guided first-run flows. Designed for security, accessibility, and conversion.",
      tags: ["OTP", "Biometric", "OAuth", "Security"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Login", alt: "Flutter login screen", caption: "Modern login with email and social options" },
        { src: "https://placehold.co/390x844/0f172a/0ab599?text=Sign+Up", alt: "Flutter sign-up screen", caption: "Registration with validation" },
        { src: "https://placehold.co/390x844/111827/11a791?text=OTP", alt: "OTP verification screen", caption: "OTP verification flow" },
        { src: "https://placehold.co/390x844/1e293b/0ab599?text=Biometric", alt: "Biometric authentication", caption: "Biometric unlock" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Onboarding", alt: "Onboarding carousel", caption: "Onboarding introduction" },
      ],
      frontend: [
        "Login & registration forms",
        "OTP verification UI",
        "Password recovery",
        "Biometric authentication",
        "Session management",
        "Form validation & error states",
        "Loading and empty states",
      ],
      backend: [
        "Authentication API",
        "User registration endpoint",
        "Login & token issuance",
        "OTP generation and verification",
        "Password reset flow",
        "Token / session management",
        "Role-based access control",
      ],
      database: ["Users", "Sessions", "OTP records", "Roles", "Permissions"],
      security: [
        "Password hashing",
        "Secure token management",
        "Rate limiting",
        "Input validation",
        "Account lockout policies",
        "Secure API communication (TLS)",
      ],
      integrations: ["OAuth providers", "SMS / Email OTP", "Biometric APIs"],
      notifications: ["Email verification", "Password reset emails", "Security alerts"],
      admin: ["User management", "Session revocation", "Audit logs"],
      complexity: "Medium",
      flutterArchitecture: "Clean Architecture + Bloc / Riverpod",
      backendArchitecture: "REST or GraphQL with JWT / refresh tokens",
      developmentSteps: [
        "Requirements analysis",
        "UX flow definition",
        "Wireframes",
        "UI design",
        "Flutter project setup",
        "Component development",
        "State management",
        "API integration",
        "Backend implementation",
        "Database implementation",
        "Authentication & security",
        "Testing",
        "Optimization",
        "Deployment",
        "Maintenance",
      ],
    },
    {
      id: 2,
      number: "02",
      category: "Business",
      title: "Dashboard",
      shortDescription:
        "Centralized overview with statistics, summaries, recent activity, and shortcuts.",
      description:
        "A high-density yet readable dashboard that surfaces KPIs, charts, recent activity, and quick actions. Built for decision-makers who need clarity at a glance across web and mobile.",
      tags: ["KPIs", "Charts", "Activity", "Shortcuts"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Dashboard", alt: "Main dashboard", caption: "Primary metrics overview" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Charts", alt: "Analytics charts", caption: "Interactive chart views" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Activity", alt: "Activity feed", caption: "Recent activity stream" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Widgets", alt: "Customizable widgets", caption: "Configurable widget layout" },
      ],
      frontend: [
        "KPI cards and summary widgets",
        "Chart components",
        "Activity / notification feed",
        "Quick-action shortcuts",
        "Responsive grid layout",
        "Pull-to-refresh and offline indicators",
      ],
      backend: [
        "Aggregated metrics API",
        "Time-series data endpoints",
        "Activity feed service",
        "User preference storage",
      ],
      database: ["Metrics snapshots", "Events", "User preferences", "Cached aggregates"],
      security: ["Scoped data access", "API authentication", "Audit of sensitive metrics"],
      integrations: ["Analytics SDKs", "Export (CSV / PDF)"],
      notifications: ["Threshold alerts", "Daily digests"],
      admin: ["Dashboard configuration", "Role-based widget visibility"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture + Riverpod / GetX",
      backendArchitecture: "REST with caching layer or GraphQL",
      developmentSteps: [
        "Metrics definition",
        "UX wireframes",
        "Chart library selection",
        "API contracts",
        "Frontend implementation",
        "Backend aggregation",
        "Performance tuning",
        "Testing & deployment",
      ],
    },
    {
      id: 3,
      number: "03",
      category: "Commerce",
      title: "E-Commerce / Shopping",
      shortDescription:
        "Product discovery, categories, search, filters, cart, checkout, and orders.",
      description:
        "End-to-end shopping experience from discovery through checkout and order history. Optimized for conversion, performance, and multi-platform consistency.",
      tags: ["Catalog", "Cart", "Checkout", "Orders"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Shop+Home", alt: "Shop home", caption: "Featured products and categories" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Listing", alt: "Product listing", caption: "Product grid with filters" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=PDP", alt: "Product detail", caption: "Product detail page" },
        { src: "https://placehold.co/390x844/0f172a/0ab599?text=Cart", alt: "Shopping cart", caption: "Cart and quantity controls" },
        { src: "https://placehold.co/390x844/1e293b/94a3b8?text=Checkout", alt: "Checkout", caption: "Checkout and payment" },
      ],
      frontend: [
        "Home / category navigation",
        "Search and filters",
        "Product list and detail",
        "Cart management",
        "Checkout flow",
        "Order history and tracking",
      ],
      backend: [
        "Catalog API",
        "Inventory and pricing",
        "Cart service",
        "Order creation and status",
        "Payment webhook handling",
      ],
      database: ["Products", "Categories", "Inventory", "Carts", "Orders", "Customers"],
      security: ["PCI-aware payment flow", "Secure customer data", "Fraud checks"],
      integrations: ["Payment gateways", "Shipping providers", "Email receipts"],
      notifications: ["Order confirmation", "Shipping updates", "Promotions"],
      admin: ["Product CMS", "Order management", "Inventory tools"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + Bloc",
      backendArchitecture: "REST / GraphQL + payment webhooks",
      developmentSteps: [
        "Catalog modeling",
        "UX for browse → buy",
        "UI design system",
        "Flutter catalog & cart",
        "Checkout & payments",
        "Order backend",
        "Admin tools",
        "QA and launch",
      ],
    },
    {
      id: 4,
      number: "04",
      category: "Lifestyle",
      title: "Food Delivery",
      shortDescription:
        "Restaurant discovery, menus, cart, checkout, delivery tracking, and order status.",
      description:
        "Complete food delivery experience with restaurant discovery, menu browsing, cart, real-time order status, and map-based tracking for drivers and customers.",
      tags: ["Restaurants", "Menu", "Tracking", "Orders"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Restaurants", alt: "Restaurant discovery", caption: "Nearby restaurants" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Menu", alt: "Menu screen", caption: "Restaurant menu" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Cart", alt: "Food cart", caption: "Order cart" },
        { src: "https://placehold.co/390x844/0f172a/0ab599?text=Tracking", alt: "Delivery tracking", caption: "Live delivery map" },
        { src: "https://placehold.co/390x844/1e293b/94a3b8?text=Status", alt: "Order status", caption: "Order status timeline" },
      ],
      frontend: [
        "Restaurant list and filters",
        "Menu and item customization",
        "Cart and checkout",
        "Live map tracking",
        "Order status timeline",
      ],
      backend: [
        "Restaurant and menu APIs",
        "Order orchestration",
        "Driver assignment",
        "Real-time location updates",
      ],
      database: ["Restaurants", "Menus", "Orders", "Drivers", "Locations"],
      security: ["Authenticated orders", "Payment security", "Location privacy"],
      integrations: ["Maps", "Payments", "Push notifications"],
      notifications: ["Order accepted", "Out for delivery", "Delivered"],
      admin: ["Restaurant portal", "Dispatch console"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + Riverpod",
      backendArchitecture: "REST + WebSockets / Firebase for live tracking",
      developmentSteps: [
        "Domain modeling",
        "Map UX design",
        "Flutter UI",
        "Order backend",
        "Real-time layer",
        "Driver app coordination",
        "Testing",
        "Launch",
      ],
    },
    {
      id: 5,
      number: "05",
      category: "Lifestyle",
      title: "Ride Booking / Ride-Hailing",
      shortDescription:
        "Pickup and destination selection, driver matching, live tracking, and payment.",
      description:
        "Ride-hailing flows from location selection and fare estimate through driver matching, in-trip tracking, and post-trip payment and rating.",
      tags: ["Maps", "Matching", "Tracking", "Payments"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Request", alt: "Ride request", caption: "Pickup and destination" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Matching", alt: "Driver matching", caption: "Finding a driver" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Trip", alt: "Active trip", caption: "Live trip tracking" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Receipt", alt: "Trip receipt", caption: "Payment and rating" },
      ],
      frontend: [
        "Map-based pickup / dropoff",
        "Fare estimate UI",
        "Driver matching state",
        "Live trip map",
        "Payment and rating",
      ],
      backend: [
        "Geospatial matching",
        "Trip lifecycle API",
        "Pricing engine",
        "Payment capture",
      ],
      database: ["Riders", "Drivers", "Trips", "Locations", "Payments"],
      security: ["Identity verification", "Payment security", "Location data protection"],
      integrations: ["Maps SDKs", "Payments", "Push / SMS"],
      notifications: ["Driver assigned", "Arriving", "Trip complete"],
      admin: ["Dispatch tools", "Trip support"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + Bloc",
      backendArchitecture: "REST + real-time (WebSocket / FCM)",
      developmentSteps: [
        "Map & location UX",
        "Matching algorithm design",
        "Flutter ride flow",
        "Backend services",
        "Payments",
        "QA on devices",
        "Soft launch",
      ],
    },
    {
      id: 6,
      number: "06",
      category: "Finance",
      title: "Banking / Digital Wallet",
      shortDescription:
        "Balances, transfers, transaction history, cards, beneficiaries, and activity.",
      description:
        "Secure digital banking and wallet experiences including balances, transfers, card management, beneficiaries, and detailed transaction history with strong security controls.",
      tags: ["Transfers", "Cards", "History", "Security"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Wallet", alt: "Wallet home", caption: "Balance and quick actions" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Transfer", alt: "Transfer screen", caption: "Send money flow" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=History", alt: "Transaction history", caption: "Transaction list" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Cards", alt: "Cards management", caption: "Virtual and physical cards" },
      ],
      frontend: [
        "Account overview",
        "Transfer and payment flows",
        "Transaction history and filters",
        "Card controls",
        "Beneficiary management",
      ],
      backend: [
        "Ledger and balance APIs",
        "Transfer orchestration",
        "Card lifecycle",
        "Statement generation",
      ],
      database: ["Accounts", "Transactions", "Cards", "Beneficiaries", "Audit logs"],
      security: [
        "Strong authentication (MFA)",
        "Encryption at rest and in transit",
        "Transaction limits and monitoring",
        "Device binding",
      ],
      integrations: ["Payment rails", "KYC providers", "Push notifications"],
      notifications: ["Transfer alerts", "Low balance", "Security events"],
      admin: ["Compliance tools", "Dispute handling"],
      complexity: "Very High",
      flutterArchitecture: "Clean Architecture + strict security practices",
      backendArchitecture: "Hardened REST + event-sourced ledger where appropriate",
      developmentSteps: [
        "Security & compliance planning",
        "UX for trust",
        "Flutter secure UI",
        "Backend ledger",
        "KYC / MFA",
        "Penetration testing",
        "Certification and launch",
      ],
    },
    {
      id: 7,
      number: "07",
      category: "Business",
      title: "Job Marketplace",
      shortDescription:
        "Job discovery, search, filtering, applications, saved jobs, and applicant tracking.",
      description:
        "Two-sided job marketplace supporting job seekers (search, apply, track) and employers (post, screen, message) with clear application pipelines.",
      tags: ["Jobs", "Apply", "ATS", "Search"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Jobs", alt: "Job list", caption: "Job discovery feed" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Detail", alt: "Job detail", caption: "Job description and apply" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Apply", alt: "Application form", caption: "Application flow" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Tracker", alt: "Application tracker", caption: "Application status" },
      ],
      frontend: [
        "Job search and filters",
        "Job detail and apply",
        "Saved jobs",
        "Application tracker",
        "Employer posting UI",
      ],
      backend: [
        "Job listing API",
        "Application pipeline",
        "Search indexing",
        "Messaging between parties",
      ],
      database: ["Jobs", "Applications", "Profiles", "Companies", "Messages"],
      security: ["Profile privacy", "Employer verification", "Secure messaging"],
      integrations: ["Email", "Resume parse (optional)", "Calendar"],
      notifications: ["New matches", "Application updates", "Messages"],
      admin: ["Moderation", "Featured jobs"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture + Riverpod",
      backendArchitecture: "REST + search service",
      developmentSteps: [
        "Two-sided flow mapping",
        "Search design",
        "Flutter apps",
        "Backend & indexing",
        "Messaging",
        "QA",
        "Launch",
      ],
    },
    {
      id: 8,
      number: "08",
      category: "Social",
      title: "Social Media",
      shortDescription:
        "Feed, posts, reactions, comments, profiles, followers, messaging, and notifications.",
      description:
        "Core social product surfaces: algorithmic or chronological feed, rich posts, engagement, profiles, follow graph, and in-app messaging with notification plumbing.",
      tags: ["Feed", "Posts", "Profile", "Engage"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Feed", alt: "Social feed", caption: "Home feed" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Post", alt: "Create post", caption: "Composer" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Profile", alt: "User profile", caption: "Profile and posts grid" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Comments", alt: "Comments", caption: "Comments and reactions" },
      ],
      frontend: [
        "Infinite feed",
        "Post composer (media)",
        "Reactions and comments",
        "Profiles and follow",
        "Notifications inbox",
      ],
      backend: [
        "Feed ranking / timeline",
        "Media upload pipeline",
        "Social graph",
        "Notification fan-out",
      ],
      database: ["Users", "Posts", "Media", "Follows", "Reactions", "Comments"],
      security: ["Content moderation hooks", "Report abuse", "Privacy settings"],
      integrations: ["CDN / media storage", "Push", "Analytics"],
      notifications: ["Likes", "Comments", "Follows", "Mentions"],
      admin: ["Moderation queue", "Featured content"],
      complexity: "Very High",
      flutterArchitecture: "Clean Architecture + efficient list virtualization",
      backendArchitecture: "REST / GraphQL + media pipeline + cache",
      developmentSteps: [
        "Feed UX research",
        "Media pipeline",
        "Flutter feed performance",
        "Backend scale plan",
        "Moderation",
        "Beta and iterate",
      ],
    },
    {
      id: 9,
      number: "09",
      category: "Social",
      title: "Chat / Messaging",
      shortDescription:
        "One-to-one and group conversations, media, typing indicators, read receipts.",
      description:
        "Reliable messaging product with 1:1 and group chats, media sharing, presence, typing indicators, read receipts, and notification sync across devices.",
      tags: ["1:1", "Groups", "Media", "Realtime"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Chats", alt: "Chat list", caption: "Conversation list" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Thread", alt: "Chat thread", caption: "Message thread" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Group", alt: "Group chat", caption: "Group conversation" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Media", alt: "Media share", caption: "Sharing images and files" },
      ],
      frontend: [
        "Conversation list",
        "Message thread UI",
        "Media picker and preview",
        "Typing and read receipts",
        "Push notification handling",
      ],
      backend: [
        "Realtime message delivery",
        "Media storage",
        "Presence service",
        "Push fan-out",
      ],
      database: ["Conversations", "Messages", "Participants", "Media refs"],
      security: ["E2E optional", "Access control per room", "Rate limits"],
      integrations: ["WebSocket / Firebase", "FCM / APNs", "Storage"],
      notifications: ["New message", "Mentions"],
      admin: ["Report handling", "Retention policies"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + stream-based state",
      backendArchitecture: "Realtime gateway + persistent store",
      developmentSteps: [
        "Protocol design",
        "Flutter chat UI",
        "Realtime backend",
        "Media pipeline",
        "Offline sync",
        "Scale testing",
      ],
    },
    {
      id: 10,
      number: "10",
      category: "Healthcare",
      title: "Healthcare / Medical",
      shortDescription:
        "Appointments, doctors, patients, records, prescriptions, and care communication.",
      description:
        "Patient- and clinician-facing healthcare flows: booking, profiles, medical records access, prescriptions, and secure messaging aligned with privacy expectations.",
      tags: ["Appointments", "Records", "Rx", "Care"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Book", alt: "Book appointment", caption: "Appointment booking" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Doctors", alt: "Doctor list", caption: "Find a doctor" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Records", alt: "Medical records", caption: "Health records view" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Rx", alt: "Prescriptions", caption: "Prescription list" },
      ],
      frontend: [
        "Appointment scheduling",
        "Provider profiles",
        "Records viewer",
        "Secure messaging",
        "Medication lists",
      ],
      backend: [
        "Scheduling engine",
        "EHR integration adapters",
        "Secure document storage",
        "Prescription workflows",
      ],
      database: ["Patients", "Providers", "Appointments", "Records metadata", "Messages"],
      security: [
        "Strict access control",
        "Audit logging",
        "Encryption",
        "Session timeouts",
      ],
      integrations: ["Calendar", "EHR APIs (where applicable)", "SMS reminders"],
      notifications: ["Appointment reminders", "Lab results available"],
      admin: ["Clinic admin console", "Audit reports"],
      complexity: "Very High",
      flutterArchitecture: "Clean Architecture + security-first practices",
      backendArchitecture: "Hardened APIs + compliance-oriented storage",
      developmentSteps: [
        "Compliance requirements",
        "Clinical UX",
        "Flutter secure client",
        "Backend & integrations",
        "Security review",
        "Pilot with clinics",
      ],
    },
    {
      id: 11,
      number: "11",
      category: "Lifestyle",
      title: "Fitness / Workout",
      shortDescription:
        "Workout plans, exercise tracking, progress analytics, goals, and history.",
      description:
        "Fitness product with guided plans, live workout tracking, progress charts, goal setting, and activity history designed to keep users engaged over time.",
      tags: ["Plans", "Tracking", "Goals", "Analytics"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Plans", alt: "Workout plans", caption: "Training programs" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Workout", alt: "Active workout", caption: "Exercise tracking" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Progress", alt: "Progress charts", caption: "Progress analytics" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Goals", alt: "Goals", caption: "Goal setting" },
      ],
      frontend: [
        "Plan browser",
        "Workout player / timer",
        "Progress dashboards",
        "Goal management",
        "History and streaks",
      ],
      backend: [
        "Plan and exercise library",
        "Session logging API",
        "Progress aggregation",
        "Reminder scheduling",
      ],
      database: ["Users", "Plans", "Exercises", "Sessions", "Goals"],
      security: ["Account security", "Private health-related data handling"],
      integrations: ["Wearables (optional)", "Push", "Health platforms"],
      notifications: ["Workout reminders", "Milestone achievements"],
      admin: ["Content CMS for plans"],
      complexity: "Medium",
      flutterArchitecture: "Clean Architecture + local-first options",
      backendArchitecture: "REST + optional offline sync",
      developmentSteps: [
        "Content model",
        "Workout UX",
        "Flutter tracking",
        "Progress backend",
        "Engagement features",
        "Launch",
      ],
    },
    {
      id: 12,
      number: "12",
      category: "Productivity",
      title: "Learning / Education",
      shortDescription:
        "Courses, lessons, quizzes, progress tracking, certificates, and student dashboards.",
      description:
        "Learning platform experiences: course catalogs, lesson players, quizzes, progress tracking, certificates, and instructor or student dashboards.",
      tags: ["Courses", "Quizzes", "Progress", "Certificates"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Courses", alt: "Course catalog", caption: "Browse courses" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Lesson", alt: "Lesson player", caption: "Video / lesson view" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Quiz", alt: "Quiz screen", caption: "Interactive quiz" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Progress", alt: "Student progress", caption: "Progress dashboard" },
      ],
      frontend: [
        "Course catalog and search",
        "Lesson player",
        "Quiz UI",
        "Progress and certificates",
        "Student dashboard",
      ],
      backend: [
        "Course CMS APIs",
        "Progress tracking",
        "Quiz scoring",
        "Certificate generation",
      ],
      database: ["Courses", "Lessons", "Quizzes", "Enrollments", "Progress", "Certificates"],
      security: ["Content access control", "Anti-cheat basics for quizzes"],
      integrations: ["Video CDN", "Email", "Payment for courses"],
      notifications: ["New lessons", "Deadline reminders", "Certificate issued"],
      admin: ["Instructor portal", "Content moderation"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture + media players",
      backendArchitecture: "REST + media storage",
      developmentSteps: [
        "Curriculum model",
        "Player UX",
        "Flutter client",
        "CMS backend",
        "Quizzes & certificates",
        "Launch",
      ],
    },
    {
      id: 13,
      number: "13",
      category: "Lifestyle",
      title: "Travel / Hotel Booking",
      shortDescription:
        "Destination discovery, accommodation search, filters, booking, and payments.",
      description:
        "Travel booking flows covering destination discovery, hotel search with rich filters, property details, room selection, checkout, and reservation management.",
      tags: ["Search", "Hotels", "Booking", "Payments"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Search", alt: "Hotel search", caption: "Search destinations" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Results", alt: "Search results", caption: "Filtered results" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Property", alt: "Property detail", caption: "Hotel detail and rooms" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Book", alt: "Booking", caption: "Confirm and pay" },
      ],
      frontend: [
        "Search and date pickers",
        "Filters and map view",
        "Property and room detail",
        "Checkout",
        "Reservation list",
      ],
      backend: [
        "Inventory and availability",
        "Pricing and rates",
        "Booking engine",
        "Payment and confirmation",
      ],
      database: ["Properties", "Rooms", "Rates", "Bookings", "Guests"],
      security: ["Payment security", "PII protection"],
      integrations: ["Maps", "Payments", "Email / SMS vouchers"],
      notifications: ["Booking confirmed", "Check-in reminders"],
      admin: ["Property management", "Booking support"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + map integration",
      backendArchitecture: "REST + partner inventory adapters",
      developmentSteps: [
        "Search UX",
        "Inventory model",
        "Flutter booking flow",
        "Payments",
        "Partner integrations",
        "Launch",
      ],
    },
    {
      id: 14,
      number: "14",
      category: "Business",
      title: "Real Estate",
      shortDescription:
        "Property discovery, filters, details, galleries, maps, agents, and inquiries.",
      description:
        "Property marketplace for buyers and renters: rich search, map exploration, detailed listings with galleries, agent contact, and inquiry management.",
      tags: ["Listings", "Maps", "Agents", "Inquiry"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Listings", alt: "Property list", caption: "Browse listings" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Map", alt: "Map search", caption: "Map-based discovery" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Detail", alt: "Property detail", caption: "Listing detail and gallery" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Inquiry", alt: "Contact agent", caption: "Inquiry form" },
      ],
      frontend: [
        "List and map search",
        "Advanced filters",
        "Image galleries",
        "Agent profiles",
        "Inquiry forms",
      ],
      backend: [
        "Listing CRM APIs",
        "Geospatial search",
        "Lead routing",
        "Media management",
      ],
      database: ["Properties", "Media", "Agents", "Inquiries", "Saved searches"],
      security: ["Lead privacy", "Agent verification"],
      integrations: ["Maps", "Email / SMS", "CRM"],
      notifications: ["New matching listings", "Inquiry replies"],
      admin: ["Listing moderation", "Agent tools"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture + maps",
      backendArchitecture: "REST + geospatial index",
      developmentSteps: [
        "Listing schema",
        "Map UX",
        "Flutter client",
        "Lead backend",
        "Agent portal",
        "Launch",
      ],
    },
    {
      id: 15,
      number: "15",
      category: "Lifestyle",
      title: "Event Booking",
      shortDescription:
        "Event discovery, details, ticket selection, checkout, QR tickets, and history.",
      description:
        "Event discovery and ticketing: browse events, select tickets, checkout, receive QR tickets, and manage upcoming and past events.",
      tags: ["Events", "Tickets", "QR", "Checkout"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Events", alt: "Event list", caption: "Discover events" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Detail", alt: "Event detail", caption: "Event information" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Tickets", alt: "Ticket selection", caption: "Choose tickets" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=QR", alt: "QR ticket", caption: "Mobile QR ticket" },
      ],
      frontend: [
        "Event discovery and filters",
        "Detail and ticket tiers",
        "Checkout",
        "QR ticket wallet",
        "Order history",
      ],
      backend: [
        "Event CMS",
        "Inventory and seating (optional)",
        "Ticket issuance",
        "Check-in validation",
      ],
      database: ["Events", "Ticket types", "Orders", "Tickets", "Venues"],
      security: ["Ticket fraud prevention", "Payment security"],
      integrations: ["Payments", "QR generation", "Email tickets"],
      notifications: ["Purchase confirmation", "Event reminders"],
      admin: ["Organizer dashboard", "Door check-in"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture",
      backendArchitecture: "REST + ticket service",
      developmentSteps: [
        "Ticketing model",
        "UX flows",
        "Flutter app",
        "Issuance backend",
        "Check-in tools",
        "Launch",
      ],
    },
    {
      id: 16,
      number: "16",
      category: "Business",
      title: "Delivery / Logistics Tracking",
      shortDescription:
        "Shipment creation, tracking, delivery status, driver info, and location updates.",
      description:
        "Logistics tracking for shippers and recipients: create shipments, track status, view driver and location updates, and manage delivery exceptions.",
      tags: ["Shipments", "Tracking", "Status", "Maps"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Shipments", alt: "Shipment list", caption: "Active shipments" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Create", alt: "Create shipment", caption: "New shipment form" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Track", alt: "Live tracking", caption: "Map tracking" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Status", alt: "Status timeline", caption: "Delivery timeline" },
      ],
      frontend: [
        "Shipment list and filters",
        "Create shipment wizard",
        "Live map tracking",
        "Status timeline",
        "Exception reporting",
      ],
      backend: [
        "Shipment lifecycle API",
        "Driver / vehicle assignment",
        "Location ingestion",
        "Status webhooks",
      ],
      database: ["Shipments", "Stops", "Drivers", "Locations", "Events"],
      security: ["Customer data isolation", "Location privacy"],
      integrations: ["Maps", "SMS / Email", "Carrier APIs"],
      notifications: ["Out for delivery", "Delivered", "Exceptions"],
      admin: ["Dispatch console", "Exception handling"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + maps",
      backendArchitecture: "REST + real-time location stream",
      developmentSteps: [
        "Lifecycle design",
        "Tracking UX",
        "Flutter client",
        "Location backend",
        "Integrations",
        "Pilot",
      ],
    },
    {
      id: 17,
      number: "17",
      category: "Productivity",
      title: "Workforce / Employee Management",
      shortDescription:
        "Attendance, leave, tasks, schedules, payroll info, and employee reports.",
      description:
        "Employee-facing and manager tools for attendance, leave requests, task assignment, schedules, basic payroll visibility, and operational reports.",
      tags: ["Attendance", "Leave", "Tasks", "HR"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Home", alt: "Employee home", caption: "Employee dashboard" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Attendance", alt: "Attendance", caption: "Clock in / out" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Leave", alt: "Leave request", caption: "Leave management" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Schedule", alt: "Schedule", caption: "Work schedule" },
      ],
      frontend: [
        "Employee dashboard",
        "Attendance actions",
        "Leave request flows",
        "Task lists",
        "Schedule views",
      ],
      backend: [
        "Attendance capture",
        "Leave policies engine",
        "Task assignment",
        "Schedule and shift APIs",
      ],
      database: ["Employees", "Attendance", "Leave", "Tasks", "Schedules"],
      security: ["Role-based access", "Sensitive HR data protection"],
      integrations: ["Payroll systems", "Email / Push", "SSO optional"],
      notifications: ["Leave approved", "Shift reminders", "Task due"],
      admin: ["HR admin console", "Policy configuration"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture",
      backendArchitecture: "REST + policy engine",
      developmentSteps: [
        "HR process mapping",
        "Role UX",
        "Flutter apps",
        "Policy backend",
        "Integrations",
        "Rollout",
      ],
    },
    {
      id: 18,
      number: "18",
      category: "Commerce",
      title: "Restaurant Management",
      shortDescription:
        "Menu management, orders, tables, kitchen workflow, inventory, and sales analytics.",
      description:
        "Restaurant operations suite: menu and inventory control, table management, order flow to kitchen, and sales analytics for owners and staff.",
      tags: ["Menu", "Orders", "Kitchen", "POS"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Orders", alt: "Orders board", caption: "Active orders" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Menu", alt: "Menu manager", caption: "Menu editing" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Kitchen", alt: "Kitchen display", caption: "Kitchen workflow" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Analytics", alt: "Sales analytics", caption: "Sales overview" },
      ],
      frontend: [
        "Order intake UI",
        "Kitchen display system",
        "Menu editor",
        "Table map",
        "Sales dashboards",
      ],
      backend: [
        "Order orchestration",
        "Inventory adjustments",
        "Kitchen queue",
        "Reporting APIs",
      ],
      database: ["Menus", "Orders", "Tables", "Inventory", "Staff"],
      security: ["Staff roles", "Shift access"],
      integrations: ["Printers", "Payments", "Delivery channels"],
      notifications: ["New order alerts", "Low stock"],
      admin: ["Owner analytics", "Staff permissions"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + real-time updates",
      backendArchitecture: "REST + WebSocket for kitchen",
      developmentSteps: [
        "Ops flow mapping",
        "KDS UX",
        "Flutter clients",
        "Order backend",
        "Hardware integrations",
        "Soft open",
      ],
    },
    {
      id: 19,
      number: "19",
      category: "Productivity",
      title: "Project / Task Management",
      shortDescription:
        "Projects, tasks, teams, deadlines, priorities, progress, and productivity analytics.",
      description:
        "Collaborative project and task management with boards or lists, assignees, due dates, priorities, progress tracking, and lightweight analytics for teams.",
      tags: ["Tasks", "Boards", "Teams", "Deadlines"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Projects", alt: "Project list", caption: "Projects overview" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Board", alt: "Task board", caption: "Kanban board" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Task", alt: "Task detail", caption: "Task detail and comments" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Analytics", alt: "Team analytics", caption: "Productivity metrics" },
      ],
      frontend: [
        "Project list and detail",
        "Board / list views",
        "Task create and edit",
        "Comments and activity",
        "Team analytics",
      ],
      backend: [
        "Project and task APIs",
        "Permissions and membership",
        "Activity feed",
        "Reporting",
      ],
      database: ["Projects", "Tasks", "Members", "Comments", "Activity"],
      security: ["Workspace isolation", "Role permissions"],
      integrations: ["Email", "Calendar", "File storage"],
      notifications: ["Assignments", "Due soon", "Mentions"],
      admin: ["Workspace settings", "Billing (optional)"],
      complexity: "Medium–High",
      flutterArchitecture: "Clean Architecture + optimistic UI",
      backendArchitecture: "REST + optional realtime",
      developmentSteps: [
        "Collaboration model",
        "Board UX",
        "Flutter client",
        "Permissions backend",
        "Notifications",
        "Launch",
      ],
    },
    {
      id: 20,
      number: "20",
      category: "Business",
      title: "Admin / Analytics Dashboard",
      shortDescription:
        "BI dashboard with KPIs, charts, reports, users, transactions, and system management.",
      description:
        "Internal admin and analytics surface for operators: system-wide KPIs, charts, user and transaction management, configurable reports, and operational controls.",
      tags: ["BI", "KPIs", "Reports", "Admin"],
      images: [
        { src: "https://placehold.co/390x844/0f172a/11a791?text=Admin", alt: "Admin home", caption: "Admin overview" },
        { src: "https://placehold.co/390x844/111827/0ab599?text=Charts", alt: "Analytics charts", caption: "Detailed charts" },
        { src: "https://placehold.co/390x844/1e293b/11a791?text=Users", alt: "User management", caption: "Users table" },
        { src: "https://placehold.co/390x844/0f172a/94a3b8?text=Reports", alt: "Reports", caption: "Exportable reports" },
      ],
      frontend: [
        "KPI overview",
        "Interactive charts",
        "Data tables with filters",
        "User / entity management",
        "Report builder exports",
      ],
      backend: [
        "Aggregation pipelines",
        "Admin CRUD APIs",
        "Export jobs",
        "Audit logging",
      ],
      database: ["Metrics", "Users", "Transactions", "Audit", "Config"],
      security: [
        "Strict admin RBAC",
        "IP allowlists optional",
        "Full audit trail",
      ],
      integrations: ["Export to CSV / PDF", "Alerting"],
      notifications: ["Anomaly alerts", "Export ready"],
      admin: ["Self-service configuration", "Role management"],
      complexity: "High",
      flutterArchitecture: "Clean Architecture + data-heavy UI patterns",
      backendArchitecture: "REST + analytics warehouse or aggregates",
      developmentSteps: [
        "Metric definitions",
        "Admin UX",
        "Flutter admin app",
        "Aggregation backend",
        "RBAC and audit",
        "Hardening and release",
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------------
  const samplesGrid = document.getElementById("samples-grid");
  const samplesEmpty = document.getElementById("samples-empty");
  const searchInput = document.getElementById("sample-search");
  const filterChips = document.querySelectorAll(".chip");
  const detailModal = document.getElementById("detail-modal");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const siteHeader = document.getElementById("site-header");
  const yearEl = document.getElementById("year");

  let activeFilter = "all";
  let searchQuery = "";
  let lightboxImages = [];
  let lightboxIndex = 0;
  let lastFocusedElement = null;

  // ---------------------------------------------------------------------------
  // Render samples
  // ---------------------------------------------------------------------------
  function matchesSample(sample) {
    const q = searchQuery.trim().toLowerCase();
    const filterOk =
      activeFilter === "all" || sample.category === activeFilter;
    if (!filterOk) return false;
    if (!q) return true;
    const haystack = [
      sample.title,
      sample.shortDescription,
      sample.description,
      sample.category,
      ...(sample.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  }

  function renderSamples() {
    if (!samplesGrid) return;
    const filtered = SAMPLES.filter(matchesSample);
    samplesGrid.innerHTML = "";

    if (filtered.length === 0) {
      if (samplesEmpty) samplesEmpty.hidden = false;
      return;
    }
    if (samplesEmpty) samplesEmpty.hidden = true;

    const frag = document.createDocumentFragment();
    filtered.forEach((sample) => {
      const card = document.createElement("article");
      card.className = "sample-card";
      card.setAttribute("role", "listitem");
      card.dataset.id = String(sample.id);

      const firstImg = sample.images[0] || {
        src: "",
        alt: sample.title,
        caption: "",
      };

      card.innerHTML = `
        <div class="sample-image-wrap" data-action="gallery" data-id="${sample.id}" tabindex="0" role="button" aria-label="View gallery for ${escapeHtml(sample.title)}">
          <img src="${escapeAttr(firstImg.src)}" alt="${escapeAttr(firstImg.alt)}" loading="lazy" width="390" height="244">
          <span class="sample-number">${escapeHtml(sample.number)}</span>
        </div>
        <div class="sample-body">
          <span class="sample-category">${escapeHtml(sample.category)}</span>
          <h3 class="sample-title">${escapeHtml(sample.title)}</h3>
          <p class="sample-desc">${escapeHtml(sample.shortDescription)}</p>
          <ul class="sample-tags">
            ${(sample.tags || [])
              .map((t) => `<li>${escapeHtml(t)}</li>`)
              .join("")}
          </ul>
          <div class="sample-actions">
            <button type="button" class="btn btn-secondary btn-sm" data-action="readmore" data-id="${sample.id}">Read More</button>
          </div>
        </div>
      `;
      frag.appendChild(card);
    });
    samplesGrid.appendChild(frag);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  // ---------------------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------------------
  function openModal(sample) {
    if (!detailModal || !modalContent) return;
    lastFocusedElement = document.activeElement;

    const list = (items) =>
      items && items.length
        ? `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`
        : "<p>—</p>";

    modalContent.innerHTML = `
      <p class="modal-category">${escapeHtml(sample.category)}</p>
      <h2 class="modal-title" id="modal-title">${escapeHtml(sample.title)}</h2>
      <div class="modal-meta">
        <span class="meta-badge">Complexity: ${escapeHtml(sample.complexity || "—")}</span>
      </div>
      <div class="modal-section">
        <h4>Overview</h4>
        <p>${escapeHtml(sample.description)}</p>
      </div>
      <div class="modal-section">
        <h4>Frontend</h4>
        ${list(sample.frontend)}
      </div>
      <div class="modal-section">
        <h4>Backend</h4>
        ${list(sample.backend)}
      </div>
      <div class="modal-section">
        <h4>Database</h4>
        ${list(sample.database)}
      </div>
      <div class="modal-section">
        <h4>Security</h4>
        ${list(sample.security)}
      </div>
      <div class="modal-section">
        <h4>Third-party integrations</h4>
        ${list(sample.integrations)}
      </div>
      <div class="modal-section">
        <h4>Notifications</h4>
        ${list(sample.notifications)}
      </div>
      <div class="modal-section">
        <h4>Admin requirements</h4>
        ${list(sample.admin)}
      </div>
      <div class="modal-section">
        <h4>Recommended Flutter architecture</h4>
        <p>${escapeHtml(sample.flutterArchitecture || "—")}</p>
      </div>
      <div class="modal-section">
        <h4>Recommended backend architecture</h4>
        <p>${escapeHtml(sample.backendArchitecture || "—")}</p>
      </div>
      <div class="modal-section">
        <h4>Development stages</h4>
        ${list(sample.developmentSteps)}
      </div>
      <div class="modal-cta">
        <a href="../home.html" class="btn btn-primary btn-lg">Start Your Flutter Project</a>
      </div>
    `;

    detailModal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    if (!detailModal) return;
    detailModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  // ---------------------------------------------------------------------------
  // Lightbox
  // ---------------------------------------------------------------------------
  function openLightbox(sample, startIndex) {
    if (!lightbox || !sample.images || !sample.images.length) return;
    lastFocusedElement = document.activeElement;
    lightboxImages = sample.images;
    lightboxIndex = Math.max(0, Math.min(startIndex || 0, lightboxImages.length - 1));
    updateLightbox();
    lightbox.hidden = false;
    document.body.classList.add("modal-open");
    lightboxClose.focus();
  }

  function updateLightbox() {
    const img = lightboxImages[lightboxIndex];
    if (!img) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || "";
    lightboxCaption.textContent = img.caption || "";
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("modal-open");
    lightboxImage.src = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function lightboxNextFn() {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  }

  function lightboxPrevFn() {
    if (!lightboxImages.length) return;
    lightboxIndex =
      (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  // ---------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------
  function getSampleById(id) {
    return SAMPLES.find((s) => s.id === Number(id));
  }

  if (samplesGrid) {
    samplesGrid.addEventListener("click", (e) => {
      const target = e.target.closest("[data-action]");
      if (!target) return;
      const id = target.dataset.id;
      const sample = getSampleById(id);
      if (!sample) return;
      if (target.dataset.action === "readmore") {
        openModal(sample);
      } else if (target.dataset.action === "gallery") {
        openLightbox(sample, 0);
      }
    });

    samplesGrid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const target = e.target.closest("[data-action='gallery']");
      if (!target) return;
      e.preventDefault();
      const sample = getSampleById(target.dataset.id);
      if (sample) openLightbox(sample, 0);
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeModal();
    });
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", lightboxPrevFn);
  if (lightboxNext) lightboxNext.addEventListener("click", lightboxNextFn);

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox && !lightbox.hidden) {
        closeLightbox();
      } else if (detailModal && !detailModal.hidden) {
        closeModal();
      } else if (mobileMenu && !mobileMenu.hidden) {
        closeMobileMenu();
      }
    }
    if (lightbox && !lightbox.hidden) {
      if (e.key === "ArrowRight") lightboxNextFn();
      if (e.key === "ArrowLeft") lightboxPrevFn();
    }
  });

  // Search & filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value;
      renderSamples();
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter || "all";
      renderSamples();
    });
  });

  // Mobile menu
  function openMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (mobileMenu.hidden) openMobileMenu();
      else closeMobileMenu();
    });
  }

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.matches("a")) closeMobileMenu();
    });
  }

  // Header scroll state
  function onScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 8) siteHeader.classList.add("scrolled");
    else siteHeader.classList.remove("scrolled");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active nav (simple)
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  function updateActiveNav() {
    const sections = ["overview", "samples", "process"];
    let current = "";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${current}`) link.classList.add("active");
      else link.classList.remove("active");
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // Year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Init
  renderSamples();
})();
