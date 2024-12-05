import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './modifier.css';

function Modifier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState({
        title: '',
        content: '',
    });

    const fetchNote = useCallback(async () => {
        const token = localStorage.getItem("token");
        try {
            const resp = await axios.get(`/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNote({
                title: resp.data.title,
                content: resp.data.content,
            });
        } catch (error) {
            console.error("Error fetching note:", error.response ? error.response.data : error.message);
            alert("Erreur lors de la récupération de la note.");
        }
    }, [id]);

    useEffect(() => {
        fetchNote();
    }, [fetchNote]);

    const updateNote = async () => {
        const token = localStorage.getItem("token");

        if (!note.title || !note.content) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        try {
            await axios.put(
                `/notes/${id}`,
                {
                    title: note.title,
                    content: note.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Note modifiée avec succès !");
            navigate('/notes');
        } catch (error) {
            console.error("Error updating note:", error.response ? error.response.data : error.message);
            alert("Erreur lors de la modification de la note.");
        }
    };

    return (
        <div className='modifier-container'>
            <h2>Modifier la Note</h2>
            <input
                type="text"
                placeholder="Titre"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <textarea
                placeholder="Contenu"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
            <button onClick={updateNote}>Valider</button>
            <button onClick={() => navigate('/notes')}>Annuler</button>
        </div>
    );
}

export default Modifier;
