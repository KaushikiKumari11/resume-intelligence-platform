def calculate_final_score(skill_match, experience_match, role_match):
    return (
        0.5 * skill_match +
        0.3 * experience_match +
        0.2 * role_match
    )