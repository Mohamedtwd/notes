import { useState } from 'react';
import './App.css';
import Login from './composent/Login.jsx';
import Notes from './composent/Notes.jsx';
import Ajouter from './composent/Ajouter.jsx';
import Modifier from './composent/Modifier.jsx';
import MotDePasse from './composent/MotDePasse.jsx';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  const [isConected, setIsConected] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsConected(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/notes"
          element={isConected ? <Notes onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/ajouter"
          element={isConected ? <Ajouter /> : <Navigate to="/" />}
        />
        <Route path="/modifier/:id" element={isConected ? <Modifier /> : <Navigate to="/" />} />
        <Route
          path="/MotDePasse"
          element={isConected ? <MotDePasse /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Login setIsConected={setIsConected} />} />
      </Routes>
    </Router>
  );
}

export default App;
