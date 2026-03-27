# AI-Powered Resume Intelligence Platform

An NLP-based system that analyzes resumes, matches them with job descriptions, detects inconsistencies, and provides feedback along with job recommendations.

---

##  Features

- Resume parsing (PDF/DOCX)
- Skill, role, and experience extraction
- Resume–Job Description matching using semantic similarity
- Overclaim and fact consistency detection
- Technology timeline validation
- Job recommendations with links
- Personalized feedback generation
- Interview question generation

---

##  Tech Stack

### Backend
- Python
- spaCy
- Scikit-learn
- Sentence Transformers
- pdfplumber
- python-docx
- pandas

### Frontend
- Next.js
- React
- Tailwind CSS

---

##  How It Works

1. User uploads a resume  
2. System extracts and structures data  
3. Skills and experience are analyzed  
4. Resume is matched with job descriptions  
5. Inconsistencies and overclaims are detected  
6. System generates:
   - Match score  
   - Job recommendations  
   - Feedback  
   - Interview questions  

---

##  Running the Project

### Frontend

```bash
npm install
npm run dev