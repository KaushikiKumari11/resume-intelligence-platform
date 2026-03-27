import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h1 className="text-4xl font-bold">ResumePro</h1>
        </div>
        <p className="text-lg opacity-90">
          AI-Powered Resume Screening & Interview Preparation
        </p>
      </div>
    </header>
  );
}
