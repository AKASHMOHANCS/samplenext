import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Style from "./signup.module.scss";
import { Col, Row, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { BsCheck } from "react-icons/bs";
import { createUser } from "lib/pages";

const Signup = () => {
  const [message, setMessage] = useState();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  let signUpVal = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
        "Name length min 6 and max 18  "
      )
      .required("*Required"),
    mobile: Yup.string()
      // .matches(/^([+]\d{2}[ ])?\d{13}$/, "mobile number should be 10 digit")
      .required("*Required"),
    email: Yup.string().email("invalid email address").required("*Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
    },

    validationSchema: signUpVal,

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      try {
        let obj = {
          signUp_name: values.name,
          signUp_mobile: values.mobile,
          signUp_email: values.email,
          signUp_password: values.password,
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
          <Form onSubmit={formik.handleSubmit}>
            <Row className={Style.container}>
              <Col>
                <h2 className={Style.title}>Create Account</h2>
                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Name</Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={Style.error}>{formik.errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Mobile</Form.Label>
                  <Form.Control
                    id="mobile"
                    name="mobile"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
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
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
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
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className={Style.error}>{formik.errors.password}</div>
                  ) : null}
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
                  className={`border rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center ${Style.success_icon}`}
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
