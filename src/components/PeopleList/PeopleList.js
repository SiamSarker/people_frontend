import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPeople, deletePerson } from "../../api";
import "./PeopleList.css";

function PeopleList() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((response) => {
      setPeople(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    deletePerson(id).then(() => {
      setPeople((prevPeople) => prevPeople.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="PeopleList">
      <h1>People List</h1>

      <div>
        
          <Link to="/people/new" activeClassName="active" className="new-button-link">
          <button className="new-button">Add New Person</button>
          </Link>
        
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
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
                <Link to={`/people/${person.id}/edit`} state={person}>
                  <button className="edit-btn">Edit</button>
                </Link>{" "}
                <button class="delete" onClick={() => handleDelete(person.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default PeopleList;
