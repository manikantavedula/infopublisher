// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import { useSelector } from "react-redux";
import { commonActions } from "slices/common";
import { useEffect } from "react";

import CryptoJS from "crypto-js";

// ==============================|| SIDEBAR MENU LIST ||============================== //

function encryptObject(object, secretKey) {
  // Encrypt the object using AES
  const plaintext = JSON.stringify(object);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  return ciphertext;
}

function decryptObject(ciphertext, secretKey) {
  // Decrypt the object using AES
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
}

const MenuList = () => {
  const user = useSelector((state) => state.common.role);
  const key = localStorage.getItem("key_for_access");
  const login_role_data = localStorage.getItem("access_role_data");
  const decryptedObject = decryptObject(login_role_data, key);
  const login_role = decryptedObject.role;

  useEffect(() => {
    console.log(user);
  }, [user]);

  const navItems =
    login_role === "none" || login_role === "admin"
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
      : login_role === "school"
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
      : login_role === "student"
      ? menuItem.studentItems.map((item) => {
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
