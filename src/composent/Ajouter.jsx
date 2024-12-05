import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ajouter.css';

function Ajouter() {
  const [newNote, setnewNote] = useState({ title: '', content: '', shared_with: [] });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const resp = await axios.get('/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(resp.data); // Stocker la liste des utilisateurs
      } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        alert("Erreur lors de la récupération des utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  // Ajouter une note
  const AjoutNote = async () => {
    if (!newNote.title || !newNote.content) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const resp = await axios.post(
        '/notes',
        {
          title: newNote.title,
          content: newNote.content,
          shared_with: newNote.shared_with,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resp);

      alert('Note ajoutée avec succès');
      navigate('/notes');
    } catch (error) {
      console.error("Error adding note:", error.response ? error.response.data : error.message);
      alert("Erreur lors de l'ajout de la note.");
    }
  };

  // Gérer la sélection des utilisateurs
  const handleUserSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions); // Les options sélectionnées
    const selectedIds = selectedOptions.map(option => parseInt(option.value, 10)); // Récupérer les IDs
    setnewNote({ ...newNote, shared_with: selectedIds });
  };

  return (
    <div className='ajouter-container'>
      <h2>Ajouter Une Note</h2>
      <input
        type="text"
        placeholder="Titre"
        value={newNote.title}
        onChange={(e) => setnewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Contenu"
        value={newNote.content}
        onChange={(e) => setnewNote({ ...newNote, content: e.target.value })}
      />
      <hr />
      <label className='label'>Sélectionnez les utilisateurs :</label>
      <select multiple = {true} onChange={handleUserSelection}>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </option>
        ))}
      </select>
      <div className="selected-ids">
        <h4>Utilisateurs sélectionnés (IDs) :</h4>
        {newNote.shared_with.length > 0 ? (
          <p>{newNote.shared_with.join()}</p>
        ) : (
          <p>Aucun utilisateur sélectionné</p>
        )}
      </div>
      <button onClick={AjoutNote}>Valider</button>
      <button onClick={() => navigate('/notes')}>Annuler</button>
    </div>
  );
}

export default Ajouter;