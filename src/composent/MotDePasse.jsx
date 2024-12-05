import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MotDePasse.css';

function MotDePasse() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Tous les champs doivent être remplis !");
            return;
        }

        if (newPassword.length < 6) {
            alert("Le nouveau mot de passe doit contenir au moins 6 caractères !");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Les nouveaux mots de passe ne correspondent pas !");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                '/update-password',
                {
                    current_password: oldPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Mot de passe modifié avec succès !");
            navigate('/notes');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erreur inconnue.";
            alert(`Erreur : ${errorMessage}`);
        }
    };

    return (
        <div className="modifier-mdp-container">
            <h2>Modifier le Mot de Passe</h2>
            <form onSubmit={handleSubmit}>
                <label>Ancien mot de passe</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <label>Nouveau mot de passe</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label>Confirmer le nouveau mot de passe</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Modifier</button>
                <button type="button" onClick={() => navigate('/notes')}>Annuler</button>
            </form>
        </div>
    );
}

export default MotDePasse;
