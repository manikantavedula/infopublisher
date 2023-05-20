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

const pages = {
  id: "assessments",
  title: "Assessments",
  type: "group",
  children: [
    {
      id: "exam",
      title: "Exam",
      type: "item",
      url: "/assess/exam",
      icon: icons.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "test",
      title: "Test",
      type: "item",
      url: "/assess/test",
      icon: icons.IconPalette,
      breadcrumbs: false,
    },
  ],
};

export default pages;
