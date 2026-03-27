'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import FeedbackSection from '@/components/FeedbackSection';
import QuestionsSection from '@/components/QuestionsSection';

type ScreeningStep = 'upload' | 'feedback' | 'questions';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<ScreeningStep>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'resume-only' | 'resume-and-jd'>('resume-only');

  const handleUploadComplete = (resume: File, jd: File | null, mode: 'resume-only' | 'resume-and-jd') => {
    setResumeFile(resume);
    setJdFile(jd);
    setUploadMode(mode);
    setCurrentStep('feedback');
  };

  const handleGenerateQuestions = () => {
    setCurrentStep('questions');
  };

  const handleBackToFeedback = () => {
    setCurrentStep('feedback');
  };

  const handleReset = () => {
    setResumeFile(null);
    setJdFile(null);
    setUploadMode('resume-only');
    setCurrentStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {currentStep === 'upload' && (
          <UploadSection onUploadComplete={handleUploadComplete} />
        )}
        
        {currentStep === 'feedback' && resumeFile && (
          <FeedbackSection
            resumeFile={resumeFile}
            jdFile={jdFile}
            uploadMode={uploadMode}
            onGenerateQuestions={handleGenerateQuestions}
            onReset={handleReset}
          />
        )}
        
        {currentStep === 'questions' && resumeFile && (
          <QuestionsSection
            resumeFile={resumeFile}
            jdFile={jdFile}
            uploadMode={uploadMode}
            onBackToFeedback={handleBackToFeedback}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
