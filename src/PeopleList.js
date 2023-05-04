import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPeople, deletePerson } from './api';

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
      alert("Person has been deleted successfully");
    });
  };

  return (
    <div>
      <h1>People List</h1>
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
                <Link to={`/people/${person.id}/edit`} state={person}>Edit</Link>{' '}
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeopleList;
