import {
  RiDashboard2Fill,
  RiApps2Line,
  RiPagesLine,
  RiRocketLine,
  RiStackLine,
  RiHonourLine,
  RiFileList3Line,
  RiLayoutGridLine,
  RiPieChart2Line,
  RiCompasses2Fill,
  RiShareLine,
} from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

const leftSidebarData = [
  {
    tabCategory: "Menu",
    tabNameList: [
      {
        id: "Dashboard",
        tabName: "Dashboards",
        tabIcon: <RiDashboard2Fill />,
        tabDropdownList: [
          {
            id: "dashboard-analytics",
            tabName: "Analytics",
            pathName: "/dashboard-analytics",
            tabDropdownList: [],
          },
          {
            id: "dashboard-crm",
            tabName: "CRM",
            pathName: "/dashboard-crm",
            tabDropdownList: [],
          },
          {
            id: "dashboard",
            tabName: "Ecommerce",
            pathName: "/dashboard",
            tabDropdownList: [],
          },
          {
            id: "dashboard-crypto",
            tabName: "Crypto",
            pathName: "/dashboard-crypto",
            tabDropdownList: [],
          },
          {
            id: "dashboard-projects",
            tabName: "Projects",
            pathName: "/dashboard-projects",
            tabDropdownList: [],
          },
          {
            id: "dashboard-nft",
            tabName: "NFT",
            pathName: "/dashboard-nft",
            tabDropdownList: [],
          },
          {
            id: "dashboard-job",
            tabName: "Job",
            pathName: "/dashboard-job",
            tabDropdownList: [],
          },
          {
            id: "dashboard-blog",
            tabName: "Blog",
            pathName: "/dashboard-blog",
            isNew: true,
            tabDropdownList: [],
          },
        ],
      },

      {
        id: "Apps",
        tabName: "Apps",
        tabIcon: <RiApps2Line />,
        tabDropdownList: [
          {
            id: "calendar",
            tabName: "Calendar",
            tabDropdownList: [
              {
                id: "apps-main-calendar",
                tabName: "Main Calendar",
                pathName: "/apps-main-calendar",
                tabDropdownList: [],
              },
              {
                id: "apps-calendar-month-grid",
                tabName: "Month Grid",
                pathName: "/apps-calendar-month-grid",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "apps-chat",
            tabName: "Chat",
            pathName: "/apps-chat",
            tabDropdownList: [],
          },
          {
            id: "email",
            tabName: "Email",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-mailbox-email",
                tabName: "Mailbox",
                pathName: "/apps-mailbox-email",
                tabDropdownList: [],
              },
              {
                id: "apps-email",
                tabName: "Email Templates",
                pathName: "",
                tabDropdownList: [
                  {
                    id: "apps-email-basic",
                    tabName: "Basic Action",
                    pathName: "/apps-email-basic",
                    tabDropdownList: [],
                  },
                  {
                    id: "apps-email-ecommerce",
                    tabName: "Eccommerce Action",
                    pathName: "/apps-email-ecommerce",
                    tabDropdownList: [],
                  },
                ],
              },
            ],
          },

          {
            id: "apps-ecommerce",
            tabName: "Ecommerce",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-ecommerce-products",
                tabName: "Products",
                pathName: "/apps-ecommerce-products",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-product-details",
                tabName: "Product Details",
                pathName: "/apps-ecommerce-product-details",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-add-product",
                tabName: "Create Product",
                pathName: "/apps-ecommerce-add-product",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-orders",
                tabName: "Orders",
                pathName: "/apps-ecommerce-orders",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-order-details",
                tabName: "Order Details",
                pathName: "/apps-ecommerce-order-details",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-customers",
                tabName: "Customers",
                pathName: "/apps-ecommerce-customers",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-cart",
                tabName: "Shopping Cart",
                pathName: "/apps-ecommerce-cart",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-checkout",
                tabName: "Checkout",
                pathName: "/apps-ecommerce-checkout",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-sellers",
                tabName: "Sellers",
                pathName: "/apps-ecommerce-sellers",
                tabDropdownList: [],
              },
              {
                id: "apps-ecommerce-seller-details",
                tabName: "Seller Details",
                pathName: "/apps-ecommerce-seller-details",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "apps-projects",
            tabName: "Projects",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-projects-list",
                tabName: "List",
                pathName: "/apps-projects-list",
                tabDropdownList: [],
              },
              {
                id: "apps-projects-overview",
                tabName: "Overview",
                pathName: "/apps-projects-overview",
                tabDropdownList: [],
              },
              {
                id: "apps-projects-create",
                tabName: "Create Project",
                pathName: "/apps-projects-create",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-tasks",
            tabName: "Tasks",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-tasks-kanban",
                tabName: "Kanban Board",
                pathName: "/apps-tasks-kanban",
                tabDropdownList: [],
              },
              {
                id: "apps-tasks-list-view",
                tabName: "List View",
                pathName: "/apps-tasks-list-view",
                tabDropdownList: [],
              },
              {
                id: "apps-tasks-details",
                tabName: "Task Details",
                pathName: "/apps-tasks-details",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-crm",
            tabName: "CRM",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-crm-contacts",
                tabName: "Contacts",
                pathName: "/apps-crm-contacts",
                tabDropdownList: [],
              },
              {
                id: "apps-crm-companies",
                tabName: "Companies",
                pathName: "/apps-crm-companies",
                tabDropdownList: [],
              },
              {
                id: "apps-crm-deals",
                tabName: "Deals",
                pathName: "/apps-crm-deals",
                tabDropdownList: [],
              },
              {
                id: "apps-crm-leads",
                tabName: "Leads",
                pathName: "/apps-crm-leads",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-crypto",
            tabName: "Crypto",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-crypto-transactions",
                tabName: "Transactions",
                pathName: "/apps-crypto-transactions",
                tabDropdownList: [],
              },
              {
                id: "apps-crypto-buy-sell",
                tabName: "Buy & Sell",
                pathName: "/apps-crypto-buy-sell",
                tabDropdownList: [],
              },
              {
                id: "apps-crypto-orders",
                tabName: "Orders",
                pathName: "/apps-crypto-orders",
                tabDropdownList: [],
              },
              {
                id: "apps-crypto-wallet",
                tabName: "My Wallet",
                pathName: "/apps-crypto-wallet",
                tabDropdownList: [],
              },
              {
                id: "apps-crypto-ico",
                tabName: "ICO List",
                pathName: "/apps-crypto-ico",
                tabDropdownList: [],
              },
              {
                id: "apps-crypto-kyc",
                tabName: "KYC Application",
                pathName: "/apps-crypto-kyc",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-invoices",
            tabName: "Invoices",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-invoices-list",
                tabName: "List View",
                pathName: "/apps-invoices-list",
                tabDropdownList: [],
              },
              {
                id: "apps-invoices-details",
                tabName: "Details",
                pathName: "/apps-invoices-details",
                tabDropdownList: [],
              },
              {
                id: "apps-invoices-create",
                tabName: "Create Invoice",
                pathName: "/apps-invoices-create",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-tickets",
            tabName: "Support Tickets",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-tickets-list",
                tabName: "List View",
                pathName: "/apps-tickets-list",
                tabDropdownList: [],
              },
              {
                id: "apps-tickets-details",
                tabName: "Ticket Details",
                pathName: "/apps-tickets-details",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-nft",
            tabName: "NFT Marketplace",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-nft-marketplace",
                tabName: "Marketplace",
                pathName: "/apps-nft-marketplace",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-explore",
                tabName: "Explore Now",
                pathName: "/apps-nft-explore",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-auction",
                tabName: "Live Auction",
                pathName: "/apps-nft-auction",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-item-details",
                tabName: "Item Details",
                pathName: "/apps-nft-item-details",
                tabDropdownList: [],
              },

              {
                id: "apps-nft-collections",
                tabName: "Collections",
                pathName: "/apps-nft-collections",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-creators",
                tabName: "Creators",
                pathName: "/apps-nft-creators",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-ranking",
                tabName: "Ranking",
                pathName: "/apps-nft-ranking",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-wallet",
                tabName: "Wallet Connect",
                pathName: "/apps-nft-wallet",
                tabDropdownList: [],
              },
              {
                id: "apps-nft-create",
                tabName: "Create NFT",
                pathName: "/apps-nft-create",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-file-manager",
            tabName: "File Manager",
            pathName: "/apps-file-manager",
            tabDropdownList: [],
          },

          {
            id: "apps-todo",
            tabName: "TO DO",
            pathName: "/apps-todo",
            tabDropdownList: [],
          },

          {
            id: "apps-job",
            tabName: "Jobs",
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-job-statistics",
                tabName: "Statistics",
                pathName: "/apps-job-statistics",
                tabDropdownList: [],
              },
              {
                id: "apps-job-lists",
                tabName: "Job Lists",
                pathName: "",
                tabDropdownList: [
                  {
                    id: "apps-job-lists-view",
                    tabName: "List",
                    pathName: "/apps-job-lists-view",
                    tabDropdownList: [],
                  },
                  {
                    id: "apps-job-lists-grid-view",
                    tabName: "Grid",
                    pathName: "/apps-job-lists-grid-view",
                    tabDropdownList: [],
                  },
                  {
                    id: "apps-job-lists-details-view",
                    tabName: "Overview",
                    pathName: "/apps-job-lists-details-view",
                    tabDropdownList: [],
                  },
                ],
              },
              {
                id: "apps-job-candidate",
                tabName: "Candidate Lists",
                pathName: "",
                tabDropdownList: [
                  {
                    id: "apps-job-candidate-lists",
                    tabName: "List View",
                    pathName: "/apps-job-candidate-lists",
                    tabDropdownList: [],
                  },
                  {
                    id: "apps-job-candidate-grid",
                    tabName: "Grid View",
                    pathName: "/apps-job-candidate-grid",
                    tabDropdownList: [],
                  },
                ],
              },
              {
                id: "apps-job-application",
                tabName: "Application",
                pathName: "/apps-job-application",
                tabDropdownList: [],
              },

              {
                id: "apps-job-new",
                tabName: "New Job",
                pathName: "/apps-job-new",
                tabDropdownList: [],
              },
              {
                id: "apps-job-companies-lists",
                tabName: "Companies List",
                pathName: "/apps-job-companies-lists",
                tabDropdownList: [],
              },
              {
                id: "apps-job-categories",
                tabName: "Job Categories",
                pathName: "/apps-job-categories",
                tabDropdownList: [],
              },
            ],
          },

          {
            id: "apps-api-key",
            tabName: "API Key",
            pathName: "/apps-api-key",
            tabDropdownList: [],
          },
        ],
      },
    ],
  },

  {
    tabCategory: "Pages",
    tabNameList: [
      {
        id: "Auth",
        tabName: "Authentication",
        tabIcon: <MdOutlineAccountCircle />,
        tabDropdownList: [
          {
            id: "signin",
            tabName: "Sign In",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-signin-basic",
                tabName: "Basic",
                pathName: "/auth-signin-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-signin-cover",
                tabName: "Cover",
                pathName: "/auth-signin-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "signup",
            tabName: "Sign Up",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-signup-basic",
                tabName: "Basic",
                pathName: "/auth-signup-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-signup-cover",
                tabName: "Cover",
                pathName: "/auth-signup-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "pass-reset",
            tabName: "Password Reset",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-pass-reset-basic",
                tabName: "Basic",
                pathName: "/auth-pass-reset-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-pass-reset-cover",
                tabName: "Cover",
                pathName: "/auth-pass-reset-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "pass-change",
            tabName: "Password Create",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-pass-change-basic",
                tabName: "Basic",
                pathName: "/auth-pass-change-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-pass-change-cover",
                tabName: "Cover",
                pathName: "/auth-pass-change-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "lockscreen",
            tabName: "Lock Screen",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-lockscreen-basic",
                tabName: "Basic",
                pathName: "/auth-lockscreen-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-lockscreen-cover",
                tabName: "Cover",
                pathName: "/auth-lockscreen-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "logout",
            tabName: "Logout",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-logout-basic",
                tabName: "Basic",
                pathName: "/auth-logout-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-logout-cover",
                tabName: "Cover",
                pathName: "/auth-logout-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "success-msg",
            tabName: "Success Message",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-success-msg-basic",
                tabName: "Basic",
                pathName: "/auth-success-msg-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-success-msg-cover",
                tabName: "Cover",
                pathName: "/auth-success-msg-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "twostep",
            tabName: "Two Step Verification",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-twostep-basic",
                tabName: "Basic",
                pathName: "/auth-twostep-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-twostep-cover",
                tabName: "Cover",
                pathName: "/auth-twostep-cover",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "error",
            tabName: "Errors",
            pathName: "",
            tabDropdownList: [
              {
                id: "auth-error-404-basic",
                tabName: "404 Basic",
                pathName: "/auth-error-404-basic",
                tabDropdownList: [],
              },
              {
                id: "auth-error-404-cover",
                tabName: "404 Cover",
                pathName: "/auth-error-404-cover",
                tabDropdownList: [],
              },
              {
                id: "auth-error-404-alt",
                tabName: "404 Alt",
                pathName: "/auth-error-404-alt",
                tabDropdownList: [],
              },
              {
                id: "auth-error-500",
                tabName: "500",
                pathName: "/auth-error-500",
                tabDropdownList: [],
              },
              {
                id: "auth-error-offline",
                tabName: "Offline Page",
                pathName: "/auth-error-offline",
                tabDropdownList: [],
              },
            ],
          },
        ],
      },

      {
        id: "Pages",
        tabName: "Pages",
        tabIcon: <RiPagesLine />,
        tabDropdownList: [
          {
            id: "pages-starter",
            tabName: "Starter",
            pathName: "/pages-starter",
            tabDropdownList: [],
          },
          {
            id: "profile",
            tabName: "Profile",
            tabDropdownList: [
              {
                id: "pages-profile",
                tabName: "Simple Page",
                pathName: "/pages-profile",
                tabDropdownList: [],
              },
              {
                id: "pages-user-profile-settings",
                tabName: "Settings",
                pathName: "/pages-user-profile-settings",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "pages-team",
            tabName: "Team",
            pathName: "/pages-team",
            tabDropdownList: [],
          },
          {
            id: "pages-timeline",
            tabName: "Timeline",
            pathName: "/pages-timeline",
            tabDropdownList: [],
          },
          {
            id: "pages-faqs",
            tabName: "FAQs",
            pathName: "/pages-faqs",
            tabDropdownList: [],
          },
          {
            id: "pages-pricing",
            tabName: "Pricing",
            pathName: "/pages-pricing",
            tabDropdownList: [],
          },
          {
            id: "pages-gallery",
            tabName: "Gallery",
            pathName: "/pages-gallery",
            tabDropdownList: [],
          },
          {
            id: "pages-maintenance",
            tabName: "Maintenance",
            pathName: "/pages-maintenance",
            tabDropdownList: [],
          },
          {
            id: "pages-coming-soon",
            tabName: "Comming Soon",
            pathName: "/pages-coming-soon",
            tabDropdownList: [],
          },
          {
            id: "pages-sitemap",
            tabName: "Sitemap",
            pathName: "/pages-sitemap",
            tabDropdownList: [],
          },
          {
            id: "pages-search-results",
            tabName: "Search Results",
            pathName: "/pages-search-results",
            tabDropdownList: [],
          },
          {
            id: "pages-privacy-policy",
            tabName: "Privacy Policy",
            pathName: "/pages-privacy-policy",
            tabDropdownList: [],
          },
          {
            id: "pages-terms-condition",
            tabName: "Terms Condition",
            pathName: "/pages-terms-condition",
            tabDropdownList: [],
          },
          {
            id: "pages-blog",
            tabName: "Blogs",
            isNew: true,
            tabDropdownList: [
              {
                id: "pages-blog-list",
                tabName: "List View",
                pathName: "/pages-blog-list",
                tabDropdownList: [],
              },
              {
                id: "pages-blog-grid",
                tabName: "Grid View",
                pathName: "/pages-blog-grid",
                tabDropdownList: [],
              },
              {
                id: "pages-blog-overview",
                tabName: "Overview",
                pathName: "/pages-blog-overview",
                tabDropdownList: [],
              },
            ],
          },
        ],
      },

      {
        id: "Landing",
        tabName: "Landing",
        tabIcon: <RiRocketLine />,
        tabDropdownList: [
          {
            id: "landing",
            tabName: "One Page",
            pathName: "/landing",
            tabDropdownList: [],
          },
          {
            id: "nft-landing",
            tabName: "NFT Landing",
            pathName: "/nft-landing",
            tabDropdownList: [],
          },
          {
            id: "job-landing",
            tabName: "Job",
            pathName: "/job-landing",
            tabDropdownList: [],
          },
        ],
      },
    ],
  },

  {
    tabCategory: "Components",
    tabNameList: [
      {
        id: "base-ui",
        tabName: "Base UI",
        tabIcon: <FaPencilRuler />,
        tabDropdownList: [
          {
            id: "base-ui-alerts",
            tabName: "Alerts",
            pathName: "/base-ui-alerts",
            tabDropdownList: [],
          },
          {
            id: "base-ui-badges",
            tabName: "Badges",
            pathName: "/base-ui-badges",
            tabDropdownList: [],
          },
          {
            id: "base-ui-buttons",
            tabName: "Buttons",
            pathName: "/base-ui-buttons",
            tabDropdownList: [],
          },
          {
            id: "base-ui-colors",
            tabName: "Colors",
            pathName: "/base-ui-colors",
            tabDropdownList: [],
          },
          {
            id: "base-ui-cards",
            tabName: "Cards",
            pathName: "/base-ui-cards",
            tabDropdownList: [],
          },
          {
            id: "base-ui-carousel",
            tabName: "Carousel",
            pathName: "/base-ui-carousel",
            tabDropdownList: [],
          },
          {
            id: "base-ui-dropdowns",
            tabName: "Dropdowns",
            pathName: "/base-ui-dropdowns",
            tabDropdownList: [],
          },
          {
            id: "base-ui-grid",
            tabName: "Grid",
            pathName: "/base-ui-grid",
            tabDropdownList: [],
          },
          {
            id: "base-ui-images",
            tabName: "Images",
            pathName: "/base-ui-images",
            tabDropdownList: [],
          },
          {
            id: "base-ui-tabs",
            tabName: "Tabs",
            pathName: "/base-ui-tabs",
            tabDropdownList: [],
          },
          {
            id: "base-ui-accordions",
            tabName: "Accordions & Collapse",
            pathName: "/base-ui-accordions",
            tabDropdownList: [],
          },
          {
            id: "base-ui-modals",
            tabName: "Modals",
            pathName: "/base-ui-modals",
            tabDropdownList: [],
          },
          {
            id: "base-ui-offcanvas",
            tabName: "Offcanvas",
            pathName: "/base-ui-offcanvas",
            tabDropdownList: [],
          },
          {
            id: "base-ui-placeholders",
            tabName: "Placeholders",
            pathName: "/base-ui-placeholders",
            tabDropdownList: [],
          },
          {
            id: "base-ui-progress",
            tabName: "Progress",
            pathName: "/base-ui-progress",
            tabDropdownList: [],
          },
          {
            id: "base-ui-notifications",
            tabName: "Notifications",
            pathName: "/base-ui-notifications",
            tabDropdownList: [],
          },
          {
            id: "base-ui-media",
            tabName: "Media Object",
            pathName: "/base-ui-media",
            tabDropdownList: [],
          },
          {
            id: "base-ui-embed-video",
            tabName: "Embed Video",
            pathName: "/base-ui-embed-video",
            tabDropdownList: [],
          },
          {
            id: "base-ui-typography",
            tabName: "Typography",
            pathName: "/base-ui-typography",
            tabDropdownList: [],
          },
          {
            id: "base-ui-lists",
            tabName: "Lists",
            pathName: "/base-ui-lists",
            tabDropdownList: [],
          },
          {
            id: "base-ui-links",
            tabName: "Links",
            pathName: "/base-ui-links",
            isNew: true,
            tabDropdownList: [],
          },
          {
            id: "base-ui-general",
            tabName: "General",
            pathName: "/base-ui-general",
            tabDropdownList: [],
          },
          {
            id: "base-ui-ribbons",
            tabName: "Ribbons",
            pathName: "/base-ui-ribbons",
            tabDropdownList: [],
          },
          {
            id: "base-ui-utilities",
            tabName: "Utilities",
            pathName: "/base-ui-utilities",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Advance",
        tabName: "Advance UI",
        tabIcon: <BsStack />,
        tabDropdownList: [
          {
            id: "advance-ui-nestable",
            tabName: "Nestable List",
            pathName: "/advance-ui-nestable",
            tabDropdownList: [],
          },
          {
            id: "advance-ui-scrollbar",
            tabName: "Scrollbar",
            pathName: "/advance-ui-scrollbar",
            tabDropdownList: [],
          },
          {
            id: "advance-ui-animation",
            tabName: "Animation",
            pathName: "/advance-ui-animation",
            tabDropdownList: [],
          },
          {
            id: "advance-ui-swiper",
            tabName: "Swiper Slider",
            pathName: "/advance-ui-swiper",
            tabDropdownList: [],
          },
          {
            id: "advance-ui-ratings",
            tabName: "Ratings",
            pathName: "/advance-ui-ratings",
            tabDropdownList: [],
          },
          {
            id: "advance-ui-highlight",
            tabName: "Highlight",
            pathName: "/advance-ui-highlight",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Widgets",
        tabName: "Widgets",
        tabIcon: <RiHonourLine />,
        pathName: "/widgets",
        tabDropdownList: [],
      },
      {
        id: "Forms",
        tabName: "Forms",
        tabIcon: <RiFileList3Line />,
        tabDropdownList: [
          {
            id: "forms-elements",
            tabName: "Basic Elements",
            pathName: "/forms-elements",
            tabDropdownList: [],
          },
          {
            id: "forms-select",
            tabName: "Form Select",
            pathName: "/forms-select",
            tabDropdownList: [],
          },
          {
            id: "forms-checkboxes-radios",
            tabName: "Checkboxs & Radios",
            pathName: "/forms-checkboxes-radios",
            tabDropdownList: [],
          },
          {
            id: "forms-pickers",
            tabName: "Pickers",
            pathName: "/forms-pickers",
            tabDropdownList: [],
          },
          {
            id: "forms-masks",
            tabName: "Input Masks",
            pathName: "/forms-masks",
            tabDropdownList: [],
          },
          {
            id: "forms-advanced",
            tabName: "Advanced",
            pathName: "/forms-advanced",
            tabDropdownList: [],
          },
          {
            id: "forms-range-sliders",
            tabName: "Range Slider",
            pathName: "/forms-range-sliders",
            tabDropdownList: [],
          },
          {
            id: "forms-validation",
            tabName: "Validation",
            pathName: "/forms-validation",
            tabDropdownList: [],
          },
          {
            id: "forms-wizard",
            tabName: "Wizard",
            pathName: "/forms-wizard",
            tabDropdownList: [],
          },
          {
            id: "forms-editors",
            tabName: "Editors",
            pathName: "/forms-editors",
            tabDropdownList: [],
          },
          {
            id: "forms-file-uploads",
            tabName: "File Uploads",
            pathName: "/forms-file-uploads",
            tabDropdownList: [],
          },
          {
            id: "forms-layouts",
            tabName: "File Layouts",
            pathName: "/forms-layouts",
            tabDropdownList: [],
          },
          {
            id: "forms-select2",
            tabName: "Select2",
            pathName: "/forms-select2",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Tables",
        tabName: "Tables",
        tabIcon: <RiLayoutGridLine />,
        tabDropdownList: [
          {
            id: "tables-basic",
            tabName: "Basic Tables",
            pathName: "/tables-basic",
            tabDropdownList: [],
          },
          {
            id: "tables-listjs",
            tabName: "List Js",
            pathName: "/tables-listjs",
            tabDropdownList: [],
          },
          {
            id: "tables-react",
            tabName: "React Datatables",
            pathName: "/tables-react",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Charts",
        tabName: "Charts",
        tabIcon: <RiPieChart2Line />,
        tabDropdownList: [
          {
            id: "apex",
            tabName: "Apexcharts",
            tabDropdownList: [
              {
                id: "charts-apex-line",
                tabName: "Line",
                pathName: "/charts-apex-line",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-area",
                tabName: "Area",
                pathName: "/charts-apex-area",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-column",
                tabName: "Column",
                pathName: "/charts-apex-column",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-bar",
                tabName: "Bar",
                pathName: "/charts-apex-bar",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-mixed",
                tabName: "Mixed",
                pathName: "/charts-apex-mixed",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-timeline",
                tabName: "Timeline",
                pathName: "/charts-apex-timeline",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-range-area",
                tabName: "Range Area",
                pathName: "/charts-apex-range-area",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-funnel",
                tabName: "Funnel",
                pathName: "/charts-apex-funnel",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-candlestick",
                tabName: "Candlestick",
                pathName: "/charts-apex-candlestick",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-boxplot",
                tabName: "Boxplot",
                pathName: "/charts-apex-boxplot",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-bubble",
                tabName: "Bubble",
                pathName: "/charts-apex-bubble",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-scatter",
                tabName: "Scatter",
                pathName: "/charts-apex-scatter",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-heatmap",
                tabName: "Heatmap",
                pathName: "/charts-apex-heatmap",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-treemap",
                tabName: "Treemap",
                pathName: "/charts-apex-treemap",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-pie",
                tabName: "Pie",
                pathName: "/charts-apex-pie",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-radialbar",
                tabName: "Radialbar",
                pathName: "/charts-apex-radialbar",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-radar",
                tabName: "Radar",
                pathName: "/charts-apex-radar",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-polar",
                tabName: "Polar",
                pathName: "/charts-apex-polar",
                tabDropdownList: [],
              },
              {
                id: "charts-apex-slope",
                tabName: "Slope",
                pathName: "/charts-apex-slope",
                tabDropdownList: [],
              },
            ],
          },
          {
            id: "charts-chartjs",
            tabName: "Chartjs",
            pathName: "/charts-chartjs",
            tabDropdownList: [],
          },
          {
            id: "charts-echarts",
            tabName: "Echarts",
            pathName: "/charts-echarts",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Icons",
        tabName: "Icons",
        tabIcon: <RiCompasses2Fill />,
        tabDropdownList: [
          {
            id: "icons-remix",
            tabName: "Remix",
            pathName: "/icons-remix",
            tabDropdownList: [],
          },
          {
            id: "icons-boxicons",
            tabName: "Boxicons",
            pathName: "/icons-boxicons",
            tabDropdownList: [],
          },
          {
            id: "icons-materialdesign",
            tabName: "Material Design",
            pathName: "/icons-materialdesign",
            tabDropdownList: [],
          },
          {
            id: "icons-lineawesome",
            tabName: "Line Awesome",
            pathName: "/icons-lineawesome",
            tabDropdownList: [],
          },
          {
            id: "icons-feather",
            tabName: "Feather",
            pathName: "/icons-feather",
            tabDropdownList: [],
          },
          {
            id: "icons-crypto",
            tabName: "Crypto SVG",
            pathName: "/icons-crypto",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Maps",
        tabName: "Maps",
        tabIcon: <FiMapPin />,
        tabDropdownList: [
          {
            id: "maps-google",
            tabName: "Google",
            pathName: "/maps-google",
            tabDropdownList: [],
          },
        ],
      },
      {
        id: "Level",
        tabName: "Multi Level",
        tabIcon: <RiShareLine />,
        tabDropdownList: [
          {
            id: "level-1.1",
            tabName: "Level 1.1",
            pathName: "/dashboard",
            tabDropdownList: [],
          },
          {
            id: "level-2",
            tabName: "Level 1.2",
            tabDropdownList: [
              {
                id: "level-2.1",
                tabName: "Level 2.1",
                pathName: "/dashboard",
                tabDropdownList: [],
              },
              {
                id: "level-3",
                tabName: "Level 2.2",
                tabDropdownList: [
                  {
                    id: "level-3.1",
                    tabName: "Level 3.1",
                    pathName: "/dashboard",
                    tabDropdownList: [],
                  },
                  {
                    id: "level-3.2",
                    tabName: "Level 3.2",
                    pathName: "/dashboard",
                    tabDropdownList: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default leftSidebarData;
