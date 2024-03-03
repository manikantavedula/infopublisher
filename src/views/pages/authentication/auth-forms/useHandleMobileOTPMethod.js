import { usePullOTPMutation } from "slices/get/OTPVerificationApi";

const useHandleMobileOTPMethod = (handleInitialValues, handleLoading, handleIsOTP) => {
  const [pullOTP] = usePullOTPMutation();

  const performPullOTP = (values) => {
    handleInitialValues(values);
    console.log("handle login OTP values", values);
    handleLoading(true);

    pullOTP(values.mobileNumber)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        if (data["Status"] === "Success") {
          handleLoading(false);
          handleIsOTP(true);
          console.warn("Success True");
        } else {
          console.error("login failed");
          handleLoading(false);
        }
      });

    // get below comment code here
  };

  return { performPullOTP };
};

export default useHandleMobileOTPMethod;

// var requestOptions = {
//   method: "GET",
//   redirect: "follow",
// };

// fetch(
//   `https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/+91${values.mobileNumber}/AUTOGEN2/INFOPBS`,
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => JSON.parse(result))
//   .then((results) => {
//     console.log(results);

//     if (results["Status"] === "Success") {
//       handleLoading(false);
//       handleIsOTP(true);
//       console.warn("Success True");
//     } else {
//       console.error("login failed");
//       handleLoading(false);
//     }
//   })
//   .catch((error) => console.log("error", error));
