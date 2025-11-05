import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireConfigKey?: boolean;
}

export const ProtectedRoute = ({ children, requireConfigKey = false }: ProtectedRouteProps) => {
  const { isAuthenticated, hasConfigKey } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireConfigKey && !hasConfigKey) {
    return <Navigate to="/configure" replace />;
  }

  return <>{children}</>;
};
