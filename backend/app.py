from fastapi import FastAPI, UploadFile, File
import shutil
import os

# IMPORT YOUR DAY 9 MODULES
from feedback.feedback_generator import generate_feedback
from feedback.question_generator import generate_questions

app = FastAPI()

# ---------------------------------------------------
# TEMP FUNCTIONS (Replace later with your actual logic)
# ---------------------------------------------------

def parse_resume(file_path):
    with open(file_path, "r", errors="ignore") as f:
        return f.read()


def extract_info(text):
    # Replace later with NLP extraction
    return {
        "skills": ["Python", "SQL", "Machine Learning"],
        "role": "Data Analyst"
    }


def match_jd(data):
    # Replace later with real JD matching
    match_score = 78
    missing_skills = ["Power BI"]
    return match_score, missing_skills


def detect_overclaim(data):
    # Replace later with real logic
    return ["Experience seems exaggerated"]


# ---------------------------------------------------
# MAIN API
# ---------------------------------------------------

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):

    try:
        # Save uploaded file
        file_path = f"temp_{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Step 1: Parse resume
        text = parse_resume(file_path)

        # Step 2: Extract info
        data = extract_info(text)
        skills = data.get("skills", [])
        role = data.get("role", "")

        # Step 3: Match with JD
        match_score, missing_skills = match_jd(data)

        # Step 4: Overclaim detection
        flags = detect_overclaim(data)

        # Step 5: Generate feedback
        feedback = generate_feedback(match_score, missing_skills, flags)

        # Step 6: Generate questions
        questions = generate_questions(skills, missing_skills, role)

        # Delete temp file
        os.remove(file_path)

        # Final output
        return {
            "match_score": match_score,
            "missing_skills": missing_skills,
            "flags": flags,
            "feedback": feedback,
            "questions": questions
        }

    except Exception as e:
        return {"error": str(e)}