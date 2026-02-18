from entity_main import extract_entities
from overclaim_detector import (
    check_skill_timeline,
    check_role_progression,
    check_education_experience_overlap
)

def detect_overclaims(resume_path):
    entities = extract_entities(resume_path)

    flags = []

    flags.extend(
        check_skill_timeline(
            entities.get("skills", []),
            entities.get("experience_years", 0)
        )
    )

    flags.extend(
        check_role_progression(
            entities.get("roles", []),
            entities.get("experience_years", 0)
        )
    )

    flags.extend(
        check_education_experience_overlap(
            entities.get("experience_years", 0)
        )
    )

    return {
        "flags": flags
    }


if __name__ == "__main__":
    resume_path = "Kaushiki_resume.pdf"  # same resume
    result = detect_overclaims(resume_path)

    print("\nOVERCLAIM FLAGS\n")
    if result["flags"]:
        for flag in result["flags"]:
            print("-", flag)
    else:
        print("No overclaim detected")

    print("\n\n")