import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createPerson, updatePerson } from "../../api";

function PeopleModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (props.mode === "edit" && props.person) {
      setName(props.person.name);
      setEmail(props.person.email);
      setPhone(props.person.phone);
      setAddress(props.person.address);
    }
  }, [props.mode, props.person]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, email, phone, address };
    if (props.mode === "create") {
      await createPerson(data);
      props.onHide();
      props.fetchPeople();
    } else if (props.mode === "edit") {
      await updatePerson(props.person.id, data);
      props.onHide();
      props.fetchPeople();
    }
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const handleDelete = () => {
    props.onDelete(props.person.id);
    props.onHide();
    props.fetchPeople();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.mode === "create" ? "Create Person" : "Edit Person"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={handlePhoneChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>
          <Button style={{ marginTop: '10px'}} variant="primary" type="submit">
            Save
          </Button>{" "}
          {props.mode === "edit" && (
            <Button style={{ marginTop: '10px'}} variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PeopleModal;
