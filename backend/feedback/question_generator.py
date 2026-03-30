def generate_questions(skills, missing_skills, role):
    questions = []

    # Skill-based questions
    for skill in skills[:3]:
        questions.append(f"Explain a project where you used {skill}.")

    # Missing skill questions
    for skill in missing_skills:
        questions.append(f"How would you learn and apply {skill}?")

    # Role-based
    if role:
        questions.append(f"What are the responsibilities of a {role}?")

    return questions