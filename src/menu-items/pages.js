// assets
import { IconKey } from "@tabler/icons";

// constant
const icons = {
  IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "learning",
  title: "Learning",
  type: "group",
  children: [
    {
      id: "onlineclasses",
      title: "Online Classes",
      type: "item",
      url: "/learn/onlineclasses",
      icon: icons.IconKey,
      breadcrumbs: false,
    },
    {
      id: "animatedclasses",
      title: "Animated Classes",
      type: "item",
      url: "/learn/animatedclasses",
      icon: icons.IconKey,
      breadcrumbs: false,
    },
    // {
    //     id: "authentication",
    //     title: "Authentication",
    //     type: "collapse",
    //     icon: icons.IconKey,

    //     children: [
    //         {
    //             id: "login3",
    //             title: "Login",
    //             type: "item",
    //             url: "/pages/login/login3",
    //             target: true
    //         },
    //         {
    //             id: "register3",
    //             title: "Register",
    //             type: "item",
    //             url: "/pages/register/register3",
    //             target: true
    //         }
    //     ]
    // }
  ],
};

export default pages;