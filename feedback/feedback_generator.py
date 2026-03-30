def generate_feedback(match_score, missing_skills, flags):
    feedback = []

    # Match score analysis
    if match_score > 80:
        feedback.append("Your resume is highly aligned with job requirements.")
    elif match_score > 60:
        feedback.append("Your resume is moderately aligned but needs improvement.")
    else:
        feedback.append("Your resume has low alignment. Consider improving your skills.")

    # Missing skills
    if missing_skills:
        feedback.append("Missing skills: " + ", ".join(missing_skills))

    # Overclaim flags
    for flag in flags:
        feedback.append("Warning: " + flag)

    return feedback