import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef, useState } from "react";

const GoogleRecaptcha = ({ onChange, captchaReset }) => {
  const siteKey = "6LdqryYkAAAAAFo2U-8oTvMnpWgDcYJgGdlmMIUn";

  const captcharef = useRef(null);

  useEffect(() => {
    if (captchaReset) {
      captcharef.current.reset();
    }
  }, [captchaReset]);

  return (
    <>
      <ReCAPTCHA
        ref={captcharef}
        sitekey={siteKey}
        theme={"light"}
        onChange={onChange}
      />

      {/* <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        <GoogleReCaptcha onVerify={onVerify} />
      </GoogleReCaptchaProvider> */}
    </>
  );
};

export default GoogleRecaptcha;
