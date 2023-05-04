import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import PeopleList from "./PeopleList";
import PeopleForm from "./PeopleForm";
import EditPerson from "./EditPerson";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                People
              </NavLink>
            </li>
            <li>
              <NavLink to="/people/new" activeClassName="active">
                New Person
              </NavLink>
            </li>
          </ul>
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
