import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./notes.css";
import { useNavigate } from 'react-router-dom';

function Notes({ onLogout }) {
  const [Notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.get('/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(resp.data);
    } catch (error) {
      console.error("Error fetching notes:", error.response ? error.response.data : error.message);
      alert("Failed to fetch notes.");
    }
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ?")) {
      try {
        await axios.delete(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Note supprimée avec succès !");
        setNotes(Notes.filter(note => note.id !== id));
      } catch (error) {
        console.error("Error deleting note:", error.response ? error.response.data : error.message);
        alert("Erreur lors de la suppression de la note.");
      }
    }
  };

  const editNote = (id) => {
    navigate(`/modifier/${id}`);
  };

  return (
    <div className='notes-container'>
      <div className='header'>
        <h1>Mes Notes</h1>
        <div className='space'>
          <h2>Bienvenue <span>{username}</span> </h2>
          <button className='center-button' onClick={() => navigate('/ajouter')}>Ajouter</button>
          <button className='modify-button' onClick={() => navigate('/MotDePasse')}>Modifier le mot de passe</button>
          <button className='logout-button' onClick={onLogout} >Déconnecter</button>
        </div>

      </div>
      <div className='table-container'>
        <table border={2}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Partagé avec</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Notes.map((note, index) => (
              <tr key={index}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td className='partage'>
                  {note.shared_with && note.shared_with.length > 0 ? (
                    note.shared_with.map((user, i) => (
                      <span key={i}>
                        {user.first_name} {user.last_name}
                        {i < note.shared_with.length - 1 && ' - '}
                      </span>
                    ))
                  ) : (
                    <span>Aucun</span>
                  )}
                </td>
                <td>
                  <button onClick={() => editNote(note.id)}>Modifier</button>
                  <button onClick={() => deleteNote(note.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Notes;
