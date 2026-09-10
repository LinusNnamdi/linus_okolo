/* ============================================================
   Resource Data (mock – replace with API later)
   ============================================================ */
const resources = [
    // ---------- AWS (12) ----------
    {
        id: 1,
        platform: "AWS",
        title: "Highly Available AWS Web Application Architecture",
        description: "Multi-AZ web tier with Application Load Balancer, Auto Scaling groups, and fault-tolerant design for production traffic.",
        difficulty: "Advanced",
        technologies: ["VPC", "EC2", "ALB", "Auto Scaling", "Security grp", "Subnets", "NAT gateway", "Etc."],
        image: "../../images/cloud/1_10/1_1.jpg",
        gallery: [
            "../../images/cloud/1_10/1_1.jpg",
            "../../images/cloud/1_10/1_2.jpg",
            "../../images/cloud/1_10/1_3.jpg",
            "../../images/cloud/1_10/1_4.jpg"
        ],
        overview: "A production-ready, multi-Availability Zone architecture that delivers high availability and automatic recovery for web applications. Traffic is distributed by an Application Load Balancer across Auto Scaling groups of EC2 instances running in private subnets.",
        architecture: "Public subnets host the ALB and NAT Gateways. Private subnets contain the Auto Scaling group. Security groups enforce least-privilege access. Health checks and multi-AZ placement ensure resilience to single-AZ failures.",
        useCases: ["Public-facing SaaS applications", "E-commerce storefronts", "Content and media platforms requiring 99.99% availability"],
        services: ["Amazon VPC", "Amazon EC2", "Application Load Balancer", "Auto Scaling", "Amazon CloudWatch"],
        implementationSteps: [
            "Define availability and capacity requirements",
            "Design multi-AZ VPC with public and private subnets",
            "Create security groups for ALB and application tiers",
            "Launch and harden AMI-based EC2 launch templates",
            "Configure Auto Scaling group with target tracking policies",
            "Deploy Application Load Balancer and target groups",
            "Enable health checks and connection draining",
            "Configure CloudWatch alarms and dashboards",
            "Implement Infrastructure as Code (CloudFormation or Terraform)",
            "Perform failover and load testing",
            "Document runbooks and recovery procedures"
        ],
        security: "Security groups restrict inbound traffic to ALB only. Instance metadata service v2 enforced. IAM instance roles follow least privilege. Encryption in transit via HTTPS listeners.",
        scalability: "Target-tracking Auto Scaling adjusts capacity based on CPU or request count. ALB scales automatically. Horizontal scaling across AZs.",
        monitoring: "CloudWatch metrics for ALB, Auto Scaling, and EC2. Custom health checks. Centralized logging via CloudWatch Logs or OpenSearch.",
        complexity: "Advanced - requires solid networking and high-availability design experience."
    },
    {
        id: 2,
        platform: "AWS",
        title: "AWS VPC Multi-Tier Network",
        description: "Segmented VPC with public, private, and data tiers, route tables, NAT Gateways, and network ACLs for secure isolation.",
        difficulty: "Intermediate",
        technologies: ["AWS", "VPC", "Subnets", "NAT Gateway", "NACL"],
        image: "../../images/cloud/1_10/2_1.jpg",
        gallery: [
            "../../images/cloud/1_10/2_1.jpg",
            // "../../images/cloud/1_10/1_4.jpg",
            // "../../images/cloud/1_10/1_4.jpg"
        ],
        overview: "A foundational multi-tier network design that isolates presentation, application, and data layers across Availability Zones using public and private subnets, controlled routing, and defense-in-depth with security groups and NACLs.",
        architecture: "CIDR planning across AZs. Public subnets for load balancers and bastions. Private application and database subnets. NAT Gateways for outbound internet. Dedicated route tables per tier.",
        useCases: ["Enterprise landing zones", "Regulated workloads requiring network isolation", "Foundation for multi-account AWS Organizations"],
        services: ["Amazon VPC", "Internet Gateway", "NAT Gateway", "Route Tables", "Network ACLs", "VPC Flow Logs"],
        implementationSteps: [
            "Plan CIDR blocks and AZ placement",
            "Create VPC and enable DNS hostnames",
            "Provision public, private, and data subnets",
            "Attach Internet Gateway and configure public routes",
            "Deploy NAT Gateways in each AZ",
            "Configure private route tables",
            "Define security groups and network ACLs",
            "Enable VPC Flow Logs",
            "Validate connectivity and isolation with test instances",
            "Document network topology and IPAM strategy"
        ],
        security: "Network ACLs provide subnet-level stateless filtering. Security groups enforce stateful instance-level rules. Flow Logs enable audit and anomaly detection.",
        scalability: "Subnet CIDR sizing supports growth. Multi-AZ NAT Gateways avoid single points of failure.",
        monitoring: "VPC Flow Logs to CloudWatch or S3. Reachability Analyzer for path validation.",
        complexity: "Intermediate – core networking skill required."
    },
    {
        id: 3,
        platform: "AWS",
        title: "AWS EC2 Auto Scaling Infrastructure",
        description: "Dynamic capacity management with launch templates, scaling policies, and lifecycle hooks for elastic compute workloads.",
        difficulty: "Intermediate",
        technologies: ["AWS", "EC2", "Auto Scaling", "Launch Templates", "CloudWatch"],
        image: "../../images/cloud/1_10/3_1.jpg",
        gallery: [
            "../../images/cloud/1_10/3_1.jpg",
            // "../../images/cloud/1_10/1_4.jpg",
            // "../../images/cloud/1_10/1_4.jpg"
        ],
        overview: "Elastic compute infrastructure that automatically adjusts the number of EC2 instances based on demand, maintaining performance and controlling cost.",
        architecture: "Launch templates define AMI, instance type, user data, and IAM role. Auto Scaling groups span multiple AZs. Target tracking or step scaling policies react to CloudWatch metrics.",
        useCases: ["Variable traffic web services", "Batch processing fleets", "CI runner pools"],
        services: ["Amazon EC2", "Auto Scaling", "Launch Templates", "CloudWatch", "SNS"],
        implementationSteps: [
            "Create hardened AMI and launch template",
            "Define Auto Scaling group with min/desired/max",
            "Configure target tracking or step scaling policies",
            "Attach load balancer target groups if needed",
            "Set up lifecycle hooks for graceful termination",
            "Configure SNS notifications for scaling events",
            "Enable detailed monitoring",
            "Test scale-out and scale-in behaviour",
            "Tune cooldown and capacity rebalancing",
            "Document operational runbooks"
        ],
        security: "IAM roles for instances. Security groups. Optional Systems Manager for patching and access.",
        scalability: "Horizontal scaling driven by metrics. Predictive scaling optional for known patterns.",
        monitoring: "CloudWatch metrics and Auto Scaling activity history. Alarms for failed launches.",
        complexity: "Intermediate."
    },
    {
        id: 4,
        platform: "AWS",
        title: "AWS ECS Container Deployment",
        description: "Containerized microservices on Amazon ECS with Fargate or EC2 capacity providers, task definitions, and service discovery.",
        difficulty: "Intermediate",
        technologies: ["AWS", "ECS", "Fargate", "ECR", "ALB"],
        image: "../../images/cloud/1_10/4_1.jpg",
        gallery: [
            "../../images/cloud/1_10/4_1.jpg",
            // "../../images/cloud/1_10/4_1.jpg",
            // "../../images/cloud/1_10/4_1.jpg"
        ],
        overview: "Production container orchestration using Amazon ECS, supporting both Fargate serverless compute and EC2 capacity providers for microservices workloads.",
        architecture: "Task definitions declare container images from ECR, CPU/memory, environment, and logging. Services maintain desired count behind an ALB. Service Connect or Cloud Map for discovery.",
        useCases: ["Microservices platforms", "API backends", "Background workers"],
        services: ["Amazon ECS", "AWS Fargate", "Amazon ECR", "Application Load Balancer", "CloudWatch Logs"],
        implementationSteps: [
            "Push container images to Amazon ECR",
            "Create ECS cluster with capacity providers",
            "Author task definitions with resource limits and logging",
            "Create ECS services with desired count and deployment configuration",
            "Attach ALB target groups and path-based routing",
            "Configure service discovery if required",
            "Set up auto scaling based on CPU/memory or ALB metrics",
            "Enable container insights and log drivers",
            "Implement blue/green or rolling deployments",
            "Validate health checks and rollback behaviour"
        ],
        security: "Task IAM roles, private subnets, security groups, image scanning in ECR, secrets via Secrets Manager or SSM.",
        scalability: "Service auto scaling and capacity provider strategies. Fargate scales without capacity planning.",
        monitoring: "Container Insights, CloudWatch Logs, ALB metrics, X-Ray optional.",
        complexity: "Intermediate."
    },
    {
        id: 5,
        platform: "AWS",
        title: "AWS EKS Production Cluster",
        description: "Managed Kubernetes on EKS with node groups, IRSA, cluster add-ons, and production-grade networking and security.",
        difficulty: "Advanced",
        technologies: ["AWS", "EKS", "Kubernetes", "IRSA", "VPC CNI"],
        image: "../../images/cloud/1_10/5_1.jpg",
        gallery: [
            "../../images/cloud/1_10/5_1.jpg",
            // "../../images/cloud/1_10/5_1.jpg",
            // "../../images/cloud/1_10/5_1.jpg"
        ],
        overview: "A production Amazon EKS cluster designed for reliability, security, and operability, including managed node groups or Fargate profiles, IAM Roles for Service Accounts, and essential cluster add-ons.",
        architecture: "Control plane managed by AWS. Worker nodes in private subnets. VPC CNI for pod networking. Cluster and node security groups. Optional Karpenter for node provisioning.",
        useCases: ["Large-scale microservices", "Hybrid container platforms", "Data processing pipelines on Kubernetes"],
        services: ["Amazon EKS", "Amazon VPC CNI", "IAM Roles for Service Accounts", "Amazon ECR", "CloudWatch"],
        implementationSteps: [
            "Design VPC and subnet layout for EKS",
            "Create EKS cluster with desired Kubernetes version",
            "Configure managed node groups or Fargate profiles",
            "Install and configure VPC CNI, CoreDNS, kube-proxy",
            "Enable IRSA and map IAM roles to service accounts",
            "Deploy cluster autoscaler or Karpenter",
            "Configure ingress (ALB Ingress Controller or NGINX)",
            "Implement network policies and pod security standards",
            "Set up logging, metrics, and observability stack",
            "Harden with security scanning and admission controls",
            "Document upgrade and disaster recovery procedures"
        ],
        security: "IRSA, private endpoints, encryption at rest for secrets, pod security admission, network policies.",
        scalability: "Cluster Autoscaler / Karpenter, HPA, VPA. Multi-AZ node groups.",
        monitoring: "CloudWatch Container Insights, Prometheus/Grafana, control plane logs.",
        complexity: "Advanced."
    },
    {
        id: 6,
        platform: "AWS",
        title: "AWS RDS High Availability Database",
        description: "Multi-AZ RDS deployment with automated failover, read replicas, encryption, and backup strategies for relational workloads.",
        difficulty: "Intermediate",
        technologies: ["AWS", "RDS", "Multi-AZ", "Read Replicas", "KMS"],
        image: "../../images/cloud/1_10/6_1.jpg",
        gallery: [
            "../../images/cloud/1_10/6_1.jpg",
            // "../../images/cloud/1_10/6_1.jpg",
            // "../../images/cloud/1_10/6_1.jpg"
        ],
        overview: "Highly available relational database using Amazon RDS Multi-AZ for automatic failover, with optional read replicas for read scaling and encrypted storage.",
        architecture: "Primary instance in one AZ, synchronous standby in another. Automatic DNS failover. Parameter groups and option groups tuned for the engine. Snapshots and point-in-time recovery.",
        useCases: ["Transactional applications", "ERP and CRM backends", "Any workload requiring managed relational HA"],
        services: ["Amazon RDS", "Amazon KMS", "Amazon CloudWatch", "AWS Backup"],
        implementationSteps: [
            "Select engine, version, and instance class",
            "Create Multi-AZ DB instance in private subnets",
            "Configure security groups and parameter groups",
            "Enable encryption with customer-managed KMS key",
            "Set backup retention and maintenance windows",
            "Create read replicas if needed for read scaling",
            "Configure enhanced monitoring and Performance Insights",
            "Test failover behaviour",
            "Implement connection pooling and retry logic in apps",
            "Document recovery and promotion procedures"
        ],
        security: "Encryption at rest and in transit, private subnets, IAM authentication optional, restricted security groups.",
        scalability: "Vertical scaling, read replicas, Aurora Serverless option for some engines.",
        monitoring: "CloudWatch metrics, Performance Insights, Enhanced Monitoring, event subscriptions.",
        complexity: "Intermediate."
    },
    {
        id: 7,
        platform: "AWS",
        title: "AWS S3 Static Website Architecture",
        description: "Secure static site hosting with S3, CloudFront, Origin Access Control, and custom domain with HTTPS.",
        difficulty: "Beginner",
        technologies: ["AWS", "S3", "CloudFront", "Route 53", "ACM"],
        image: "../../images/cloud/1_10/7_1.jpg",
        gallery: [
            "../../images/cloud/1_10/7_1.jpg",
            // "../../images/cloud/1_10/7_1.jpg",
            // "../../images/cloud/1_10/7_1.jpg"
        ],
        overview: "Cost-effective, highly available static website delivery using S3 as origin and CloudFront as global CDN, with private bucket access via Origin Access Control.",
        architecture: "S3 bucket stores assets. CloudFront distribution with OAC. ACM certificate for custom domain. Route 53 alias records. Optional SPA error page handling.",
        useCases: ["Marketing sites", "Documentation portals", "Single-page applications"],
        services: ["Amazon S3", "Amazon CloudFront", "AWS Certificate Manager", "Amazon Route 53"],
        implementationSteps: [
            "Create S3 bucket and enable versioning",
            "Upload static assets with appropriate cache headers",
            "Request ACM certificate in us-east-1 for CloudFront",
            "Create CloudFront distribution with OAC",
            "Restrict S3 bucket policy to CloudFront service principal",
            "Configure custom domain and HTTPS",
            "Set up Route 53 records",
            "Enable logging and optional WAF",
            "Test caching behaviour and invalidations",
            "Document deployment pipeline for content updates"
        ],
        security: "Private S3 origin, HTTPS only, optional AWS WAF, least-privilege bucket policy.",
        scalability: "CloudFront edge locations scale globally. S3 handles virtually unlimited objects.",
        monitoring: "CloudFront access logs, S3 server access logs, CloudWatch metrics.",
        complexity: "Beginner."
    },
    {
        id: 8,
        platform: "AWS",
        title: "AWS CloudFront CDN Architecture",
        description: "Global content delivery with caching behaviours, origin groups, signed URLs, and edge security controls.",
        difficulty: "Intermediate",
        technologies: ["AWS", "CloudFront", "S3", "ALB", "WAF"],
        image: "../../images/cloud/1_10/8_1.jpg",
        gallery: [
            "../../images/cloud/1_10/8_1.jpg",
            // "../../images/cloud/1_10/8_1.jpg",
            // "../../images/cloud/1_10/8_1.jpg"
        ],
        overview: "Global content delivery network configuration optimising latency, cache hit ratio, and security for static and dynamic origins.",
        architecture: "Multiple cache behaviours by path. Origin groups for failover. Lambda@Edge or CloudFront Functions for request/response manipulation. Optional signed URLs/cookies.",
        useCases: ["Media streaming", "API acceleration", "Global web applications"],
        services: ["Amazon CloudFront", "AWS WAF", "Lambda@Edge", "Amazon S3", "Application Load Balancer"],
        implementationSteps: [
            "Identify origins and path patterns",
            "Create distribution with appropriate price class",
            "Define cache policies and origin request policies",
            "Configure origin groups for high availability",
            "Attach WAF web ACL if required",
            "Implement signed URLs or cookies for private content",
            "Add CloudFront Functions or Lambda@Edge as needed",
            "Enable real-time logs or standard logs",
            "Tune TTLs and test cache behaviour",
            "Document invalidation and deployment process"
        ],
        security: "HTTPS, WAF, geo-restriction, signed URLs, field-level encryption options.",
        scalability: "Edge locations absorb traffic spikes. Origin shielding reduces origin load.",
        monitoring: "CloudWatch metrics, real-time logs, cache hit ratio analysis.",
        complexity: "Intermediate."
    },
    {
        id: 9,
        platform: "AWS",
        title: "AWS IAM Security Architecture",
        description: "Least-privilege identity and access design with roles, policies, permission boundaries, and SCPs for multi-account environments.",
        difficulty: "Advanced",
        technologies: ["AWS", "IAM", "Organizations", "SCP", "Permission Boundaries"],
        image: "../../images/cloud/1_10/9_1.jpg",
        gallery: [
            "../../images/cloud/1_10/9_1.jpg",
            // "../../images/cloud/1_10/9_1.jpg",
            // "../../images/cloud/1_10/9_1.jpg"
        ],
        overview: "Enterprise identity architecture enforcing least privilege across human users, applications, and multi-account AWS Organizations environments.",
        architecture: "Identity federation via IAM Identity Center. Role-based access with permission boundaries. Service Control Policies at OU level. Cross-account roles with external IDs.",
        useCases: ["Enterprise multi-account setups", "Compliance-driven environments", "Zero-trust access models"],
        services: ["AWS IAM", "IAM Identity Center", "AWS Organizations", "AWS CloudTrail", "AWS Config"],
        implementationSteps: [
            "Map organisational structure to OUs and accounts",
            "Define permission sets and job functions",
            "Implement permission boundaries for delegated admin",
            "Write SCPs for guardrails",
            "Configure federation and MFA requirements",
            "Create cross-account roles with external ID",
            "Enable CloudTrail organisation trail",
            "Set up IAM Access Analyzer",
            "Review and rotate credentials",
            "Document access request and review processes"
        ],
        security: "Least privilege, MFA, temporary credentials, Access Analyzer findings, continuous policy review.",
        scalability: "Centralised identity with Identity Center scales to thousands of users and accounts.",
        monitoring: "CloudTrail, Access Analyzer, Config rules for IAM best practices.",
        complexity: "Advanced."
    },
    {
        id: 10,
        platform: "AWS",
        title: "AWS CI/CD Pipeline",
        description: "End-to-end continuous delivery with CodePipeline, CodeBuild, CodeDeploy, and infrastructure as code integration.",
        difficulty: "Intermediate",
        technologies: ["AWS", "CodePipeline", "CodeBuild", "CodeDeploy", "CloudFormation"],
        image: "../../images/cloud/1_10/0_1.jpg",
        gallery: [
            "../../images/cloud/1_10/0_1.jpg",
            // "../../images/cloud/1_10/0_1.jpg",
            // "../../images/cloud/1_10/0_1.jpg"
        ],
        overview: "Automated build, test, and deployment pipeline for applications and infrastructure using native AWS developer tools.",
        architecture: "Source stage from CodeCommit, GitHub, or S3. Build stage with CodeBuild. Deploy stage with CodeDeploy or CloudFormation. Manual approval gates for production.",
        useCases: ["Application releases", "Infrastructure deployments", "Multi-environment promotion"],
        services: ["AWS CodePipeline", "AWS CodeBuild", "AWS CodeDeploy", "AWS CloudFormation", "Amazon S3"],
        implementationSteps: [
            "Define pipeline stages and environments",
            "Connect source repository",
            "Author buildspec for build and test",
            "Configure CodeDeploy application and deployment groups",
            "Create pipeline with approval actions",
            "Integrate CloudFormation for infrastructure changes",
            "Enable pipeline notifications via SNS or EventBridge",
            "Add security scanning steps",
            "Test rollback and failure scenarios",
            "Document promotion and hotfix processes"
        ],
        security: "Least-privilege pipeline roles, encrypted artifacts, approval gates, secret scanning.",
        scalability: "Parallel actions and multi-region pipelines for complex delivery.",
        monitoring: "Pipeline execution history, CodeBuild logs, CloudWatch Events.",
        complexity: "Intermediate."
    },
    {
        id: 11,
        platform: "AWS",
        title: "AWS CloudWatch Monitoring System",
        description: "Unified observability with metrics, logs, alarms, dashboards, and cross-service correlation for operational visibility.",
        difficulty: "Intermediate",
        technologies: ["AWS", "CloudWatch", "Logs", "Alarms", "Dashboards"],
        image: "../../images/cloud/11_20/1_1.jpg",
        gallery: [
            "../../images/cloud/11_20/1_1.jpg",
            // "../../images/cloud/11_20/1_1.jpg",
            // "../../images/cloud/11_20/1_1.jpg"
        ],
        overview: "Comprehensive monitoring and observability foundation using CloudWatch for metrics, logs, alarms, and operational dashboards across AWS workloads.",
        architecture: "Standard and custom metrics. Log groups with retention and metric filters. Composite alarms. Cross-account observability. Optional Contributor Insights.",
        useCases: ["Production operations", "SRE practices", "Cost and performance monitoring"],
        services: ["Amazon CloudWatch", "CloudWatch Logs", "CloudWatch Alarms", "SNS", "EventBridge"],
        implementationSteps: [
            "Inventory critical services and SLIs",
            "Enable detailed monitoring where required",
            "Create log groups and retention policies",
            "Define metric filters and custom metrics",
            "Build alarms with appropriate thresholds and actions",
            "Design operational dashboards by service",
            "Configure SNS topics and on-call routing",
            "Enable cross-account observability if multi-account",
            "Establish runbooks linked from alarms",
            "Review and tune false positives regularly"
        ],
        security: "Encrypted log groups, restricted IAM for log access, no sensitive data in metric dimensions.",
        scalability: "High-cardinality awareness. Metric streams for external systems.",
        monitoring: "Self-monitoring of the monitoring stack via CloudWatch itself.",
        complexity: "Intermediate."
    },
    {
        id: 12,
        platform: "AWS",
        title: "AWS Disaster Recovery Architecture",
        description: "Multi-region recovery strategies including pilot light, warm standby, and multi-site active/active patterns.",
        difficulty: "Advanced",
        technologies: ["AWS", "Route 53", "S3", "RDS", "AMI", "CloudFormation"],
        image: "../../images/cloud/11_20/2_1.jpg",
        gallery: [
            "../../images/cloud/11_20/2_1.jpg",
            // "../../images/cloud/11_20/2_1.jpg",
            // "../../images/cloud/11_20/2_1.jpg"
        ],
        overview: "Business continuity architecture implementing appropriate RTO/RPO strategies across AWS regions using pilot light, warm standby, or active/active patterns.",
        architecture: "Cross-region replication of data (S3, RDS, DynamoDB). Infrastructure templates ready in DR region. Route 53 health checks and failover routing. Automated recovery runbooks.",
        useCases: ["Mission-critical applications", "Compliance-driven RTO/RPO", "Global platforms"],
        services: ["Amazon Route 53", "Amazon S3", "Amazon RDS", "AWS Backup", "CloudFormation", "Systems Manager"],
        implementationSteps: [
            "Define RTO and RPO requirements",
            "Select DR strategy (backup/restore, pilot light, warm standby, multi-site)",
            "Enable cross-region data replication",
            "Maintain infrastructure as code in DR region",
            "Configure Route 53 health checks and failover",
            "Automate recovery with runbooks or Step Functions",
            "Test failover and failback regularly",
            "Document communication and decision trees",
            "Measure actual RTO/RPO in drills",
            "Review cost vs resilience trade-offs"
        ],
        security: "Encrypted replication, least-privilege recovery roles, audit of failover events.",
        scalability: "DR region capacity planned for expected load; auto scaling activated on failover.",
        monitoring: "Health checks, replication lag metrics, drill success tracking.",
        complexity: "Advanced."
    },
    // ---------- Azure (8) ----------
    {
        id: 13,
        platform: "Azure",
        title: "Azure Virtual Network Architecture",
        description: "Hub-and-spoke or multi-tier VNet design with subnets, NSGs, route tables, and private endpoints for secure connectivity.",
        difficulty: "Intermediate",
        technologies: ["Azure", "VNet", "NSG", "Private Endpoint", "Azure Firewall"],
        image: "../../images/cloud/11_20/3_1.jpg",
        gallery: [
            "../../images/cloud/11_20/3_1.jpg",
            // "../../images/cloud/11_20/3_1.jpg",
            // "../../images/cloud/11_20/3_1.jpg"
        ],
        overview: "Enterprise network foundation on Azure using virtual networks, network security groups, and optional hub-and-spoke topology with Azure Firewall or NVA.",
        architecture: "Spoke VNets for workloads, hub for shared services. Private endpoints for PaaS. User-defined routes. NSGs at subnet level.",
        useCases: ["Enterprise landing zones", "Hybrid connectivity", "Secure multi-tier applications"],
        services: ["Azure Virtual Network", "Network Security Groups", "Azure Firewall", "Private Link", "Azure Bastion"],
        implementationSteps: [
            "Plan address spaces and topology",
            "Create hub and spoke VNets",
            "Configure peering and UDRs",
            "Deploy NSGs and application security groups",
            "Implement private endpoints for PaaS",
            "Deploy Azure Firewall or NVA if required",
            "Enable diagnostic logging",
            "Validate connectivity and isolation",
            "Document IP addressing and change process",
            "Integrate with Azure Monitor Network Insights"
        ],
        security: "NSGs, private endpoints, Azure Firewall policies, DDoS protection standard optional.",
        scalability: "Address space planning for growth. Multiple spokes.",
        monitoring: "NSG flow logs, Azure Monitor, Network Watcher.",
        complexity: "Intermediate."
    },
    {
        id: 14,
        platform: "Azure",
        title: "Azure App Service Deployment",
        description: "PaaS web and API hosting with deployment slots, autoscale, custom domains, and managed identity integration.",
        difficulty: "Beginner",
        technologies: ["Azure", "App Service", "Deployment Slots", "Managed Identity"],
        image: "../../images/cloud/11_20/4_1.jpg",
        gallery: [
            "../../images/cloud/11_20/4_1.jpg",
            // "../../images/cloud/11_20/4_1.jpg",
            // "../../images/cloud/11_20/4_1.jpg"
        ],
        overview: "Managed platform for web apps and APIs with built-in scaling, staging slots, and seamless integration with Azure AD and Key Vault.",
        architecture: "App Service plan provides compute. Deployment slots for blue/green. Managed identity for Key Vault and other resources. Custom domains and TLS.",
        useCases: ["Web applications", "REST APIs", "Internal line-of-business apps"],
        services: ["Azure App Service", "Azure Key Vault", "Azure AD", "Application Insights"],
        implementationSteps: [
            "Create App Service plan and web app",
            "Configure deployment from CI/CD or ZIP deploy",
            "Set up staging slots and swap rules",
            "Enable managed identity and Key Vault references",
            "Bind custom domain and certificate",
            "Configure autoscale rules",
            "Integrate Application Insights",
            "Restrict access with access restrictions or Private Endpoint",
            "Test slot swap and rollback",
            "Document configuration and secrets management"
        ],
        security: "Managed identity, HTTPS only, access restrictions, private endpoints optional.",
        scalability: "Autoscale based on metrics or schedule. Scale-out and scale-up.",
        monitoring: "Application Insights, App Service diagnostics, Log Analytics.",
        complexity: "Beginner."
    },
    {
        id: 15,
        platform: "Azure",
        title: "Azure Virtual Machine Scale Set",
        description: "Elastic compute fleets with uniform or flexible orchestration, autoscale, and load balancer integration.",
        difficulty: "Intermediate",
        technologies: ["Azure", "VMSS", "Load Balancer", "Autoscale", "Managed Disks"],
        image: "../../images/cloud/11_20/5_1.jpg",
        gallery: [
            "../../images/cloud/11_20/5_1.jpg",
            // "../../images/cloud/11_20/5_1.jpg",
            // "../../images/cloud/11_20/5_1.jpg"
        ],
        overview: "Horizontally scalable virtual machine infrastructure using Virtual Machine Scale Sets for identical or flexible workloads behind a load balancer.",
        architecture: "Scale set with availability zones. Azure Load Balancer or Application Gateway. Autoscale rules. Custom script extensions or cloud-init.",
        useCases: ["Stateless web tiers", "Batch compute", "Container host pools"],
        services: ["Virtual Machine Scale Sets", "Azure Load Balancer", "Autoscale", "Azure Monitor"],
        implementationSteps: [
            "Define image and instance size",
            "Create scale set with zone redundancy",
            "Attach load balancer and health probes",
            "Configure autoscale profiles",
            "Apply extensions for configuration management",
            "Enable boot diagnostics and monitoring",
            "Test scale-out and scale-in",
            "Implement rolling upgrades",
            "Secure with NSGs and Just-In-Time access",
            "Document image update process"
        ],
        security: "Managed disks encrypted, NSGs, Azure AD login optional, JIT access.",
        scalability: "Metric or schedule-based autoscale. Flexible orchestration mode.",
        monitoring: "Azure Monitor metrics, Log Analytics, autoscale history.",
        complexity: "Intermediate."
    },
    {
        id: 16,
        platform: "Azure",
        title: "Azure Kubernetes Service (AKS)",
        description: "Managed Kubernetes with node pools, Azure CNI, Azure AD integration, and production add-ons.",
        difficulty: "Advanced",
        technologies: ["Azure", "AKS", "Kubernetes", "Azure CNI", "Azure AD"],
        image: "../../images/cloud/11_20/6_1.jpg",
        gallery: [
            "../../images/cloud/11_20/6_1.jpg",
            "../../images/cloud/11_20/6_1.jpg",
            "../../images/cloud/11_20/6_1.jpg"
        ],
        overview: "Production-ready managed Kubernetes on Azure with integrated identity, networking, and monitoring.",
        architecture: "System and user node pools. Azure CNI or kubenet. Azure AD for RBAC. Azure Monitor for containers. Optional AGIC or Application Gateway.",
        useCases: ["Cloud-native applications", "Microservices on Azure", "Hybrid Kubernetes"],
        services: ["Azure Kubernetes Service", "Azure Container Registry", "Azure Monitor", "Azure AD", "Application Gateway"],
        implementationSteps: [
            "Plan network and identity model",
            "Create AKS cluster with desired node pools",
            "Configure Azure AD integration and RBAC",
            "Attach Azure Container Registry",
            "Deploy ingress controller",
            "Enable Azure Monitor and Container Insights",
            "Implement network policies and Azure Policy",
            "Configure cluster autoscaler",
            "Set up CI/CD for workloads",
            "Document upgrade and node pool management"
        ],
        security: "Azure AD RBAC, managed identities, private cluster option, Azure Policy for AKS.",
        scalability: "Cluster autoscaler, HPA, multiple node pools for isolation.",
        monitoring: "Container Insights, Azure Monitor, Prometheus optional.",
        complexity: "Advanced."
    },
    {
        id: 17,
        platform: "Azure",
        title: "Azure Blob Storage Architecture",
        description: "Object storage with access tiers, lifecycle management, private endpoints, and secure data lake patterns.",
        difficulty: "Beginner",
        technologies: ["Azure", "Blob Storage", "Lifecycle", "Private Endpoint", "ADLS Gen2"],
        image: "../../images/cloud/11_20/7_1.jpg",
        gallery: [
            "../../images/cloud/11_20/7_1.jpg",
            "../../images/cloud/11_20/7_2.jpg",
            "../../images/cloud/11_20/7_3.jpg",
            "../../images/cloud/11_20/7_4.jpg",
            "../../images/cloud/11_20/7_5.jpg"
        ],
        overview: "Scalable object storage design using Azure Blob Storage with appropriate access tiers, immutability options, and network isolation.",
        architecture: "Storage account with hierarchical namespace optional. Hot/Cool/Archive tiers. Lifecycle policies. Private endpoints. Soft delete and versioning.",
        useCases: ["Static assets", "Data lakes", "Backup and archive", "Application data"],
        services: ["Azure Blob Storage", "Azure Storage Account", "Private Link", "Azure Monitor"],
        implementationSteps: [
            "Select redundancy and account type",
            "Enable hierarchical namespace if data lake needed",
            "Create containers and set access levels",
            "Configure lifecycle management rules",
            "Enable soft delete, versioning, and change feed",
            "Deploy private endpoints and disable public access",
            "Apply encryption with customer-managed keys if required",
            "Set up diagnostic logging",
            "Implement SAS or Azure AD authentication patterns",
            "Document retention and compliance settings"
        ],
        security: "Private endpoints, Azure AD auth, encryption at rest, immutability policies.",
        scalability: "Virtually unlimited capacity. Premium block blobs for high throughput.",
        monitoring: "Capacity and transaction metrics, Storage Analytics, Azure Monitor.",
        complexity: "Beginner."
    },
    {
        id: 18,
        platform: "Azure",
        title: "Azure DevOps CI/CD Pipeline",
        description: "YAML pipelines for multi-stage build, test, and deployment to Azure resources with environments and approvals.",
        difficulty: "Intermediate",
        technologies: ["Azure", "Azure DevOps", "YAML Pipelines", "Environments"],
        image: "../../images/cloud/11_20/8_1.jpg",
        gallery: [
            "../../images/cloud/11_20/8_1.jpg",
            "../../images/cloud/11_20/8_2.jpg",
            "../../images/cloud/11_20/8_3.jpg",
            "../../images/cloud/11_20/8_4.jpg",
            "../../images/cloud/11_20/8_5.jpg",
            "../../images/cloud/11_20/8_6.jpg"
        ],
        overview: "End-to-end continuous integration and delivery using Azure Pipelines with multi-stage YAML, environment protections, and deployment strategies.",
        architecture: "Build stage produces artifacts. Release stages target environments with approvals. Service connections to Azure. Optional self-hosted agents.",
        useCases: ["Application delivery", "Infrastructure as Code", "Multi-environment promotion"],
        services: ["Azure Pipelines", "Azure Repos", "Azure Artifacts", "Azure Environments"],
        implementationSteps: [
            "Define pipeline YAML structure",
            "Configure service connections and variable groups",
            "Implement build and test jobs",
            "Create environments with approval checks",
            "Add deployment jobs and strategies",
            "Integrate security scanning",
            "Set up branch policies and PR validation",
            "Enable pipeline caching and templates",
            "Test failure and rollback paths",
            "Document pipeline ownership and change process"
        ],
        security: "Protected environments, secret variables, least-privilege service principals.",
        scalability: "Parallel jobs, multi-stage, matrix strategies.",
        monitoring: "Pipeline analytics, test results, deployment history.",
        complexity: "Intermediate."
    },
    {
        id: 19,
        platform: "Azure",
        title: "Azure Monitor & Application Insights",
        description: "Full-stack observability with metrics, logs, distributed tracing, and proactive alerts for Azure and hybrid workloads.",
        difficulty: "Intermediate",
        technologies: ["Azure", "Monitor", "Application Insights", "Log Analytics", "Alerts"],
        image: "../../images/cloud/11_20/9_1.jpg",
        gallery: [
            "../../images/cloud/11_20/9_1.jpg",
            // "../../images/cloud/11_20/9_1.jpg",
            // "../../images/cloud/11_20/9_1.jpg"
        ],
        overview: "Unified monitoring platform combining platform metrics, Log Analytics, Application Insights for APM, and smart alerting.",
        architecture: "Log Analytics workspace as central store. Application Insights for application telemetry. Metric alerts and log search alerts. Workbooks and dashboards.",
        useCases: ["Application performance monitoring", "Infrastructure health", "Incident response"],
        services: ["Azure Monitor", "Application Insights", "Log Analytics", "Action Groups"],
        implementationSteps: [
            "Create Log Analytics workspace",
            "Enable diagnostic settings on resources",
            "Instrument applications with Application Insights SDK or auto-instrumentation",
            "Define KQL queries for key scenarios",
            "Create metric and log alerts",
            "Configure action groups and notification channels",
            "Build operational workbooks",
            "Set retention and cost controls",
            "Establish SLI/SLO tracking",
            "Review and refine alert noise"
        ],
        security: "Workspace access control, private link for ingestion, data residency considerations.",
        scalability: "Data collection rules, sampling, committed tiers for cost management.",
        monitoring: "Service health, workspace health, ingestion latency.",
        complexity: "Intermediate."
    },
    {
        id: 20,
        platform: "Azure",
        title: "Azure Identity & Access Architecture",
        description: "Zero-trust identity design with Azure AD, Conditional Access, Privileged Identity Management, and managed identities.",
        difficulty: "Advanced",
        technologies: ["Azure", "Azure AD", "Conditional Access", "PIM", "Managed Identity"],
        image: "../../images/cloud/11_20/0_1.jpg",
        gallery: [
            "../../images/cloud/11_20/0_1.jpg",
            // "../../images/cloud/11_20/0_1.jpg",
            // "../../images/cloud/11_20/0_1.jpg"
        ],
        overview: "Enterprise identity and access management on Azure AD enforcing zero-trust principles, just-in-time privileged access, and application identity via managed identities.",
        architecture: "Azure AD as identity provider. Conditional Access policies. PIM for privileged roles. Managed identities for Azure resources. App registrations with least privilege.",
        useCases: ["Enterprise identity", "Privileged access management", "Workload identity"],
        services: ["Microsoft Entra ID", "Conditional Access", "Privileged Identity Management", "Managed Identities"],
        implementationSteps: [
            "Establish identity governance baseline",
            "Design Conditional Access policies",
            "Enable MFA and passwordless where possible",
            "Configure PIM for privileged roles",
            "Implement managed identities for applications",
            "Review app registrations and API permissions",
            "Enable Identity Protection and risk policies",
            "Set up access reviews",
            "Integrate hybrid identity if needed",
            "Document break-glass and emergency access"
        ],
        security: "Zero trust, least privilege, continuous access evaluation, identity protection.",
        scalability: "Supports large enterprises and multi-tenant scenarios.",
        monitoring: "Sign-in logs, audit logs, Identity Protection, access reviews.",
        complexity: "Advanced."
    },
    // ---------- GCP (8) ----------
    {
        id: 21,
        platform: "GCP",
        title: "GCP VPC Architecture",
        description: "Global VPC design with subnets across regions, Private Google Access, Cloud NAT, and hierarchical firewall policies.",
        difficulty: "Intermediate",
        technologies: ["GCP", "VPC", "Cloud NAT", "Firewall", "Private Google Access"],
        image: "../../images/cloud/21_30/1_1.jpg",
        gallery: [
            "../../images/cloud/21_30/1_1.jpg",
            "../../images/cloud/21_30/1_2.jpg",
            "../../images/cloud/21_30/1_3.jpg",
            "../../images/cloud/21_30/1_4.jpg",
            "../../images/cloud/21_30/1_5.jpg",
            "../../images/cloud/21_30/1_6.jpg",
        ],
        overview: "Global network foundation on Google Cloud using a single VPC with regional subnets, Private Google Access, and Cloud NAT for secure outbound connectivity.",
        architecture: "Custom mode VPC. Regional subnets. Firewall rules or hierarchical policies. Cloud NAT for private instances. Shared VPC optional for multi-project.",
        useCases: ["Multi-region applications", "Shared VPC organisations", "Secure hybrid connectivity"],
        services: ["Virtual Private Cloud", "Cloud NAT", "Cloud Firewall", "Private Google Access", "Cloud Router"],
        implementationSteps: [
            "Design global address plan",
            "Create custom VPC and regional subnets",
            "Enable Private Google Access",
            "Deploy Cloud NAT gateways",
            "Define firewall rules or hierarchical policies",
            "Configure routes and Cloud Router if hybrid",
            "Enable VPC Flow Logs",
            "Validate connectivity",
            "Document shared VPC host/service project model if used",
            "Integrate with Security Command Center"
        ],
        security: "Least-privilege firewall, private IPs, hierarchical policies, flow logs.",
        scalability: "Global VPC simplifies multi-region. Subnet expansion without downtime.",
        monitoring: "VPC Flow Logs, Firewall Insights, Network Intelligence Center.",
        complexity: "Intermediate."
    },
    {
        id: 22,
        platform: "GCP",
        title: "Google Compute Engine Infrastructure",
        description: "VM-based workloads with managed instance groups, autoscaling, and load balancing for reliable compute.",
        difficulty: "Intermediate",
        technologies: ["GCP", "Compute Engine", "MIG", "Load Balancing", "Autoscaler"],
        image: "../../images/cloud/21_30/2_1.jpg",
        gallery: [
            "../../images/cloud/21_30/2_1.jpg",
            // "../../images/cloud/21_30/2_2.jpg",
            // "../../images/cloud/21_30/2_3.jpg"
        ],
        overview: "Scalable virtual machine infrastructure using Managed Instance Groups, health checks, and Google Cloud Load Balancing.",
        architecture: "Instance templates. Regional MIGs. HTTP(S) or TCP/UDP load balancing. Autoscaler based on CPU, load balancing capacity, or custom metrics.",
        useCases: ["Stateful and stateless applications", "Batch processing", "Legacy lift-and-shift"],
        services: ["Compute Engine", "Managed Instance Groups", "Cloud Load Balancing", "Cloud Monitoring"],
        implementationSteps: [
            "Create instance template with startup scripts",
            "Deploy regional managed instance group",
            "Configure health checks",
            "Attach load balancer backend service",
            "Define autoscaling policy",
            "Enable OS Login and Shielded VM options",
            "Set up monitoring and alerting",
            "Test rolling updates",
            "Secure with firewall tags and IAM",
            "Document image and template update process"
        ],
        security: "Shielded VMs, OS Login, least-privilege service accounts, firewall tags.",
        scalability: "Autoscaler and multi-zone MIGs.",
        monitoring: "Cloud Monitoring metrics, uptime checks, Ops Agent.",
        complexity: "Intermediate."
    },
    {
        id: 23,
        platform: "GCP",
        title: "Google Kubernetes Engine (GKE)",
        description: "Managed Kubernetes with Autopilot or Standard mode, Workload Identity, and production cluster best practices.",
        difficulty: "Advanced",
        technologies: ["GCP", "GKE", "Kubernetes", "Workload Identity", "Anthos"],
        image: "../../images/cloud/21_30/3_1.jpg",
        gallery: [
            "../../images/cloud/21_30/3_1.jpg",
            // "../../images/cloud/21_30/3_2.jpg",
            // "../../images/cloud/21_30/3_3.jpg"
        ],
        overview: "Production GKE cluster using Autopilot for hands-off operations or Standard for full control, with Workload Identity and security best practices.",
        architecture: "Regional cluster. Workload Identity for pod-to-GCP auth. Binary Authorization optional. Network policies. Cloud Operations for GKE.",
        useCases: ["Cloud-native platforms", "Multi-tenant Kubernetes", "Data and ML workloads"],
        services: ["Google Kubernetes Engine", "Artifact Registry", "Cloud Operations", "Identity and Access Management"],
        implementationSteps: [
            "Choose Autopilot or Standard mode",
            "Create regional cluster with appropriate release channel",
            "Enable Workload Identity",
            "Configure node pools or rely on Autopilot",
            "Deploy ingress (GKE Ingress or Gateway API)",
            "Enable Cloud Operations and logging",
            "Apply network policies and Binary Authorization",
            "Set up CI/CD with Cloud Build or third-party",
            "Configure cluster upgrades and maintenance windows",
            "Document security and operational runbooks"
        ],
        security: "Workload Identity, private clusters, Binary Authorization, GKE Sandbox optional.",
        scalability: "Cluster autoscaler, HPA, VPA, multi-cluster Ingress.",
        monitoring: "Cloud Operations for GKE, Prometheus, Cloud Trace.",
        complexity: "Advanced."
    },
    {
        id: 24,
        platform: "GCP",
        title: "Google Cloud Run Deployment",
        description: "Fully managed serverless containers with scale-to-zero, traffic splitting, and integrated CI/CD.",
        difficulty: "Beginner",
        technologies: ["GCP", "Cloud Run", "Artifact Registry", "Cloud Build"],
        image: "../../images/cloud/21_30/4_1.jpg",
        gallery: [
            "../../images/cloud/21_30/4_1.jpg",
            // "../../images/cloud/21_30/4_2.jpg",
            // "../../images/cloud/21_30/4_3.jpg"
        ],
        overview: "Serverless container platform that scales from zero to N based on HTTP requests, ideal for APIs and event-driven services.",
        architecture: "Container images from Artifact Registry. Cloud Run service with concurrency and CPU allocation settings. Traffic splitting for canary. Optional VPC connectors.",
        useCases: ["HTTP APIs", "Webhooks", "Event-driven microservices"],
        services: ["Cloud Run", "Artifact Registry", "Cloud Build", "Cloud Monitoring"],
        implementationSteps: [
            "Containerise application for Cloud Run constraints",
            "Push image to Artifact Registry",
            "Deploy Cloud Run service with resource limits",
            "Configure authentication (public or IAM)",
            "Set concurrency and min/max instances",
            "Enable VPC access if needed",
            "Implement traffic splitting for releases",
            "Integrate Cloud Build triggers",
            "Set up monitoring and error reporting",
            "Document environment variables and secrets handling"
        ],
        security: "IAM invokers, Secret Manager, binary authorization optional, private services.",
        scalability: "Automatic scale-to-zero and scale-out. Concurrency tuning.",
        monitoring: "Request metrics, Cloud Logging, Error Reporting.",
        complexity: "Beginner."
    },
    {
        id: 25,
        platform: "GCP",
        title: "Google Cloud Storage Architecture",
        description: "Object storage with storage classes, lifecycle rules, uniform bucket-level access, and signed URLs.",
        difficulty: "Beginner",
        technologies: ["GCP", "Cloud Storage", "Lifecycle", "IAM", "Signed URLs"],
        image: "../../images/cloud/21_30/5_1.jpg",
        gallery: [
            "../../images/cloud/21_30/5_1.jpg",
            "../../images/cloud/21_30/5_2.jpg",
            "../../images/cloud/21_30/5_3.jpg",
            "../../images/cloud/21_30/5_4.jpg",
            "../../images/cloud/21_30/5_5.jpg",
            "../../images/cloud/21_30/5_6.jpg",
        ],
        overview: "Durable, globally accessible object storage design with appropriate storage classes, lifecycle management, and access control patterns.",
        architecture: "Buckets with location type (region/multi-region). Storage classes and lifecycle. Uniform bucket-level access. CMEK optional.",
        useCases: ["Static assets", "Data lakes", "Backups", "ML training data"],
        services: ["Cloud Storage", "Cloud IAM", "Cloud KMS", "Cloud Monitoring"],
        implementationSteps: [
            "Choose location and storage class strategy",
            "Create buckets with uniform access",
            "Define lifecycle rules for cost optimisation",
            "Configure IAM and optionally signed URLs",
            "Enable object versioning if needed",
            "Apply CMEK if compliance requires",
            "Set up logging and monitoring",
            "Implement retention policies for compliance",
            "Test access patterns and performance",
            "Document naming and access conventions"
        ],
        security: "Uniform bucket-level access, IAM conditions, CMEK, public access prevention.",
        scalability: "Unlimited objects. Parallel composite uploads for large files.",
        monitoring: "Storage metrics, audit logs, Cloud Monitoring.",
        complexity: "Beginner."
    },
    {
        id: 26,
        platform: "GCP",
        title: "GCP Cloud Load Balancing",
        description: "Global and regional load balancing with HTTPS, TCP/UDP, and internal options for high availability.",
        difficulty: "Intermediate",
        technologies: ["GCP", "Load Balancing", "Cloud CDN", "Health Checks", "Backend Services"],
        image: "../../images/cloud/21_30/6_1.jpg",
        gallery: [
            "../../images/cloud/21_30/6_1.jpg",
            // "../../images/cloud/21_30/6_2.jpg",
            // "../../images/cloud/21_30/6_3.jpg"
        ],
        overview: "Google Cloud’s software-defined load balancing providing global anycast HTTP(S) and regional options with integrated health checking and CDN.",
        architecture: "Global external HTTP(S) load balancer with URL maps and backend services. Health checks. Optional Cloud CDN and Cloud Armor.",
        useCases: ["Global web applications", "API frontends", "Multi-region failover"],
        services: ["Cloud Load Balancing", "Cloud CDN", "Cloud Armor", "Cloud Monitoring"],
        implementationSteps: [
            "Select load balancer type (global/regional, external/internal)",
            "Create health checks",
            "Define backend services and instance groups or NEGs",
            "Configure URL maps and host/path rules",
            "Attach SSL certificates",
            "Enable Cloud CDN if static content",
            "Apply Cloud Armor security policies",
            "Set up logging and monitoring",
            "Test failover and capacity",
            "Document traffic management and canary patterns"
        ],
        security: "Cloud Armor, SSL policies, identity-aware proxy optional.",
        scalability: "Global anycast and automatic scaling of backends.",
        monitoring: "Load balancing metrics, latency, backend health.",
        complexity: "Intermediate."
    },
    {
        id: 27,
        platform: "GCP",
        title: "GCP Cloud Monitoring System",
        description: "Metrics, logs, SLOs, and alerting with Cloud Monitoring and Cloud Logging for operational excellence.",
        difficulty: "Intermediate",
        technologies: ["GCP", "Cloud Monitoring", "Cloud Logging", "SLO", "Alerting"],
        image: "../../images/cloud/21_30/7_1.jpg",
        gallery: [
            "../../images/cloud/21_30/7_1.jpg",
            "../../images/cloud/21_30/7_2.jpg",
            "../../images/cloud/21_30/7_3.jpg"
        ],
        overview: "Observability stack using Cloud Monitoring and Cloud Logging, including SLOs, custom metrics, and proactive alerting.",
        architecture: "Ops Agent for VMs. Native integration for GKE and serverless. Log-based metrics. SLO and error budget policies. Notification channels.",
        useCases: ["SRE practices", "Application and infrastructure monitoring", "Compliance logging"],
        services: ["Cloud Monitoring", "Cloud Logging", "Error Reporting", "Cloud Trace"],
        implementationSteps: [
            "Enable APIs and configure workspaces",
            "Deploy Ops Agent or use native integrations",
            "Define key SLIs and SLOs",
            "Create custom metrics and log-based metrics",
            "Build dashboards by service",
            "Configure alerting policies and notification channels",
            "Set log retention and sinks",
            "Integrate with PagerDuty or similar",
            "Establish error budget policies",
            "Review alert quality regularly"
        ],
        security: "IAM for monitoring resources, log exclusion filters for sensitive data.",
        scalability: "Metric descriptors and cardinality management.",
        monitoring: "Self-monitoring of ingestion and API health.",
        complexity: "Intermediate."
    },
    {
        id: 28,
        platform: "GCP",
        title: "GCP CI/CD Pipeline",
        description: "Cloud Build and Cloud Deploy for continuous integration and progressive delivery to GKE, Cloud Run, and more.",
        difficulty: "Intermediate",
        technologies: ["GCP", "Cloud Build", "Cloud Deploy", "Artifact Registry"],
        image: "../../images/cloud/21_30/8_1.jpg",
        gallery: [
            "../../images/cloud/21_30/8_1.jpg",
            "../../images/cloud/21_30/8_2.jpg",
            "../../images/cloud/21_30/8_3.jpg",
            "../../images/cloud/21_30/8_4.jpg",
            "../../images/cloud/21_30/8_5.jpg",
        ],
        overview: "Native GCP continuous delivery pipeline using Cloud Build for CI and Cloud Deploy for progressive delivery across environments.",
        architecture: "Triggers from Cloud Source Repositories or GitHub. Build configs produce images. Cloud Deploy delivery pipelines with stages and canary strategies.",
        useCases: ["GKE and Cloud Run deployments", "Multi-environment promotion", "GitOps-style workflows"],
        services: ["Cloud Build", "Cloud Deploy", "Artifact Registry", "Cloud Source Repositories"],
        implementationSteps: [
            "Author cloudbuild.yaml for build and test",
            "Configure triggers and substitutions",
            "Push images to Artifact Registry",
            "Define Cloud Deploy delivery pipeline",
            "Create targets for each environment",
            "Implement canary or rolling strategies",
            "Add approval gates",
            "Integrate security scanning",
            "Test promotion and rollback",
            "Document pipeline ownership"
        ],
        security: "Least-privilege service accounts, Binary Authorization, private pools optional.",
        scalability: "Concurrent builds, multi-region targets.",
        monitoring: "Build history, deployment status, audit logs.",
        complexity: "Intermediate."
    },
    // ---------- Docker (7) ----------
    {
        id: 29,
        platform: "Docker",
        title: "Dockerized Node.js Application",
        description: "Production-ready Dockerfile for Node.js with multi-stage builds, non-root user, and optimised layer caching.",
        difficulty: "Beginner",
        technologies: ["Docker", "Node.js", "Multi-stage", "Alpine"],
        image: "../../images/cloud/21_30/9_1.jpg",
        gallery: [
            "../../images/cloud/21_30/9_1.jpg",
            // "../../images/cloud/21_30/9_2.jpg",
            // "../../images/cloud/21_30/9_3.jpg"
        ],
        overview: "Best-practice containerisation of a Node.js application using multi-stage builds, minimal base images, and security hardening.",
        architecture: "Builder stage installs dependencies and builds. Runtime stage copies artifacts, runs as non-root, exposes only required ports.",
        useCases: ["API services", "Web backends", "Microservices"],
        services: ["Docker Engine", "Docker Hub / private registry"],
        implementationSteps: [
            "Write multi-stage Dockerfile",
            "Use official Node Alpine or distroless where appropriate",
            "Copy package manifests first for layer caching",
            "Install production dependencies only in final stage",
            "Create non-root user and switch",
            "Set HEALTHCHECK",
            "Build and scan image for vulnerabilities",
            "Tag and push to registry",
            "Test locally with docker run and compose",
            "Document runtime configuration and env vars"
        ],
        security: "Non-root user, minimal attack surface, no secrets in image, vulnerability scanning.",
        scalability: "Stateless design enables horizontal scaling with orchestrators.",
        monitoring: "Container logs to stdout, healthchecks, metrics exporters.",
        complexity: "Beginner."
    },
    {
        id: 30,
        platform: "Docker",
        title: "Dockerized Python API",
        description: "Secure Python FastAPI or Flask container with multi-stage build, virtualenv, and production WSGI/ASGI server.",
        difficulty: "Beginner",
        technologies: ["Docker", "Python", "FastAPI", "Gunicorn", "Uvicorn"],
        image: "../../images/cloud/21_30/0_1.jpg",
        gallery: [
            "../../images/cloud/21_30/0_1.jpg",
            // "../../images/cloud/21_30/0_2.jpg",
            // "../../images/cloud/21_30/0_3.jpg"
        ],
        overview: "Production container image for Python web APIs using multi-stage builds and a production-grade ASGI/WSGI server.",
        architecture: "Build stage resolves dependencies. Runtime uses slim base, non-root user, and Gunicorn/Uvicorn workers.",
        useCases: ["REST APIs", "ML model serving", "Internal services"],
        services: ["Docker Engine", "Container registry"],
        implementationSteps: [
            "Create multi-stage Dockerfile for Python",
            "Pin dependencies and use requirements or poetry",
            "Install only production deps in final image",
            "Configure Gunicorn/Uvicorn with worker counts",
            "Run as non-root",
            "Add HEALTHCHECK endpoint",
            "Scan for CVEs",
            "Push to registry",
            "Validate with docker compose",
            "Document environment configuration"
        ],
        security: "Non-root, minimal image, no build tools in runtime, secret injection at runtime.",
        scalability: "Worker process model; horizontal scaling via replicas.",
        monitoring: "Stdout logging, health endpoint, optional Prometheus metrics.",
        complexity: "Beginner."
    },
    {
        id: 31,
        platform: "Docker",
        title: "Docker Compose Multi-Container Application",
        description: "Local and staging multi-service stack with networks, volumes, healthchecks, and environment management.",
        difficulty: "Intermediate",
        technologies: ["Docker", "Compose", "Networks", "Volumes", "Healthchecks"],
        image: "../../images/cloud/31_40/1_1.jpg",
        gallery: [
            "../../images/cloud/31_40/1_1.jpg",
            // "../../images/cloud/31_40/1_2.jpg",
            // "../../images/cloud/31_40/1_3.jpg"
        ],
        overview: "Declarative multi-container application definition using Docker Compose for development parity and simple staging environments.",
        architecture: "Services, networks, named volumes. Depends_on with health conditions. Env files. Profiles for optional services.",
        useCases: ["Local development", "Integration testing", "Small staging environments"],
        services: ["Docker Compose", "Docker Engine"],
        implementationSteps: [
            "Map application services and dependencies",
            "Write docker-compose.yml with services and networks",
            "Define healthchecks and depends_on conditions",
            "Configure volumes for persistence",
            "Use env files and secrets carefully",
            "Add profiles for optional tooling",
            "Validate with docker compose up and config",
            "Document developer onboarding",
            "Align with production topology where possible",
            "Version and review compose files"
        ],
        security: "Avoid binding privileged ports unnecessarily, use secrets, isolate networks.",
        scalability: "Compose is primarily for local/staging; production uses orchestrators.",
        monitoring: "Container logs, health status via compose ps.",
        complexity: "Intermediate."
    },
    {
        id: 32,
        platform: "Docker",
        title: "Docker Production Image Optimization",
        description: "Techniques for smaller, faster, more secure images: multi-stage, distroless, layer ordering, and scanning.",
        difficulty: "Intermediate",
        technologies: ["Docker", "Distroless", "BuildKit", "Trivy", "Dive"],
        image: "../../images/cloud/31_40/2_1.jpg",
        gallery: [
            "../../images/cloud/31_40/2_1.jpg",
            // "../../images/cloud/31_40/2_2.jpg",
            // "../../images/cloud/31_40/2_3.jpg"
        ],
        overview: "Systematic approach to producing minimal, secure, and efficient container images suitable for production.",
        architecture: "Multi-stage builds. Distroless or scratch final stages. BuildKit cache mounts. SBOM generation.",
        useCases: ["Production releases", "Regulated environments", "Cost and performance optimisation"],
        services: ["Docker BuildKit", "Vulnerability scanners", "Registry"],
        implementationSteps: [
            "Adopt multi-stage builds",
            "Order layers for maximal cache reuse",
            "Switch to distroless or minimal base where feasible",
            "Enable BuildKit and cache mounts",
            "Generate SBOM and scan with Trivy or similar",
            "Remove package managers and shells from runtime",
            "Pin digests for base images",
            "Measure image size and startup time",
            "Automate scanning in CI",
            "Document base image update policy"
        ],
        security: "Reduced attack surface, continuous scanning, pinned digests.",
        scalability: "Smaller images improve pull times and density.",
        monitoring: "Image size metrics, scan results over time.",
        complexity: "Intermediate."
    },
    {
        id: 33,
        platform: "Docker",
        title: "Docker Private Registry",
        description: "Self-hosted or managed private registry with authentication, retention policies, and vulnerability scanning integration.",
        difficulty: "Intermediate",
        technologies: ["Docker", "Registry", "Harbor", "Authentication", "Retention"],
        image: "../../images/cloud/31_40/3_1.jpg",
        gallery: [
            "../../images/cloud/31_40/3_1.jpg",
            // "../../images/cloud/31_40/3_2.jpg",
            // "../../images/cloud/31_40/3_3.jpg"
        ],
        overview: "Private container image registry design supporting authentication, access control, retention, and optional security scanning.",
        architecture: "Registry v2 or Harbor. TLS termination. Auth via token or basic with proxy. Garbage collection and retention policies.",
        useCases: ["Enterprise image storage", "Air-gapped environments", "Compliance-controlled artifact stores"],
        services: ["Docker Registry", "Harbor", "Object storage backend"],
        implementationSteps: [
            "Choose self-hosted vs managed registry",
            "Deploy with TLS and persistent storage",
            "Configure authentication and authorization",
            "Set retention and garbage collection",
            "Integrate vulnerability scanning",
            "Configure client login and push workflows",
            "Enable audit logging",
            "Plan backup and disaster recovery",
            "Document promotion between environments",
            "Monitor storage and request metrics"
        ],
        security: "TLS, auth, RBAC, content trust optional, scan on push.",
        scalability: "Storage backend scaling, geo-replication options in Harbor.",
        monitoring: "Registry metrics, storage usage, auth failures.",
        complexity: "Intermediate."
    },
    {
        id: 34,
        platform: "Docker",
        title: "Docker Development Environment",
        description: "Reproducible developer workspaces with Compose, bind mounts, debug tooling, and parity with production.",
        difficulty: "Beginner",
        technologies: ["Docker", "Compose", "Bind Mounts", "Dev Containers"],
        image: "../../images/cloud/31_40/4_1.jpg",
        gallery: [
            "../../images/cloud/31_40/4_1.jpg",
            // "../../images/cloud/31_40/4_2.jpg",
            // "../../images/cloud/31_40/4_3.jpg"
        ],
        overview: "Consistent local development environments using Docker Compose and optional Dev Containers to match production dependencies.",
        architecture: "Compose services for app, database, cache. Bind mounts for live reload. Override files for local-only settings.",
        useCases: ["Onboarding developers", "Consistent tooling", "Integration testing"],
        services: ["Docker Compose", "VS Code Dev Containers optional"],
        implementationSteps: [
            "Define services required for local stack",
            "Use bind mounts for source code",
            "Separate docker-compose.override.yml for local",
            "Add debugging ports and tools carefully",
            "Document make targets or scripts",
            "Align base images with production where practical",
            "Provide sample .env",
            "Test onboarding on clean machine",
            "Version control compose and Dockerfiles",
            "Keep production Dockerfiles separate when needed"
        ],
        security: "Do not expose production secrets; use local-only credentials.",
        scalability: "N/A – development focus.",
        monitoring: "Local logs and healthchecks.",
        complexity: "Beginner."
    },
    {
        id: 35,
        platform: "Docker",
        title: "Docker CI/CD Pipeline",
        description: "Build, scan, sign, and push container images from CI with multi-arch support and promotion workflows.",
        difficulty: "Intermediate",
        technologies: ["Docker", "CI/CD", "Buildx", "Cosign", "Trivy"],
        image: "../../images/cloud/31_40/5_1.jpg",
        gallery: [
            "../../images/cloud/31_40/5_1.jpg",
            // "../../images/cloud/31_40/5_2.jpg",
            // "../../images/cloud/31_40/5_3.jpg"
        ],
        overview: "Automated container image pipeline that builds, scans, optionally signs, and publishes images with environment promotion.",
        architecture: "CI runners with Docker Buildx. Multi-stage builds. Scan step. Optional Cosign signing. Push to registry with immutable tags.",
        useCases: ["Release automation", "Supply chain security", "Multi-architecture images"],
        services: ["CI platform", "Container registry", "Scanner"],
        implementationSteps: [
            "Configure Buildx for multi-platform if needed",
            "Build and tag images with git SHA",
            "Run vulnerability scan and fail on critical",
            "Optionally sign with Cosign",
            "Push to registry",
            "Promote tags between environments",
            "Cache layers in CI",
            "Generate SBOM",
            "Notify on failure",
            "Document tag and promotion strategy"
        ],
        security: "Scan, sign, least-privilege registry credentials, immutable tags.",
        scalability: "Parallel builds, cache, multi-arch.",
        monitoring: "Pipeline duration, scan results, registry metrics.",
        complexity: "Intermediate."
    },
    // ---------- Kubernetes (8) ----------
    {
        id: 36,
        platform: "Kubernetes",
        title: "Kubernetes Production Cluster",
        description: "Hardened production cluster design covering control plane, node pools, networking, and add-on management.",
        difficulty: "Advanced",
        technologies: ["Kubernetes", "CNI", "RBAC", "Admission Controllers", "Cluster API"],
        image: "../../images/cloud/31_40/6_1.jpg",
        gallery: [
            "../../images/cloud/31_40/6_1.jpg",
            // "../../images/cloud/31_40/6_2.jpg",
            // "../../images/cloud/31_40/6_3.jpg"
        ],
        overview: "Production-grade Kubernetes cluster architecture focusing on reliability, security, and operability whether self-managed or via a managed service.",
        architecture: "Multi-AZ control plane. Separate system and workload node pools. CNI with network policies. Admission webhooks. GitOps for cluster config.",
        useCases: ["Platform teams", "Multi-tenant clusters", "Mission-critical workloads"],
        services: ["Kubernetes", "CNI plugin", "Ingress controller", "Monitoring stack"],
        implementationSteps: [
            "Define node pool and AZ strategy",
            "Select and configure CNI",
            "Implement RBAC and least-privilege access",
            "Enable admission controllers and policy engines",
            "Deploy ingress and certificate management",
            "Install monitoring and logging stack",
            "Configure cluster autoscaling",
            "Harden with CIS benchmarks",
            "Establish upgrade and backup procedures",
            "Document platform ownership model"
        ],
        security: "RBAC, network policies, pod security standards, secrets encryption, audit logging.",
        scalability: "Cluster autoscaler, multi-cluster federation options.",
        monitoring: "Prometheus, Grafana, control plane metrics, etcd health.",
        complexity: "Advanced."
    },
    {
        id: 37,
        platform: "Kubernetes",
        title: "Kubernetes Deployment & Service",
        description: "Declarative application deployment with Deployments, Services, probes, and resource requests/limits.",
        difficulty: "Beginner",
        technologies: ["Kubernetes", "Deployment", "Service", "Probes", "Resources"],
        image: "../../images/cloud/31_40/7_1.jpg",
        gallery: [
            "../../images/cloud/31_40/7_1.jpg",
            // "../../images/cloud/31_40/7_2.jpg",
            // "../../images/cloud/31_40/7_3.jpg"
        ],
        overview: "Core workload patterns using Deployments for replica management and Services for stable networking, with readiness and liveness probes.",
        architecture: "Deployment manages ReplicaSets. ClusterIP or LoadBalancer Service. Resource requests/limits. Rolling update strategy.",
        useCases: ["Stateless applications", "APIs", "Web frontends"],
        services: ["Kubernetes API", "kube-proxy", "CNI"],
        implementationSteps: [
            "Write Deployment manifest with image and replicas",
            "Define resource requests and limits",
            "Add liveness and readiness probes",
            "Create Service selecting the pods",
            "Configure rolling update parameters",
            "Apply and verify with kubectl",
            "Test rollout and rollback",
            "Label and annotate for observability",
            "Document image tag strategy",
            "Align with namespace and quota policies"
        ],
        security: "Non-root containers, read-only root filesystem where possible, service accounts.",
        scalability: "Replica count and HPA later.",
        monitoring: "Pod status, events, metrics from probes.",
        complexity: "Beginner."
    },
    {
        id: 38,
        platform: "Kubernetes",
        title: "Kubernetes Ingress Architecture",
        description: "HTTP routing with Ingress or Gateway API, TLS termination, path/host rules, and external load balancer integration.",
        difficulty: "Intermediate",
        technologies: ["Kubernetes", "Ingress", "Gateway API", "cert-manager", "NGINX"],
        image: "../../images/cloud/31_40/8_1.jpg",
        gallery: [
            "../../images/cloud/31_40/8_1.jpg",
            // "../../images/cloud/31_40/8_2.jpg",
            // "../../images/cloud/31_40/8_3.jpg"
        ],
        overview: "North-south traffic management using Ingress controllers or Gateway API for host/path-based routing and TLS.",
        architecture: "Ingress controller (NGINX, Traefik, cloud LB). Ingress or HTTPRoute resources. cert-manager for certificates. Optional WAF.",
        useCases: ["Public APIs", "Multi-tenant routing", "TLS termination"],
        services: ["Ingress controller", "cert-manager", "External DNS optional"],
        implementationSteps: [
            "Deploy Ingress controller",
            "Install cert-manager for certificates",
            "Define Ingress or Gateway API resources",
            "Configure TLS and redirect HTTP to HTTPS",
            "Set path and host rules",
            "Tune timeouts and buffer sizes",
            "Enable access logs and metrics",
            "Integrate external DNS if used",
            "Test certificate renewal",
            "Document routing ownership"
        ],
        security: "TLS everywhere, network policies, optional authentication annotations.",
        scalability: "Controller replicas and external LB capacity.",
        monitoring: "Controller metrics, request rates, error rates.",
        complexity: "Intermediate."
    },
    {
        id: 39,
        platform: "Kubernetes",
        title: "Kubernetes Horizontal Pod Autoscaling",
        description: "Automatic scaling of workloads based on CPU, memory, or custom metrics with HPA and metrics-server.",
        difficulty: "Intermediate",
        technologies: ["Kubernetes", "HPA", "Metrics Server", "Custom Metrics"],
        image: "../../images/cloud/31_40/9_1.jpg",
        gallery: [
            "../../images/cloud/31_40/9_1.jpg",
            // "../../images/cloud/31_40/9_2.jpg",
            // "../../images/cloud/31_40/9_3.jpg"
        ],
        overview: "Elastic application capacity using Horizontal Pod Autoscaler reacting to resource utilisation or custom application metrics.",
        architecture: "metrics-server or Prometheus adapter. HPA object targeting Deployment. Stabilisation windows and scaling policies.",
        useCases: ["Variable traffic services", "Cost-efficient capacity", "Event-driven scale"],
        services: ["metrics-server", "Prometheus adapter optional", "HPA controller"],
        implementationSteps: [
            "Ensure resource requests are set on pods",
            "Install metrics-server if not present",
            "Create HPA with target CPU/memory",
            "Optionally configure custom metrics",
            "Tune min/max replicas and behaviour",
            "Test scale-out under load",
            "Observe scale-in behaviour",
            "Combine with cluster autoscaler",
            "Alert on maxed-out HPA",
            "Document scaling assumptions"
        ],
        security: "Standard RBAC for HPA; no direct security impact beyond capacity.",
        scalability: "Core mechanism for application elasticity.",
        monitoring: "HPA status, current vs desired replicas, metric values.",
        complexity: "Intermediate."
    },
    {
        id: 40,
        platform: "Kubernetes",
        title: "Kubernetes ConfigMap & Secrets Architecture",
        description: "Configuration and secret management with ConfigMaps, Secrets, external secret operators, and sealed secrets.",
        difficulty: "Intermediate",
        technologies: ["Kubernetes", "ConfigMap", "Secrets", "External Secrets", "Sealed Secrets"],
        image: "../../images/cloud/31_40/0_1.jpg",
        gallery: [
            "../../images/cloud/31_40/0_1.jpg",
            // "../../images/cloud/31_40/0_2.jpg",
            // "../../images/cloud/31_40/0_3.jpg"
        ],
        overview: "Secure and maintainable configuration delivery using native ConfigMaps and Secrets, augmented with external secret management for production.",
        architecture: "ConfigMaps for non-sensitive config. Secrets for credentials. External Secrets Operator or Sealed Secrets for GitOps-friendly secret handling. Encryption at rest for etcd.",
        useCases: ["12-factor apps", "GitOps pipelines", "Multi-environment config"],
        services: ["Kubernetes API", "External Secrets Operator", "Cloud secret managers"],
        implementationSteps: [
            "Separate config from secrets",
            "Enable encryption at rest for Secrets",
            "Choose external secret strategy",
            "Mount as env or volumes",
            "Avoid secrets in images and Git",
            "Rotate secrets with defined process",
            "Restrict RBAC on Secret resources",
            "Audit access to secrets",
            "Document naming and ownership",
            "Test failure modes when secrets missing"
        ],
        security: "Encryption at rest, least-privilege RBAC, external secret stores, rotation.",
        scalability: "External operators scale with number of secrets and clusters.",
        monitoring: "Secret sync status, failed mounts, audit logs.",
        complexity: "Intermediate."
    },
    {
        id: 41,
        platform: "Kubernetes",
        title: "Kubernetes Persistent Storage",
        description: "Stateful workloads with PersistentVolumes, StorageClasses, CSI drivers, and backup strategies.",
        difficulty: "Intermediate",
        technologies: ["Kubernetes", "PV", "PVC", "StorageClass", "CSI"],
        image: "../../images/cloud/41_50/1_1.jpg",
        gallery: [
            "../../images/cloud/41_50/1_1.jpg",
            // "../../images/cloud/41_50/1_2.jpg",
            // "../../images/cloud/41_50/1_3.jpg"
        ],
        overview: "Persistent storage patterns for databases and stateful applications using dynamic provisioning via CSI and appropriate StorageClasses.",
        architecture: "StorageClass defines provisioner and parameters. PVC requests capacity and access mode. StatefulSet for ordered identity. Volume snapshots for backup.",
        useCases: ["Databases", "Message queues", "Stateful microservices"],
        services: ["CSI drivers", "Volume snapshot controller", "Cloud block storage"],
        implementationSteps: [
            "Select CSI driver for the platform",
            "Create StorageClasses for performance tiers",
            "Define PVCs or use volumeClaimTemplates",
            "Deploy StatefulSet if identity required",
            "Configure volume expansion if supported",
            "Implement snapshot and backup policy",
            "Test restore procedures",
            "Monitor capacity and IOPS",
            "Document reclaim policies",
            "Align with disaster recovery design"
        ],
        security: "Encryption at rest via storage backend, access modes, RBAC on PVCs.",
        scalability: "Dynamic provisioning; topology-aware scheduling for locality.",
        monitoring: "Volume metrics, capacity alerts, snapshot success.",
        complexity: "Intermediate."
    },
    {
        id: 42,
        platform: "Kubernetes",
        title: "Kubernetes Monitoring Stack",
        description: "Prometheus, Grafana, Alertmanager, and exporters for cluster and application observability.",
        difficulty: "Advanced",
        technologies: ["Kubernetes", "Prometheus", "Grafana", "Alertmanager", "ServiceMonitor"],
        image: "../../images/cloud/41_50/2_1.jpg",
        gallery: [
            "../../images/cloud/41_50/2_1.jpg",
            // "../../images/cloud/41_50/2_2.jpg",
            // "../../images/cloud/41_50/2_3.jpg"
        ],
        overview: "Complete observability stack for Kubernetes using the Prometheus ecosystem for metrics, alerting, and visualisation.",
        architecture: "Prometheus Operator. ServiceMonitors and PodMonitors. Grafana dashboards. Alertmanager routing. Optional Thanos for long-term storage.",
        useCases: ["SRE teams", "Platform observability", "SLO monitoring"],
        services: ["Prometheus", "Grafana", "Alertmanager", "Node exporter", "kube-state-metrics"],
        implementationSteps: [
            "Deploy Prometheus Operator via Helm or manifests",
            "Configure ServiceMonitors for critical services",
            "Deploy Grafana with dashboards as code",
            "Set up Alertmanager and notification channels",
            "Define recording and alerting rules",
            "Enable persistence for Prometheus/Grafana",
            "Secure access with RBAC and auth proxy",
            "Establish retention and federation strategy",
            "Test alert firing and silencing",
            "Document ownership of rules and dashboards"
        ],
        security: "Network policies, authenticated Grafana, secrets for notification credentials.",
        scalability: "Sharding, Thanos, remote write for large clusters.",
        monitoring: "Self-monitoring of Prometheus and Alertmanager health.",
        complexity: "Advanced."
    },
    {
        id: 43,
        platform: "Kubernetes",
        title: "Kubernetes CI/CD Deployment",
        description: "GitOps or pipeline-driven continuous delivery with progressive delivery controllers and policy gates.",
        difficulty: "Advanced",
        technologies: ["Kubernetes", "Argo CD", "Flux", "Helm", "Kustomize"],
        image: "../../images/cloud/41_50/3_1.jpg",
        gallery: [
            "../../images/cloud/41_50/3_1.jpg",
            // "../../images/cloud/41_50/3_2.jpg",
            // "../../images/cloud/41_50/3_3.jpg"
        ],
        overview: "Continuous delivery to Kubernetes using GitOps tools such as Argo CD or Flux, with progressive delivery and policy enforcement.",
        architecture: "Git as source of truth. Application controller syncs desired state. Helm or Kustomize for packaging. Progressive delivery with Argo Rollouts or Flagger.",
        useCases: ["Platform engineering", "Multi-cluster delivery", "Audit-friendly releases"],
        services: ["Argo CD / Flux", "Helm", "Kustomize", "Policy engine"],
        implementationSteps: [
            "Choose GitOps tool and repository structure",
            "Bootstrap controller in cluster",
            "Define Application or Kustomization resources",
            "Implement environment overlays",
            "Add progressive delivery for critical services",
            "Integrate policy checks (OPA/Kyverno)",
            "Configure sync windows and notifications",
            "Establish promotion workflow",
            "Test drift detection and self-heal",
            "Document break-glass and rollback"
        ],
        security: "SSO for GitOps UI, RBAC, signed commits optional, policy admission.",
        scalability: "Multi-cluster management, app-of-apps patterns.",
        monitoring: "Sync status, health, deployment frequency metrics.",
        complexity: "Advanced."
    },
    // ---------- AWS Lambda (7) ----------
    {
        id: 44,
        platform: "AWS Lambda",
        title: "Serverless REST API with AWS Lambda",
        description: "API Gateway + Lambda functions implementing RESTful endpoints with validation, auth, and structured logging.",
        difficulty: "Intermediate",
        technologies: ["AWS", "Lambda", "API Gateway", "IAM", "CloudWatch"],
        image: "../../images/cloud/41_50/4_1.jpg",
        gallery: [
            "../../images/cloud/41_50/4_1.jpg",
            // "../../images/cloud/41_50/4_2.jpg",
            // "../../images/cloud/41_50/4_3.jpg"
        ],
        overview: "Fully serverless REST API using Amazon API Gateway and AWS Lambda with least-privilege IAM and observability.",
        architecture: "HTTP API or REST API. Lambda handlers per route or shared router. JWT or IAM authorizers. Structured JSON logs to CloudWatch.",
        useCases: ["Microservices APIs", "Mobile backends", "Internal tools"],
        services: ["AWS Lambda", "Amazon API Gateway", "Amazon CloudWatch", "AWS IAM"],
        implementationSteps: [
            "Design API resources and methods",
            "Implement Lambda handlers with input validation",
            "Configure API Gateway routes and integrations",
            "Add authorizer (JWT, Cognito, or Lambda)",
            "Set least-privilege execution roles",
            "Enable access logs and X-Ray if needed",
            "Configure stages and throttling",
            "Deploy with SAM, CDK, or Terraform",
            "Write integration tests",
            "Document error codes and contracts"
        ],
        security: "Authorizers, IAM roles, input validation, secrets in Secrets Manager or SSM.",
        scalability: "Automatic per-request scaling; concurrency limits and reserved concurrency.",
        monitoring: "CloudWatch metrics, logs, alarms on errors and latency.",
        complexity: "Intermediate."
    },
    {
        id: 45,
        platform: "AWS Lambda",
        title: "Lambda + API Gateway Architecture",
        description: "Production API Gateway patterns including custom domains, stages, usage plans, and Lambda proxy integration.",
        difficulty: "Intermediate",
        technologies: ["AWS", "API Gateway", "Lambda", "Custom Domain", "Usage Plans"],
        image: "../../images/cloud/41_50/5_1.jpg",
        gallery: [
            "../../images/cloud/41_50/5_1.jpg",
            // "../../images/cloud/41_50/5_2.jpg",
            // "../../images/cloud/41_50/5_3.jpg"
        ],
        overview: "Robust API front-door design with Amazon API Gateway featuring custom domains, stage variables, usage plans, and tight Lambda integration.",
        architecture: "Regional or edge-optimised API. Custom domain with ACM certificate. Usage plans and API keys. Lambda proxy or HTTP integration.",
        useCases: ["Public APIs", "Partner integrations", "Rate-limited services"],
        services: ["Amazon API Gateway", "AWS Lambda", "AWS Certificate Manager", "Route 53"],
        implementationSteps: [
            "Create API and define resources",
            "Configure Lambda proxy integrations",
            "Set up custom domain and base path mapping",
            "Create usage plans and throttle settings",
            "Enable request validation",
            "Configure CORS if required",
            "Enable access logging to CloudWatch or Firehose",
            "Deploy to stages with stage variables",
            "Test throttling and authorizers",
            "Document client onboarding for API keys"
        ],
        security: "Authorizers, WAF association, mutual TLS optional, least-privilege.",
        scalability: "API Gateway scales; Lambda concurrency controls downstream.",
        monitoring: "API Gateway metrics, 4xx/5xx rates, latency percentiles.",
        complexity: "Intermediate."
    },
    {
        id: 46,
        platform: "AWS Lambda",
        title: "Lambda + DynamoDB Application",
        description: "Event-driven data access patterns with Lambda, DynamoDB single-table design, and streams for change data capture.",
        difficulty: "Intermediate",
        technologies: ["AWS", "Lambda", "DynamoDB", "DynamoDB Streams", "IAM"],
        image: "../../images/cloud/41_50/6_1.jpg",
        gallery: [
            "../../images/cloud/41_50/6_1.jpg",
            // "../../images/cloud/41_50/6_2.jpg",
            // "../../images/cloud/41_50/6_3.jpg"
        ],
        overview: "Serverless application pattern combining Lambda compute with DynamoDB for low-latency, scalable data storage and optional stream processing.",
        architecture: "Single-table or multi-table design. Lambda for CRUD and stream processors. On-demand or provisioned capacity. IAM fine-grained access.",
        useCases: ["User profiles", "Session stores", "Event sourcing light", "Real-time features"],
        services: ["AWS Lambda", "Amazon DynamoDB", "DynamoDB Streams", "CloudWatch"],
        implementationSteps: [
            "Model access patterns and design table",
            "Create table with appropriate keys and GSIs",
            "Implement Lambda data access layer",
            "Configure IAM policies for least privilege",
            "Enable streams if CDC required",
            "Write stream processor Lambda",
            "Set up monitoring for throttling and errors",
            "Load test and tune capacity mode",
            "Implement retry and idempotency",
            "Document data model and evolution process"
        ],
        security: "IAM conditions, encryption at rest, VPC optional for Lambda.",
        scalability: "On-demand capacity and automatic partitioning.",
        monitoring: "Consumed capacity, throttles, stream lag, Lambda errors.",
        complexity: "Intermediate."
    },
    {
        id: 47,
        platform: "AWS Lambda",
        title: "Lambda Event Processing System",
        description: "Asynchronous event-driven pipelines using SQS, SNS, EventBridge, and Lambda for decoupled processing.",
        difficulty: "Intermediate",
        technologies: ["AWS", "Lambda", "SQS", "SNS", "EventBridge"],
        image: "../../images/cloud/41_50/7_1.jpg",
        gallery: [
            "../../images/cloud/41_50/7_1.jpg",
            // "../../images/cloud/41_50/7_2.jpg",
            // "../../images/cloud/41_50/7_3.jpg"
        ],
        overview: "Decoupled event processing architecture leveraging SQS for buffering, SNS/EventBridge for fan-out, and Lambda for compute.",
        architecture: "Producers publish to SNS or EventBridge. SQS queues for durable buffering. Lambda event source mappings with batching and partial failure handling.",
        useCases: ["Order processing", "Notification fan-out", "Data ingestion pipelines"],
        services: ["AWS Lambda", "Amazon SQS", "Amazon SNS", "Amazon EventBridge"],
        implementationSteps: [
            "Identify event types and producers",
            "Design topics, buses, and queues",
            "Configure Lambda event source mappings",
            "Implement idempotent handlers",
            "Enable partial batch failure responses",
            "Set dead-letter queues",
            "Add filtering rules on EventBridge or SNS",
            "Monitor queue depth and age",
            "Load test under peak",
            "Document retry and poison-message handling"
        ],
        security: "Least-privilege IAM, encrypted queues/topics, resource policies.",
        scalability: "SQS and Lambda scale independently; batch size tuning.",
        monitoring: "ApproximateAgeOfOldestMessage, DLQ depth, Lambda concurrency.",
        complexity: "Intermediate."
    },
    {
        id: 48,
        platform: "AWS Lambda",
        title: "Lambda Scheduled Automation",
        description: "Cron-style and rate-based automation using EventBridge Scheduler or rules invoking Lambda for operational tasks.",
        difficulty: "Beginner",
        technologies: ["AWS", "Lambda", "EventBridge", "Scheduler", "IAM"],
        image: "../../images/cloud/41_50/8_1.jpg",
        gallery: [
            "../../images/cloud/41_50/8_1.jpg",
            // "../../images/cloud/41_50/8_2.jpg",
            // "../../images/cloud/41_50/8_3.jpg"
        ],
        overview: "Serverless scheduled jobs for maintenance, reporting, and automation without managing servers or cron hosts.",
        architecture: "EventBridge rule or Scheduler schedule targets Lambda. Optional Step Functions for multi-step workflows. CloudWatch Logs for audit.",
        useCases: ["Data cleanup", "Report generation", "Compliance checks", "Warm-up jobs"],
        services: ["AWS Lambda", "Amazon EventBridge", "EventBridge Scheduler", "CloudWatch"],
        implementationSteps: [
            "Define schedule and business logic",
            "Implement Lambda function with timeout appropriate to job",
            "Create EventBridge rule or Scheduler schedule",
            "Grant invoke permissions",
            "Add idempotency if overlapping runs possible",
            "Configure alarms on failures",
            "Log structured results",
            "Test manual invocation and schedule",
            "Document runbook for failures",
            "Review cost of frequent schedules"
        ],
        security: "Least-privilege role, no public access, encrypted environment variables.",
        scalability: "One invocation per schedule; Step Functions for fan-out if needed.",
        monitoring: "Invocation success/failure, duration, error logs.",
        complexity: "Beginner."
    },
    {
        id: 49,
        platform: "AWS Lambda",
        title: "Lambda Image Processing Pipeline",
        description: "Event-driven image processing with S3 triggers, Lambda, and optional Step Functions for multi-step transforms.",
        difficulty: "Intermediate",
        technologies: ["AWS", "Lambda", "S3", "Step Functions", "Sharp / Pillow"],
        image: "../../images/cloud/41_50/9_1.jpg",
        gallery: [
            "../../images/cloud/41_50/9_1.jpg",
            // "../../images/cloud/41_50/9_2.jpg",
            // "../../images/cloud/41_50/9_3.jpg"
        ],
        overview: "Automated image processing pipeline triggered by S3 object creation, using Lambda for transforms and optional orchestration with Step Functions.",
        architecture: "S3 event notification to Lambda or EventBridge. Lambda downloads, processes (resize, watermark), uploads result. Step Functions for multi-step or parallel processing.",
        useCases: ["User-generated content", "Thumbnail generation", "Media workflows"],
        services: ["AWS Lambda", "Amazon S3", "AWS Step Functions", "Amazon CloudWatch"],
        implementationSteps: [
            "Define processing requirements and output locations",
            "Package image library in Lambda layer or container image",
            "Configure S3 event notifications",
            "Implement processing function with error handling",
            "Optionally orchestrate with Step Functions",
            "Set concurrency limits to protect downstream",
            "Enable DLQ for failed events",
            "Monitor duration and memory usage",
            "Test with various image sizes and formats",
            "Document supported formats and limits"
        ],
        security: "S3 bucket policies, Lambda role scoped to specific prefixes, virus scanning optional.",
        scalability: "Parallel object processing; concurrency controls prevent overload.",
        monitoring: "Processing latency, error rate, S3 event lag.",
        complexity: "Intermediate."
    },
    {
        id: 50,
        platform: "AWS Lambda",
        title: "Serverless Authentication Architecture",
        description: "Cognito or custom JWT authorizers with Lambda, secure token handling, and fine-grained access control.",
        difficulty: "Advanced",
        technologies: ["AWS", "Lambda", "Cognito", "API Gateway", "JWT"],
        image: "../../images/cloud/41_50/0_1.jpg",
        gallery: [
            "../../images/cloud/41_50/0_1.jpg",
            // "../../images/cloud/41_50/0_2.jpg",
            // "../../images/cloud/41_50/0_3.jpg"
        ],
        overview: "Serverless authentication and authorisation design using Amazon Cognito user pools or custom Lambda authorizers with JWT validation.",
        architecture: "Cognito user pool for identity. API Gateway Cognito or Lambda authorizer. Fine-grained claims mapped to resource access. Optional pre/post triggers.",
        useCases: ["User-facing APIs", "B2B partner access", "Mobile and SPA backends"],
        services: ["Amazon Cognito", "AWS Lambda", "Amazon API Gateway", "AWS IAM"],
        implementationSteps: [
            "Design identity model and attributes",
            "Create Cognito user pool and app client",
            "Configure hosted UI or custom UI flows",
            "Implement API Gateway authorizer",
            "Map claims to authorisation decisions",
            "Add Lambda triggers for customisation if needed",
            "Secure tokens and refresh flows",
            "Enable advanced security features",
            "Test MFA and recovery flows",
            "Document token lifetimes and client integration"
        ],
        security: "MFA, adaptive authentication, short-lived tokens, secure storage on clients.",
        scalability: "Cognito and API Gateway scale with demand.",
        monitoring: "Sign-in metrics, authorizer latency, failed auth rates.",
        complexity: "Advanced."
    }
];

/* ============================================================
   Platform Summary Data
   ============================================================ */
const platformMeta = [
    { id: "AWS", name: "AWS", short: "AWS", description: "Cloud infrastructure, compute, storage, networking, security and DevOps.", iconClass: "platform-icon--aws", count: 12 },
    { id: "Azure", name: "Azure", short: "Azure", description: "Enterprise cloud infrastructure, identity, networking and deployment.", iconClass: "platform-icon--azure", count: 8 },
    { id: "GCP", name: "GCP", short: "GCP", description: "Cloud-native applications, Kubernetes, data and infrastructure.", iconClass: "platform-icon--gcp", count: 8 },
    { id: "Docker", name: "Docker", short: "Docker", description: "Containerization, image management and application packaging.", iconClass: "platform-icon--docker", count: 7 },
    { id: "Kubernetes", name: "Kubernetes", short: "K8s", description: "Container orchestration, scaling, service discovery and deployment.", iconClass: "platform-icon--k8s", count: 8 },
    { id: "AWS Lambda", name: "AWS Lambda", short: "Lambda", description: "Serverless computing, event-driven architecture and automation.", iconClass: "platform-icon--lambda", count: 7 }
];

/* ============================================================
   DOM References
   ============================================================ */
const dom = {
    resourceGrid: document.getElementById("resource-grid"),
    resourcesCount: document.getElementById("resources-count"),
    emptyState: document.getElementById("empty-state"),
    resetFiltersBtn: document.getElementById("reset-filters"),
    emptyResetBtn: document.getElementById("empty-reset"),
    searchInput: document.getElementById("resource-search"),
    sortSelect: document.getElementById("resource-sort"),
    platformGrid: document.getElementById("platform-grid"),
    resourceModal: document.getElementById("resource-modal"),
    modalBody: document.getElementById("modal-body"),
    gallery: document.getElementById("gallery"),
    galleryMain: document.getElementById("gallery-main"),
    galleryThumbs: document.getElementById("gallery-thumbs"),
    galleryCounter: document.getElementById("gallery-counter"),
    galleryPrev: document.getElementById("gallery-prev"),
    galleryNext: document.getElementById("gallery-next"),
    navToggle: document.getElementById("nav-toggle"),
    mainNav: document.getElementById("main-nav"),
    year: document.getElementById("year")
};

/* ============================================================
   Application State
   ============================================================ */
const state = {
    platform: "All",
    difficulty: "All",
    search: "",
    sort: "featured",
    filtered: [...resources],
    galleryImages: [],
    galleryIndex: 0,
    lastFocusedElement: null
};

/* ============================================================
   Backend-ready stubs
   ============================================================ */
async function fetchResources() {
    // Future: return await fetch('/api/cloud/resources').then(r => r.json());
    return resources;
}

async function fetchResourceById(id) {
    // Future: return await fetch(`/api/cloud/resources/${id}`).then(r => r.json());
    return resources.find(r => r.id === id) || null;
}

async function submitProjectRequest(data) {
    // Future: POST /api/project-request
    console.info("Project request would be submitted:", data);
    return { ok: true };
}

async function submitQuestionnaire(data) {
    // Future: POST /api/questionnaire
    console.info("Questionnaire would be submitted:", data);
    return { ok: true };
}

/* ============================================================
   Resource Rendering
   ============================================================ */
function renderResourceCard(resource) {
    const techPreview = resource.technologies.slice(0, 4).map(t =>
        `<span class="tech-tag">${escapeHtml(t)}</span>`
    ).join("");
    const difficultyClass = `difficulty-badge--${resource.difficulty.toLowerCase()}`;
    return `
    <article class="resource-card" role="listitem" data-id="${resource.id}">
        <div class="resource-card-image-wrap" data-gallery-id="${resource.id}" tabindex="0" role="button" aria-label="View gallery for ${escapeHtml(resource.title)}">
            <img class="resource-card-image" src="${escapeHtml(resource.image)}" alt="${escapeHtml(resource.title)} architecture diagram" loading="lazy" width="800" height="450">
        </div>
        <div class="resource-card-body">
            <span class="resource-platform">${escapeHtml(resource.platform)}</span>
            <h3 class="resource-title">${escapeHtml(resource.title)}</h3>
            <p class="resource-desc">${escapeHtml(resource.description)}</p>
            <div class="resource-tech">${techPreview}</div>
            <div class="resource-footer">
                <span class="difficulty-badge ${difficultyClass}">${escapeHtml(resource.difficulty)}</span>
                <button type="button" class="btn-read-more" data-resource-id="${resource.id}">Read More</button>
            </div>
        </div>
    </article>`;
}

function renderResources(list) {
    if (!list.length) {
        dom.resourceGrid.innerHTML = "";
        dom.emptyState.hidden = false;
        updateCount(0);
        return;
    }
    dom.emptyState.hidden = true;
    dom.resourceGrid.innerHTML = list.map(renderResourceCard).join("");
    updateCount(list.length);
}

function updateCount(shown) {
    const total = resources.length;
    if (shown === total && state.platform === "All" && state.difficulty === "All" && !state.search) {
        dom.resourcesCount.textContent = `${total} Resources`;
        dom.resetFiltersBtn.hidden = true;
    } else {
        dom.resourcesCount.textContent = `Showing ${shown} of ${total} resources`;
        dom.resetFiltersBtn.hidden = false;
    }
}

/* ============================================================
   Platform Cards
   ============================================================ */
function renderPlatforms() {
    dom.platformGrid.innerHTML = platformMeta.map(p => `
        <button type="button" class="platform-card" data-platform-filter="${p.id}" aria-label="Filter by ${p.name}">
            <span class="platform-icon ${p.iconClass}">${p.short.slice(0, 3)}</span>
            <span class="platform-name">${escapeHtml(p.name)}</span>
            <span class="platform-desc">${escapeHtml(p.description)}</span>
            <span class="platform-count">${p.count} Resources</span>
        </button>
    `).join("");
}

/* ============================================================
   Filtering, Searching, Sorting
   ============================================================ */
function applyFilters() {
    let list = [...resources];
    if (state.platform !== "All") list = list.filter(r => r.platform === state.platform);
    if (state.difficulty !== "All") list = list.filter(r => r.difficulty === state.difficulty);
    if (state.search) {
        const q = state.search.toLowerCase();
        list = list.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.platform.toLowerCase().includes(q) ||
            r.technologies.some(t => t.toLowerCase().includes(q))
        );
    }
    list = sortResources(list, state.sort);
    state.filtered = list;
    renderResources(list);
}

function sortResources(list, sortKey) {
    const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    const sorted = [...list];
    switch (sortKey) {
        case "name-asc": sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
        case "name-desc": sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
        case "difficulty": sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]); break;
        case "platform": sorted.sort((a, b) => a.platform.localeCompare(b.platform) || a.title.localeCompare(b.title)); break;
        default: sorted.sort((a, b) => a.id - b.id); break;
    }
    return sorted;
}

function resetFilters() {
    state.platform = "All";
    state.difficulty = "All";
    state.search = "";
    state.sort = "featured";
    dom.searchInput.value = "";
    dom.sortSelect.value = "featured";
    document.querySelectorAll(".filter-btn[data-platform]").forEach(btn => {
        const active = btn.dataset.platform === "All";
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active);
    });
    document.querySelectorAll(".filter-btn[data-difficulty]").forEach(btn => {
        const active = btn.dataset.difficulty === "All";
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active);
    });
    applyFilters();
}

/* ============================================================
   Resource Modal
   ============================================================ */
function openResourceModal(id) {
    const resource = resources.find(r => r.id === id);
    if (!resource) return;
    state.lastFocusedElement = document.activeElement;
    const difficultyClass = `difficulty-badge--${resource.difficulty.toLowerCase()}`;
    const techList = resource.technologies.map(t => `<span>${escapeHtml(t)}</span>`).join("");
    const useCases = resource.useCases.map(u => `<li>${escapeHtml(u)}</li>`).join("");
    const services = resource.services.map(s => `<li>${escapeHtml(s)}</li>`).join("");
    const steps = resource.implementationSteps.map(s => `<li>${escapeHtml(s)}</li>`).join("");

    dom.modalBody.innerHTML = `
        <p class="modal-platform">${escapeHtml(resource.platform)}</p>
        <h2 class="modal-title" id="modal-title">${escapeHtml(resource.title)}</h2>
        <span class="difficulty-badge ${difficultyClass} modal-difficulty">${escapeHtml(resource.difficulty)}</span>
        <div class="modal-section"><h3>Overview</h3><p>${escapeHtml(resource.overview)}</p></div>
        <div class="modal-section"><h3>Architecture</h3><p>${escapeHtml(resource.architecture)}</p></div>
        <div class="modal-section"><h3>Technologies</h3><div class="modal-tech-list">${techList}</div></div>
        <div class="modal-section"><h3>Cloud Services</h3><ul>${services}</ul></div>
        <div class="modal-section"><h3>Typical Use Cases</h3><ul>${useCases}</ul></div>
        <div class="modal-section"><h3>Implementation Approach</h3><ol class="modal-steps">${steps}</ol></div>
        <div class="modal-section"><h3>Security Considerations</h3><p>${escapeHtml(resource.security)}</p></div>
        <div class="modal-section"><h3>Scalability Considerations</h3><p>${escapeHtml(resource.scalability)}</p></div>
        <div class="modal-section"><h3>Monitoring Considerations</h3><p>${escapeHtml(resource.monitoring)}</p></div>
        <div class="modal-section"><h3>Estimated Complexity</h3><p>${escapeHtml(resource.complexity)}</p></div>
        <div class="modal-cta">
            <p>Need a custom implementation or a related Cloud &amp; DevOps project?</p>
            <a href="../home.html" class="btn btn-primary">Start a Project Planning</a>
        </div>
    `;
    dom.resourceModal.hidden = false;
    document.body.classList.add("modal-open");
    const closeBtn = dom.resourceModal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
}

function closeResourceModal() {
    dom.resourceModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (state.lastFocusedElement) {
        state.lastFocusedElement.focus();
        state.lastFocusedElement = null;
    }
}

/* ============================================================
   Image Gallery
   ============================================================ */
function openGallery(id) {
    const resource = resources.find(r => r.id === id);
    if (!resource || !resource.gallery.length) return;
    state.lastFocusedElement = document.activeElement;
    state.galleryImages = resource.gallery;
    state.galleryIndex = 0;
    updateGalleryView();
    dom.gallery.hidden = false;
    document.body.classList.add("modal-open");
    const closeBtn = dom.gallery.querySelector(".gallery-close");
    if (closeBtn) closeBtn.focus();
}

function updateGalleryView() {
    const img = state.galleryImages[state.galleryIndex];
    dom.galleryMain.src = img;
    dom.galleryMain.alt = `Gallery image ${state.galleryIndex + 1}`;
    dom.galleryCounter.textContent = `${state.galleryIndex + 1} / ${state.galleryImages.length}`;
    dom.galleryThumbs.innerHTML = state.galleryImages.map((src, i) =>
        `<img class="gallery-thumb${i === state.galleryIndex ? " is-active" : ""}" src="${escapeHtml(src)}" alt="Thumbnail ${i + 1}" data-index="${i}" width="64" height="40">`
    ).join("");
}

function nextImage() {
    if (!state.galleryImages.length) return;
    state.galleryIndex = (state.galleryIndex + 1) % state.galleryImages.length;
    updateGalleryView();
}

function previousImage() {
    if (!state.galleryImages.length) return;
    state.galleryIndex = (state.galleryIndex - 1 + state.galleryImages.length) % state.galleryImages.length;
    updateGalleryView();
}

function closeGallery() {
    dom.gallery.hidden = true;
    document.body.classList.remove("modal-open");
    state.galleryImages = [];
    state.galleryIndex = 0;
    if (state.lastFocusedElement) {
        state.lastFocusedElement.focus();
        state.lastFocusedElement = null;
    }
}

/* ============================================================
   Navigation
   ============================================================ */
function initializeNavigation() {
    if (dom.navToggle) {
        dom.navToggle.addEventListener("click", () => {
            const open = dom.mainNav.classList.toggle("is-open");
            dom.navToggle.setAttribute("aria-expanded", open);
        });
    }
    dom.mainNav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            dom.mainNav.classList.remove("is-open");
            if (dom.navToggle) dom.navToggle.setAttribute("aria-expanded", "false");
        });
    });
    document.querySelectorAll("[data-filter]").forEach(el => {
        el.addEventListener("click", () => {
            const platform = el.getAttribute("data-filter");
            if (platform) {
                state.platform = platform;
                document.querySelectorAll(".filter-btn[data-platform]").forEach(btn => {
                    const active = btn.dataset.platform === platform;
                    btn.classList.toggle("is-active", active);
                    btn.setAttribute("aria-pressed", active);
                });
                applyFilters();
            }
        });
    });
}

/* ============================================================
   Event Binding
   ============================================================ */
function bindEvents() {
    document.querySelectorAll(".filter-btn[data-platform]").forEach(btn => {
        btn.addEventListener("click", () => {
            state.platform = btn.dataset.platform;
            document.querySelectorAll(".filter-btn[data-platform]").forEach(b => {
                const active = b === btn;
                b.classList.toggle("is-active", active);
                b.setAttribute("aria-pressed", active);
            });
            applyFilters();
        });
    });
    document.querySelectorAll(".filter-btn[data-difficulty]").forEach(btn => {
        btn.addEventListener("click", () => {
            state.difficulty = btn.dataset.difficulty;
            document.querySelectorAll(".filter-btn[data-difficulty]").forEach(b => {
                const active = b === btn;
                b.classList.toggle("is-active", active);
                b.setAttribute("aria-pressed", active);
            });
            applyFilters();
        });
    });
    let searchTimeout;
    dom.searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.search = dom.searchInput.value.trim();
            applyFilters();
        }, 200);
    });
    dom.sortSelect.addEventListener("change", () => {
        state.sort = dom.sortSelect.value;
        applyFilters();
    });
    dom.resetFiltersBtn.addEventListener("click", resetFilters);
    dom.emptyResetBtn.addEventListener("click", resetFilters);
    dom.platformGrid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-platform-filter]");
        if (!card) return;
        const platform = card.dataset.platformFilter;
        state.platform = platform;
        document.querySelectorAll(".filter-btn[data-platform]").forEach(btn => {
            const active = btn.dataset.platform === platform;
            btn.classList.toggle("is-active", active);
            btn.setAttribute("aria-pressed", active);
        });
        document.getElementById("resources").scrollIntoView({ behavior: "smooth" });
        applyFilters();
    });
    dom.resourceGrid.addEventListener("click", (e) => {
        const readMore = e.target.closest("[data-resource-id]");
        if (readMore) {
            openResourceModal(Number(readMore.dataset.resourceId));
            return;
        }
        const galleryTrigger = e.target.closest("[data-gallery-id]");
        if (galleryTrigger) openGallery(Number(galleryTrigger.dataset.galleryId));
    });
    dom.resourceGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            const galleryTrigger = e.target.closest("[data-gallery-id]");
            if (galleryTrigger) {
                e.preventDefault();
                openGallery(Number(galleryTrigger.dataset.galleryId));
            }
        }
    });
    dom.resourceModal.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-close-modal") || e.target.closest("[data-close-modal]")) closeResourceModal();
    });
    dom.gallery.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-close-gallery") || e.target.closest("[data-close-gallery]")) {
            closeGallery();
            return;
        }
        const thumb = e.target.closest(".gallery-thumb");
        if (thumb) {
            state.galleryIndex = Number(thumb.dataset.index);
            updateGalleryView();
        }
    });
    dom.galleryPrev.addEventListener("click", previousImage);
    dom.galleryNext.addEventListener("click", nextImage);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (!dom.gallery.hidden) closeGallery();
            else if (!dom.resourceModal.hidden) closeResourceModal();
        }
        if (!dom.gallery.hidden) {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") previousImage();
        }
    });
}

/* ============================================================
   Utilities
   ============================================================ */
function escapeHtml(str) {
    if (typeof str !== "string") return "";
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return str.replace(/[&<>"']/g, c => map[c]);
}

/* ============================================================
   Initialization
   ============================================================ */
function init() {
    if (dom.year) dom.year.textContent = new Date().getFullYear();
    renderPlatforms();
    renderResources(resources);
    bindEvents();
    initializeNavigation();
}

document.addEventListener("DOMContentLoaded", init);
