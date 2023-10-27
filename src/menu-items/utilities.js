// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from "@tabler/icons";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "series",
      title: "Series",
      type: "item",
      url: "/utils/series",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "standard",
      title: "Standard",
      type: "item",
      url: "/utils/standard",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "subject",
      title: "Subject",
      type: "item",
      url: "/utils/subject",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "lesson",
      title: "Lesson",
      type: "item",
      url: "/utils/lesson",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "school",
      title: "School",
      type: "item",
      url: "/utils/school",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
    {
      id: "student",
      title: "Student",
      type: "item",
      url: "/utils/student",
      icon: icons.IconWindmill,
      breadcrumbs: false,
    },
    // {
    //   id: "icons",
    //   title: "Icons",
    //   type: "collapse",
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: "tabler-icons",
    //       title: "Tabler Icons",
    //       type: "item",
    //       url: "/icons/tabler-icons",
    //       breadcrumbs: false,
    //     },
    //     {
    //       id: "material-icons",
    //       title: "Material Icons",
    //       type: "item",
    //       url: "/icons/material-icons",
    //       breadcrumbs: false,
    //     },
    //   ],
    // },
  ],
};

export const adminUtilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "series",
      title: "Series",
      type: "item",
      url: "/utils/series",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "standard",
      title: "Standard",
      type: "item",
      url: "/utils/standard",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "subject",
      title: "Subject",
      type: "item",
      url: "/utils/subject",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "lesson",
      title: "Lesson",
      type: "item",
      url: "/utils/lesson",
      icon: icons.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "school",
      title: "School",
      type: "item",
      url: "/utils/school",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export const schoolUtilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "student",
      title: "Student",
      type: "item",
      url: "/utils/student",
      icon: icons.IconWindmill,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
