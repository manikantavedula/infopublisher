import React, { useRef, useState, useEffect } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "rive-react";
import "./LoginFormComponent.css";
import Teddy from "./login-teddy.riv";

const STATE_MACHINE_NAME = "Login Machine";
const LOGIN_PASSWORD = "teddy";
const LOGIN_TEXT = "Login";

function LoginFormComponent(riveProps) {
  const { rive: riveInstance, RiveComponent } = useRive({
    src: Teddy,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    ...riveProps,
  });
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [loginButtonText, setLoginButtonText] = useState(LOGIN_TEXT);
  const inputRef = useRef(null);

  const isCheckingInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, "isChecking");
  const numLookInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, "numLook");
  const trigSuccessInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, "trigSuccess");
  const trigFailInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, "trigFail");
  const isHandsUpInput = useStateMachineInput(riveInstance, STATE_MACHINE_NAME, "isHandsUp");

  // Divide the input width by the max value the state machine looks for in numLook.
  // This gets us a multiplier we can apply for each character typed in the input
  // to help Teddy track progress along the input line
  useEffect(() => {
    if (inputRef?.current && !inputLookMultiplier) {
      setInputLookMultiplier(inputRef.current.offsetWidth / 100);
    }
  }, [inputRef]);

  // As the user types in the username box, update the numLook value to let Teddy know
  // where to look to according to the state machine
  const onUsernameChange = (e) => {
    const newVal = e.target.value;
    setUserValue(newVal);
    if (!isCheckingInput && isCheckingInput?.value) {
      isCheckingInput.value = true;
    }
    const numChars = newVal.length;
    numLookInput.value = numChars * inputLookMultiplier;
  };

  // Start Teddy looking in the correct spot along the username input
  const onUsernameFocus = () => {
    isCheckingInput.value = true;
    if (numLookInput.value !== userValue.length * inputLookMultiplier) {
      numLookInput.value = userValue.length * inputLookMultiplier;
    }
  };

  // When submitting, simulate password validation checking and trigger the appropriate input from the
  // state machine
  const onSubmit = (e) => {
    setLoginButtonText("Checking...");
    setTimeout(() => {
      setLoginButtonText(LOGIN_TEXT);
      if (passValue === LOGIN_PASSWORD) trigSuccessInput.fire();
      else trigFailInput.fire();
    }, 1500);
    e.preventDefault();
    return false;
  };

  return (
    <div className="login-form-component-root">
      <div className="login-form-wrapper">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit} autoComplete="off">
            <input
              type="text"
              className="form-username"
              name="username"
              placeholder="Username"
              onFocus={onUsernameFocus}
              value={userValue}
              onChange={onUsernameChange}
              onBlur={() => {
                isCheckingInput.value = false;
              }}
              ref={inputRef}
              autoComplete="off"
            />
            <input
              type="password"
              className="form-pass"
              name="password"
              placeholder="Password (shh.. it's 'teddy')"
              value={passValue}
              onFocus={() => {
                isHandsUpInput.value = true;
              }}
              onBlur={() => {
                isHandsUpInput.value = false;
              }}
              onChange={(e) => setPassValue(e.target.value)}
              autoComplete="new-password"
            />
            <button type="submit" className="login-btn">
              {loginButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormComponent;
