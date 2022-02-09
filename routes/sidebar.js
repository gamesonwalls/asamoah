/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app", // the url
    icon: "ViewGridIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/vendor",
    icon: "UsersIcon",
    name: "Become Vendor",
  },

  {
    icon: "ClipboardCheckIcon",
    name: "Order History",
    routes: [
      // submenu
      {
        path: "/app/banklogs",
        icon: "LibraryIcon",
        name: "Bank",
      },
      {
        path: "/app/cards",
        icon: "CreditCardIcon",
        name: "Card",
      },
      {
        path: "/app/cardlogs",
        icon: "CreditCardIcon",
        name: "Card with Pin",
      },
    ],
  },

  {
    path: "/app/modals",
    icon: "ModalsIcon",
    name: "Manage Bid",
  },

  {
    icon: "PagesIcon",
    name: "Products",
    routes: [
      // submenu
      {
        path: "/app/banklogs",
        icon: "LibraryIcon",
        name: "Bank Logs",
      },
      {
        path: "/app/cards",
        icon: "CreditCardIcon",
        name: "Card",
      },
      {
        path: "/app/cardlogs",
        icon: "CreditCardIcon",
        name: "Card with Pin",
      },
    ],
  },
];

export default routes;
