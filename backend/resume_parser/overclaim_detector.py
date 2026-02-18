from datetime import datetime

CURRENT_YEAR = datetime.now().year

TECH_RELEASE_YEAR = {
    "kubernetes": 2014,
    "tensorflow": 2015,
    "pytorch": 2016,
    "docker": 2013
}

def check_skill_timeline(skills, experience_years):
    flags = []

    for skill in skills:
        skill_lower = skill.lower()

        if skill_lower in TECH_RELEASE_YEAR:
            max_possible_exp = CURRENT_YEAR - TECH_RELEASE_YEAR[skill_lower]

            if experience_years > max_possible_exp:
                flags.append(
                    f"Unrealistic experience claim for {skill}"
                )

    return flags

def check_role_progression(roles, experience_years):
    flags = []

    if "senior" in roles and experience_years < 3:
        flags.append("Senior role claimed with insufficient experience")

    if "lead" in roles and experience_years < 5:
        flags.append("Lead role claimed too early in career")

    return flags

def check_education_experience_overlap(experience_years):
    flags = []

    if experience_years > 10:
        flags.append("Possible education–experience overlap")

    return flags