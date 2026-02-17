def load_skill_dictionary():
    """
    Normally loaded from Kaggle/LinkedIn dataset.
    Here we use a small sample for demo.
    """
    return [
        "python", "java", "sql", "machine learning", "deep learning",
        "nlp", "data analysis", "power bi", "excel", "cloud",
        "tensorflow", "kubernetes"
    ]


def extract_skills(resume_text):
    resume_text = resume_text.lower()
    skill_dict = load_skill_dictionary()
    found_skills = []

    for skill in skill_dict:
        if skill in resume_text:
            found_skills.append(skill)

    return list(set(found_skills))