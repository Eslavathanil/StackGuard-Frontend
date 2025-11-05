import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hello user,</h1>
            <p className="text-muted-foreground mt-1">How are you doing today?</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Page</h2>
          <p className="text-muted-foreground">
            Welcome to your StackGuard dashboard. Your codebase is now protected with advanced secret scanning.
          </p>
        </div>
      </div>
    </div>
  );
}
