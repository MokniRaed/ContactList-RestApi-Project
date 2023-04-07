import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { BiEdit,BiTrash } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Dashboard() {
  const [Contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);

  const [oldUser, setOldUser] = useState({
    _id:null,
    name: "",
    lastname: "",
    age: null,
  });

  const navigate = useNavigate();

  //Get Contacts from the server
  const getCotacts = async () => {
    const data = await axios.get("http://localhost:3200/getusers");

    setContacts(data.data);
  };
  const handleEdit = (id)=>{
 // setShow(true)
  //  setOldUser(elm)
    navigate(`/Editcontact/${id}`)
  }
  const handleDelete = async(id)=>{
    const apiResponse = await axios.delete(
      `http://localhost:3200/deleteuser/${id}`
    );

    if (apiResponse.status === 200) {
      toast("User Deleted ✅");
      setShow(false)
    } else {
      toast("Cannot delete user  ❌");
    }
    console.log(apiResponse);
  }

  const EditUser = async() => {
    const apiResponse = await axios.put(
        `http://localhost:3200/edituser/${oldUser._id}`,
        oldUser
      );
  
      if (apiResponse.status === 200) {
        toast("User Edited ✅");
        setShow(false)
      } else {
        toast("Cannot edit user  ❌");
      }
      console.log(apiResponse);
  };
  
  

  useEffect(() => {
    getCotacts();
  }, [Contacts]);

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
          {Contacts.map((elm, key) => (
            <tr>
              <td>{key}</td>
              <td>{elm.name}</td>
              <td>{elm.lastname}</td>
              <td>{elm.age}</td>
              <td>
                {" "}
                <Button variant="success" onClick={()=>{ handleEdit(elm._id)}}>Edit <BiEdit/></Button>{" "}
                <Button variant="danger" onClick={()=>{ handleDelete(elm._id)}} >Delete <BiTrash/></Button>{" "}

              </td>
           
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ------------- This is the Edit Model --------------------- */ }

      <Modal show={show} onHide={ ()=> setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><Container style={{ margin: "40px" }}>
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
        
      </Container></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ ()=>setShow(!show)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>EditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
