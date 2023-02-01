import { setPaginationData } from "@/Store/authSlice";
import { deleteUser, fetchUsers } from "lib/pages";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../FilterBar";
import PaginationComponent from "../PaginationComponent";
import Signup from "../SignUp";
import UpdateForm from "../UpdateForm";

const PortfolioSection = ({ props }) => {

  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState();
  const [userDetails, setUserDetails] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers("form-submit").then((response) =>
      dispatch(setPaginationData(response))
    );
  }, [update]);

  //const { userDetails } = useSelector((state) => state.auth.paginationData);



  const handleDelete = (userId) => {
    try {
      deleteUser("form-submit", userId).then((response) => {
        if (response?.status == true) {
          fetchUsers("form-submit").then((response) =>
            dispatch(setPaginationData(response))
          );
        }
      });
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  const handleUpdate = (id, name, mobile, email, password) => {
    setUpdate(true);
    setUser({
      id: id,
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    });
  };

  return (
    <>
      <Container style={{ minHeight: "80vh" }}>
        <FilterBar />
        <Row>
          {!update ? (
            <h3 className="p-5 ">All Users</h3>
          ) : (
            <h3 className="p-5 pb-1 ">Update user {user.name} </h3>
          )}

          {!update &&
            userDetails?.map((user, i) => {
              return (
                <Row key={i} className={""}>
                  <Col lg={12} className="border">
                    <span className={"m-4 "}>{user.id}</span>
                    <span className={"m-4"}>{user.signUp_name}</span>
                    <span className={"m-4"}>{user.signUp_mobile}</span>
                    <span className={"m-4"}> {user.signUp_email}</span>
                    <span className={"m-4"}> {user.signUp_password}</span>

                    <button
                      className={"m-4 "}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={"m-4"}
                      onClick={() =>
                        handleUpdate(
                          user.id,
                          user.signUp_name,
                          user.signUp_mobile,
                          user.signUp_email,
                          user.signUp_password
                        )
                      }
                    >
                      Update
                    </button>
                  </Col>
                </Row>
              );
            })}
          {update && <UpdateForm user={user} setUpdate={setUpdate} />}
        </Row>

        <PaginationComponent slug={true} />
      </Container>
    </>
  );
};

export default PortfolioSection;
