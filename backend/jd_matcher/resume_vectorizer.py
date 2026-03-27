def vectorize_resume(resume_text, vectorizer):
    """
    resume_text: cleaned resume text (string)
    vectorizer: TF-IDF vectorizer already fitted on JDs
    """
    return vectorizer.transform([resume_text])