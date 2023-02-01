import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Style from "./signup.module.scss";
import { Col, Row, Container, FloatingLabel } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { BsCheck } from "react-icons/bs";
import { createUser, postContent } from "lib/pages";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

const Signup = () => {
  const [message, setMessage] = useState();
  const attachmentRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nonce, setNonce] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    postContent("create_nonce", "").then((response) => {
      setNonce(response);
    });
  }, []);

  const handleEmail = () => {
    formik.setFieldTouched("email", true);
  };
  const handlePhone = (status, phoneNumber) => {
    if (/^\d+$/.test(phoneNumber) || phoneNumber == "") {
      formik.setFieldValue("phone", phoneNumber);
      formik.setFieldTouched("phone", true);
    }
  };
  const phoneRegExp = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

  let signUpVal = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
        "Name length min 6 and max 18  "
      )
      .required("*Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Please enter a valid phone number")
      .required("Please enter your phone number")
      .min(7, "Please enter a valid phone number")
      .max(14, "Please enter a valid phone number"),
    email: Yup.string().email("invalid email address").required("*Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    avatar: Yup.string().required("Please upload an avatar"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      avatar: "",
      check: "",
    },

    validationSchema: signUpVal,

    onSubmit: (values, { resetForm }) => {
      console.log(values,"values")
      setLoading(true);
      try {
        let obj = {
          signUp_name: values.name,
          signUp_phone: values.phone,
          signUp_email: values.email,
          signUp_password: values.password,
          signUp_avatar: values.avatar,
          signUp_newsletter: values.check == true ? "1" : "0",
          key: nonce.key,
          my_nonce: nonce.nonce,
        };

        createUser("form-submit", obj).then((response) => {
          if (response?.status == true) submitForm(resetForm);
        });
      } catch (error) {
        setMessage("Something went wrong");
      }
    },
  });

  const submitForm = (resetForm) => {
    resetForm();
    setLoading(false);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <Container>
      <Row className={` ${Style.rowContainer} d-flex justify-content-center `}>
        <Col sm="auto">
          <Form action="" onSubmit={formik.handleSubmit}>
            <Row className={Style.container}>
              <Col>
                <h2 className={Style.title}>Create Account</h2>
                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Name</Form.Label>
                  <Form.Control
                    id="name"
                    placeholder="Name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={Style.error}>{formik.errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Mobile</Form.Label>
                  <IntlTelInput
                    numberType=""
                    separateDialCode
                    placeholder="Phone Number"
                    containerClassName="intl-tel-input w-100"
                    inputClassName="form-control"
                    preferredCountries={["in"]}
                    onPhoneNumberChange={handlePhone}
                    value={formik.values.phone}
                    onPhoneNumberBlur={(e) =>
                      formik.setFieldTouched("phone", true)
                    }
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className={Style.error}>{formik.errors.mobile}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Email</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    {...formik.getFieldProps("email")}
                    onClick={() => handleEmail()}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className={Style.error}>{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Password</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className={Style.error}>{formik.errors.password}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Upload Avatar</Form.Label>
                  <FloatingLabel className="">
                    <span
                      className={`position-absolute bottom-0 end-0 fs-14  text-black-50`}
                    >
                      ( .img, .png, .pdf, max size 2mb )
                    </span>
                    <Form.Control
                      type="file"
                      id="avatar"
                      ref={attachmentRef}
                      placeholder="Upload Avatar"
                      onChange={(e) =>
                        formik.setFieldValue("avatar", e?.target?.files[0])
                      }
                    />
                  </FloatingLabel>
                  {formik.touched.avatar && formik.errors.avatar ? (
                    <div className={Style.error}>{formik.errors.avatar}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className={`m-3`} >
                  <Form.Check
                    type="checkbox"
                    id="check"
                    checked={formik.values.check}
                    {...formik.getFieldProps("check")}
                    label={`Sign me up for the newsletter`}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Link href="/login" className={Style.links}>
                  {" "}
                  Go to Login page?
                </Link>
              </Col>
            </Row>

            <Row className={`${Style.buttonContainer} `}>
              <Col>
                <button
                  type="submit"
                  className={`rounded-pill ${Style.formButton} w-100 `}
                  onClick={formik.handleSubmit}
                >
                  {loading ? (
                    <i
                      className="spinner-border spinner-border-sm me-3"
                      role="status"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    ""
                  )}
                  <span>Submit</span>
                </button>
              </Col>
            </Row>
            {formSubmitted ? (
              <div className="d-flex align-items-center pt-4">
                <span
                  className={`border rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center`}
                >
                  <BsCheck size={20} color="#03b737" />
                </span>
                {formSubmitted && (
                  <p className="mb-0 ps-3 fs-6">"Successfully submitted"</p>
                )}
              </div>
            ) : (
              ""
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
