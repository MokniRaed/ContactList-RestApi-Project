import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchcontact } from "../../Redux/contactSlice";
import { toast } from "react-toastify";
import { deleteContactService, editContactService } from "../../services/contactServices";

function Dashboard() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.contact);

  const [oldUser, setOldUser] = useState({
    _id: null,
    name: "",
    lastname: "",
    age: null,
  });
  //-------  only when we use the edit components instead of the /*modal*/-----------
  const handleEdit = (elm) => {
    setShow(true);
    setOldUser(elm);
    // navigate(`/Editcontact/${id}`)
  };

  const handleDelete = async (id) => {
    const apiResponse = deleteContactService(id)
    if (apiResponse.status === 200) {
      toast("User Deleted ✅");
      getContacts();
      setShow(false);
    } else {
      toast("Cannot delete user  ❌");
    }
    console.log(apiResponse);
  };

  const EditUser = async () => {
      const apiResponse = await editContactService(oldUser)
    if (apiResponse.status === 200) {
      toast("User Edited ✅");
      getContacts()
      setShow(false);
    } else {
      toast("Cannot edit user  ❌");
    }
    
  };
 //Get Contacts from the server
 const getContacts = async () => {
  const token = localStorage.getItem("token");
  //Define the request headers
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  //Add the headers to the request
  const apiResponse = await axios.get("http://localhost:3200/getusers", {
    headers: headers,
  });

  if (apiResponse.status === 200) {
    
    dispatch(fetchcontact(apiResponse.data));
  }
};
  useEffect(() => {
       getContacts();
  }, [dispatch]);

  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <h1> Welcome to Dashboard</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactData.map((elm, key) => (
            <tr>
              <td>{key}</td>
              <td>{elm.name}</td>
              <td>{elm.lastname}</td>
              <td>{elm.age}</td>
              <td>
                {" "}
                <Button
                  variant="success"
                  onClick={() => {
                    handleEdit(elm);
                  }}
                >
                  Edit <BiEdit />
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete(elm._id);
                  }}
                >
                  Delete <BiTrash />
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ------------- This is the Edit Model --------------------- */}

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => EditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
