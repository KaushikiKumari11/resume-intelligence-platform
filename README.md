# Resume Screening System

An NLP-based system that analyzes resumes, matches them with relevant job descriptions, and detects inconsistencies in experience claims to improve hiring accuracy.

# Features

- Resume and job description matching using semantic similarity  
- Extraction of structured data such as skills, roles, and experience from unstructured resumes  
- Overclaim detection to identify unrealistic career progressions  
- Technology timeline validation to detect incorrect experience claims  
- Personalized feedback generation based on skill gaps  
- Interview question generation based on matched job roles  

# Technologies Used

- Python  
- spaCy  
- Scikit-learn  
- Sentence Transformers  
- pdfplumber  
- python-docx  
- pandas  

# How It Works

1. User uploads a resume in PDF or DOCX format  
2. The system extracts and cleans text from the resume  
3. Skills, experience, and roles are identified and structured  
4. Resume is compared with job descriptions using similarity models  
5. System checks for overclaims and timeline inconsistencies  
6. Generates match score, feedback, and interview questions  

# Installation and Setup

1. Clone the repository  
