import { Shield } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 justify-center mb-6">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <Shield className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold text-foreground">Stackguard</span>
    </div>
  );
};
