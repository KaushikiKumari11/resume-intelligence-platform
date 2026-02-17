import re

def extract_sections(text):
    sections = {
        "skills": [],
        "education": [],
        "experience": []
    }

    if not text or len(text.strip()) == 0:
        return sections

    text = text.lower()

    skills_match = re.search(r"(skills)(.*?)(education|experience|projects|$)", text, re.DOTALL)
    edu_match = re.search(r"(education)(.*?)(skills|experience|projects|$)", text, re.DOTALL)
    exp_match = re.search(r"(experience)(.*?)(skills|education|projects|$)", text, re.DOTALL)

    if skills_match:
        skills_text = skills_match.group(2)
        sections["skills"] = clean_and_split(skills_text)

    if edu_match:
        edu_text = edu_match.group(2)
        sections["education"] = clean_and_split(edu_text)

    if exp_match:
        exp_text = exp_match.group(2)
        sections["experience"] = clean_and_split(exp_text)

    return sections


def clean_and_split(text):
    """
    Split text into readable bullet-like entries
    """
    text = re.sub(r'\s+', ' ', text)
    parts = re.split(r',|;|\n', text)
    return [p.strip() for p in parts if len(p.strip()) > 3]