import React from 'react';
import { useParams } from 'react-router-dom';
import { getPerson } from './api';
import PeopleForm from './PeopleForm';

function EditPerson() {
  const { id } = useParams();
  const [person, setPerson] = React.useState(null);

  React.useEffect(() => {
    getPerson(id).then((response) => {
      setPerson(response.data);
    });
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return <PeopleForm person={person} onSubmit={() => window.history.back()} />;
}

export default EditPerson;
