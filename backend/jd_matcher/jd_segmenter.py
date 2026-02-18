import re

def segment_jd(text):
    skills = []
    experience = ""
    role = ""

    role_match = re.search(r"(data analyst|software engineer|developer|ml engineer|ai engineer)", text)
    exp_match = re.search(r"(\d+)\s*\+?\s*(years|yrs)", text)
    skill_match = re.search(r"(skills|required skills)(.*?)(experience|$)", text)

    if role_match:
        role = role_match.group(1)

    if exp_match:
        experience = exp_match.group(0)

    if skill_match:
        skills = [s.strip() for s in skill_match.group(2).split(",") if len(s.strip()) > 2]

    return {
        "role": role,
        "skills": skills,
        "experience": experience
    }