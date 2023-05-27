// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import { useSelector } from "react-redux";
import { commonActions } from "slices/common";
import { useEffect } from "react";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const user = useSelector((state) => state.common.role);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const navItems =
    user.role === "none" || user.role === "admin"
      ? menuItem.items.map((item) => {
          switch (item.type) {
            case "group":
              return <NavGroup key={item.id} item={item} />;
            default:
              return (
                <Typography key={item.id} variant="h6" color="error" align="center">
                  Menu Items Error
                </Typography>
              );
          }
        })
      : user.role === "school"
      ? menuItem.schoolItems.map((item) => {
          switch (item.type) {
            case "group":
              return <NavGroup key={item.id} item={item} />;
            default:
              return (
                <Typography key={item.id} variant="h6" color="error" align="center">
                  Menu Items Error
                </Typography>
              );
          }
        })
      : null;

  return <>{navItems}</>;
};

export default MenuList;
