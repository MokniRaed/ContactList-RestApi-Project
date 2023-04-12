import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id1 ", id);

  const [oldUser, setOldUser] = useState({
    _id: null,
    name: "",
    lastname: "",
  });

  const hadnleEdit = async () => {
    const token = localStorage.getItem("token");
    //Define the request headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const apiResponse = await axios.put(
      `http://localhost:3200/edituser/${id}`,
      oldUser,
      {
        headers: headers,
      }
    );

    if (apiResponse.status === 200) {
      toast("User Edited ✅");
      navigate("/");
    } else {
      toast("Cannot edit user  ❌");
    }
    console.log(apiResponse);
  };

  useEffect(() => {
    const getOldUser = async () => {
      console.log("id2 ", id);
      const apiResponse = await axios.get(
        `http://localhost:3200/getbyid/${id}`
      );
      console.log("this is our api response", apiResponse);
      setOldUser(apiResponse.data);
    };

    getOldUser();
  }, [id]);
  return (
    <>
      <Container style={{ margin: "40px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-3">
              <Form.Label>What's your name?</Form.Label>
              <Form.Control
                value={oldUser.name}
                onChange={(event) =>
                  setOldUser({ ...oldUser, name: event.target.value })
                }
                type="text"
                name="name"
                placeholder="Salah "
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What's your Last Name ?</Form.Label>
              <Form.Control
                value={oldUser.lastname}
                onChange={(event) =>
                  setOldUser({ ...oldUser, lastname: event.target.value })
                }
                type="text"
                name="lastname"
                placeholder="ben Gaid"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                value={oldUser.age}
                onChange={(event) =>
                  setOldUser({ ...oldUser, age: event.target.value })
                }
                type="number"
                name="age"
                placeholder="age"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Button onClick={() => hadnleEdit()} variant="primary">
              Editer
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditContact;
