import { commonActions } from "slices/common";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useCheckOTPMutation } from "slices/get/OTPVerificationApi";
import { useSuccessOTPMutation } from "slices/get/OTPVerificationApi";

export const encryptObject = (object, secretKey) => {
  // Encrypt the object using AES
  const plaintext = JSON.stringify(object);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  return ciphertext;
};

const useHandleMobileOTPVerificationMethod = (handleLoading, dispatch, secretKey, navigate) => {
  const [checkOTP] = useCheckOTPMutation();
  const [successOTP] = useSuccessOTPMutation();

  const performCheckOTP = (values) => {
    console.log(values);
    console.log("handle login OTP values", values);
    handleLoading(true);

    checkOTP(`${values.mobileNumber}/${values.otp}`)
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .then(async (data) => {
        let response1;

        if (data["Status"] === "Success") {
          response1 = data;
          dispatch(commonActions.getUserRole());

          successOTP(values)
            .then((response) => {
              console.log(response);

              return response.data;
            })
            .then(async (data) => {
              let encryptedData;

              if (data["role"] === "admin" || data["role"] === "school") {
                encryptedData = await encryptObject(
                  { ...data["data"][0], role: data["role"] },
                  secretKey
                );
              } else if (data["role"] === "student") {
                const mergedObject = data["data"].reduce((result, item) => {
                  const keys = Object.keys(item);
                  keys.forEach((key) => {
                    if (!result[key]) {
                      result[key] = new Set();
                    }
                    result[key].add(item[key]);
                  });
                  return result;
                }, {});

                Object.keys(mergedObject).forEach((key) => {
                  mergedObject[key] = Array.from(mergedObject[key]);
                });

                console.log(mergedObject);

                encryptedData = await encryptObject(
                  { ...mergedObject, role: data["role"] },
                  secretKey
                );
              }

              await localStorage.setItem("role", data["role"]);
              await localStorage.setItem("access_role", data["role"]);
              await localStorage.setItem("access_role_data", encryptedData);
              await localStorage.setItem("key_for_access", secretKey);
              await dispatch(commonActions.setUserRole());

              if (data["role"] === "admin") {
                navigate("/dashboard/default");
              } else {
                navigate("/learn/onlineclasses");
              }

              handleLoading(false);
            });
        } else {
          console.error("login failed");
          handleLoading(false);
        }
      });
  };

  //use below comment code here

  return { performCheckOTP };
};

export default useHandleMobileOTPVerificationMethod;

// var requestOptions = {
//   method: "GET",
//   redirect: "follow",
// };

// let response1, success;

// fetch(
//   `https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/VERIFY3/+91${values.mobileNumber}/${values.otp}`,
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => JSON.parse(result))
//   .then(async (results) => {
//     console.log(results);

//     if (results["Status"] === "Success") {
//       success = true;
//       response1 = results;
//       dispatch(commonActions.getUserRole());

//       if (success === true) {
//         try {
//           const response = await axios.post(
//             `${process.env.REACT_APP_API_URL}/common/api/getLoginRole`,
//             {
//               ...values,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "https://app.infopublisher.in",
//                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//                 "Access-Control-Allow-Headers":
//                   "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
//                 "Access-Control-Allow-Credentials": "true",
//               },
//             }
//           );
//           console.log(response.data);

//           console.log(response1, values);

//           let encryptedData;

//           if (response.data["role"] === "admin" || response.data["role"] === "school") {
//             encryptedData = await encryptObject(
//               { ...response.data["data"][0], role: response.data["role"] },
//               secretKey
//             );
//           } else if (response.data["role"] === "student") {
//             const mergedObject = response.data["data"].reduce((result, item) => {
//               const keys = Object.keys(item);
//               keys.forEach((key) => {
//                 if (!result[key]) {
//                   result[key] = new Set();
//                 }
//                 result[key].add(item[key]);
//               });
//               return result;
//             }, {});

//             // Convert sets back to arrays in the mergedObject
//             Object.keys(mergedObject).forEach((key) => {
//               mergedObject[key] = Array.from(mergedObject[key]);
//             });

//             console.log(mergedObject);

//             encryptedData = await encryptObject(
//               { ...mergedObject, role: response.data["role"] },
//               secretKey
//             );
//           }

//           await localStorage.setItem("role", response.data["role"]);
//           await localStorage.setItem("access_role", response.data["role"]);
//           await localStorage.setItem("access_role_data", encryptedData);
//           await localStorage.setItem("key_for_access", secretKey);
//           await dispatch(commonActions.setUserRole());

//           if (response.data["role"] === "admin") {
//             navigate("/dashboard/default");
//           } else {
//             navigate("/learn/onlineclasses");
//           }

//           handleLoading(false);
//         } catch (error) {
//           handleLoading(false);
//           console.error(error);
//         }
//       }
//     } else {
//       console.error("login failed");
//       success = false;
//       handleLoading(false);
//     }
//   })
//   .catch((error) => console.log("error", error));
