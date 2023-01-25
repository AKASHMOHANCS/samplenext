import { deleteUser, fetchUsers } from "lib/pages";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Signup from "../SignUp";
import UpdateForm from "../UpdateForm";

const PortfolioSection = ({ props }) => {
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    fetchUsers("form-submit").then((response) => setUserDetails(response));
  }, [update]);

  const handleDelete = (userId) => {
    try {
      deleteUser("form-submit", userId).then((response) => {
        if (response?.status == true) {
          fetchUsers("form-submit").then((response) =>
            setUserDetails(response)
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
      <Container>
        <Row>
          {!update ? (
            <h3 className="p-5 ">All Users</h3>
          ) : (
            <h3 className="p-5 pb-1 ">Update user {user.name} </h3>
          )}

          {/* <div className="p-5">
            <button
              onClick={() =>
                fetchUsers("form-submit").then((response) =>
                  setUserDetails(response)
                )
              }
            >
              Load Users
            </button>
          </div> */}

          {!update &&
            userDetails?.map((user) => {
              return (
                <div key={user.id} className={"d-flex"}>
                  <h6 className={"m-4 "}>{user.id}</h6>
                  <h6 className={"m-4"}>{user.signUp_name}</h6>
                  <h6 className={"m-4"}>{user.signUp_mobile}</h6>
                  <h6 className={"m-4"}> {user.signUp_email}</h6>
                  <h6 className={"m-4"}> {user.signUp_password}</h6>

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
                </div>
              );
            })}
          {update && <UpdateForm user={user} setUpdate={setUpdate} />}
        </Row>
      </Container>
    </>
  );
};

export default PortfolioSection;
