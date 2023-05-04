import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPerson, updatePerson } from "../../api";
import "./PeopleForm.css";

function PeopleForm({ person, onSubmit }) {
  const [name, setName] = useState(person ? person.name : "");
  const [email, setEmail] = useState(person ? person.email : "");
  const [phone, setPhone] = useState(person ? person.phone : "");
  const [address, setAddress] = useState(person ? person.address : "");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, email, phone, address };
    if (person) {
      updatePerson(person.id, data).then(() => {
        navigate(-1);
      });
    } else {
      createPerson(data).then(() => {
        navigate(-1);
      });
    }
  };

  return (
    <div className="PeopleForm">
      <h1>{person ? "Edit Person" : "Create Person"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">{person ? "Update" : "Save"}</button>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default PeopleForm;
