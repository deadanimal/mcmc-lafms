export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-home text-default",
  },

  {
    path: "/admin/license",
    title: "License Management",
    type: "link",
    icontype: "fas fa-file-alt text-default",
  },
  {
    path: "/admin/rollout",
    title: "Rollout Management",
    type: "sub",
    icontype: "fas fa-receipt text-default",
    collapse: "rol",
    isCollapsed: true,
    children: [
      { path: "blocking-issues", title: "Blocking Issues", type: "link" },
      { path: "project-management", title: "Project Management", type: "link" },
      {
        path: "punchlist-management",
        title: "Punchlist Management",
        type: "link",
      },
      {
        path: "trouble-ticket-management",
        title: "Trouble Ticket Management",
        type: "link",
      },
    ],
  },

  {
    path: "/admin/revenue",
    title: "Revenue Management",
    type: "link",
    icontype: "fas fa-sliders-h text-default",
  },

  // {
  //   path: "/admin/organisations",
  //   title: "Organisations",
  //   type: "link",
  //   icontype: "fas fa-cogs text-default",
  // },

  {
    path: "/admin/audit-trail",
    title: "Audit Trail",
    type: "link",
    icontype: "fas fa-align-justify text-default",
  },

  {
    path: "/admin/report",
    title: "Report",
    type: "link",
    icontype: "fas fas fa-atlas text-default",
  },

  {
    path: "/admin/users",
    title: "Users",
    type: "link",
    icontype: "fas fa-address-book text-default",
  },

  // {
  //   path: "/admin/social-media",
  //   title: "Social Media",
  //   type: "link",
  //   icontype: "fas fa-address-book text-indigo",
  // },
];

export const ROUTESRMD: RouteInfo[] = [
  {
    path: "/rmd/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-home text-default",
  },

  {
    path: "/rmd/license",
    title: "License Management",
    type: "link",
    icontype: "fas fa-file-alt text-default",
  },
  {
    path: "/rmd/rollout",
    title: "Rollout Management",
    type: "sub",
    icontype: "fas fa-receipt text-default",
    collapse: "rol",
    isCollapsed: true,
    children: [
      { path: "blocking-issues", title: "Blocking Issues", type: "link" },
      { path: "project-management", title: "Project Management", type: "link" },
      {
        path: "punchlist-management",
        title: "Punchlist Management",
        type: "link",
      },
      {
        path: "trouble-ticket-management",
        title: "Trouble Ticket Management",
        type: "link",
      },
    ],
  },

  {
    path: "/rmd/revenue",
    title: "Revenue Management",
    type: "link",
    icontype: "fas fa-sliders-h text-default",
  },

  // {
  //   path: "/rmd/organisations",
  //   title: "Organisations",
  //   type: "link",
  //   icontype: "fas fa-cogs text-default",
  // },

  {
    path: "/rmd/audit-trail",
    title: "Audit Trail",
    type: "link",
    icontype: "fas fa-align-justify text-default",
  },

  {
    path: "/rmd/report",
    title: "Report",
    type: "link",
    icontype: "fas fas fa-atlas text-default",
  },

  {
    path: "/rmd/users",
    title: "Users",
    type: "link",
    icontype: "fas fa-address-book text-default",
  },

  // {
  //   path: "/rmd/social-media",
  //   title: "Social Media",
  //   type: "link",
  //   icontype: "fas fa-address-book text-indigo",
  // },
];

export const ROUTESRAD: RouteInfo[] = [
  {
    path: "/rad/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-home text-default",
  },

  {
    path: "/rad/license",
    title: "License Management",
    type: "link",
    icontype: "fas fa-file-alt text-default",
  },
  {
    path: "/rad/rollout",
    title: "Rollout Management",
    type: "sub",
    icontype: "fas fa-receipt text-default",
    collapse: "rol",
    isCollapsed: true,
    children: [
      { path: "blocking-issues", title: "Blocking Issues", type: "link" },
      { path: "project-management", title: "Project Management", type: "link" },
      {
        path: "punchlist-management",
        title: "Punchlist Management",
        type: "link",
      },
      {
        path: "trouble-ticket-management",
        title: "Trouble Ticket Management",
        type: "link",
      },
    ],
  },

  {
    path: "/rad/revenue",
    title: "Revenue Management",
    type: "link",
    icontype: "fas fa-sliders-h text-default",
  },

  // {
  //   path: "/rad/organisations",
  //   title: "Organisations",
  //   type: "link",
  //   icontype: "fas fa-cogs text-default",
  // },

  {
    path: "/rad/audit-trail",
    title: "Audit Trail",
    type: "link",
    icontype: "fas fa-align-justify text-default",
  },

  {
    path: "/rad/report",
    title: "Report",
    type: "link",
    icontype: "fas fas fa-atlas text-default",
  },

  {
    path: "/rad/users",
    title: "Users",
    type: "link",
    icontype: "fas fa-address-book text-default",
  },

  // {
  //   path: "/rad/social-media",
  //   title: "Social Media",
  //   type: "link",
  //   icontype: "fas fa-address-book text-indigo",
  // },
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-home text-default",
  },
  {
    path: "/user/license",
    title: "Licenses",
    type: "link",
    icontype: "fas fa-tasks text-default",
  },

  // {
  //   path: "/user/msc-certification",
  //   title: "MSC Certification",
  //   type: "sub",
  //   icontype: "fas fa-tasks text-red",
  //   collapse: "msc2",
  //   isCollapsed: true,
  //   children: [
  //     { path: "application-form", title: "Application Form", type: "link" },
  //   ],
  // },

  ,
];
