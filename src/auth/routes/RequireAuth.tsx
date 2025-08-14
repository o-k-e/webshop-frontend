import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactElement;
  allowedRole?: string;
};

const RequireAuth = ({ children, allowedRole: allowedRole }: Props) => {
    const { isAuthenticated, user, loading } = useAuth();
  
    if (loading) return <div>Loading...</div>; // várja a token ellenőrzését
    if (!isAuthenticated) return <Navigate to="/login" />; // ha nem jelentkeztél be
    if (allowedRole && user?.role !== allowedRole) return <Navigate to="/unauthorized" />; // ha nincs jogosultságod
  
    return children; // ha minden oké, megjeleníti a védett oldalt
  };

export default RequireAuth;