import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Malls from './pages/Malls';
import Stores from './pages/Stores';
import Users from './pages/Users';
import Offers from './pages/Offers';
import Analytics from './pages/Analytics';
import ActivityLog from './pages/ActivityLog';

import Banners from './pages/Banners';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="malls" element={<Malls />} />
        <Route path="stores" element={<Stores />} />
        <Route path="users" element={<Users />} />
        <Route path="offers" element={<Offers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="activity" element={<ActivityLog />} />
        <Route path="banners" element={<Banners />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
