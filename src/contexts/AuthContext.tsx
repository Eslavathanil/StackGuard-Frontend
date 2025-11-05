import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  hasConfigKey: boolean;
  userEmail: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  verifyConfigKey: (key: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasConfigKey, setHasConfigKey] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('stackguard_auth');
    const configKey = localStorage.getItem('stackguard_config_key');
    if (auth) {
      const authData = JSON.parse(auth);
      setIsAuthenticated(true);
      setUserEmail(authData.email);
    }
    if (configKey) {
      setHasConfigKey(true);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const authData = { email };
    localStorage.setItem('stackguard_auth', JSON.stringify(authData));
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const authData = { email, firstName, lastName };
    localStorage.setItem('stackguard_auth', JSON.stringify(authData));
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const verifyConfigKey = async (key: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    localStorage.setItem('stackguard_config_key', key);
    setHasConfigKey(true);
  };

  const signOut = () => {
    localStorage.removeItem('stackguard_auth');
    localStorage.removeItem('stackguard_config_key');
    setIsAuthenticated(false);
    setHasConfigKey(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasConfigKey, userEmail, signIn, signUp, verifyConfigKey, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
