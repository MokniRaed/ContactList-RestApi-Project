import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddContact() {
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    age: null,
  });
  const navigate = useNavigate();

  const hadnleAdd = async () => {

    try {
      
    const apiResponse = await axios.post(
      "http://localhost:3200/addUser",
      newUser
    );

    if (apiResponse.status === 200) {
      toast("User Added ✅");
      navigate('/')
    } else {
      toast("Cannot add user  ❌");
    }
    } catch (error) {
      console.log(error);
      toast.error("cannot handle request ⚠️")
      
    }

  };
  return (
    <>
      <Container style={{ margin: "40px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form.Group className="mb-3">
              <Form.Label>What's your name?</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setNewUser({ ...newUser, name: event.target.value })
                }
                type="text"
                name="name"
                placeholder="Salah "
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What's your Last Name ?</Form.Label>
              <Form.Control
                onChange={(event) =>
                  setNewUser({ ...newUser, lastname: event.target.value })
                }
                type="text"
                name="lastname"
                placeholder="ben Gaid"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(event) =>
                  setNewUser({ ...newUser, age: event.target.value })
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
            <Button onClick={() => hadnleAdd()} variant="primary">
              Ajouter
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddContact;
