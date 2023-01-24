import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { useFormik } from "formik";
import Style from "./login.module.scss";
import { getUser } from "lib/pages";
import { BsCheck } from "react-icons/bs";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserDetails } from "@/Store/authslice";

const Login = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);

  console.log(isLoggedIn,"status")
  const [message, setMessage] = useState();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  let signinVal = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: signinVal,

    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      try {
        let obj = {
          signIn_email: values.email,
          signIn_password: values.password,
        };

        getUser("form-submit", obj).then((response) => {
          if (response?.data.length !== 0) submitForm(resetForm, response.data);
        });
      } catch (error) {
        setMessage("Something went wrong");
      }
    },
  });

  const submitForm = (resetForm, userData) => {
    resetForm();
    setLoading(false);
    setFormSubmitted(true);

    userData?.map((user) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.signUp_name, email: user.signUp_email })
      );
    });
    dispatch(setIsLoggedIn());

    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  {
    if (isLoggedIn) {
      router.push("/");
    } else
      return (
        <Container>
          <Row
            className={` ${Style.rowContainer} d-flex justify-content-center `}
          >
            <Col sm="auto">
              <Row>
                <Col>
                  <h2 className="text-center m-4">Login</h2>
                </Col>
              </Row>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className={Style.label}>Email address</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  {formik.errors.email && formik.touched.email ? (
                    <div className={Style.error}>{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={Style.label}>Password</Form.Label>
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className={Style.error}>{formik.errors.password}</div>
                  ) : null}
                </Form.Group>

                <Row>
                  <Col className="pt-2" lg={12}>
                    <Link href="register" className={Style.links}>
                      {" "}
                      Create an Account?
                    </Link>

                    <Link href="mobilelogin" className={Style.links}>
                      {" "}
                      Mobile Login?
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
                      <p className="mb-0 ps-3 fs-6">"Successfully logged in"</p>
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
  }
};

export default Login;
