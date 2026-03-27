'use client';

import { useState } from 'react';
import { Upload, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UploadSectionProps {
  onUploadComplete: (resume: File, jd: File | null, mode: 'resume-only' | 'resume-and-jd') => void;
}

export default function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [selectedMode, setSelectedMode] = useState<'resume-only' | 'resume-and-jd' | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [dragActivejd, setDragActiveJd] = useState(false);

  const handleDrag = (e: React.DragEvent, setActive: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setActive(true);
    } else if (e.type === 'dragleave') {
      setActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, setActive: (v: boolean) => void, setFile: (f: File) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setFile(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedMode || !resumeFile) {
      alert('Please select an upload mode and upload your resume');
      return;
    }

    if (selectedMode === 'resume-and-jd' && !jdFile) {
      alert('Please upload both resume and job description');
      return;
    }

    onUploadComplete(resumeFile, jdFile, selectedMode);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mode Selection */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Choose Your Path</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Only Card */}
          <Card
            className={`p-6 cursor-pointer transition-all transform hover:scale-105 ${
              selectedMode === 'resume-only'
                ? 'ring-2 ring-primary bg-primary/5 border-primary'
                : 'hover:shadow-lg'
            }`}
            onClick={() => {
              setSelectedMode('resume-only');
              setJdFile(null);
            }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Resume Only</h3>
                <p className="text-muted-foreground text-sm">
                  Get general feedback on your resume structure, formatting, and content quality
                </p>
              </div>
            </div>
          </Card>

          {/* Resume + JD Card */}
          <Card
            className={`p-6 cursor-pointer transition-all transform hover:scale-105 ${
              selectedMode === 'resume-and-jd'
                ? 'ring-2 ring-accent bg-accent/5 border-accent'
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedMode('resume-and-jd')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Resume + Job Description</h3>
                <p className="text-muted-foreground text-sm">
                  Get tailored feedback matching your resume to the job description and specific requirements
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* File Upload */}
      {selectedMode && (
        <div className="space-y-8 animate-in fade-in">
          {/* Resume Upload */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Upload Your Resume</h3>
            <div
              onDragEnter={(e) => handleDrag(e, setDragActive)}
              onDragLeave={(e) => handleDrag(e, setDragActive)}
              onDragOver={(e) => handleDrag(e, setDragActive)}
              onDrop={(e) => handleDrop(e, setDragActive, setResumeFile)}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/50'
              }`}
            >
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Drag & Drop Your Resume</p>
              <p className="text-muted-foreground mb-4">or</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, setResumeFile)}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="default" className="cursor-pointer" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
              {resumeFile && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    ✓ {resumeFile.name} selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* JD Upload */}
          {selectedMode === 'resume-and-jd' && (
            <div className="animate-in fade-in">
              <h3 className="text-2xl font-bold text-foreground mb-4">Upload Job Description</h3>
              <div
                onDragEnter={(e) => handleDrag(e, setDragActiveJd)}
                onDragLeave={(e) => handleDrag(e, setDragActiveJd)}
                onDragOver={(e) => handleDrag(e, setDragActiveJd)}
                onDrop={(e) => handleDrop(e, setDragActiveJd, setJdFile)}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActivejd
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-muted/50'
                }`}
              >
                <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">Drag & Drop Job Description</p>
                <p className="text-muted-foreground mb-4">or</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, setJdFile)}
                  className="hidden"
                  id="jd-upload"
                />
                <label htmlFor="jd-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
                {jdFile && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      ✓ {jdFile.name} selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              Continue to Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
