import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import PeopleModal from "../PeopleModal";
import { getPeople, createPerson, updatePerson, deletePerson } from "../../api";

function PeopleList() {
  const [people, setPeople] = useState([]);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    getPeople()
      .then((response) => setPeople(response.data))
      .catch((error) => console.log(error));
  };

  const handleShowPeopleModal = (mode, person) => {
    setModalMode(mode);
    setSelectedPerson(person);
    setShowPeopleModal(true);
  };

  const handleClosePeopleModal = () => {
    setShowPeopleModal(false);
    setSelectedPerson(null);
  };

  const handleCreatePerson = (data) => {
    createPerson(data)
      .then(() => {
        fetchPeople();
        handleClosePeopleModal();
      })
      .catch((error) => console.log(error));
  };

  const handleEditPerson = (id, data) => {
    updatePerson(id, data)
      .then(() => {
        fetchPeople();
        handleClosePeopleModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDeletePerson = (id) => {
    deletePerson(id)
      .then(() => {
        fetchPeople();
        handleClosePeopleModal();
      })
      .catch((error) => console.log(error));
  };

  const renderPeople = () => {
    return people.map((person) => {
      return (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.email}</td>
          <td>{person.phone}</td>
          <td>{person.address}</td>
          <td>
            <Button
              variant="primary"
              onClick={() => handleShowPeopleModal("edit", person)}
            >
              Edit
            </Button>{" "}
            <Button
              variant="danger"
              onClick={() => handleShowPeopleModal("delete", person)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>People List</h2>
      <Button variant="success" onClick={() => handleShowPeopleModal("create")}>
        Add New Person
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderPeople()}</tbody>
      </Table>
      <PeopleModal
        show={showPeopleModal}
        onHide={handleClosePeopleModal}
        mode={modalMode}
        person={selectedPerson}
        onCreate={handleCreatePerson}
        onEdit={handleEditPerson}
        onDelete={handleDeletePerson}
      />
    </div>
  );
}

export default PeopleList;
