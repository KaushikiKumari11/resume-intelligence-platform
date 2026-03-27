'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

interface QuestionsSectionProps {
  resumeFile: File;
  jdFile: File | null;
  uploadMode: 'resume-only' | 'resume-and-jd';
  onBackToFeedback: () => void;
  onReset: () => void;
}

interface QAItem {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export default function QuestionsSection({
  resumeFile,
  jdFile,
  uploadMode,
  onBackToFeedback,
  onReset,
}: QuestionsSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const mockQuestions: QAItem[] = [
    {
      question: 'Tell us about a project where you took the lead and how you managed the team.',
      answer: 'This is an opportunity to showcase leadership skills. Structure your answer using the STAR method: Situation, Task, Action, Result. Focus on how you motivated team members, handled conflicts, and achieved the project goals. Mention specific metrics that demonstrate impact.',
      difficulty: 'medium',
      category: 'Leadership',
    },
    {
      question: 'Describe a situation where you had to learn a new technology quickly.',
      answer: 'This tests adaptability and self-learning ability. Talk about the technology, the timeframe you had to learn it, resources you used (online courses, documentation, mentorship), and how you applied it. Mention the business impact and what you learned from the experience.',
      difficulty: 'easy',
      category: 'Technical',
    },
    {
      question:
        uploadMode === 'resume-and-jd'
          ? 'How do your experience with [specific tech from JD] align with this role?'
          : 'How do you stay updated with industry trends?',
      answer:
        uploadMode === 'resume-and-jd'
          ? 'Connect your specific experience to the job requirements. Discuss projects where you used the technology, your proficiency level, and how you can contribute to the team. Be specific about versions, frameworks, or methodologies you\'ve used.'
          : 'Share specific blogs, podcasts, newsletters, or communities you follow. Mention conferences you attend or certifications you pursue. Give examples of how you\'ve applied new learning to your work.',
      difficulty: 'medium',
      category: uploadMode === 'resume-and-jd' ? 'Technical' : 'General',
    },
    {
      question: 'What are your biggest strengths and how would they benefit our team?',
      answer: 'Pick 2-3 genuine strengths that are relevant to the role. Back each with a concrete example from your resume. Relate them directly to the job description or company needs. Avoid generic answers like "I\'m a hard worker."',
      difficulty: 'easy',
      category: 'Personal',
    },
    {
      question: 'Tell us about a time you failed and what you learned from it.',
      answer: 'Be honest but strategic. Pick a failure where you grew significantly. Use the STAR method to explain what happened, your role, and how you turned it around. Emphasize the lessons learned and how you applied them going forward. Show growth mindset.',
      difficulty: 'hard',
      category: 'Personal',
    },
    {
      question: 'Where do you see yourself in 5 years?',
      answer:
        uploadMode === 'resume-and-jd'
          ? 'Align your aspirations with the company\'s opportunities. Show ambition while demonstrating commitment to growing with the organization. Mention skills you want to develop and leadership aspirations if relevant to the role.'
          : 'Show growth ambition while being realistic. Talk about developing new skills, taking on more responsibility, and contributing to organizational success. Avoid answers that suggest you\'ll leave soon.',
      difficulty: 'easy',
      category: 'Career',
    },
  ];

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowQuestions(true);
    setIsLoading(false);
  };

  const handleDownload = () => {
    const content = mockQuestions
      .map(
        (q, i) => `
Q${i + 1}: ${q.question}
Difficulty: ${q.difficulty}
Category: ${q.category}

A: ${q.answer}

---
      `
      )
      .join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'interview-questions.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (difficulty === 'easy') return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
    if (difficulty === 'medium') return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!showQuestions ? (
        <div className="text-center py-12">
          <Card className="p-12 mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-5xl">🎯</div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Generating Interview Questions</h2>
                <p className="text-muted-foreground mt-2">
                  {uploadMode === 'resume-and-jd'
                    ? 'Creating role-specific questions based on your resume and job description'
                    : 'Creating common interview questions for your industry and role'}
                </p>
              </div>
            </div>

            <Button
              onClick={handleGenerateQuestions}
              disabled={isLoading}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-5 w-5" />
                  Generating Questions...
                </>
              ) : (
                'Generate Questions & Answers'
              )}
            </Button>
          </Card>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Interview Q&A Guide</h2>
            <p className="text-muted-foreground">
              {uploadMode === 'resume-and-jd'
                ? 'Tailored questions based on your resume and job requirements'
                : 'Common questions with suggested answers and tips'}
            </p>
          </div>

          {/* Summary Card */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{mockQuestions.length}</div>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">
                  {mockQuestions.filter((q) => q.difficulty === 'easy').length}
                </div>
                <p className="text-sm text-muted-foreground">Easy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">
                  {mockQuestions.filter((q) => q.difficulty === 'hard').length}
                </div>
                <p className="text-sm text-muted-foreground">Hard</p>
              </div>
            </div>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Questions & Answer Guide</h3>
            </div>

            {mockQuestions.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-2">{item.question}</h4>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-muted-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedIndex === index && (
                  <div className="px-6 pb-6 pt-0 border-t">
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <h5 className="font-semibold text-foreground mb-2">Suggested Answer:</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h5 className="font-semibold text-foreground mb-2 text-sm">💡 Interview Tip:</h5>
                      <p className="text-xs text-muted-foreground">
                        Use the STAR method (Situation, Task, Action, Result) to structure your answers. Keep responses concise (1-2 minutes) and focus on showing your value.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="p-6 bg-primary/5 border-primary/30">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-xl">📚</span>
              Interview Preparation Tips
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Practice aloud:</strong> Speak your answers out loud to improve delivery and identify areas to refine.
              </li>
              <li>
                <strong className="text-foreground">Research the company:</strong> Know their mission, culture, recent news, and how your skills fit.
              </li>
              <li>
                <strong className="text-foreground">Prepare questions to ask:</strong> Shows genuine interest. Ask about team dynamics, success metrics, or growth opportunities.
              </li>
              <li>
                <strong className="text-foreground">Mock interviews:</strong> Practice with friends or mentors to get feedback on your responses.
              </li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-8">
            <Button variant="outline" onClick={onReset}>
              <RotateCcw className="mr-2 w-4 h-4" />
              Start Over
            </Button>
            <Button variant="outline" onClick={onBackToFeedback}>
              Back to Feedback
            </Button>
            <Button onClick={handleDownload} size="lg" className="px-8 py-6">
              <Download className="mr-2 w-5 h-5" />
              Download Q&A Guide
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
