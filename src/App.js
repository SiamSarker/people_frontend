import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import PeopleList from "./components/PeopleList/PeopleList";
import PeopleForm from "./components/PeopleForm/PeopleForm";
import EditPerson from "./components/EditPerson";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-buttons">
            <NavLink to="/" activeClassName="active">
              People List
            </NavLink>
            <NavLink to="/people/new" activeClassName="active">
              Add New Person
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<PeopleList />} />
          <Route exact path="/people/new" element={<PeopleForm />} />
          <Route exact path="/people/:id/edit" element={<EditPerson />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
