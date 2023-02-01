import React, { use, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Style from "./signup.module.scss";
import { Col, Row, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { BsCheck } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { postContent, updateUser } from "lib/pages";

const UpdateForm = ({ user, setUpdate }) => {
  const [message, setMessage] = useState();
  const [isEdit, setIsEdit] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nonce, setNonce] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    postContent("create_nonce", "").then((response) => {
      setNonce(response);
    });
  }, []);

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
          key: nonce.key,
          my_nonce: nonce.nonce,
        };

        updateUser("form-submit", obj, user.id).then((response) => {
          if (response?.status == true) submitForm(resetForm);
        });
      } catch (error) {
        setMessage("Something went wrong");
      }
    },
  });

  const submitForm = (resetForm) => {
    setLoading(false);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  const handleEdit = (value, field) => {
    if (field === "name") {
      setIsEdit({ ...isEdit, name: value });
    }
    if (field === "mobile") {
      setIsEdit({ ...isEdit, mobile: value });
    }
    if (field === "email") {
      setIsEdit({ ...isEdit, email: value });
    }
    if (field === "password") {
      setIsEdit({ ...isEdit, password: value });
    }
  };

  const handleUpdateCancel = () => {
    setUpdate(false);
  };

  const handleClose = (value, field) => {
    if (field === "name") {
      setIsEdit({ ...isEdit, name: "" });
    }
    if (field === "mobile") {
      setIsEdit({ ...isEdit, mobile: "" });
    }
    if (field === "email") {
      setIsEdit({ ...isEdit, email: "" });
    }
    if (field === "password") {
      setIsEdit({ ...isEdit, password: "" });
    }
  };

  return (
    <Container>
      <Row className={` ${Style.rowContainer} d-flex justify-content-center `}>
        <h5
          onClick={() => handleUpdateCancel()}
          className="text-left text-black-75"
        >
          Go back
        </h5>
        <Col sm="auto">
          <Form onSubmit={formik.handleSubmit}>
            <Row className={Style.container}>
              <Col>
                <h2 className={Style.title}>Update Account</h2>
                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Name</Form.Label>
                  <div className="d-flex ">
                    <Form.Control
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        isEdit?.name === user.name
                          ? formik.values.name
                          : (formik.values.name = user.name)
                      }
                    />{" "}
                    {isEdit.name ? (
                      <AiOutlineClose
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleClose(user.name, "name")}
                      />
                    ) : (
                      <FiEdit
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleEdit(user.name, "name")}
                      />
                    )}
                  </div>

                  {formik.touched.name && formik.errors.name ? (
                    <div className={Style.error}>{formik.errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Mobile</Form.Label>
                  <div className="d-flex ">
                    <Form.Control
                      id="mobile"
                      name="mobile"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        isEdit?.mobile === user.mobile
                          ? formik.values.mobile
                          : (formik.values.mobile = user.mobile)
                      }
                    />
                    {isEdit.mobile ? (
                      <AiOutlineClose
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleClose(user.mobile, "mobile")}
                      />
                    ) : (
                      <FiEdit
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleEdit(user.mobile, "mobile")}
                      />
                    )}
                  </div>
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className={Style.error}>{formik.errors.mobile}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Email</Form.Label>
                  <div className="d-flex ">
                    <Form.Control
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        isEdit?.email === user.email
                          ? formik.values.email
                          : (formik.values.email = user.email)
                      }
                    />
                    {isEdit.email ? (
                      <AiOutlineClose
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleClose(user.email, "email")}
                      />
                    ) : (
                      <FiEdit
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleEdit(user.email, "email")}
                      />
                    )}
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className={Style.error}>{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className={Style.inputFiled}>
                  <Form.Label className={Style.label}>Password</Form.Label>
                  <div className="d-flex ">
                    <Form.Control
                      id="password"
                      name="password"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        isEdit?.password === user.password
                          ? formik.values.password
                          : (formik.values.password = user.password)
                      }
                    />
                    {isEdit.password ? (
                      <AiOutlineClose
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleClose(user.password, "password")}
                      />
                    ) : (
                      <FiEdit
                        className="ms-3 mt-2 "
                        size={20}
                        onClick={() => handleEdit(user.password, "password")}
                      />
                    )}
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className={Style.error}>{formik.errors.password}</div>
                  ) : null}
                </Form.Group>
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
                  <span>Update</span>
                </button>
              </Col>
            </Row>
            <Row className={`${Style.buttonContainer} `}>
              <Col>
                <button
                  type="submit"
                  className={`rounded-pill ${Style.formButton} w-100 `}
                  onClick={() => handleUpdateCancel()}
                >
                  <span>Cancel</span>
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
                  <p className="mb-0 ps-3 fs-6">"Successfully updated"</p>
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

export default UpdateForm;
