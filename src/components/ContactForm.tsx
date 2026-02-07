import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  equipmentTitle: string;
}

export const ContactForm = ({ equipmentTitle }: ContactFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the ${equipmentTitle}. Please send me more information.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in your name, email, and message.',
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Inquiry Sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });

    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-1">Interested in this equipment?</h2>
      <p className="text-sm text-muted-foreground mb-5">Fill out the form and we'll respond within 24 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm text-foreground">Full Name *</Label>
          <Input
            id="name"
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Smith"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm text-foreground">Email *</Label>
          <Input
            id="email"
            type="email"
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm text-foreground">Phone</Label>
          <Input
            id="phone"
            type="tel"
            maxLength={20}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 123-4567"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-sm text-foreground">Message *</Label>
          <Textarea
            id="message"
            maxLength={1000}
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 resize-none"
          />
        </div>
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
          <Send className="h-4 w-4 mr-2" />
          Send Inquiry
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border space-y-3">
        <p className="text-sm font-medium text-foreground">Or contact us directly:</p>
        <a href="tel:8642527174" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <Phone className="h-4 w-4" />
          (864) 252-7174
        </a>
        <a href="mailto:support@linelock.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <Mail className="h-4 w-4" />
          support@linelock.com
        </a>
      </div>
    </div>
  );
};
