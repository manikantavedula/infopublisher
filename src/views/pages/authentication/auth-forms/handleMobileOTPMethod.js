export const handleMobileOTPMethod = (handleInitialValues, values, handleLoading, handleIsOTP) => {
  handleInitialValues(values);
  console.log("handle login OTP values", values);
  handleLoading(true);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://2factor.in/API/V1/e6d1f0ea-fa33-11ed-addf-0200cd936042/SMS/+91${values.mobileNumber}/AUTOGEN2/INFOPBS`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .then((results) => {
      console.log(results);

      if (results["Status"] === "Success") {
        handleLoading(false);
        handleIsOTP(true);
        console.warn("Success True");
      } else {
        console.error("login failed");
        handleLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};
