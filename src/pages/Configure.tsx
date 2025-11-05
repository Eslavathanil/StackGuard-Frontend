import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const configSchema = z.object({
  publicKey: z.string()
    .min(100, 'Public key must be at least 100 characters')
    .max(1000, 'Public key must not exceed 1000 characters'),
});

type ConfigForm = z.infer<typeof configSchema>;

export default function Configure() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { verifyConfigKey } = useAuth();
  const { toast } = useToast();

  const form = useForm<ConfigForm>({
    resolver: zodResolver(configSchema),
  });

  const handleSubmit = async (data: ConfigForm) => {
    setIsLoading(true);
    try {
      await verifyConfigKey(data.publicKey);
      toast({
        title: 'Success!',
        description: 'Your public key has been verified.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify public key. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-md p-8 border border-border/50">
        <Logo />
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Verify your public key</h1>
          <p className="text-sm text-muted-foreground">
            To get started, provide your public key for verification
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="publicKey">Enter your public key</Label>
            <Textarea
              id="publicKey"
              placeholder="Enter your public key"
              rows={6}
              {...form.register('publicKey')}
              className="mt-1 resize-none"
            />
            {form.formState.errors.publicKey && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.publicKey.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Key must be between 100-1000 characters
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Don't have a public key?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact your administrator
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
