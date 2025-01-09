import React from 'react';
import { useHistory } from 'react-router-dom';

const NoteList = () => {
    const history = useHistory();

    const handleNewNote = () => {
        axios.post('http://localhost:8000/api/notes', { title: 'New Note', content: '' })
            .then((response) => {
                history.push(`/note/${response.data.id}`);
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    return (
        <button onClick={handleNewNote}>
            Create New Note
        </button>
    );
};

export default NoteList;
