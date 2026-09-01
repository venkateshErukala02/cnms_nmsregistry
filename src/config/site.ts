export type SiteConfig = typeof siteConfig;
export const getSiteURL = (path: string) =>  path.startsWith("/") ? path : `/${path}`;

export const siteConfig = {
  name: "CNMS",
  description: "Network Management System for Multiple networks.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
   sidebarItems: [
    {
      label: 'Dashboard',
      href: getSiteURL('/dashboard'),
      // icon: Tachometer,
    },
     {
      label: 'Dashboard',
      href: getSiteURL('/cnmsdashboard'),
      // icon: Tachometer,
    },
    {
      label: 'Discovery',
      href: getSiteURL('/discovery'),
      // icon: Discovery,
    },
    {
      label: 'Topology',
      href: getSiteURL('/topology'),
      // icon: Topology,
    },
    {
      label: 'Events',
      href: getSiteURL('/events'),
      // icon: Events,
    },
    {
      label: 'Reports',
      href: getSiteURL('/invetory/reports'),
      // icon: Reports,
    },
    {
      label: 'Settings',
      href: getSiteURL('/settings/lines'),
      startsWith: '/metronms/settings',
      // icon: Settings,
    },
  ],
};
