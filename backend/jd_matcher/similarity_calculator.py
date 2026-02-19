from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(resume_vector, jd_vectors):
    """
    Returns similarity score for each JD
    """
    similarities = cosine_similarity(resume_vector, jd_vectors)
    return similarities[0]