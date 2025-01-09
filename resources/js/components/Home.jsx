// Home.jsx or the component for http://localhost:8000/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  useEffect(() => {
    axios.get('http://localhost:8000/notes') // Adjust with your API route to get notes
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const createNewNote = async () => {
    try {
      const response = await axios.post('http://localhost:8000/notes', { title: 'New Note', content: '' });
      setNotes([...notes, response.data]); // Add new note to the list
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={createNewNote}>Create New Note</button>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/Note/${note.id}`}>{note.title}</Link>
            {/* Add update and delete buttons here */}
            <button onClick={() => alert('Update note logic')}>Update</button>
            <button onClick={() => alert('Delete note logic')}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
