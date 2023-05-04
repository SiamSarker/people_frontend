import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { getPeople, createPerson, updatePerson, deletePerson } from "./api";
import PeopleModal from "./components/PeopleModal/PeopleModal";

function App() {
  const [people, setPeople] = useState([]);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetchPeople();
  }, [people]);

  const fetchPeople = async () => {
    try {
      const response = await getPeople();
      setPeople(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPeopleModal = (mode, person) => {
    setMode(mode);
    setPerson(person);
    setShowPeopleModal(true);
  };

  const handleClosePeopleModal = () => {
    setShowPeopleModal(false);
  };

  const handleCreatePerson = async (data) => {
    try {
      const response = await createPerson(data);
      setPeople([...people, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPerson = async (id, data) => {
    try {
      const response = await updatePerson(id, data);
      const updatedPeople = people.map((person) =>
        person.id === id ? response.data : person
      );
      setPeople(updatedPeople);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await deletePerson(id);
      const updatedPeople = people.filter((person) => person.id !== id);
      setPeople(updatedPeople);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: '20px', padding: '10px' }}>

    <h1>People List</h1>       

    <Table style={{ marginTop: '20px'}} striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{person.address}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowPeopleModal("edit", person)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeletePerson(person.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => handleShowPeopleModal("create")}>
        Add New Person
      </Button>     

      <PeopleModal
        show={showPeopleModal}
        onHide={handleClosePeopleModal}
        mode={mode}
        person={person}
        onCreate={handleCreatePerson}
        onEdit={handleEditPerson}
      />
    </div>
  );
}

export default App;
