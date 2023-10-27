import dashboard from "./dashboard";
import pages from "./pages";
import utilities, { adminUtilities, schoolUtilities } from "./utilities";
import other from "./other";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, pages, other, adminUtilities],
  schoolItems: [pages, schoolUtilities],
  studentItems: [pages],
};

export default menuItems;
