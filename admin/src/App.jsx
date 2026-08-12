import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutEditor from './pages/AboutEditor';
import SkillsEditor from './pages/SkillsEditor';
import ProjectsManager from './pages/ProjectsManager';
import ContactMessages from './pages/ContactMessages';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/about-editor"
            element={<PrivateRoute><AboutEditor /></PrivateRoute>}
          />
          <Route
            path="/skills-editor"
            element={<PrivateRoute><SkillsEditor /></PrivateRoute>}
          />
          <Route
            path="/projects-manager"
            element={<PrivateRoute><ProjectsManager /></PrivateRoute>}
          />
          <Route
            path="/messages"
            element={<PrivateRoute><ContactMessages /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
