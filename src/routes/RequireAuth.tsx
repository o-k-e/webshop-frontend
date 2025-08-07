import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const RequireAuth = ({ children, allowedRoles }: Props) => {
    const { isAuthenticated, user, loading } = useAuth();
  
    if (loading) return <div>Loading...</div>; // várja a token ellenőrzését
    if (!isAuthenticated) return <Navigate to="/login" />; // ha nem jelentkeztél be
    if (allowedRoles && !allowedRoles.includes(user!.role)) return <Navigate to="/unauthorized" />; // ha nincs jogosultságod
  
    return children; // ha minden oké, megjeleníti a védett oldalt
  };

export default RequireAuth;