'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface FeedbackSectionProps {
  resumeFile: File;
  jdFile: File | null;
  uploadMode: 'resume-only' | 'resume-and-jd';
  onGenerateQuestions: () => void;
  onReset: () => void;
}

interface FeedbackItem {
  title: string;
  status: 'good' | 'improve' | 'excellent';
  description: string;
}

export default function FeedbackSection({
  resumeFile,
  jdFile,
  uploadMode,
  onGenerateQuestions,
  onReset,
}: FeedbackSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const mockFeedback: FeedbackItem[] = [
    {
      title: 'Professional Summary',
      status: 'good',
      description: 'Your summary is clear and concise. Consider adding 1-2 specific achievements to make it more compelling.',
    },
    {
      title: 'Skills Section',
      status: 'excellent',
      description: 'Excellent organization of technical and soft skills. Well-categorized and easy to scan.',
    },
    {
      title: 'Work Experience',
      status: 'good',
      description: 'Good bullet points with action verbs. Try quantifying achievements more (e.g., "increased by 30%" instead of "increased").',
    },
    uploadMode === 'resume-and-jd'
      ? {
          title: 'Job Description Match',
          status: 'excellent',
          description: 'Strong alignment with job requirements. You have 85% of the required skills and experience.',
        }
      : {
          title: 'Formatting',
          status: 'excellent',
          description: 'Professional layout with good use of white space. ATS-friendly formatting detected.',
        },
    {
      title: 'Keywords & ATS',
      status: 'good',
      description: 'Good keyword density for ATS scanning. Consider adding industry-specific terms.',
    },
  ];

  const handleGenerateFeedback = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowFeedback(true);
    setIsLoading(false);
  };

  const getStatusIcon = (status: 'good' | 'improve' | 'excellent') => {
    if (status === 'excellent') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'good') return <Zap className="w-5 h-5 text-blue-500" />;
    return <AlertCircle className="w-5 h-5 text-amber-500" />;
  };

  const getStatusColor = (status: 'good' | 'improve' | 'excellent') => {
    if (status === 'excellent') return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
    if (status === 'good') return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
    return 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!showFeedback ? (
        <div className="text-center py-12">
          <Card className="p-12 mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-5xl">📋</div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Analyzing Your Resume</h2>
                <p className="text-muted-foreground mt-2">
                  {uploadMode === 'resume-and-jd'
                    ? `Comparing with "${jdFile?.name}"`
                    : 'Checking structure, formatting, and content'}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Resume: {resumeFile.name}</span>
              </div>
              {jdFile && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Job Description: {jdFile.name}</span>
                </div>
              )}
            </div>

            <Button
              onClick={handleGenerateFeedback}
              disabled={isLoading}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-5 w-5" />
                  Generating Feedback...
                </>
              ) : (
                'Generate Feedback'
              )}
            </Button>
          </Card>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Your Resume Feedback</h2>
            <p className="text-muted-foreground">
              {uploadMode === 'resume-and-jd'
                ? 'Tailored analysis based on the job description'
                : 'General analysis of your resume quality'}
            </p>
          </div>

          {/* Overall Score */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Overall Score</h3>
                <p className="text-muted-foreground">Based on multiple quality metrics</p>
              </div>
              <div className="text-6xl font-bold text-primary">82%</div>
            </div>
          </Card>

          {/* Feedback Items */}
          <div className="grid gap-4">
            <h3 className="text-xl font-bold text-foreground">Detailed Feedback</h3>
            {mockFeedback.map((item, index) => (
              <Card
                key={index}
                className={`p-6 border-l-4 ${getStatusColor(item.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(item.status)}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase text-muted-foreground ml-4">
                    {item.status === 'excellent' ? '✓ Excellent' : item.status === 'good' ? '→ Good' : '! Improve'}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips Card */}
          <Card className="p-6 bg-accent/5 border-accent/50">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Quick Tips for Improvement
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Add more quantifiable metrics to your achievements</li>
              <li>• Use industry-specific keywords from the job description</li>
              <li>• Expand your professional summary to highlight unique value</li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-8">
            <Button variant="outline" onClick={onReset}>
              Upload Different Resume
            </Button>
            <Button
              onClick={onGenerateQuestions}
              size="lg"
              className="px-8 py-6"
            >
              Generate Interview Questions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
