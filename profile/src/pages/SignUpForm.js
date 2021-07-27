import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referal, setReferal] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitt, setSubmitt] = useState(false);
  const [otp, setOTP] = useState("");
  const [isMatching, setIsMatching] = useState(true);

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSecondPassword(e) {
    if (e.target.value !== password) {
      setIsMatching(false);
      return;
    } else {
      setIsMatching(true);
    }
  }
  function handleReferal(e) {
    setReferal(e.target.value);
  }
  function handleAgreed(e) {
    setAgreed(e.target.value);
  }

  function handleOTP(e) {
    setOTP(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitt(true);
    const obj = {
      fName: firstName,
      lName: lastName,
      emailId: email,
      phoneNo: phone,
      pass: password,
      ref: referal,
      agree: agreed,
    };
    //console.log(obj);

    await fetch("api/auth/email", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function otpClickHandler() {
    const objec = {
      firstName: firstName,
      lastName: lastName,
      emailId: email,
      phoneNo: phone,
      password: password,
      referralId: referal,
      agree: agreed,
      oTp: otp,
    };
    // console.log(objec);

    await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify(objec),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="FormCenter">
      <form className="FormFields">
        {!submitt && (
          <>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="FormField__Input"
                placeholder="Enter your first name"
                name="firstname"
                value={firstName}
                onChange={handleFirstName}
                required={true}
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="FormField__Input"
                placeholder="Enter your last name"
                name="lastname"
                value={lastName}
                onChange={handleLastName}
                required={true}
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleEmail}
                required={true}
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="phone"
                id="phone"
                className="FormField__Input"
                placeholder="Enter your phone number"
                name="phone"
                value={phone}
                onChange={handlePhone}
                required={true}
              />
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handlePassword}
                required={true}
              />
            </div>

            <div className="FormField">
              <label
                className="FormField__Label"
                htmlFor="password"
                style={{ color: !isMatching ? "red" : "white" }}
              >
                Re-enter Password
              </label>
              <input
                style={{
                  borderColor: !isMatching ? "red" : "white",
                  background: !isMatching ? "salmon" : "white",
                }}
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password again"
                name="password"
                onChange={handleSecondPassword}
                required={true}
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="code">
                Referal Code (Optional)
              </label>
              <input
                type="phone"
                id="referal"
                className="FormField__Input"
                placeholder="Enter Referal Code"
                name="referal"
                value={referal}
                onChange={handleReferal}
              />
            </div>

            <div className="FormField">
              <label className="FormField__CheckboxLabel">
                <input
                  className="FormField__Checkbox"
                  type="checkbox"
                  name="hasAgreed"
                  value={agreed}
                  onChange={handleAgreed}
                  required="required"
                />{" "}
                I agree all statements in{" "}
                <a href="" className="FormField__TermsLink">
                  terms of service
                </a>
              </label>
            </div>

            <div className="FormField">
              <button
                className="FormField__Button mr-20"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
        {submitt && (
          <>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="code">
                Enter the OTP
              </label>
              <input
                type="phone"
                id="otp"
                className="FormField__Input"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={handleOTP}
                required={true}
              />
            </div>
            <div className="FormField">
              <button
                className="FormField__Button mr-20"
                onClick={otpClickHandler}
              >
                Verify
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;
