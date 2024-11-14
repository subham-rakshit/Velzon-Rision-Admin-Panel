import {
  RiDashboard2Fill,
  RiApps2Line,
  RiPagesLine,
  RiRocketLine,
} from "react-icons/ri";

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
            pathName: "",
            tabDropdownList: [
              {
                id: "apps-calendar",
                tabName: "Main Calendar",
                pathName: "/apps-calendar",
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
                id: "apps-mailbox",
                tabName: "Mailbox",
                pathName: "/apps-mailbox",
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
            id: "ecommerce",
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
          // TODO Need to create pages from here
          {
            id: "projects",
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
        ],
      },
    ],
  },
];

export default leftSidebarData;
