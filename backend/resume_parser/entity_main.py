from parser_main import parse_resume
from skill_extractor import extract_skills
from role_experience_extractor import extract_roles, extract_experience_years

def extract_entities(resume_path):
    # Call Day-2 parser (UNCHANGED)
    sections = parse_resume(resume_path)

    if not sections:
        print("No sections extracted")
        return {}

    # 🔴 FIX: sections contain LISTS, not strings
    full_text = ""

    for section_list in sections.values():
        if isinstance(section_list, list):
            full_text += " " + " ".join(section_list)

    skills = extract_skills(full_text)
    roles = extract_roles(full_text)
    experience_years = extract_experience_years(full_text)

    return {
        "skills": skills,
        "roles": roles,
        "experience_years": experience_years
    }


if __name__ == "__main__":
    resume_path = "Kaushiki_resume.pdf"   # SAME file you already use

    entities = extract_entities(resume_path)

    print("\n========== EXTRACTED ENTITIES ==========\n")
    print("Skills:", entities.get("skills", []))
    print("\nRoles:", entities.get("roles", []))
    print("\nExperience (years):", entities.get("experience_years", 0))
    print("\n=======================================\n")